import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = /* glsl */ `
  attribute float aProgress;
  attribute float aLine;

  uniform float uTime;
  uniform float uReveal;
  uniform float uFocus;
  uniform float uLineCount;

  varying float vAlpha;
  varying float vProgress;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;

    // Çizgi boyunca ilerleyen enerji darbesi
    float pulse = fract(aProgress - uTime * 0.16 + aLine * 0.21);
    float head = smoothstep(0.0, 0.05, pulse) * smoothstep(0.2, 0.05, pulse);

    // Uçlara doğru sönme
    float ends = smoothstep(0.0, 0.12, aProgress) * smoothstep(1.0, 0.82, aProgress);

    // Odaklanılan çizgi belirginleşir
    float focused = step(abs(aLine - uFocus), 0.5);
    float base = 0.055 + focused * 0.16;

    vAlpha = (base + head * (0.45 + focused * 0.6)) * ends * uReveal;
    vProgress = pulse;
  }
`;

const fragmentShader = /* glsl */ `
  varying float vAlpha;
  varying float vProgress;
  uniform vec3 uColor;
  uniform vec3 uAccent;

  void main() {
    vec3 col = mix(uColor, uAccent, smoothstep(0.15, 0.0, vProgress));
    gl_FragColor = vec4(col, vAlpha);
    #include <colorspace_fragment>
  }
`;

interface Props {
  /** Portal konumları */
  targets: THREE.Vector3[];
  reveal: number;
  /** Odaklanılan portalın indeksi (-1 = yok) */
  focusIndex: number;
}

/**
 * Çekirdek ile portaller arasında hafifçe kavis yapan,
 * içinde enerji darbeleri dolaşan ince çizgiler.
 */
export function ConnectionLines({ targets, reveal, focusIndex }: Props) {
  const focusRef = useRef(-1);

  const geometry = useMemo(() => {
    const SEG = 48;
    const positions: number[] = [];
    const progress: number[] = [];
    const lineIdx: number[] = [];

    targets.forEach((target, li) => {
      // Merkezden portala hafif kavisli yol
      const mid = target.clone().multiplyScalar(0.5);
      // Kavis yönü: hedefe dik bir vektör
      const perp = new THREE.Vector3(-target.z, target.y * 0.5 + 1.2, target.x)
        .normalize()
        .multiplyScalar(target.length() * 0.16);
      mid.add(perp);

      const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, 0, 0), mid, target);
      const pts = curve.getPoints(SEG);

      for (let i = 0; i < pts.length; i++) {
        positions.push(pts[i].x, pts[i].y, pts[i].z);
        progress.push(i / SEG);
        lineIdx.push(li);
      }
    });

    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    g.setAttribute('aProgress', new THREE.Float32BufferAttribute(progress, 1));
    g.setAttribute('aLine', new THREE.Float32BufferAttribute(lineIdx, 1));

    // Her çizgiyi ayrı segment olarak çiz (LineSegments için indeks)
    const indices: number[] = [];
    const perLine = SEG + 1;
    targets.forEach((_, li) => {
      const base = li * perLine;
      for (let i = 0; i < SEG; i++) {
        indices.push(base + i, base + i + 1);
      }
    });
    g.setIndex(indices);

    return g;
  }, [targets]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uReveal: { value: 0 },
      uFocus: { value: -1 },
      uLineCount: { value: targets.length },
      uColor: { value: new THREE.Color('#2a6fc4') },
      uAccent: { value: new THREE.Color('#bfe0ff') },
    }),
    [targets.length],
  );

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    uniforms.uTime.value += d;
    uniforms.uReveal.value += (reveal - uniforms.uReveal.value) * d * 2;
    focusRef.current += (focusIndex - focusRef.current) * d * 8;
    uniforms.uFocus.value = focusIndex >= 0 ? focusIndex : -5;
  });

  return (
    <lineSegments geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}
