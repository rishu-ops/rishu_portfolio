"use client";
import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// ─── Room ─────────────────────────────────────────────────────────────────────
function Room() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -2.5]}>
        <planeGeometry args={[7, 6]} />
        <meshStandardMaterial color="#2e1e0e" roughness={0.9} />
      </mesh>
      {/* Floor plank lines */}
      {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.001, -2.5]}>
          <planeGeometry args={[0.035, 6]} />
          <meshStandardMaterial color="#180e06" roughness={1} />
        </mesh>
      ))}
      {/* Back wall */}
      <mesh position={[0, 2.5, -5.5]}>
        <planeGeometry args={[7, 5]} />
        <meshStandardMaterial color="#1c1810" roughness={0.95} />
      </mesh>
      {/* Left wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-3.5, 2.5, -2.5]}>
        <planeGeometry args={[6, 5]} />
        <meshStandardMaterial color="#1a160e" roughness={0.95} />
      </mesh>
      {/* Right wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[3.5, 2.5, -2.5]}>
        <planeGeometry args={[6, 5]} />
        <meshStandardMaterial color="#1a160e" roughness={0.95} />
      </mesh>
      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5, -2.5]}>
        <planeGeometry args={[7, 6]} />
        <meshStandardMaterial color="#13110a" roughness={1} />
      </mesh>
      {/* Baseboard */}
      <mesh position={[0, 0.06, -5.48]}>
        <boxGeometry args={[7, 0.12, 0.04]} />
        <meshStandardMaterial color="#3d2a12" roughness={0.9} />
      </mesh>
    </group>
  );
}

// ─── Window ────────────────────────────────────────────────────────────────────
function Window() {
  return (
    <group position={[3.45, 2.4, -1.5]}>
      {/* Frame */}
      <mesh>
        <boxGeometry args={[0.08, 1.8, 1.4]} />
        <meshStandardMaterial color="#1a1208" roughness={0.9} />
      </mesh>
      {/* Glass — night city blue */}
      <mesh position={[0.02, 0, 0]}>
        <planeGeometry args={[1.25, 1.65]} />
        <meshStandardMaterial
          color="#050d18"
          emissive="#0a1f40"
          emissiveIntensity={0.6}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Cross bars */}
      <mesh position={[0.03, 0, 0]}>
        <boxGeometry args={[0.02, 1.65, 0.025]} />
        <meshStandardMaterial color="#1a1208" roughness={0.9} />
      </mesh>
      <mesh position={[0.03, 0, 0]}>
        <boxGeometry args={[0.02, 0.025, 1.25]} />
        <meshStandardMaterial color="#1a1208" roughness={0.9} />
      </mesh>
      <pointLight position={[-0.3, 0, 0]} intensity={0.6} color="#1a4080" distance={4} />
    </group>
  );
}

