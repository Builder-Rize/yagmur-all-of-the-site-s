import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { WorldConfig } from '../../config/site';
import { PORTAL_ICONS } from './iconMap';
import { blip } from '../../audio/ambient';

/* --- Portal çerçevesi shader'ı: dönen enerji halkası --- */

const frameVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const frameFragment = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColor;
  uniform vec3 uAccent;
  uniform float uHover;
  uniform float uReveal;

  void main() {
    // Halka boyunca dolaşan parlak yay
    float a = vUv.x;
    float sweep = fract(a - uTime * 0.12);
    float arc = smoothstep(0.0, 0.16, sweep) * smoothstep(0.34, 0.16, sweep);

    // İkinci, ters yönde ilerleyen yay
    float sweep2 = fract(a + uTime * 0.07 + 0.5);
    float arc2 = smoothstep(0.0, 0.1, sweep2) * smoothstep(0.22, 0.1, sweep2);

    // Kesitin kenarlarına doğru sönme
    float edge = smoothstep(0.0, 0.4, vUv.y) * smoothstep(1.0, 0.6, vUv.y);

    float base = 0.16 + uHover * 0.3;
    float glow = base + arc * (0.55 + uHover * 0.9) + arc2 * (0.25 + uHover * 0.4);

    vec3 col = mix(uColor, uAccent, arc * 0.8 + uHover * 0.3);
    float alpha = glow * edge * uReveal;

    gl_FragColor = vec4(col * (1.0 + arc * 1.4), alpha);
    #include <colorspace_fragment>
  }
`;

/* --- Portal içi enerji zarı --- */

const membraneFragment = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uHover;
  uniform float uReveal;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1,0)), f.x),
               mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y);
  }

  void main() {
    vec2 c = vUv - 0.5;
    float d = length(c) * 2.0;
    if (d > 1.0) discard;

    // İçe doğru çekilen girdap
    float ang = atan(c.y, c.x);
    float swirl = noise(vec2(ang * 1.6 + uTime * 0.18, d * 3.0 - uTime * 0.35));
    float ripple = sin(d * 14.0 - uTime * 1.4) * 0.5 + 0.5;

    float mask = smoothstep(1.0, 0.25, d);
    float density = (swirl * 0.6 + ripple * 0.22) * mask;

    float alpha = density * (0.1 + uHover * 0.26) * uReveal;
    gl_FragColor = vec4(uColor * (0.8 + swirl * 0.9), alpha);
    #include <colorspace_fragment>
  }
`;

interface Props {
  world: WorldConfig;
  position: [number, number, number];
  focused: boolean;
  dimmed: boolean;
  reveal: number;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  showLabels: boolean;
  quality: 'low' | 'mid' | 'high';
}

