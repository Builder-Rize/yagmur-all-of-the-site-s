import { useEffect, useState } from 'react';

export type Tier = 'low' | 'mid' | 'high';

export interface DeviceProfile {
  tier: Tier;
  isMobile: boolean;
  isTouch: boolean;
  /** Parçacık sayısı çarpanı */
  particleScale: number;
  /** Render çözünürlük tavanı */
  dpr: [number, number];
  /** Ağır post-process efektleri açık mı */
  heavyFx: boolean;
  reducedMotion: boolean;
}

function detect(): DeviceProfile {
  if (typeof window === 'undefined') {
    return {
      tier: 'high',
      isMobile: false,
      isTouch: false,
      particleScale: 1,
      dpr: [1, 2],
      heavyFx: true,
      reducedMotion: false,
    };
  }

  const w = window.innerWidth;
  const isTouch = window.matchMedia('(hover: none)').matches;
  const isMobile = w < 768 || isTouch;
  const cores = navigator.hardwareConcurrency ?? 4;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let tier: Tier = 'high';
  if (isMobile || cores <= 4 || mem <= 4) tier = 'mid';
  if (cores <= 2 || mem <= 2 || (isMobile && w < 400)) tier = 'low';

  const profile: Record<Tier, Pick<DeviceProfile, 'particleScale' | 'dpr' | 'heavyFx'>> = {
    high: { particleScale: 1, dpr: [1, 2], heavyFx: true },
    mid: { particleScale: 0.5, dpr: [1, 1.6], heavyFx: true },
    low: { particleScale: 0.26, dpr: [1, 1.25], heavyFx: false },
  };

  return { tier, isMobile, isTouch, reducedMotion, ...profile[tier] };
}

export function useDeviceTier(): DeviceProfile {
  const [profile, setProfile] = useState<DeviceProfile>(detect);

  useEffect(() => {
    let frame = 0;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setProfile(detect()));
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return profile;
}
