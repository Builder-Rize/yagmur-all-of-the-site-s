import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/*  İç çekirdek — enerji akışı olan küre                              */
/* ------------------------------------------------------------------ */

const coreVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewDir;

  uniform float uTime;
  uniform float uPulse;

  // Yüzeyi hafifçe dalgalandır
  float wave(vec3 p) {
    return sin(p.x * 3.0 + uTime * 0.7)
         * sin(p.y * 2.6 - uTime * 0.5)
         * sin(p.z * 3.4 + uTime * 0.6);
  }

  void main() {
    vec3 pos = position;
    float w = wave(normalize(position) * 1.6);
    pos += normal * w * 0.035 * (0.6 + uPulse * 0.8);

    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    vPosition = pos;
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const coreFragment = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewDir;

  uniform float uTime;
  uniform float uPulse;
  uniform vec3 uInner;
  uniform vec3 uOuter;

  // Damarlanma deseni için basit 3B gürültü
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + vec3(0.71, 0.113, 0.419));
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
          mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
          mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
      f.z
    );
  }

  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.03;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec3 n = normalize(vNormal);
    float fres = pow(1.0 - clamp(dot(n, normalize(vViewDir)), 0.0, 1.0), 2.4);

    // Yavaşça akan enerji damarları
    vec3 q = vPosition * 2.2 + vec3(0.0, uTime * 0.12, uTime * 0.07);
    float veins = fbm(q);
    veins = smoothstep(0.42, 0.72, veins);

    // İçten dışa doğru renk geçişi
    vec3 col = mix(uInner, uOuter, fres);
    col += uOuter * veins * (0.5 + uPulse * 0.9);
    col += vec3(0.55, 0.78, 1.0) * fres * (0.7 + uPulse * 0.5);

    // Nabız
    col *= 0.75 + uPulse * 0.55;

    float alpha = clamp(0.42 + fres * 0.7 + veins * 0.35, 0.0, 1.0);
    gl_FragColor = vec4(col, alpha);
    #include <colorspace_fragment>
  }
`;

/* ------------------------------------------------------------------ */
/*  Dış hale — arkadan aydınlatılmış atmosfer kabuğu                  */
/* ------------------------------------------------------------------ */

const haloVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const haloFragment = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  uniform vec3 uColor;
  uniform float uPower;
  uniform float uStrength;

  void main() {
    float fres = pow(1.0 - clamp(dot(normalize(vNormal), normalize(vView)), 0.0, 1.0), uPower);
    float a = fres * uStrength;
    gl_FragColor = vec4(uColor * a, a);
    #include <colorspace_fragment>
  }
`;

/* ------------------------------------------------------------------ */

interface Props {
  /** 0–1 arası genel yoğunluk (giriş animasyonu için) */
  intensity?: number;
  /** Kristal kabuk gösterilsin mi (düşük performanslı cihazlarda kapatılır) */
  crystals?: boolean;
  quality?: 'low' | 'mid' | 'high';
}

/**
 * Merkezdeki çekirdek: içte enerji küresi, dışında yavaşça
 * dönen kristal kabuk ve iki katmanlı hale.
 */
