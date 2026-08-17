import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Her dünyanın kimliğini yansıtan, portalın içinde dönen
 * küçük 3B nesneler. Hepsi ~0.55 birim yarıçapa sığar.
 */

export interface IconProps {
  color: string;
  accent: string;
  /** 0–1 hover yoğunluğu */
  hover: number;
}

/* -------------------------------------------------------------- */
/*  01 — YILDIZLAR: yörüngedeki takımyıldız                        */
/* -------------------------------------------------------------- */

export function StarsIcon({ color, accent, hover }: IconProps) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);

  const stars = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => {
        const a = (i / 9) * Math.PI * 2;
        const r = 0.3 + (i % 3) * 0.11;
        return {
          pos: [Math.cos(a) * r, Math.sin(a * 1.7) * 0.16, Math.sin(a) * r] as [number, number, number],
          size: 0.022 + (i % 4) * 0.011,
          speed: 0.4 + (i % 5) * 0.16,
        };
      }),
    [],
  );

  // Takımyıldız çizgileri
  const lineGeo = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const order = [0, 3, 6, 1, 4, 7, 2, 5, 8, 0];
    for (const i of order) {
      const s = stars[i];
      pts.push(new THREE.Vector3(...s.pos));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [stars]);

  useFrame((st, dt) => {
    const d = Math.min(dt, 0.05);
    if (group.current) {
      group.current.rotation.y += d * (0.22 + hover * 0.5);
      group.current.rotation.x = Math.sin(st.clock.elapsedTime * 0.3) * 0.18;
    }
    if (inner.current) inner.current.rotation.y -= d * 0.4;
  });

  return (
    <group ref={group}>
      <group ref={inner}>
        <mesh>
          <icosahedronGeometry args={[0.14, 1]} />
          <meshStandardMaterial
            color={color}
            emissive={accent}
            emissiveIntensity={1.4 + hover * 1.8}
            roughness={0.25}
            metalness={0.5}
          />
        </mesh>
      </group>

      <line>
        <primitive object={lineGeo} attach="geometry" />
        <lineBasicMaterial
          color={accent}
          transparent
          opacity={0.12 + hover * 0.32}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </line>

      {stars.map((s, i) => (
        <mesh key={i} position={s.pos}>
          <sphereGeometry args={[s.size, 10, 10]} />
          <meshBasicMaterial color={accent} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/* -------------------------------------------------------------- */
/*  02 — ANILAR: süzülen fotoğraf çerçeveleri                      */
/* -------------------------------------------------------------- */

export function MemoriesIcon({ color, accent, hover }: IconProps) {
  const group = useRef<THREE.Group>(null);

  const frames = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => {
        const a = (i / 5) * Math.PI * 2;
        return {
          pos: [Math.cos(a) * 0.26, (i - 2) * 0.075, Math.sin(a) * 0.26] as [number, number, number],
          rot: [0, -a + Math.PI / 2, (Math.random() - 0.5) * 0.24] as [number, number, number],
          size: [0.2 + (i % 2) * 0.05, 0.26 + (i % 3) * 0.04] as [number, number],
          phase: i * 1.25,
        };
      }),
    [],
  );

  useFrame((st, dt) => {
    const d = Math.min(dt, 0.05);
    if (!group.current) return;
    group.current.rotation.y += d * (0.16 + hover * 0.34);
    const t = st.clock.elapsedTime;
    group.current.children.forEach((c, i) => {
      const f = frames[i];
      if (!f) return;
      c.position.setY(f.pos[1] + Math.sin(t * 0.7 + f.phase) * 0.045);
    });
  });

  return (
    <group ref={group}>
      {frames.map((f, i) => (
        <group key={i} position={f.pos} rotation={f.rot}>
          {/* Cam yüzey */}
          <mesh>
            <planeGeometry args={f.size} />
            <meshPhysicalMaterial
              color={color}
              emissive={accent}
              emissiveIntensity={0.25 + hover * 0.7}
              roughness={0.1}
              metalness={0.1}
              transmission={0.7}
              thickness={0.3}
              transparent
              opacity={0.55}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Çerçeve kenarı */}
          <lineSegments>
            <edgesGeometry args={[new THREE.PlaneGeometry(f.size[0], f.size[1])]} />
            <lineBasicMaterial
              color={accent}
              transparent
              opacity={0.4 + hover * 0.5}
              blending={THREE.AdditiveBlending}
            />
          </lineSegments>
        </group>
      ))}
    </group>
  );
}

/* -------------------------------------------------------------- */
/*  03 — MÜZİK: dönen plak + ses dalgası halkaları                 */
/* -------------------------------------------------------------- */

export function MusicIcon({ color, accent, hover }: IconProps) {
  const disc = useRef<THREE.Group>(null);
  const waves = useRef<THREE.Group>(null);

  // Plak üzerindeki oluklar
  const grooves = useMemo(() => Array.from({ length: 7 }, (_, i) => 0.13 + i * 0.036), []);

  useFrame((st, dt) => {
    const d = Math.min(dt, 0.05);
    const t = st.clock.elapsedTime;

    if (disc.current) disc.current.rotation.z -= d * (1.1 + hover * 1.6);

    if (waves.current) {
      waves.current.children.forEach((c, i) => {
        // Dışa doğru genişleyen, sönen halkalar
        const cycle = ((t * 0.5 + i * 0.33) % 1);
        const s = 0.3 + cycle * 0.55;
        c.scale.setScalar(s);
        const mat = (c as THREE.Mesh).material as THREE.MeshBasicMaterial;
        mat.opacity = (1 - cycle) * (0.16 + hover * 0.4);
      });
    }
  });

  return (
    // Plak kameraya dönük dursun, hafif eğimle derinlik kazansın
    <group rotation={[Math.PI / 2 - 0.32, 0, 0]}>
      <group ref={disc}>
        {/* Plak gövdesi */}
        <mesh>
          <cylinderGeometry args={[0.34, 0.34, 0.012, 48]} />
          <meshPhysicalMaterial
            color="#050d1e"
            roughness={0.22}
            metalness={0.75}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
        {/* Oluklar */}
        {grooves.map((r, i) => (
          <mesh key={i} position={[0, 0.008, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[r, r + 0.004, 48]} />
            <meshBasicMaterial
              color={accent}
              transparent
              opacity={0.1 + hover * 0.22}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
        {/* Merkez etiket */}
        <mesh position={[0, 0.009, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.1, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={accent}
            emissiveIntensity={1.1 + hover * 1.6}
            roughness={0.4}
          />
        </mesh>
      </group>

      {/* Ses dalgaları */}
      <group ref={waves} rotation={[-Math.PI / 2, 0, 0]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i}>
            <ringGeometry args={[0.44, 0.46, 56]} />
            <meshBasicMaterial
              color={accent}
              transparent
              opacity={0.2}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* -------------------------------------------------------------- */
/*  04 — SÜRPRİZ: açılmamış enerji kutusu                          */
/* -------------------------------------------------------------- */

export function SurpriseIcon({ color, accent, hover }: IconProps) {
  const group = useRef<THREE.Group>(null);
  const lid = useRef<THREE.Group>(null);
  const spark = useRef<THREE.Points>(null);

  const sparkGeo = useMemo(() => {
    const n = 24;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 0.05 + Math.random() * 0.16;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = Math.random() * 0.3;
      pos[i * 3 + 2] = Math.sin(a) * r;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  useFrame((st, dt) => {
    const d = Math.min(dt, 0.05);
    const t = st.clock.elapsedTime;

    if (group.current) {
      group.current.rotation.y += d * (0.3 + hover * 0.6);
      group.current.position.setY(Math.sin(t * 0.8) * 0.03);
    }
    // Hover'da kapak hafifçe aralanır
    if (lid.current) {
      const target = hover * 0.12;
      lid.current.position.y += (0.19 + target - lid.current.position.y) * d * 4;
      lid.current.rotation.y += d * 0.2;
    }
    if (spark.current) {
      spark.current.rotation.y -= d * 0.5;
      const m = spark.current.material as THREE.PointsMaterial;
      m.opacity = 0.25 + hover * 0.6 + Math.sin(t * 3) * 0.1;
    }
  });

  return (
    <group ref={group}>
      {/* Kutu gövdesi */}
      <mesh>
        <boxGeometry args={[0.36, 0.36, 0.36]} />
        <meshPhysicalMaterial
          color="#0a1c3c"
          emissive={color}
          emissiveIntensity={0.35 + hover * 0.7}
          roughness={0.15}
          metalness={0.4}
          transmission={0.4}
          thickness={0.6}
          transparent
          opacity={0.82}
        />
      </mesh>
      {/* Kenar çizgileri */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(0.361, 0.361, 0.361)]} />
        <lineBasicMaterial
          color={accent}
          transparent
          opacity={0.45 + hover * 0.5}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* İçindeki enerji */}
      <mesh>
        <icosahedronGeometry args={[0.13, 1]} />
        <meshBasicMaterial color={accent} toneMapped={false} transparent opacity={0.85} />
      </mesh>

      {/* Kapak */}
      <group ref={lid} position={[0, 0.19, 0]}>
        <mesh>
          <boxGeometry args={[0.4, 0.05, 0.4]} />
          <meshPhysicalMaterial
            color="#0d2450"
            emissive={color}
            emissiveIntensity={0.5 + hover * 0.9}
            roughness={0.12}
            metalness={0.55}
          />
        </mesh>
      </group>

      {/* Sızan kıvılcımlar */}
      <points ref={spark} geometry={sparkGeo} position={[0, 0.08, 0]}>
        <pointsMaterial
          color={accent}
          size={0.022}
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </points>
    </group>
  );
}

/* -------------------------------------------------------------- */
/*  05 — SORULAR: iç içe dönen halkalar + merkez ışık              */
/* -------------------------------------------------------------- */

export function QuestionsIcon({ color, accent, hover }: IconProps) {
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const ringC = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((st, dt) => {
    const d = Math.min(dt, 0.05);
    const t = st.clock.elapsedTime;
    const sp = 1 + hover * 1.4;

    if (ringA.current) {
      ringA.current.rotation.x += d * 0.4 * sp;
      ringA.current.rotation.y += d * 0.26 * sp;
    }
    if (ringB.current) {
      ringB.current.rotation.y -= d * 0.34 * sp;
      ringB.current.rotation.z += d * 0.22 * sp;
    }
    if (ringC.current) {
      ringC.current.rotation.z -= d * 0.3 * sp;
      ringC.current.rotation.x += d * 0.18 * sp;
    }
    if (coreRef.current) {
      const s = 0.12 + Math.sin(t * 1.6) * 0.018 + hover * 0.04;
      coreRef.current.scale.setScalar(s / 0.12);
    }
  });

  const ringMat = (opacity: number) => (
    <meshStandardMaterial
      color={color}
      emissive={accent}
      emissiveIntensity={0.8 + hover * 1.5}
      roughness={0.2}
      metalness={0.7}
      transparent
      opacity={opacity}
    />
  );

  return (
    <group>
      <mesh ref={ringA}>
        <torusGeometry args={[0.34, 0.011, 12, 64]} />
        {ringMat(0.85)}
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.27, 0.009, 12, 64]} />
        {ringMat(0.7)}
      </mesh>
      <mesh ref={ringC} rotation={[0, Math.PI / 3, Math.PI / 4]}>
        <torusGeometry args={[0.2, 0.007, 12, 64]} />
        {ringMat(0.6)}
      </mesh>

      <mesh ref={coreRef}>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshBasicMaterial color={accent} toneMapped={false} />
      </mesh>
      <pointLight color={accent} intensity={1.6 + hover * 2.5} distance={3} decay={2} />
    </group>
  );
}
