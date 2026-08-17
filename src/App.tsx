import { Suspense, useCallback, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';

import { QUESTIONS, WORLDS } from './config/site';
import { store, useApp } from './state/store';
import { useDeviceTier } from './hooks/useDeviceTier';
import { usePointer } from './hooks/usePointer';
import { blip, fade } from './audio/ambient';
import { sendAnswers } from './mail/send';

import { Scene } from './three/Scene';
import { Loader } from './ui/Loader';
import { Gate } from './ui/Gate';
import { HubOverlay } from './ui/HubOverlay';
import { Questions } from './ui/Questions';
import { Finale } from './ui/Finale';
import { AudioControl } from './ui/AudioControl';
import { TravelOverlay } from './ui/TravelOverlay';

export default function App() {
  const stage = useApp((s) => s.stage);
  const progress = useApp((s) => s.progress);
  const traveling = useApp((s) => s.traveling);
  const answers = useApp((s) => s.answers);

  const device = useDeviceTier();
  const pointer = usePointer(!device.reducedMotion);

  const travelTimer = useRef<number | null>(null);
  // Canvas hazır olduğunda effect'i yeniden başlatmamak için ref kullanılır
  const canvasReady = useRef(false);

  /* ---------------- Yükleme ---------------- */

  useEffect(() => {
    if (stage !== 'loading') return;

    // Zaman tabanlı ilerleme — kare hızına bağlı değil, böylece
    // yavaş cihazlarda veya arka plan sekmesinde takılmaz.
    let value = 0;
    let fontsDone = false;
    let done = false;
    let last = performance.now();

    void document.fonts?.ready.then(() => {
      fontsDone = true;
    });

    // Güvenlik ağı: bir şey takılırsa yine de devam et
    const bail = window.setTimeout(() => {
      fontsDone = true;
      canvasReady.current = true;
    }, 5000);

    const finish = () => {
      if (done) return;
      done = true;
      store.setProgress(100);
      window.setTimeout(() => store.setStage('gate'), 480);
    };

    const tick = () => {
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.25);
      last = now;

      // Hedefe asimptotik yaklaş — her şey hazırsa 100'e kadar çıkar
      const ceiling = canvasReady.current && fontsDone ? 100 : 86;
      value += (ceiling - value) * dt * 2.1 + dt * 26;

      if (value >= 99.4) {
        finish();
        return;
      }
      store.setProgress(value);
    };

    const timer = window.setInterval(tick, 1000 / 30);

    return () => {
      window.clearInterval(timer);
      window.clearTimeout(bail);
    };
  }, [stage]);

  /* ---------------- Şifre çözüldü ---------------- */

  const unlock = useCallback(() => {
    store.setStage('breach');
    // Çekirdeğin içinden geçiş, ardından evren
    setTimeout(() => {
      store.setStage('hub');
      blip(520, 0.6, 0.04);
    }, 1650);
  }, []);

  /* ---------------- Dünya seçimi ---------------- */

  const selectWorld = useCallback((id: string) => {
    const world = WORLDS.find((w) => w.id === id);
    if (!world) return;
    if (store.get().stage !== 'hub') return;

    store.travel(id);
    fade(0.1, 1.2);

    if (travelTimer.current) window.clearTimeout(travelTimer.current);

    if (world.kind === 'questions') {
      // Soru odasına geç
      travelTimer.current = window.setTimeout(() => {
        store.set({ stage: 'questions', traveling: null, focused: null });
        fade(0.18, 2);
      }, 1500);
    } else if (world.url) {
      // Dış siteyi yeni sekmede aç, evrende kal
      travelTimer.current = window.setTimeout(() => {
        window.open(world.url, '_blank', 'noopener,noreferrer');
        // Kullanıcı geri döndüğünde hub'ı hazır bulsun
        setTimeout(() => {
          store.set({ stage: 'hub', traveling: null, focused: null });
          fade(store.get().muted ? 0 : 0.28, 2);
        }, 700);
      }, 1550);
    }
  }, []);

  /* ---------------- Soru akışı ---------------- */

  const completeQuestions = useCallback(() => {
    store.setStage('finale');
    blip(1040, 0.9, 0.05);

    // Cevapları e-postayla gönder. Arka planda çalışır; başarısız
    // olsa bile final ekranı normal şekilde devam eder.
    void sendAnswers(store.get().answers);
  }, []);

  const backToHub = useCallback(() => {
    store.set({ stage: 'hub', traveling: null, focused: null });
    fade(store.get().muted ? 0 : 0.28, 1.6);
  }, []);

  /* ---------------- Klavye kısayolları ---------------- */

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      const s = store.get().stage;
      if (s === 'questions' || s === 'finale') backToHub();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [backToHub]);

  useEffect(() => {
    return () => {
      if (travelTimer.current) window.clearTimeout(travelTimer.current);
    };
  }, []);

  /* ----- Gönderilemeyen cevaplar için yeniden deneme ----- */
  // İlk gönderim başarısız olduysa (internet yok, kota doldu vb.)
  // sonraki ziyarette sessizce tekrar denenir.
  useEffect(() => {
    if (stage !== 'gate') return;
    const saved = store.get().answers;
    if (saved.length >= QUESTIONS.length) void sendAnswers(saved);
  }, [stage]);

  /* ---------------- Render ---------------- */

  const travelingWorld = traveling ? WORLDS.find((w) => w.id === traveling) ?? null : null;
  const showAudio = stage !== 'loading';

  return (
    <>
      {/* 3B sahne — her aşamada arka planda kalır */}
      <div className="fill">
        <Canvas
          dpr={device.dpr}
          gl={{
            antialias: device.tier === 'high',
            alpha: false,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
          }}
          camera={{ position: [0, 0.2, 26], fov: 46, near: 0.1, far: 400 }}
          onCreated={({ gl }) => {
            gl.setClearColor('#01030a', 1);
            canvasReady.current = true;
          }}
        >
          <Suspense fallback={null}>
            <Scene
              stage={stage}
              pointer={pointer}
              device={device}
              onSelectWorld={selectWorld}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Atmosfer katmanları */}
      <div className="vignette" />
      <div className="grain" />

      {/* Arayüz katmanları */}
      <Loader visible={stage === 'loading'} progress={progress} />

      {stage === 'gate' && <Gate onUnlock={unlock} />}

      <HubOverlay
        visible={stage === 'hub'}
        isMobile={device.isMobile}
        answersCount={answers.length}
        totalQuestions={QUESTIONS.length}
      />

      <TravelOverlay world={travelingWorld} />

      {stage === 'questions' && (
        <Questions onComplete={completeQuestions} onExit={backToHub} />
      )}

      {stage === 'finale' && <Finale onExit={backToHub} />}

      <AudioControl visible={showAudio} />
    </>
  );
}