// ─── Desk ─────────────────────────────────────────────────────────────────────
function Desk() {
  const legs: [number, number][] = [[-1.65, -3.35], [1.65, -3.35], [-1.65, -4.3], [1.65, -4.3]];
  return (
    <group>
      {/* Surface */}
      <mesh position={[0, 1.15, -3.8]}>
        <boxGeometry args={[3.6, 0.09, 1.0]} />
        <meshStandardMaterial color="#3d2410" roughness={0.85} />
      </mesh>
      {/* Shelf */}
      <mesh position={[0, 0.65, -3.8]}>
        <boxGeometry args={[3.6, 0.05, 0.9]} />
        <meshStandardMaterial color="#28180b" roughness={0.9} />
      </mesh>
      {/* Legs */}
      {legs.map(([x, z], i) => (
        <mesh key={i} position={[x, 0.58, z]}>
          <boxGeometry args={[0.07, 1.16, 0.07]} />
          <meshStandardMaterial color="#28180b" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Monitor ──────────────────────────────────────────────────────────────────
function Monitor() {
  const screenRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!screenRef.current) return;
    const mat = screenRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 1.0 + Math.sin(clock.elapsedTime * 1.5) * 0.06;
  });

  const codeRows  = [0.26, 0.16, 0.06, -0.04, -0.14, -0.24];
  const colors    = ["#61efce", "#61efce", "#c792ea", "#61efce", "#ffcb6b", "#61efce"];
  const widths    = [0.52, 0.38, 0.30, 0.46, 0.22, 0.40];

  return (
    <group position={[0.6, 1.65, -5.18]}>
      {/* Outer frame */}
      <mesh>
        <boxGeometry args={[1.45, 0.95, 0.065]} />
        <meshStandardMaterial color="#0e0e0e" metalness={0.4} roughness={0.6} />
      </mesh>
      {/* Screen surface */}
      <mesh ref={screenRef} position={[0, 0, 0.038]}>
        <boxGeometry args={[1.32, 0.82, 0.01]} />
        <meshStandardMaterial color="#050d1a" emissive="#0d2348" emissiveIntensity={1.0} roughness={0} />
      </mesh>
      {/* Code lines */}
      {codeRows.map((y, i) => (
        <mesh key={i} position={[-0.52 + widths[i] / 2, y, 0.045]}>
          <boxGeometry args={[widths[i], 0.025, 0.001]} />
          <meshStandardMaterial color={colors[i]} emissive={colors[i]} emissiveIntensity={0.9} />
        </mesh>
      ))}
      <BlinkingCursor />
      {/* Stand neck */}
      <mesh position={[0, -0.58, 0.12]}>
        <boxGeometry args={[0.1, 0.12, 0.22]} />
        <meshStandardMaterial color="#0e0e0e" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Stand base */}
      <mesh position={[0, -0.65, 0.28]}>
        <boxGeometry args={[0.4, 0.04, 0.32]} />
        <meshStandardMaterial color="#0e0e0e" metalness={0.5} roughness={0.5} />
      </mesh>
      <pointLight position={[0, 0, 0.5]} intensity={1.4} color="#1a4da6" distance={3.5} />
    </group>
  );
}

function BlinkingCursor() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.visible = Math.floor(clock.elapsedTime * 1.5) % 2 === 0;
  });
  return (
    <mesh ref={ref} position={[-0.12, -0.24, 0.046]}>
      <boxGeometry args={[0.025, 0.028, 0.001]} />
      <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={1.2} />
    </mesh>
  );
}

