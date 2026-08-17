import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = /* glsl */ `
  attribute vec3 aDir;
  attribute float aSpeed;
  attribute float aSize;

  uniform float uTime;
  uniform float uPixelRatio;

  varying float vAlpha;

  void main() {
    // Dışa doğru hızla açılıp yavaşlayan patlama
    float t = clamp(uTime, 0.0, 1.0);
    float ease = 1.0 - pow(1.0 - t, 2.6);
    vec3 pos = position + aDir * ease * aSpeed * 26.0;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    // Hızlı parlayıp sönme
    vAlpha = smoothstep(0.0, 0.06, t) * (1.0 - smoothstep(0.35, 1.0, t));

    float dist = -mv.z;
    gl_PointSize = aSize * uPixelRatio * (150.0 / max(dist, 1.0)) * (1.0 - t * 0.5);
  }
`;

const fragmentShader = /* glsl */ `
  varying float vAlpha;
  uniform vec3 uColor;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float core = smoothstep(0.3, 0.0, d);
    float halo = exp(-d * 6.0);
    float a = (core * 0.8 + halo * 0.7) * vAlpha;
    gl_FragColor = vec4(uColor * (1.0 + core * 1.5), a);
    #include <colorspace_fragment>
  }
`;

interface Props {
  /** true olduğunda patlama başlar */
  active: boolean;
  count?: number;
  color?: string;
}

/** Şifre doğrulandığında çekirdekten yayılan parçacık patlaması. */
export function Burst({ active, count = 600, color = '#bfe0ff' }: Props) {
  const points = useRef<THREE.Points>(null);
  const timeRef = useRef(0);
  const wasActive = useRef(false);

  const geometry = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const dir = new Float32Array(count * 3);
    const speed = new Float32Array(count);
    const size = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Küresel yönler
      const u = Math.random();
      const v = Math.random();
      const theta = u * Math.PI * 2;
      const phi = Math.acos(2 * v - 1);
      const dx = Math.sin(phi) * Math.cos(theta);
      const dy = Math.cos(phi);
      const dz = Math.sin(phi) * Math.sin(theta);

      const r = 0.6 + Math.random() * 0.5;
      pos[i * 3] = dx * r;
      pos[i * 3 + 1] = dy * r;
      pos[i * 3 + 2] = dz * r;

      dir[i * 3] = dx;
      dir[i * 3 + 1] = dy;
      dir[i * 3 + 2] = dz;

      speed[i] = 0.35 + Math.random() * 0.95;
      size[i] = 1.4 + Math.random() * 3.4;
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aDir', new THREE.BufferAttribute(dir, 3));
    g.setAttribute('aSpeed', new THREE.BufferAttribute(speed, 1));
    g.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 40);
    return g;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 1 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uColor: { value: new THREE.Color(color) },
    }),
    [color],
  );

  useFrame((_, dt) => {
    if (active && !wasActive.current) {
      timeRef.current = 0;
      wasActive.current = true;
    }
    if (!active) wasActive.current = false;

    if (timeRef.current < 1.2) {
      timeRef.current += Math.min(dt, 0.05) * 0.75;
      uniforms.uTime.value = timeRef.current;
    }
  });

  return (
    <points ref={points} geometry={geometry} frustumCulled={false} visible={active}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
