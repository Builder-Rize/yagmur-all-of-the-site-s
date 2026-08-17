import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/**
 * Katmanlı fBm sisi. Gerçek hacimsel render değil, ama
 * additive katmanlar üst üste bindiğinde derinlik hissi verir.
 */
const fragmentShader = /* glsl */ `
  varying vec2 vUv;

  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uIntensity;
  uniform float uSeed;
  uniform float uScale;

  // Basit hash & value noise
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;
    vec2 i = floor(p + (p.x + p.y) * K1);
    vec2 a = p - i + (i.x + i.y) * K2;
    float m = step(a.y, a.x);
    vec2 o = vec2(m, 1.0 - m);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0 * K2;
    vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
    vec3 n = h * h * h * h * vec3(
      dot(a, hash2(i)),
      dot(b, hash2(i + o)),
      dot(c, hash2(i + 1.0))
    );
    return dot(n, vec3(70.0));
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 5; i++) {
      v += amp * noise(p);
      p = rot * p * 2.02;
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = (vUv - 0.5) * uScale;
    float t = uTime * 0.02 + uSeed;

    // Domain warping — sisi akışkan gösterir
    vec2 q = vec2(fbm(uv + vec2(0.0, t)), fbm(uv + vec2(5.2, 1.3 - t * 0.7)));
    vec2 r = vec2(
      fbm(uv + 4.0 * q + vec2(1.7, 9.2) + t * 0.3),
      fbm(uv + 4.0 * q + vec2(8.3, 2.8) - t * 0.25)
    );
    float f = fbm(uv + 4.0 * r);

    // Yumuşak, kenarlara doğru sönen maske
    float d = length(vUv - 0.5) * 2.0;
    float mask = smoothstep(1.0, 0.15, d);

    float density = smoothstep(0.05, 0.85, f * 0.5 + 0.5);
    vec3 col = mix(uColorA, uColorB, clamp(length(r) * 0.9, 0.0, 1.0));

    float alpha = density * mask * uIntensity;
    gl_FragColor = vec4(col * alpha, alpha);
    #include <colorspace_fragment>
  }
`;

interface LayerProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  size: number;
  colorA: string;
  colorB: string;
  intensity: number;
  seed: number;
  scale?: number;
  drift?: number;
}

function NebulaLayer({
  position,
  rotation = [0, 0, 0],
  size,
  colorA,
  colorB,
  intensity,
  seed,
  scale = 2.4,
  drift = 0.01,
}: LayerProps) {
  const mesh = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: seed * 10 },
      uColorA: { value: new THREE.Color(colorA) },
      uColorB: { value: new THREE.Color(colorB) },
      uIntensity: { value: intensity },
      uSeed: { value: seed },
      uScale: { value: scale },
    }),
    [colorA, colorB, intensity, seed, scale],
  );

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    uniforms.uTime.value += d;
    if (mesh.current) mesh.current.rotation.z += d * drift;
  });

  return (
    <mesh ref={mesh} position={position} rotation={rotation}>
      <planeGeometry args={[size, size]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        depthTest={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/** Sahnenin arka planındaki bulutsu sis katmanları. */
export function Nebula({ layers = 4 }: { layers?: number }) {
  const configs = useMemo<LayerProps[]>(
    () => [
      {
        position: [-30, 10, -95],
        rotation: [0, 0.2, 0.4],
        size: 190,
        colorA: '#0a2148',
        colorB: '#1e5aa8',
        intensity: 0.3,
        seed: 1.3,
        scale: 2.1,
        drift: 0.008,
      },
      {
        position: [38, -16, -78],
        rotation: [0, -0.25, -0.6],
        size: 150,
        colorA: '#123a72',
        colorB: '#4d9fff',
        intensity: 0.22,
        seed: 4.7,
        scale: 2.8,
        drift: -0.011,
      },
      {
        position: [0, 26, -120],
        rotation: [0, 0, 1.1],
        size: 240,
        colorA: '#071a3a',
        colorB: '#2a6fc4',
        intensity: 0.26,
        seed: 8.1,
        scale: 1.7,
        drift: 0.005,
      },
      {
        position: [-12, -30, -55],
        rotation: [0.3, 0.1, -0.2],
        size: 120,
        colorA: '#0d2b57',
        colorB: '#5fb2ff',
        intensity: 0.16,
        seed: 12.4,
        scale: 3.2,
        drift: 0.014,
      },
    ],
    [],
  );

  return (
    <group>
      {configs.slice(0, layers).map((c, i) => (
        <NebulaLayer key={i} {...c} />
      ))}
    </group>
  );
}