// ─── Keyboard ─────────────────────────────────────────────────────────────────
function Keyboard() {
  const keys: [number, number, number][] = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 10; col++) {
      keys.push([-0.41 + col * 0.09, 0.025, -0.1 + row * 0.09]);
    }
  }
  return (
    <group position={[0.5, 1.205, -4.0]}>
      <mesh>
        <boxGeometry args={[0.95, 0.03, 0.32]} />
        <meshStandardMaterial color="#161616" metalness={0.2} roughness={0.8} />
      </mesh>
      {keys.map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <boxGeometry args={[0.077, 0.018, 0.077]} />
          <meshStandardMaterial color="#1e1e1e" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Ramen Bowl ───────────────────────────────────────────────────────────────
function RamenBowl() {
  return (
    <group position={[-1.1, 1.21, -4.05]}>
      <mesh>
        <cylinderGeometry args={[0.21, 0.15, 0.2, 14]} />
        <meshStandardMaterial color="#f0ede8" roughness={0.3} metalness={0.05} />
      </mesh>
      {/* Broth */}
      <mesh position={[0, 0.09, 0]}>
        <cylinderGeometry args={[0.195, 0.195, 0.01, 14]} />
        <meshStandardMaterial color="#7a3010" emissive="#3a1508" emissiveIntensity={0.4} roughness={0.5} />
      </mesh>
      {/* Noodle clump */}
      <mesh position={[0.04, 0.1, 0.03]}>
        <torusGeometry args={[0.07, 0.025, 6, 10]} />
        <meshStandardMaterial color="#d4a855" roughness={0.9} />
      </mesh>
      {/* Egg */}
      <mesh position={[-0.07, 0.12, -0.04]}>
        <sphereGeometry args={[0.055, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#fffde0" roughness={0.6} />
      </mesh>
      {/* Chopsticks */}
      {([0.06, 0.1] as number[]).map((xOff, i) => (
        <mesh key={i} position={[xOff, 0.18, 0.02]} rotation={[0.2, 0.3, -0.12 + i * 0.06]}>
          <cylinderGeometry args={[0.008, 0.006, 0.52, 6]} />
          <meshStandardMaterial color="#8B4513" roughness={0.9} />
        </mesh>
      ))}
      {/* Steam */}
      <Sparkles count={18} scale={[0.4, 0.9, 0.4]} position={[0, 0.5, 0]} size={1.8} speed={0.25} color="#ffffff" opacity={0.35} />
    </group>
  );
}

// ─── Character ────────────────────────────────────────────────────────────────
function Character() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef  = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (groupRef.current) groupRef.current.position.y = Math.sin(t * 0.7) * 0.012;
    if (headRef.current) {
      headRef.current.rotation.z = Math.sin(t * 0.3) * 0.04;
      headRef.current.rotation.x = 0.18 + Math.sin(t * 0.5) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0.5, 0, -3.5]} rotation={[0, 0, 0]}>
      {/* Chair seat */}
      <mesh position={[0, 0.68, 0.26]}>
        <boxGeometry args={[0.52, 0.055, 0.52]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      {/* Chair back */}
      <mesh position={[0, 1.18, 0.5]}>
        <boxGeometry args={[0.5, 0.82, 0.065]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      {/* Chair legs */}
      {([ [-0.23, -0.08], [0.23, -0.08], [-0.23, 0.5], [0.23, 0.5] ] as [number, number][]).map(([x, z], i) => (
        <mesh key={i} position={[x, 0.34, z]}>
          <boxGeometry args={[0.04, 0.68, 0.04]} />
          <meshStandardMaterial color="#111" roughness={0.9} />
        </mesh>
      ))}
      {/* Torso */}
      <mesh position={[0, 1.42, 0.1]}>
        <boxGeometry args={[0.44, 0.58, 0.26]} />
        <meshStandardMaterial color="#1c3461" roughness={0.9} />
      </mesh>
      {/* Collar */}
      <mesh position={[0, 1.7, 0.08]}>
        <boxGeometry args={[0.44, 0.12, 0.25]} />
        <meshStandardMaterial color="#162a50" roughness={0.9} />
      </mesh>
      {/* Left upper arm */}
      <mesh position={[-0.3, 1.4, 0.08]} rotation={[0.3, 0, 0.15]}>
        <boxGeometry args={[0.13, 0.4, 0.14]} />
        <meshStandardMaterial color="#1c3461" roughness={0.9} />
      </mesh>
      {/* Left forearm */}
      <mesh position={[-0.3, 1.18, -0.22]} rotation={[0.9, 0, 0.1]}>
        <boxGeometry args={[0.12, 0.36, 0.12]} />
        <meshStandardMaterial color="#1c3461" roughness={0.9} />
      </mesh>
      {/* Right upper arm */}
      <mesh position={[0.3, 1.4, 0.08]} rotation={[0.3, 0, -0.15]}>
        <boxGeometry args={[0.13, 0.4, 0.14]} />
        <meshStandardMaterial color="#1c3461" roughness={0.9} />
      </mesh>
      {/* Right forearm */}
      <mesh position={[0.3, 1.18, -0.22]} rotation={[0.9, 0, -0.1]}>
        <boxGeometry args={[0.12, 0.36, 0.12]} />
        <meshStandardMaterial color="#1c3461" roughness={0.9} />
      </mesh>
      {/* Hands */}
      {([ [-0.27, 1.01, -0.42], [0.27, 1.01, -0.42] ] as [number, number, number][]).map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.13, 0.08, 0.12]} />
          <meshStandardMaterial color="#d4956a" roughness={0.9} />
        </mesh>
      ))}
      {/* Thighs */}
      {([ [-0.14, 0.98, 0.24], [0.14, 0.98, 0.24] ] as [number, number, number][]).map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.18, 0.14, 0.5]} />
          <meshStandardMaterial color="#1e1e1e" roughness={0.9} />
        </mesh>
      ))}
      {/* Head group — face direction is -Z (toward monitor) */}
      <group ref={headRef} position={[0, 1.88, -0.04]}>
        <mesh>
          <boxGeometry args={[0.34, 0.34, 0.3]} />
          <meshStandardMaterial color="#d4956a" roughness={0.88} />
        </mesh>
        {/* Hair top */}
        <mesh position={[0, 0.19, 0]}>
          <boxGeometry args={[0.35, 0.12, 0.31]} />
          <meshStandardMaterial color="#0d0505" roughness={1} />
        </mesh>
        {/* Hair back (behind head, +Z since face is -Z) */}
        <mesh position={[0, 0.0, 0.1]}>
          <boxGeometry args={[0.32, 0.28, 0.04]} />
          <meshStandardMaterial color="#0d0505" roughness={1} />
        </mesh>
        {/* Hair sides */}
        {([ [-0.18, 0.08, 0], [0.18, 0.08, 0] ] as [number, number, number][]).map((pos, i) => (
          <mesh key={i} position={pos}>
            <boxGeometry args={[0.04, 0.24, 0.29]} />
            <meshStandardMaterial color="#0d0505" roughness={1} />
          </mesh>
        ))}
        {/* Glasses — face is toward -Z so glasses sit at -0.16 */}
        {([ [-0.09, 0.03, -0.16], [0.09, 0.03, -0.16] ] as [number, number, number][]).map((pos, i) => (
          <mesh key={i} position={pos}>
            <boxGeometry args={[0.1, 0.06, 0.02]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
          </mesh>
        ))}
        {/* Glasses bridge */}
        <mesh position={[0, 0.03, -0.17]}>
          <boxGeometry args={[0.04, 0.015, 0.01]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
}

// ─── Neon Sign ─────────────────────────────────────────────────────────────────
function NeonSign() {
  // Store refs to only the tube meshes (children that have emissive material)
  const tube0 = useRef<THREE.Mesh>(null);
  const tube1 = useRef<THREE.Mesh>(null);
  const tube2 = useRef<THREE.Mesh>(null);
  const tube3 = useRef<THREE.Mesh>(null);
  const tube4 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const tubes = [tube0, tube1, tube2, tube3, tube4];
    tubes.forEach((ref, i) => {
      if (!ref.current) return;
      const mat = ref.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 2.4 + Math.sin(t * 4.2 + i * 1.1) * 0.35;
    });
  });

  const neonMat = { color: "#ff2845", emissive: "#ff2845", emissiveIntensity: 2.4 };

  return (
    <group position={[-1.5, 3.8, -5.4]}>
      {/* Backing board */}
      <mesh>
        <boxGeometry args={[1.9, 0.52, 0.04]} />
        <meshStandardMaterial color="#050202" roughness={1} />
      </mesh>
      {/* Top bar */}
      <mesh ref={tube0} position={[0, 0.18, 0.06]}>
        <boxGeometry args={[1.6, 0.038, 0.038]} />
        <meshStandardMaterial {...neonMat} />
      </mesh>
      {/* Middle bar */}
      <mesh ref={tube1} position={[0.1, 0, 0.06]}>
        <boxGeometry args={[1.3, 0.038, 0.038]} />
        <meshStandardMaterial {...neonMat} />
      </mesh>
      {/* Bottom bar */}
      <mesh ref={tube2} position={[0, -0.18, 0.06]}>
        <boxGeometry args={[1.6, 0.038, 0.038]} />
        <meshStandardMaterial {...neonMat} />
      </mesh>
      {/* Left vertical */}
      <mesh ref={tube3} position={[-0.76, 0, 0.06]}>
        <boxGeometry args={[0.038, 0.36, 0.038]} />
        <meshStandardMaterial {...neonMat} />
      </mesh>
      {/* Right vertical */}
      <mesh ref={tube4} position={[0.76, 0, 0.06]}>
        <boxGeometry args={[0.038, 0.36, 0.038]} />
        <meshStandardMaterial {...neonMat} />
      </mesh>
      <pointLight position={[0, 0, 0.5]} intensity={2.0} color="#ff2845" distance={4.5} />
    </group>
  );
}

