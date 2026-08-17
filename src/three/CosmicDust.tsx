import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aSpeed;
  attribute float aPhase;

  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSpread;

  varying float vFade;

  void main() {
    vec3 pos = position;

    // Yavaşça yukarı süzülüp başa dönen toz
    float travel = mod(pos.y + uTime * aSpeed * 0.35, uSpread) - uSpread * 0.5;
    pos.y = travel;

    // Yanal salınım
    pos.x += sin(uTime * 0.25 * aSpeed + aPhase) * 0.9;
    pos.z += cos(uTime * 0.2 * aSpeed + aPhase * 1.4) * 0.9;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    float dist = -mv.z;
    // Çok yakın ve çok uzak tozu sönümle
    vFade = smoothstep(1.0, 5.0, dist) * smoothstep(70.0, 30.0, dist);
    vFade *= 0.5 + 0.5 * sin(uTime * 0.8 + aPhase * 6.28);

    gl_PointSize = aSize * uPixelRatio * (90.0 / max(dist, 1.0));
  }
`;

const fragmentShader = /* glsl */ `
  varying float vFade;
  uniform vec3 uColor;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float a = exp(-d * 6.0) * vFade * 0.6;
    gl_FragColor = vec4(uColor, a);
    #include <colorspace_fragment>
  }
`;

interface Props {
  count: number;
  spread?: number;
  color?: string;
}

/** Kameranın etrafında yavaşça süzülen kozmik toz. */
export function CosmicDust({ count, spread = 46, color = '#9ec9ff' }: Props) {
  const points = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Kamera çevresinde silindirik dağılım
      const a = Math.random() * Math.PI * 2;
      const r = 3 + Math.random() * 24;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 2] = Math.sin(a) * r;

      sizes[i] = 0.5 + Math.random() * 1.6;
      speeds[i] = 0.4 + Math.random() * 1.4;
      phases[i] = Math.random();
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    g.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
    g.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), spread);
    return g;
  }, [count, spread]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uSpread: { value: spread },
      uColor: { value: new THREE.Color(color) },
    }),
    [spread, color],
  );

  useFrame((_, dt) => {
    uniforms.uTime.value += Math.min(dt, 0.05);
    if (points.current) points.current.rotation.y += Math.min(dt, 0.05) * 0.012;
  });

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
