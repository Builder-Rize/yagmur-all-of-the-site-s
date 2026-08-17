import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aTint;

  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uReveal;

  varying vec3 vTint;
  varying float vTwinkle;

  void main() {
    vec3 pos = position;

    // Çok yavaş sürüklenme
    pos.x += sin(uTime * 0.04 + aPhase) * 1.2;
    pos.y += cos(uTime * 0.031 + aPhase * 1.7) * 0.9;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    // Işıldama
    float tw = 0.55 + 0.45 * sin(uTime * 1.1 + aPhase * 6.2831);
    vTwinkle = tw;
    vTint = aTint;

    float dist = -mv.z;
    gl_PointSize = aSize * uPixelRatio * (140.0 / max(dist, 1.0)) * mix(0.2, 1.0, uReveal);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vTint;
  varying float vTwinkle;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;

    // Yumuşak çekirdek + geniş hale
    float core = smoothstep(0.5, 0.0, d);
    float halo = exp(-d * 7.0);
    float a = (core * 0.55 + halo * 0.75) * vTwinkle;

    gl_FragColor = vec4(vTint * (0.7 + vTwinkle * 0.6), a);
    #include <colorspace_fragment>
  }
`;

interface Props {
  count: number;
  radius?: number;
  reveal?: number;
}

/** Derin uzay yıldız alanı — küresel kabuk içinde dağıtılmış noktalar. */
export function Starfield({ count, radius = 190, reveal = 1 }: Props) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Points>(null);
  const revealRef = useRef(0);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const tints = new Float32Array(count * 3);

    // Mavi-beyaz yıldız renk yelpazesi
    const palette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#d6ecff'),
      new THREE.Color('#9ec9ff'),
      new THREE.Color('#6ba9f5'),
      new THREE.Color('#4d9fff'),
      new THREE.Color('#e8f2ff'),
    ];

    for (let i = 0; i < count; i++) {
      // Kabuk içinde küresel dağılım (merkeze yakın seyrek)
      const u = Math.random();
      const v = Math.random();
      const theta = u * Math.PI * 2;
      const phi = Math.acos(2 * v - 1);
      const r = radius * (0.35 + 0.65 * Math.cbrt(Math.random()));

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi) * 0.62; // hafif yassı galaksi
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      // Çoğu küçük, azı parlak
      const roll = Math.random();
      sizes[i] = roll > 0.985 ? 4.2 + Math.random() * 2.4 : roll > 0.9 ? 2.1 + Math.random() : 0.75 + Math.random() * 0.9;

      phases[i] = Math.random();

      const c = palette[Math.floor(Math.random() * palette.length)];
      tints[i * 3] = c.r;
      tints[i * 3 + 1] = c.g;
      tints[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
    geo.setAttribute('aTint', new THREE.BufferAttribute(tints, 3));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), radius * 1.2);
    return geo;
  }, [count, radius]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uReveal: { value: 0 },
    }),
    [],
  );

  useFrame((_, dt) => {
    const clamped = Math.min(dt, 0.05);
    uniforms.uTime.value += clamped;
    revealRef.current += (reveal - revealRef.current) * clamped * 1.2;
    uniforms.uReveal.value = revealRef.current;
    if (groupRef.current) groupRef.current.rotation.y += clamped * 0.004;
  });

  return (
    <points ref={groupRef} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
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
