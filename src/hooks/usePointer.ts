import { useEffect, useRef } from 'react';

export interface PointerState {
  /** -1 … 1 arası yatay konum */
  x: number;
  /** -1 … 1 arası dikey konum */
  y: number;
  /** Yumuşatılmış değerler (parallax için) */
  sx: number;
  sy: number;
  active: boolean;
}

/**
 * Fare / dokunma konumunu normalize eder ve yumuşatır.
 * React state kullanmaz — her karede re-render tetiklemez.
 */
export function usePointer(enabled = true): React.RefObject<PointerState> {
  const ref = useRef<PointerState>({ x: 0, y: 0, sx: 0, sy: 0, active: false });

  useEffect(() => {
    if (!enabled) return;

    const set = (cx: number, cy: number) => {
      const s = ref.current;
      s.x = (cx / window.innerWidth) * 2 - 1;
      s.y = -((cy / window.innerHeight) * 2 - 1);
      s.active = true;
    };

    const onMove = (e: PointerEvent) => set(e.clientX, e.clientY);
    const onLeave = () => {
      ref.current.active = false;
      ref.current.x = 0;
      ref.current.y = 0;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);

    // Mobil: cihaz eğimi ile parallax
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      const s = ref.current;
      s.x = Math.max(-1, Math.min(1, e.gamma / 35));
      s.y = Math.max(-1, Math.min(1, (e.beta - 45) / 35));
      s.active = true;
    };
    window.addEventListener('deviceorientation', onTilt);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('deviceorientation', onTilt);
    };
  }, [enabled]);

  return ref;
}
