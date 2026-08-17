import { useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette, ChromaticAberration, Noise } from '@react-three/postprocessing';
import { BlendFunction, KernelSize } from 'postprocessing';
import type { BloomEffect } from 'postprocessing';
import * as THREE from 'three';

import { WORLDS } from '../config/site';
import type { Stage } from '../state/store';
import { store, useApp } from '../state/store';
import type { DeviceProfile } from '../hooks/useDeviceTier';
import type { PointerState } from '../hooks/usePointer';

import { Starfield } from './Starfield';
import { Nebula } from './Nebula';
import { CosmicDust } from './CosmicDust';
import { CoreObject } from './CoreObject';
import { CameraRig } from './CameraRig';
import { Burst } from './Burst';
import { Portal } from './portals/Portal';
import { ConnectionLines } from './ConnectionLines';
import { MemoryFragments } from './MemoryFragments';

/**
 * Portal konumlarını hesaplar.
 *
 * Yatay ekranlarda portaller geniş bir elips üzerine yayılır.
 * Dar/dikey ekranlarda (telefon) aynı yerleşim ekrana sığmaz;
 * bu yüzden halka yatayda daraltılıp dikeyde uzatılır — yani
 * arayüz küçültülmez, yeniden düzenlenir.
 */
function usePortalPositions(radius: number, portrait: boolean) {
  return useMemo(
    () =>
      WORLDS.map((w) => {
        const x = Math.cos(w.angle) * radius;
        const z = Math.sin(w.angle) * radius * 0.42;
        const y = w.height * 1.5;

        if (!portrait) return new THREE.Vector3(x, y, z);

        // Dikey mod: portaller sola-sağa dizilmiş bir sütuna oturur.
        // Sıra config'deki dizilime göre yukarıdan aşağıya iner.
        const i = WORLDS.indexOf(w);
        const step = 3.15;
        const top = ((WORLDS.length - 1) / 2) * step;
        return new THREE.Vector3(
          // Yanal kayma dar: etiketler ekran kenarından taşmasın
          (i % 2 === 0 ? -1 : 1) * 1.85,
          top - i * step,
          z * 0.55,
        );
      }),
    [radius, portrait],
  );
}

interface Props {
  stage: Stage;
  pointer: React.RefObject<PointerState>;
  device: DeviceProfile;
  onSelectWorld: (id: string) => void;
}