// ─── Lantern ───────────────────────────────────────────────────────────────────
function Lantern({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  const baseY = position[1];

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (!ref.current) return;
    ref.current.rotation.z = Math.sin(t * 0.4) * 0.04;
    ref.current.position.y = baseY + Math.sin(t * 0.3) * 0.02;
  });

  return (
    <group ref={ref} position={position}>
      {/* Cord */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.6, 4]} />
        <meshStandardMaterial color="#1a1208" roughness={1} />
      </mesh>
      {/* Body */}
      <mesh>
        <cylinderGeometry args={[0.14, 0.12, 0.28, 8]} />
        <meshStandardMaterial color="#e85518" emissive="#d94010" emissiveIntensity={3.5} transparent opacity={0.92} roughness={0.8} />
      </mesh>
      {/* Cap top */}
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.08, 0.14, 0.06, 8]} />
        <meshStandardMaterial color="#1a0a04" roughness={1} />
      </mesh>
      {/* Cap bottom */}
      <mesh position={[0, -0.16, 0]}>
        <cylinderGeometry args={[0.14, 0.08, 0.06, 8]} />
        <meshStandardMaterial color="#1a0a04" roughness={1} />
      </mesh>
      <pointLight intensity={3.5} color="#e85518" distance={5.0} />
    </group>
  );
}