export function Portal({
  world,
  position,
  focused,
  dimmed,
  reveal,
  onHover,
  onSelect,
  showLabels,
  quality,
}: Props) {
  const group = useRef<THREE.Group>(null);
  const content = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Points>(null);
  const [hovered, setHovered] = useState(false);
  const hoverRef = useRef(0);
  const basePos = useMemo(() => new THREE.Vector3(...position), [position]);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);

  const Icon = PORTAL_ICONS[world.id] ?? PORTAL_ICONS.stars;

  const frameUniforms = useMemo(
    () => ({
      uTime: { value: Math.random() * 40 },
      uColor: { value: new THREE.Color(world.color) },
      uAccent: { value: new THREE.Color(world.accent) },
      uHover: { value: 0 },
      uReveal: { value: 0 },
    }),
    [world.color, world.accent],
  );

  const membraneUniforms = useMemo(
    () => ({
      uTime: { value: Math.random() * 40 },
      uColor: { value: new THREE.Color(world.color) },
      uHover: { value: 0 },
      uReveal: { value: 0 },
    }),
    [world.color],
  );

  // Portalın çevresinde dolanan küçük parçacıklar
  const orbitGeo = useMemo(() => {
    const n = quality === 'low' ? 18 : quality === 'mid' ? 34 : 56;
    const pos = new Float32Array(n * 3);
    const seed = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 0.75 + Math.random() * 0.55;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.7;
      pos[i * 3 + 2] = Math.sin(a) * r;
      seed[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    return g;
  }, [quality]);

  const setHover = (v: boolean) => {
    if (v === hovered) return;
    setHovered(v);
    onHover(v ? world.id : null);
    if (v) {
      blip(520 + Math.random() * 120, 0.1, 0.028);
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = '';
    }
  };

  useFrame((st, dt) => {
    const d = Math.min(dt, 0.05);
    const t = st.clock.elapsedTime;

    // Hover değerini yumuşat
    const target = hovered || focused ? 1 : 0;
    hoverRef.current += (target - hoverRef.current) * d * 5;
    const h = hoverRef.current;

    frameUniforms.uTime.value = t;
    frameUniforms.uHover.value = h;
    frameUniforms.uReveal.value = reveal;
    membraneUniforms.uTime.value = t;
    membraneUniforms.uHover.value = h;
    membraneUniforms.uReveal.value = reveal;

    if (group.current) {
      // Süzülme + hover'da kameraya doğru yaklaşma
      const float = Math.sin(t * 0.55 + phase) * 0.18;
      const forward = basePos.clone().normalize().multiplyScalar(-h * 0.9);

      group.current.position.set(
        basePos.x + forward.x,
        basePos.y + float + h * 0.12,
        basePos.z + forward.z,
      );

      // Portaller kameraya dönük durmalı — aksi halde halkalar
      // kenardan görünüp ince elips gibi okunur.
      group.current.quaternion.copy(st.camera.quaternion);
      // Hafif salınım: tamamen düz durmasın
      group.current.rotateZ(Math.sin(t * 0.35 + phase) * 0.05);
      group.current.rotateX(Math.sin(t * 0.27 + phase * 1.3) * 0.04);

      const s = (1.25 + h * 0.22) * reveal * (dimmed ? 0.92 : 1);
      group.current.scale.setScalar(s);
    }

    if (content.current) {
      content.current.rotation.y += d * 0.1;
    }

    if (orbitRef.current) {
      orbitRef.current.rotation.y += d * (0.14 + h * 0.5);
      orbitRef.current.rotation.x = Math.sin(t * 0.25 + phase) * 0.2;
      const m = orbitRef.current.material as THREE.PointsMaterial;
      m.opacity = (0.18 + h * 0.55) * reveal;
      m.size = 0.016 + h * 0.014;
    }
  });

  const opacityMul = dimmed ? 0.35 : 1;

  return (
    <group
      ref={group}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHover(true);
      }}
      onPointerOut={() => setHover(false)}
      onClick={(e) => {
        e.stopPropagation();
        blip(760, 0.22, 0.05);
        onSelect(world.id);
      }}
    >
      {/* Tıklama alanı — görünmez, cömert boyutlu */}
      <mesh visible={false}>
        <circleGeometry args={[1.05, 16]} />
      </mesh>

      {/* Enerji zarı */}
      <mesh>
        <circleGeometry args={[0.92, quality === 'low' ? 32 : 64]} />
        <shaderMaterial
          vertexShader={frameVertex}
          fragmentShader={membraneFragment}
          uniforms={membraneUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Ana halka */}
      <mesh>
        <torusGeometry args={[0.95, 0.028, 8, quality === 'low' ? 64 : 128]} />
        <meshStandardMaterial
          color={world.color}
          emissive={world.accent}
          emissiveIntensity={(0.6 + hoverRef.current * 1.8) * opacityMul}
          roughness={0.15}
          metalness={0.8}
          transparent
          opacity={reveal * opacityMul}
        />
      </mesh>

      {/* Enerji akışı katmanı */}
      <mesh>
        <torusGeometry args={[0.95, 0.075, 8, quality === 'low' ? 48 : 96]} />
        <shaderMaterial
          vertexShader={frameVertex}
          fragmentShader={frameFragment}
          uniforms={frameUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* İnce dış halka */}
      <mesh>
        <torusGeometry args={[1.06, 0.005, 6, 72]} />
        <meshBasicMaterial
          color={world.accent}
          transparent
          opacity={(0.12 + hoverRef.current * 0.4) * reveal * opacityMul}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Temaya özel 3B nesne */}
      <group ref={content}>
        <Icon color={world.color} accent={world.accent} hover={hoverRef.current} />
      </group>

      {/* Yörünge parçacıkları */}
      <points ref={orbitRef} geometry={orbitGeo}>
        <pointsMaterial
          color={world.accent}
          size={0.016}
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
          sizeAttenuation
        />
      </points>

      <pointLight
        color={world.accent}
        intensity={(0.8 + hoverRef.current * 3.2) * reveal}
        distance={6}
        decay={2}
      />

      {/* Etiket */}
      {showLabels && (
        <Html
          center
          position={[0, -1.34, 0]}
          zIndexRange={[10, 0]}
          // distanceFactor kullanılmıyor: etiketler derinlikten
          // bağımsız olarak aynı boyutta kalmalı
          style={{ pointerEvents: 'none' }}
          occlude={false}
        >
          <div className={`portal-label ${hovered || focused ? 'is-active' : ''}`}>
            <span className="portal-label-index">{world.index}</span>
            <span className="portal-label-title">{world.title}</span>
            <span className="portal-label-desc">{world.description}</span>
          </div>
        </Html>
      )}
    </group>
  );
}