export function Scene({ stage, pointer, device, onSelectWorld }: Props) {
  const focused = useApp((s) => s.focused);
  const traveling = useApp((s) => s.traveling);
  const answerCount = useApp((s) => s.answers.length);

  const { tier, isMobile, particleScale, reducedMotion } = device;
  const size = useThree((s) => s.size);

  // Dikey (portre) ekran: portaller sütuna dizilir
  const portrait = size.width / size.height < 0.85;
  const radius = isMobile ? 7.4 : 9.4;
  const positions = usePortalPositions(radius, portrait);

  // Aşamaya göre görünürlük
  const inUniverse = stage === 'hub' || stage === 'travel';
  const showPortals = inUniverse;
  const showCore = stage !== 'loading';

  // Yumuşatılmış ortaya çıkış değeri
  const revealRef = useRef(0);
  const [reveal, setReveal] = useState(0);
  const coreIntensityRef = useRef(1);
  const [coreIntensity, setCoreIntensity] = useState(1);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);

    const target = showPortals ? 1 : 0;
    revealRef.current += (target - revealRef.current) * d * 2.4;
    if (Math.abs(revealRef.current - reveal) > 0.004) setReveal(revealRef.current);

    // Çekirdek yoğunluğu: geçiş anında parlar, soru odasında sakinleşir
    const ci =
      stage === 'breach' ? 2.2 : stage === 'questions' ? 0.7 : stage === 'finale' ? 1.3 : 1;
    coreIntensityRef.current += (ci - coreIntensityRef.current) * d * 2;
    if (Math.abs(coreIntensityRef.current - coreIntensity) > 0.01) {
      setCoreIntensity(coreIntensityRef.current);
    }
  });

  const focusIndex = focused ? WORLDS.findIndex((w) => w.id === focused) : -1;
  const travelTarget = traveling
    ? positions[WORLDS.findIndex((w) => w.id === traveling)] ?? null
    : null;

  // Parçacık sayıları — cihaz sınıfına göre ölçeklenir
  const starCount = Math.floor(3600 * particleScale);
  const dustCount = Math.floor(900 * particleScale);
  const burstCount = Math.floor(700 * particleScale);
  const nebulaLayers = tier === 'low' ? 2 : tier === 'mid' ? 3 : 4;

  return (
    <>
      <color attach="background" args={['#01030a']} />
      <fog attach="fog" args={['#01030a', 22, 130]} />

      <ambientLight intensity={0.12} color="#2a4a7a" />
      <directionalLight position={[8, 12, 6]} intensity={0.35} color="#7cc4ff" />
      <directionalLight position={[-10, -4, -8]} intensity={0.18} color="#1e4a8a" />

      <CameraRig
        stage={stage}
        pointer={pointer}
        travelTarget={travelTarget}
        isMobile={isMobile}
        reducedMotion={reducedMotion}
      />

      <Starfield count={starCount} reveal={stage === 'loading' ? 0.2 : 1} />
      <Nebula layers={nebulaLayers} />
      <CosmicDust count={dustCount} />

      {/* Dikey ekranda çekirdek geriye çekilir; portal sütununun
          arkasında bir ışık kaynağı gibi kalır. */}
      {showCore && (
        <group
          scale={portrait && inUniverse ? 0.62 : 0.82}
          position={portrait && inUniverse ? [0, 0, -16] : [0, 0, 0]}
        >
          <CoreObject intensity={coreIntensity} crystals={tier !== 'low'} quality={tier} />
        </group>
      )}

      <Burst active={stage === 'breach'} count={burstCount} />

      {/* Cevaplardan doğan yıldızlar */}
      {(stage === 'questions' || stage === 'finale' || stage === 'hub') && answerCount > 0 && (
        <MemoryFragments count={answerCount} spawnKey={answerCount} />
      )}

      {/* Bağlantı çizgileri — dikey modda çekirdek geride olduğu
          için çizgiler görsel karmaşa yaratıyor, gizlenir. */}
      {reveal > 0.01 && !portrait && (
        <ConnectionLines targets={positions} reveal={reveal} focusIndex={focusIndex} />
      )}

      {/* Portaller */}
      {reveal > 0.01 &&
        WORLDS.map((w, i) => (
          <Portal
            key={w.id}
            world={w}
            position={[positions[i].x, positions[i].y, positions[i].z]}
            focused={focused === w.id}
            dimmed={focused != null && focused !== w.id}
            reveal={reveal}
            onHover={(id) => stage === 'hub' && store.focus(id)}
            onSelect={onSelectWorld}
            showLabels={reveal > 0.55 && stage === 'hub'}
            quality={tier}
          />
        ))}

      <PostFx stage={stage} device={device} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Post-process efektleri                                            */
/* ------------------------------------------------------------------ */

function PostFx({ stage, device }: { stage: Stage; device: DeviceProfile }) {
  const caRef = useRef(new THREE.Vector2(0.0004, 0.0004));
  const bloomRef = useRef<BloomEffect>(null);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    // Geçiş anında kromatik sapma artar
    const target = stage === 'breach' ? 0.006 : stage === 'travel' ? 0.0022 : 0.0005;
    caRef.current.x += (target - caRef.current.x) * d * 3;
    caRef.current.y = caRef.current.x;

    if (bloomRef.current) {
      const bt = stage === 'breach' ? 1.9 : stage === 'gate' ? 1.15 : 0.95;
      bloomRef.current.intensity += (bt - bloomRef.current.intensity) * d * 2.5;
    }
  });

  if (!device.heavyFx) {
    // Düşük performanslı cihazlarda yalnızca bloom
    return (
      <EffectComposer enableNormalPass={false} multisampling={0}>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.22}
          luminanceSmoothing={0.5}
          kernelSize={KernelSize.MEDIUM}
          mipmapBlur
        />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer enableNormalPass={false} multisampling={device.tier === 'high' ? 2 : 0}>
      <Bloom
        ref={bloomRef}
        intensity={1.0}
        luminanceThreshold={0.18}
        luminanceSmoothing={0.62}
        kernelSize={device.tier === 'high' ? KernelSize.LARGE : KernelSize.MEDIUM}
        mipmapBlur
        resolutionScale={0.6}
      />
      <ChromaticAberration offset={caRef.current} />
      <Vignette offset={0.25} darkness={0.82} />
      <Noise premultiply blendFunction={BlendFunction.OVERLAY} opacity={0.055} />
    </EffectComposer>
  );
}