export function CoreObject({ intensity = 1, crystals = true, quality = 'high' }: Props) {
  const group = useRef<THREE.Group>(null);
  const crystalRing = useRef<THREE.Group>(null);
  const innerShell = useRef<THREE.Group>(null);
  const pulseRef = useRef(0);

  const segments = quality === 'low' ? 48 : quality === 'mid' ? 80 : 128;

  const coreUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPulse: { value: 0.5 },
      uInner: { value: new THREE.Color('#0b1f45') },
      uOuter: { value: new THREE.Color('#4d9fff') },
    }),
    [],
  );

  const haloUniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color('#4d9fff') },
      uPower: { value: 3.0 },
      uStrength: { value: 0.55 },
    }),
    [],
  );

  const haloUniformsOuter = useMemo(
    () => ({
      uColor: { value: new THREE.Color('#7cc4ff') },
      // Yüksek üs: parıltı yalnızca kenarda toplanır, düz disk oluşmaz
      uPower: { value: 4.5 },
      uStrength: { value: 0.3 },
    }),
    [],
  );

  // Çekirdeği çevreleyen kristal parçalar
  const shards = useMemo(() => {
    const count = quality === 'low' ? 7 : quality === 'mid' ? 11 : 16;
    return Array.from({ length: count }, (_, i) => {
      // Fibonacci küresi ile eşit dağılım
      const t = (i + 0.5) / count;
      const phi = Math.acos(1 - 2 * t);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 1.62 + Math.random() * 0.32;
      return {
        position: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi) * 0.75,
          r * Math.sin(phi) * Math.sin(theta),
        ] as [number, number, number],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [
          number,
          number,
          number,
        ],
        scale: 0.1 + Math.random() * 0.19,
        speed: 0.25 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
      };
    });
  }, [quality]);

  useFrame((st, dt) => {
    const d = Math.min(dt, 0.05);
    const t = st.clock.elapsedTime;

    coreUniforms.uTime.value = t;

    // İki katmanlı nabız — kalp atışına benzer
    const beat = Math.sin(t * 0.9) * 0.5 + 0.5;
    const sub = Math.sin(t * 2.3 + 1.1) * 0.5 + 0.5;
    pulseRef.current = (beat * 0.72 + sub * 0.28) * intensity;
    coreUniforms.uPulse.value = pulseRef.current;

    haloUniforms.uStrength.value = (0.42 + pulseRef.current * 0.3) * intensity;
    haloUniformsOuter.uStrength.value = (0.16 + pulseRef.current * 0.16) * intensity;

    if (group.current) {
      group.current.rotation.y += d * 0.055;
      const s = 0.97 + pulseRef.current * 0.045;
      group.current.scale.setScalar(s * intensity);
    }

    if (crystalRing.current) {
      crystalRing.current.rotation.y -= d * 0.09;
      crystalRing.current.rotation.x = Math.sin(t * 0.13) * 0.14;
      crystalRing.current.children.forEach((child, i) => {
        const cfg = shards[i];
        if (!cfg) return;
        child.rotation.x += d * cfg.speed * 0.4;
        child.rotation.z += d * cfg.speed * 0.3;
        const bob = Math.sin(t * cfg.speed + cfg.phase) * 0.09;
        child.position.setY(cfg.position[1] + bob);
      });
    }

    if (innerShell.current) {
      innerShell.current.rotation.y -= d * 0.16;
      innerShell.current.rotation.z += d * 0.05;
    }
  });

  return (
    <group ref={group}>
      {/* Çekirdek küre */}
      <mesh>
        <icosahedronGeometry args={[1, quality === 'low' ? 4 : 6]} />
        <shaderMaterial
          vertexShader={coreVertex}
          fragmentShader={coreFragment}
          uniforms={coreUniforms}
          transparent
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Tel kafes iç kabuk */}
      <group ref={innerShell}>
        <mesh scale={1.18}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial
            color="#7cc4ff"
            wireframe
            transparent
            opacity={0.14 * intensity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* İç hale */}
      <mesh scale={1.42}>
        <sphereGeometry args={[1, segments / 2, segments / 2]} />
        <shaderMaterial
          vertexShader={haloVertex}
          fragmentShader={haloFragment}
          uniforms={haloUniforms}
          transparent
          side={THREE.BackSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Dış atmosfer — ince, geniş bir parıltı */}
      <mesh scale={1.95}>
        <sphereGeometry args={[1, segments / 3, segments / 3]} />
        <shaderMaterial
          vertexShader={haloVertex}
          fragmentShader={haloFragment}
          uniforms={haloUniformsOuter}
          transparent
          side={THREE.BackSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Kristal kabuk */}
      {crystals && (
        <group ref={crystalRing}>
          {shards.map((s, i) => (
            <mesh
              key={i}
              position={s.position}
              rotation={s.rotation}
              // Uzun eksenli kristal — küpe benzemesin
              scale={[s.scale * 0.55, s.scale * 1.7, s.scale * 0.55]}
            >
              <octahedronGeometry args={[1, 0]} />
              <meshPhysicalMaterial
                color="#5aa8ff"
                emissive="#7cc4ff"
                emissiveIntensity={1.5 * intensity}
                metalness={0.1}
                roughness={0.14}
                clearcoat={1}
                clearcoatRoughness={0.06}
                transparent
                opacity={0.7}
                flatShading
              />
            </mesh>
          ))}
        </group>
      )}

      {/* Işık kaynağı — çevredeki nesneleri aydınlatır */}
      <pointLight color="#4d9fff" intensity={14 * intensity} distance={38} decay={2} />
      <pointLight color="#d6ecff" intensity={5 * intensity} distance={14} decay={2} />
    </group>
  );
}