// ─── Desk Decor ────────────────────────────────────────────────────────────────
function DeskDecor() {
  const bookColors = ["#8b1a1a", "#1a3a6a", "#1a5c2a"];
  const leafAngles = [0, 0.5, 1, 1.5, 2, 2.5];

  return (
    <>
      {/* Coffee mug */}
      <group position={[1.3, 1.21, -4.1]}>
        <mesh>
          <cylinderGeometry args={[0.065, 0.058, 0.13, 10]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.6} metalness={0.2} />
        </mesh>
        <mesh position={[0.09, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.045, 0.012, 6, 8, Math.PI]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.6} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.062, 0]}>
          <cylinderGeometry args={[0.054, 0.054, 0.005, 10]} />
          <meshStandardMaterial color="#2a1408" roughness={0.4} />
        </mesh>
      </group>

      {/* Small plant */}
      <group position={[-1.55, 1.21, -3.5]}>
        <mesh>
          <cylinderGeometry args={[0.075, 0.058, 0.12, 8]} />
          <meshStandardMaterial color="#5c3018" roughness={0.9} />
        </mesh>
        {leafAngles.map((angle, i) => (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.04, 0.12 + i * 0.02, Math.sin(angle) * 0.04]}
            rotation={[Math.sin(angle) * 0.5, 0, Math.cos(angle) * 0.5]}
          >
            <boxGeometry args={[0.02, 0.08, 0.05]} />
            <meshStandardMaterial color="#1f5c1a" roughness={0.9} />
          </mesh>
        ))}
      </group>

      {/* Books */}
      {bookColors.map((color, i) => (
        <mesh key={i} position={[1.45 - i * 0.085, 0.72, -3.8]}>
          <boxGeometry args={[0.07, 0.14, 0.7]} />
          <meshStandardMaterial color={color} roughness={0.9} />
        </mesh>
      ))}
    </>
  );
}

