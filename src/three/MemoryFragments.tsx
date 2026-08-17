import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Verilen her cevap için evrene eklenen küçük parlayan yıldız.
 * Cevap sayısı arttıkça merkez çekirdeğin çevresinde yeni
 * yörüngeler oluşur.
 */

const MAX = 64;

interface Props {
  /** Kaç adet parça görünsün */
  count: number;
  /** Yeni parça eklendiğinde tetiklenen sayaç */
  spawnKey: number;
}

export function MemoryFragments({ count, spawnKey }: Props) {
  const points = useRef<THREE.Points>(null);
  const born = useRef<Float32Array>(new Float32Array(MAX));
  const clockRef = useRef(0);

  const { geometry, uniforms } = useMemo(() => {
    const pos = new Float32Array(MAX * 3);
    const seed = new Float32Array(MAX);
    const radius = new Float32Array(MAX);
    const bornAt = new Float32Array(MAX);
    const index = new Float32Array(MAX);

    for (let i = 0; i < MAX; i++) {
      // Fibonacci dağılımı — düzenli ama mekanik olmayan yerleşim
      const t = (i + 0.5) / MAX;
      const phi = Math.acos(1 - 2 * t);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 2.6 + (i % 4) * 0.55;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi) * 0.6;
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      seed[i] = Math.random();
      radius[i] = r;
      bornAt[i] = -999;
      index[i] = i;
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    g.setAttribute('aRadius', new THREE.BufferAttribute(radius, 1));
    g.setAttribute('aBorn', new THREE.BufferAttribute(bornAt, 1));
    g.setAttribute('aIndex', new THREE.BufferAttribute(index, 1));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 8);
    born.current = bornAt;

    return {
      geometry: g,
      uniforms: {
        uTime: { value: 0 },
        uCount: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uColor: { value: new THREE.Color('#d6ecff') },
        uAccent: { value: new THREE.Color('#4d9fff') },
      },
    };
  }, []);

  // Yeni cevap geldiğinde doğum zamanını damgala
  useEffect(() => {
    const idx = count - 1;
    if (idx < 0 || idx >= MAX) return;
    born.current[idx] = clockRef.current;
    const attr = geometry.getAttribute('aBorn') as THREE.BufferAttribute;
    attr.needsUpdate = true;
    uniforms.uCount.value = count;
  }, [count, spawnKey, geometry, uniforms]);

  useEffect(() => {
    uniforms.uCount.value = count;
  }, [count, uniforms]);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    clockRef.current += d;
    uniforms.uTime.value = clockRef.current;
    if (points.current) points.current.rotation.y += d * 0.045;
  });

  const vertexShader = /* glsl */ `
    attribute float aSeed;
    attribute float aRadius;
    attribute float aBorn;
    attribute float aIndex;

    uniform float uTime;
    uniform float uCount;
    uniform float uPixelRatio;

    varying float vAlpha;
    varying float vBirth;

    void main() {
      // Yalnızca cevaplanmış soru sayısı kadar parça görünür
      float visible = step(aIndex, uCount - 0.5);

      // Doğum animasyonu: 0 → 1 (1.6 saniye)
      float age = uTime - aBorn;
      float birth = clamp(age / 1.6, 0.0, 1.0);
      vBirth = birth;

      vec3 pos = position;

      // Merkezden dışa doğru fırlayarak yerine oturur
      float ease = 1.0 - pow(1.0 - birth, 3.0);
      pos *= mix(0.05, 1.0, ease);

      // Yörüngede yavaşça dolaş
      float orbit = uTime * (0.06 + aSeed * 0.09);
      float c = cos(orbit), s = sin(orbit);
      pos.xz = mat2(c, -s, s, c) * pos.xz;

      // Dikey salınım
      pos.y += sin(uTime * 0.4 + aSeed * 6.28) * 0.28;

      vec4 mv = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mv;

      float twinkle = 0.6 + 0.4 * sin(uTime * 1.4 + aSeed * 6.28);
      vAlpha = visible * twinkle * birth;

      float dist = -mv.z;
      // Doğum anında büyük, sonra normale döner
      float pop = 1.0 + (1.0 - birth) * 3.5;
      gl_PointSize = (3.2 + aSeed * 2.4) * pop * uPixelRatio * (110.0 / max(dist, 1.0)) * visible;
    }
  `;

  const fragmentShader = /* glsl */ `
    varying float vAlpha;
    varying float vBirth;
    uniform vec3 uColor;
    uniform vec3 uAccent;

    void main() {
      vec2 uv = gl_PointCoord - 0.5;
      float d = length(uv);
      if (d > 0.5) discard;

      float core = smoothstep(0.22, 0.0, d);
      float halo = exp(-d * 5.5);

      // Doğum anında beyaza yakın, sonra maviye yerleşir
      vec3 col = mix(vec3(1.0), mix(uAccent, uColor, 0.6), smoothstep(0.0, 0.7, vBirth));

      float a = (core * 0.9 + halo * 0.6) * vAlpha;
      gl_FragColor = vec4(col * (1.0 + core), a);
      #include <colorspace_fragment>
    }
  `;

  return (
    <points ref={points} geometry={geometry} frustumCulled={false}>
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
