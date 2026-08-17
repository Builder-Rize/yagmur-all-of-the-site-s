import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { PointerState } from '../hooks/usePointer';
import type { Stage } from '../state/store';

/** Her aşama için kamera hedefi. */
interface Shot {
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
  fov: number;
  /** Yaklaşma hızı çarpanı */
  ease: number;
  /** Fare parallax gücü */
  parallax: number;
}

const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

const SHOTS: Record<string, Shot> = {
  // Şifre ekranı — nesneye yakın, dar açı, sinematik
  gate: { position: V(0, 0.2, 8.6), lookAt: V(0, 0, 0), fov: 42, ease: 0.9, parallax: 0.5 },
  // Şifre doğru — çekirdeğin içinden geçiş
  breach: { position: V(0, 0, -1.2), lookAt: V(0, 0, -30), fov: 96, ease: 2.6, parallax: 0.1 },
  // Ana evren — tüm portalleri rahatça gören geniş açı
  hub: { position: V(0, 2.2, 21), lookAt: V(0, 0, 0), fov: 50, ease: 1.1, parallax: 1 },
  // Soru odası — çekirdek alt kenara insin, metin önünde boş alan kalsın
  questions: { position: V(0, 5.6, 9.5), lookAt: V(0, 1.2, 0), fov: 46, ease: 1.0, parallax: 0.35 },
  // Final — çekirdek aşağı kaysın, metin temiz karanlıkta kalsın
  finale: { position: V(0, 7.5, 30), lookAt: V(0, 1.5, 0), fov: 52, ease: 0.5, parallax: 0.6 },
};

interface Props {
  stage: Stage;
  pointer: React.RefObject<PointerState>;
  /** Yolculuk hedefinin konumu (varsa) */
  travelTarget: THREE.Vector3 | null;
  isMobile: boolean;
  reducedMotion: boolean;
}

/**
 * Tüm kamera hareketini yöneten sistem.
 * Aşamalar arasında yumuşak geçiş, fare parallax'ı ve
 * seçilen dünyaya doğru sinematik yolculuk sağlar.
 */
export function CameraRig({ stage, pointer, travelTarget, isMobile, reducedMotion }: Props) {
  const { camera } = useThree();

  const currentPos = useRef(new THREE.Vector3(0, 0.2, 26));
  const currentLook = useRef(new THREE.Vector3(0, 0, 0));
  const tmpPos = useRef(new THREE.Vector3());
  const tmpLook = useRef(new THREE.Vector3());
  const parallax = useRef(new THREE.Vector2());
  const rollRef = useRef(0);

  useFrame((st, dt) => {
    const d = Math.min(dt, 0.05);
    const t = st.clock.elapsedTime;
    const cam = camera as THREE.PerspectiveCamera;

    // --- Hedef atışı seç ---
    let shot = SHOTS[stage] ?? SHOTS.hub;

    if (stage === 'travel' && travelTarget) {
      // Seçilen dünyaya doğru ilerle — portala kadar sokul
      const dir = travelTarget.clone().normalize();
      const approach = travelTarget.clone().add(dir.multiplyScalar(2.2));
      shot = {
        position: approach,
        lookAt: travelTarget,
        fov: 78,
        ease: 1.5,
        parallax: 0.15,
      };
    }

    // Dar/dikey ekranda portaller dikey bir sütuna dizilir; kamera
    // bu sütunu tam kadraja alacak şekilde geri çekilir.
    const posTarget = tmpPos.current.copy(shot.position);
    if (stage === 'hub') {
      const aspect = cam.aspect;
      if (aspect < 0.85) {
        // Dikey telefon
        posTarget.set(0, 0, 20.5);
      } else if (isMobile) {
        posTarget.multiplyScalar(1.18);
        posTarget.y = shot.position.y * 0.75;
      }
    } else if (isMobile && stage === 'finale') {
      posTarget.multiplyScalar(1.18);
    }

    // --- Yumuşak takip ---
    const k = 1 - Math.exp(-shot.ease * 1.9 * d);
    currentPos.current.lerp(posTarget, k);
    currentLook.current.lerp(tmpLook.current.copy(shot.lookAt), k);

    // --- Parallax ---
    const p = pointer.current;
    const strength = reducedMotion ? 0 : shot.parallax * (isMobile ? 0.6 : 1);
    parallax.current.x += (p.x * strength - parallax.current.x) * d * 2.2;
    parallax.current.y += (p.y * strength - parallax.current.y) * d * 2.2;

    // --- Sürekli nefes alma hareketi ---
    const breathX = reducedMotion ? 0 : Math.sin(t * 0.21) * 0.24 * shot.parallax;
    const breathY = reducedMotion ? 0 : Math.cos(t * 0.17) * 0.16 * shot.parallax;
    const breathZ = reducedMotion ? 0 : Math.sin(t * 0.13) * 0.3 * shot.parallax;

    cam.position.set(
      currentPos.current.x + parallax.current.x * 1.5 + breathX,
      currentPos.current.y + parallax.current.y * 1.1 + breathY,
      currentPos.current.z + breathZ,
    );

    // --- Bakış yönü ---
    cam.lookAt(
      currentLook.current.x + parallax.current.x * 0.35,
      currentLook.current.y + parallax.current.y * 0.25,
      currentLook.current.z,
    );

    // Hafif kamera yatışı — el kamerası hissi
    const rollTarget = reducedMotion ? 0 : parallax.current.x * -0.035 + Math.sin(t * 0.11) * 0.012;
    rollRef.current += (rollTarget - rollRef.current) * d * 2;
    cam.rotation.z += rollRef.current;

    // --- FOV geçişi ---
    const fovK = 1 - Math.exp(-shot.ease * 1.6 * d);
    cam.fov += (shot.fov - cam.fov) * fovK;
    cam.updateProjectionMatrix();
  });

  return null;
}