// ─── Scene ─────────────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <color attach="background" args={["#0d0906"]} />
      <fog attach="fog" args={["#0d0906", 12, 22]} />

      {/* Hemisphere: warm top, cool bottom — natural ambient fill */}
      <hemisphereLight args={["#ffcc88", "#443322", 3.0]} />

      {/* Soft ambient base */}
      <ambientLight intensity={1.8} color="#ffbb66" />

      {/* Key light from camera side (left) */}
      <directionalLight position={[-3, 5, 2]} intensity={2.5} color="#ffd0a0" />

      {/* Back wall fill so the room reads depth */}
      <pointLight position={[0, 2.5, -5.0]} intensity={3.5} color="#ff9944" distance={8} />

      {/* Monitor screen glow */}
      <pointLight position={[0.6, 2.2, -4.6]} intensity={4} color="#3366dd" distance={5} />

      <Room />
      <Window />
      <Desk />
      <Monitor />
      <Keyboard />
      <RamenBowl />
      <Character />
      <NeonSign />
      <DeskDecor />

      <Lantern position={[1.6, 4.5, -2.5]} />
      <Lantern position={[-1.0, 4.5, -1.8]} />
      <Lantern position={[0.3, 4.6, -4.0]} />

      {/* Ambient dust */}
      <Sparkles count={30} scale={[5, 3, 4]} position={[0, 2, -2.5]} size={0.8} speed={0.06} color="#ffaa66" opacity={0.15} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.2}
        minAzimuthAngle={-Math.PI / 3}
        maxAzimuthAngle={Math.PI / 8}
        target={[0.3, 1.6, -3.2]}
      />
    </>
  );
}

// ─── Loader ────────────────────────────────────────────────────────────────────
function Loader() {
  return (
    <div className="w-full h-full bg-[#0d0906] flex flex-col justify-between p-5 overflow-hidden">
      <div className="flex justify-start">
        <div className="h-5 w-36 bg-zinc-800/60 animate-pulse" />
      </div>
      <div className="flex items-end justify-between gap-4 px-2">
        <div className="flex flex-col items-center gap-2">
          <div className="w-5 h-8 bg-zinc-800/50 animate-pulse" style={{ animationDelay: "0.1s" }} />
          <div className="w-5 h-8 bg-zinc-800/50 animate-pulse" style={{ animationDelay: "0.25s" }} />
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-40 h-24 bg-zinc-800/60 animate-pulse flex flex-col justify-center gap-1.5 px-3">
            <div className="h-1.5 w-24 bg-zinc-700/70 animate-pulse" />
            <div className="h-1.5 w-16 bg-zinc-700/70 animate-pulse" />
            <div className="h-1.5 w-20 bg-zinc-700/70 animate-pulse" />
          </div>
          <div className="w-3 h-3 bg-zinc-800/50 animate-pulse" />
          <div className="w-14 h-1 bg-zinc-800/50 animate-pulse" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-3 bg-zinc-800/40 animate-pulse rounded-full" />
          <div className="w-12 h-5 bg-zinc-800/50 animate-pulse" />
        </div>
      </div>
      <div className="flex justify-center mb-2">
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 bg-zinc-800/50 animate-pulse" />
          <div className="w-12 h-14 bg-zinc-800/50 animate-pulse" />
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <div className="w-3 h-3 border border-zinc-700 border-t-orange-600/60 animate-spin" style={{ borderRadius: 0 }} />
        <span className="text-[10px] text-zinc-700 tracking-widest font-mono">loading scene…</span>
      </div>
    </div>
  );
}

// ─── Export ────────────────────────────────────────────────────────────────────
export function RamenScene() {
  return (
    <div className="w-full h-full">
      <Suspense fallback={<Loader />}>
        <Canvas
          camera={{ position: [-3.2, 2.6, 1.2], fov: 46, near: 0.1, far: 30 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false }}
          style={{ width: "100%", height: "100%" }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
