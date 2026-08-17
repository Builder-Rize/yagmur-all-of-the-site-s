import { AUDIO } from '../config/site';

/**
 * Ortam sesi motoru.
 *
 * Öncelik: public/ambient.mp3 dosyası varsa onu çalar.
 * Dosya yoksa Web Audio API ile yumuşak, uzay hissi veren
 * bir ambiyans sentezler (dosya bağımlılığı olmadan çalışır).
 */

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let element: HTMLAudioElement | null = null;
let elementSource: MediaElementAudioSourceNode | null = null;
let synthNodes: { stop: () => void } | null = null;
let started = false;

function ensureContext(): AudioContext {
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new Ctor();
    master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
  }
  return ctx;
}

/** Uzun, yavaşça kayan pad sesi sentezler. */
function buildSynth(context: AudioContext, out: GainNode) {
  const nodes: AudioNode[] = [];
  const oscs: OscillatorNode[] = [];
  const lfos: OscillatorNode[] = [];

  // Düşük frekanslı, hafif detune edilmiş pad katmanları
  const voices = [
    { freq: 55, gain: 0.5, detune: -6 },
    { freq: 82.4, gain: 0.32, detune: 5 },
    { freq: 110, gain: 0.22, detune: -3 },
    { freq: 164.8, gain: 0.1, detune: 8 },
    { freq: 220, gain: 0.05, detune: -9 },
  ];

  const padBus = context.createGain();
  padBus.gain.value = 0.5;

  // Yumuşatma filtresi — parlaklığı kırpar
  const lowpass = context.createBiquadFilter();
  lowpass.type = 'lowpass';
  lowpass.frequency.value = 620;
  lowpass.Q.value = 0.6;

  // Filtre süpürmesi (çok yavaş nefes alma hissi)
  const filterLfo = context.createOscillator();
  const filterLfoGain = context.createGain();
  filterLfo.frequency.value = 0.035;
  filterLfoGain.gain.value = 260;
  filterLfo.connect(filterLfoGain);
  filterLfoGain.connect(lowpass.frequency);
  filterLfo.start();
  lfos.push(filterLfo);
  nodes.push(filterLfoGain);

  for (const v of voices) {
    const osc = context.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = v.freq;
    osc.detune.value = v.detune;

    const g = context.createGain();
    g.gain.value = v.gain;

    // Her ses için bağımsız, çok yavaş genlik dalgalanması
    const ampLfo = context.createOscillator();
    const ampLfoGain = context.createGain();
    ampLfo.frequency.value = 0.02 + Math.random() * 0.05;
    ampLfoGain.gain.value = v.gain * 0.45;
    ampLfo.connect(ampLfoGain);
    ampLfoGain.connect(g.gain);
    ampLfo.start();
    lfos.push(ampLfo);

    osc.connect(g);
    g.connect(padBus);
    osc.start();

    oscs.push(osc);
    nodes.push(g, ampLfoGain);
  }

  // Hafif yıldız tozu — filtrelenmiş pembe gürültü
  const noiseLen = context.sampleRate * 4;
  const buffer = context.createBuffer(1, noiseLen, context.sampleRate);
  const data = buffer.getChannelData(0);
  let b0 = 0;
  let b1 = 0;
  let b2 = 0;
  for (let i = 0; i < noiseLen; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99765 * b0 + white * 0.099;
    b1 = 0.963 * b1 + white * 0.2965;
    b2 = 0.57 * b2 + white * 1.0526;
    data[i] = (b0 + b1 + b2 + white * 0.1848) * 0.06;
  }
  const noise = context.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;

  const noiseFilter = context.createBiquadFilter();
  noiseFilter.type = 'bandpass';
  noiseFilter.frequency.value = 900;
  noiseFilter.Q.value = 0.4;

  const noiseGain = context.createGain();
  noiseGain.gain.value = 0.28;

  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(padBus);
  noise.start();
  nodes.push(noiseFilter, noiseGain);

  padBus.connect(lowpass);
  lowpass.connect(out);
  nodes.push(padBus, lowpass);

  return {
    stop() {
      for (const o of oscs) {
        try {
          o.stop();
        } catch {
          /* zaten durmuş */
        }
      }
      for (const l of lfos) {
        try {
          l.stop();
        } catch {
          /* zaten durmuş */
        }
      }
      try {
        noise.stop();
      } catch {
        /* zaten durmuş */
      }
      for (const n of nodes) n.disconnect();
    },
  };
}

/** Ses motorunu başlatır. Kullanıcı etkileşiminden sonra çağrılmalı. */
export async function startAmbient(): Promise<void> {
  const context = ensureContext();
  if (context.state === 'suspended') await context.resume();
  if (started || !master) return;
  started = true;

  // Önce dosyayı dene
  if (AUDIO.src) {
    const audio = new Audio(AUDIO.src);
    audio.loop = true;
    audio.crossOrigin = 'anonymous';
    audio.preload = 'auto';

    const ok = await new Promise<boolean>((resolve) => {
      const done = (v: boolean) => {
        audio.removeEventListener('canplaythrough', onOk);
        audio.removeEventListener('error', onFail);
        resolve(v);
      };
      const onOk = () => done(true);
      const onFail = () => done(false);
      audio.addEventListener('canplaythrough', onOk, { once: true });
      audio.addEventListener('error', onFail, { once: true });
      // Dosya yoksa uzun süre beklemeyelim
      setTimeout(() => done(false), 2500);
      audio.load();
    });

    if (ok) {
      element = audio;
      elementSource = context.createMediaElementSource(audio);
      elementSource.connect(master);
      await audio.play().catch(() => undefined);
      fade(AUDIO.volume, 3.5);
      return;
    }
  }

  // Dosya yok → sentezlenmiş ambiyans
  if (AUDIO.synthFallback) {
    synthNodes = buildSynth(context, master);
    fade(AUDIO.volume, 5);
  }
}

/** Ana ses seviyesini yumuşakça değiştirir. */
export function fade(to: number, seconds = 1.2): void {
  if (!ctx || !master) return;
  const now = ctx.currentTime;
  master.gain.cancelScheduledValues(now);
  master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), now);
  master.gain.linearRampToValueAtTime(Math.max(to, 0.0001), now + seconds);
}

export function setMuted(muted: boolean): void {
  fade(muted ? 0 : AUDIO.volume, muted ? 0.8 : 1.6);
}

export function isRunning(): boolean {
  return started;
}

/** Kısa, yumuşak bir etkileşim tıkırtısı çalar. */
export function blip(freq = 660, duration = 0.14, gain = 0.05): void {
  if (!ctx || !master || ctx.state !== 'running') return;
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, now);
  osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + duration);

  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(gain, now + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 2600;

  osc.connect(filter);
  filter.connect(g);
  g.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration + 0.05);
}

export function disposeAmbient(): void {
  synthNodes?.stop();
  synthNodes = null;
  element?.pause();
  elementSource?.disconnect();
  element = null;
  elementSource = null;
  started = false;
  void ctx?.close();
  ctx = null;
  master = null;
}
