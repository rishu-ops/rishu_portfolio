"use client";
import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";

// ─── Room ─────────────────────────────────────────────────────────────────────
function Room() {
  return (
    <group>
      {/* Floor – dark walnut planks */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -2.5]} receiveShadow>
        <planeGeometry args={[9, 8]} />
        <meshStandardMaterial color="#1e1006" roughness={0.85} metalness={0.05} />
      </mesh>
      {/* Floor plank dividers */}
      {[-2, -1, 0, 1, 2].map((x, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.001, -2.5]} receiveShadow>
          <planeGeometry args={[0.025, 8]} />
          <meshStandardMaterial color="#0d0703" roughness={1} />
        </mesh>
      ))}
      {/* Rug under desk area */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.5, 0.003, -3.5]} receiveShadow>
        <planeGeometry args={[3.8, 2.6]} />
        <meshStandardMaterial color="#1a0d22" roughness={1} />
      </mesh>
      {/* Back wall */}
      <mesh position={[0, 3, -5.6]} receiveShadow>
        <planeGeometry args={[9, 7]} />
        <meshStandardMaterial color="#131008" roughness={0.98} />
      </mesh>
      {/* Left wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-4.5, 3, -2.5]} receiveShadow>
        <planeGeometry args={[8, 7]} />
        <meshStandardMaterial color="#100e08" roughness={0.98} />
      </mesh>
      {/* Right wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[4.5, 3, -2.5]} receiveShadow>
        <planeGeometry args={[8, 7]} />
        <meshStandardMaterial color="#100e08" roughness={0.98} />
      </mesh>
      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 6, -2.5]} receiveShadow>
        <planeGeometry args={[9, 8]} />
        <meshStandardMaterial color="#0c0a07" roughness={1} />
      </mesh>
      {/* Crown moulding – back */}
      <mesh position={[0, 5.92, -5.55]} castShadow receiveShadow>
        <boxGeometry args={[9, 0.14, 0.12]} />
        <meshStandardMaterial color="#2a1e0c" roughness={0.9} />
      </mesh>
      {/* Baseboard – back */}
      <mesh position={[0, 0.08, -5.55]} castShadow receiveShadow>
        <boxGeometry args={[9, 0.16, 0.06]} />
        <meshStandardMaterial color="#3d2a12" roughness={0.9} />
      </mesh>
      {/* Baseboard – left */}
      <mesh position={[-4.48, 0.08, -2.5]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[8, 0.16, 0.06]} />
        <meshStandardMaterial color="#3d2a12" roughness={0.9} />
      </mesh>
      {/* Baseboard – right */}
      <mesh position={[4.48, 0.08, -2.5]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[8, 0.16, 0.06]} />
        <meshStandardMaterial color="#3d2a12" roughness={0.9} />
      </mesh>
    </group>
  );
}

// ─── Window ────────────────────────────────────────────────────────────────────
function Window() {
  return (
    <group position={[4.42, 2.6, -1.2]}>
      {/* Outer frame */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.1, 2.2, 1.8]} />
        <meshStandardMaterial color="#1a1208" roughness={0.85} />
      </mesh>
      {/* Glass pane – night sky */}
      <mesh position={[0.04, 0, 0]}>
        <planeGeometry args={[1.6, 2.0]} />
        <meshStandardMaterial
          color="#030811"
          emissive="#0a1f40"
          emissiveIntensity={0.8}
          transparent
          opacity={0.92}
          roughness={0}
          metalness={0.1}
        />
      </mesh>
      {/* Horizontal cross-bar */}
      <mesh position={[0.05, 0, 0]}>
        <boxGeometry args={[0.03, 0.035, 1.6]} />
        <meshStandardMaterial color="#1a1208" roughness={0.9} />
      </mesh>
      {/* Vertical cross-bar */}
      <mesh position={[0.05, 0, 0]}>
        <boxGeometry args={[0.03, 2.0, 0.035]} />
        <meshStandardMaterial color="#1a1208" roughness={0.9} />
      </mesh>
      {/* City glow emanating from window */}
      <pointLight position={[-0.5, 0, 0]} intensity={1.8} color="#1a4080" distance={6} castShadow />
      {/* Top-city light shimmer */}
      <pointLight position={[-0.5, 0.6, 0.3]} intensity={0.5} color="#2255aa" distance={3} />
    </group>
  );
}

// ─── Wall Art / Poster ─────────────────────────────────────────────────────────
function WallArt() {
  return (
    <group position={[-2.2, 3.2, -5.52]}>
      {/* Frame */}
      <mesh receiveShadow>
        <boxGeometry args={[1.6, 1.1, 0.06]} />
        <meshStandardMaterial color="#0d0a06" roughness={0.9} />
      </mesh>
      {/* Art canvas – abstract red/gold */}
      <mesh position={[0, 0, 0.04]}>
        <planeGeometry args={[1.42, 0.92]} />
        <meshStandardMaterial color="#0a0508" emissive="#3a1008" emissiveIntensity={0.5} roughness={0.8} />
      </mesh>
      {/* Bold line art strokes */}
      {[[-0.3, 0.2], [0.1, -0.1], [0.4, 0.3], [-0.1, -0.28]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.05]}>
          <boxGeometry args={[0.55, 0.03, 0.002]} />
          <meshStandardMaterial color="#c0361a" emissive="#c0361a" emissiveIntensity={0.7} />
        </mesh>
      ))}
      {[[-0.25, 0.05], [0.3, -0.2]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.05]} rotation={[0, 0, Math.PI / 3]}>
          <boxGeometry args={[0.45, 0.025, 0.002]} />
          <meshStandardMaterial color="#c89030" emissive="#c89030" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Shelf on wall ─────────────────────────────────────────────────────────────
function WallShelf() {
  const items = [
    { pos: [-0.55, 0.14, 0] as [number, number, number], scale: [0.13, 0.26, 0.12] as [number, number, number], color: "#8b1a1a" },
    { pos: [-0.38, 0.14, 0] as [number, number, number], scale: [0.1, 0.22, 0.12] as [number, number, number], color: "#1a3a6a" },
    { pos: [-0.22, 0.14, 0] as [number, number, number], scale: [0.11, 0.28, 0.12] as [number, number, number], color: "#1a5c2a" },
    { pos: [0.0, 0.13, 0.02] as [number, number, number], scale: [0.1, 0.1, 0.1] as [number, number, number], color: "#c0a060" },   // small pot
    { pos: [0.25, 0.14, 0] as [number, number, number], scale: [0.12, 0.24, 0.12] as [number, number, number], color: "#6a1a4a" },
  ];
  return (
    <group position={[2.2, 2.9, -5.5]}>
      {/* Shelf board */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.055, 0.2]} />
        <meshStandardMaterial color="#2e1c0a" roughness={0.85} />
      </mesh>
      {/* Shelf bracket left */}
      <mesh position={[-0.7, -0.1, -0.05]} castShadow>
        <boxGeometry args={[0.04, 0.2, 0.18]} />
        <meshStandardMaterial color="#221408" roughness={0.9} />
      </mesh>
      {/* Shelf bracket right */}
      <mesh position={[0.7, -0.1, -0.05]} castShadow>
        <boxGeometry args={[0.04, 0.2, 0.18]} />
        <meshStandardMaterial color="#221408" roughness={0.9} />
      </mesh>
      {/* Items on shelf */}
      {items.map((item, i) => (
        <mesh key={i} position={item.pos} castShadow receiveShadow>
          <boxGeometry args={item.scale} />
          <meshStandardMaterial color={item.color} roughness={0.88} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Desk ─────────────────────────────────────────────────────────────────────
function Desk() {
  const legs: [number, number][] = [[-1.7, -3.3], [1.7, -3.3], [-1.7, -4.35], [1.7, -4.35]];
  return (
    <group>
      {/* Surface */}
      <mesh position={[0, 1.18, -3.82]} castShadow receiveShadow>
        <boxGeometry args={[3.7, 0.075, 1.08]} />
        <meshStandardMaterial color="#3d2410" roughness={0.75} metalness={0.04} />
      </mesh>
      {/* Surface front edge strip */}
      <mesh position={[0, 1.16, -3.28]} castShadow receiveShadow>
        <boxGeometry args={[3.7, 0.075, 0.04]} />
        <meshStandardMaterial color="#2e1a0c" roughness={0.7} />
      </mesh>
      {/* Under-desk horizontal support */}
      <mesh position={[0, 0.75, -3.82]} castShadow receiveShadow>
        <boxGeometry args={[3.4, 0.05, 0.9]} />
        <meshStandardMaterial color="#221408" roughness={0.9} />
      </mesh>
      {/* Legs */}
      {legs.map(([x, z], i) => (
        <mesh key={i} position={[x, 0.59, z]} castShadow receiveShadow>
          <boxGeometry args={[0.075, 1.18, 0.075]} />
          <meshStandardMaterial color="#1e1008" roughness={0.9} />
        </mesh>
      ))}
      {/* Back panel (to hide under-desk space) */}
      <mesh position={[0, 0.59, -4.36]} castShadow receiveShadow>
        <boxGeometry args={[3.56, 1.16, 0.04]} />
        <meshStandardMaterial color="#221408" roughness={0.95} />
      </mesh>
    </group>
  );
}

// ─── Desk Lamp ─────────────────────────────────────────────────────────────────
function DeskLamp() {
  return (
    <group position={[1.55, 1.22, -5.0]}>
      {/* Base */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.13, 0.04, 12]} />
        <meshStandardMaterial color="#111" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Vertical arm */}
      <mesh position={[0, 0.28, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.56, 8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Elbow joint */}
      <mesh position={[0, 0.56, 0]} castShadow>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Horizontal arm */}
      <mesh position={[-0.2, 0.56, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.013, 0.013, 0.4, 8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Shade */}
      <mesh position={[-0.4, 0.5, 0]} rotation={[0, 0, -0.5]} castShadow>
        <coneGeometry args={[0.12, 0.22, 12, 1, true]} />
        <meshStandardMaterial color="#111" metalness={0.6} roughness={0.4} side={THREE.DoubleSide} />
      </mesh>
      {/* Lamp bulb glow */}
      <pointLight position={[-0.4, 0.46, 0]} intensity={3.5} color="#ffcc77" distance={4} castShadow />
      <mesh position={[-0.4, 0.5, 0]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#ffe080" emissive="#ffe080" emissiveIntensity={4} />
      </mesh>
    </group>
  );
}

// ─── Monitor ──────────────────────────────────────────────────────────────────
function Monitor() {
  const screenRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!screenRef.current) return;
    const mat = screenRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 1.1 + Math.sin(clock.elapsedTime * 1.2) * 0.05;
  });

  const codeRows = [0.3, 0.2, 0.1, 0.0, -0.1, -0.2, -0.3];
  const colors = ["#61efce", "#61efce", "#c792ea", "#61efce", "#ffcb6b", "#ff5370", "#61efce"];
  const widths = [0.55, 0.38, 0.30, 0.50, 0.22, 0.42, 0.34];
  const indents = [0, 0.06, 0.12, 0.06, 0.18, 0.06, 0.12];

  return (
    <group position={[0.5, 1.72, -5.22]}>
      {/* Outer bezel */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.55, 1.02, 0.055]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Inner screen inset */}
      <mesh position={[0, 0, 0.028]}>
        <boxGeometry args={[1.42, 0.89, 0.01]} />
        <meshStandardMaterial color="#02070f" roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Screen surface */}
      <mesh ref={screenRef} position={[0, 0, 0.034]}>
        <boxGeometry args={[1.38, 0.85, 0.006]} />
        <meshStandardMaterial
          color="#050d1a"
          emissive="#0d2348"
          emissiveIntensity={1.1}
          roughness={0}
          metalness={0.05}
        />
      </mesh>
      {/* Code lines with indent */}
      {codeRows.map((y, i) => (
        <mesh key={i} position={[-0.58 + indents[i] + widths[i] / 2, y, 0.042]}>
          <boxGeometry args={[widths[i], 0.022, 0.001]} />
          <meshStandardMaterial color={colors[i]} emissive={colors[i]} emissiveIntensity={1.0} />
        </mesh>
      ))}
      {/* Status bar at bottom */}
      <mesh position={[0, -0.38, 0.042]}>
        <boxGeometry args={[1.38, 0.03, 0.001]} />
        <meshStandardMaterial color="#1a3a6a" emissive="#1a3a6a" emissiveIntensity={0.8} />
      </mesh>
      <BlinkingCursor />
      {/* Stand neck */}
      <mesh position={[0, -0.61, 0.14]} castShadow>
        <boxGeometry args={[0.1, 0.1, 0.26]} />
        <meshStandardMaterial color="#0e0e0e" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Stand base */}
      <mesh position={[0, -0.69, 0.34]} castShadow receiveShadow>
        <boxGeometry args={[0.46, 0.035, 0.38]} />
        <meshStandardMaterial color="#0e0e0e" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Screen glow / fill light */}
      <pointLight position={[0, 0, 0.6]} intensity={2.0} color="#1a4da6" distance={4} castShadow />
      <pointLight position={[0, 0.4, 0.6]} intensity={0.6} color="#3366cc" distance={2.5} />
    </group>
  );
}

function BlinkingCursor() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.visible = Math.floor(clock.elapsedTime * 1.8) % 2 === 0;
  });
  return (
    <mesh ref={ref} position={[-0.1, -0.2, 0.045]}>
      <boxGeometry args={[0.022, 0.03, 0.001]} />
      <meshStandardMaterial color="#cde" emissive="#cde" emissiveIntensity={1.5} />
    </mesh>
  );
}

// ─── Second smaller monitor ───────────────────────────────────────────────────
function SideMonitor() {
  return (
    <group position={[-0.9, 1.55, -5.2]} rotation={[0, 0.22, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.92, 0.64, 0.045]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.028]}>
        <boxGeometry args={[0.84, 0.56, 0.006]} />
        <meshStandardMaterial color="#050d1a" emissive="#061530" emissiveIntensity={0.7} roughness={0} />
      </mesh>
      {/* Some UI elements on screen */}
      {[0.15, 0.05, -0.05, -0.15].map((y, i) => (
        <mesh key={i} position={[-0.25 + (i % 2) * 0.1, y, 0.033]}>
          <boxGeometry args={[0.3, 0.018, 0.001]} />
          <meshStandardMaterial color={i === 0 ? "#ffcb6b" : "#61efce"} emissive={i === 0 ? "#ffcb6b" : "#61efce"} emissiveIntensity={0.7} />
        </mesh>
      ))}
      {/* Stand */}
      <mesh position={[0, -0.38, 0.12]} castShadow>
        <boxGeometry args={[0.08, 0.08, 0.18]} />
        <meshStandardMaterial color="#0e0e0e" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.44, 0.22]} castShadow receiveShadow>
        <boxGeometry args={[0.28, 0.03, 0.22]} />
        <meshStandardMaterial color="#0e0e0e" metalness={0.5} roughness={0.5} />
      </mesh>
      <pointLight position={[0, 0, 0.5]} intensity={0.8} color="#1a3da0" distance={2.5} />
    </group>
  );
}

// ─── Keyboard ─────────────────────────────────────────────────────────────────
function Keyboard() {
  const keys: [number, number, number][] = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 12; col++) {
      keys.push([-0.5 + col * 0.088, 0.028, -0.14 + row * 0.088]);
    }
  }
  return (
    <group position={[0.5, 1.2, -4.0]}>
      {/* Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.025, 0.38]} />
        <meshStandardMaterial color="#0f0f0f" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* RGB strip front edge */}
      <mesh position={[0, 0.01, 0.2]}>
        <boxGeometry args={[1.1, 0.018, 0.012]} />
        <meshStandardMaterial color="#ff3388" emissive="#ff3388" emissiveIntensity={1.5} />
      </mesh>
      {/* Keys */}
      {keys.map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} castShadow>
          <boxGeometry args={[0.072, 0.02, 0.072]} />
          <meshStandardMaterial color="#181818" roughness={0.85} metalness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Mouse ─────────────────────────────────────────────────────────────────────
function Mouse() {
  return (
    <group position={[1.1, 1.205, -3.95]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.08, 0.025, 0.13]} />
        <meshStandardMaterial color="#0f0f0f" metalness={0.4} roughness={0.5} />
      </mesh>
      {/* Scroll wheel */}
      <mesh position={[0, 0.02, -0.02]}>
        <cylinderGeometry args={[0.012, 0.012, 0.028, 8]} />
        <meshStandardMaterial color="#333" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* RGB line */}
      <mesh position={[0, 0.014, 0.04]}>
        <boxGeometry args={[0.07, 0.005, 0.01]} />
        <meshStandardMaterial color="#ff3388" emissive="#ff3388" emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}

// ─── Ramen Bowl ───────────────────────────────────────────────────────────────
function RamenBowl() {
  return (
    <group position={[-1.15, 1.22, -4.1]}>
      {/* Bowl outer */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.23, 0.165, 0.22, 20]} />
        <meshStandardMaterial color="#f5f0e8" roughness={0.25} metalness={0.05} />
      </mesh>
      {/* Bowl inner dark */}
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.21, 0.21, 0.18, 20]} />
        <meshStandardMaterial color="#1a0a05" roughness={0.6} side={THREE.BackSide} />
      </mesh>
      {/* Broth surface */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.205, 0.205, 0.008, 20]} />
        <meshStandardMaterial color="#8a3510" emissive="#4a1a06" emissiveIntensity={0.6} roughness={0.3} />
      </mesh>
      {/* Noodle cluster */}
      <mesh position={[0.05, 0.115, 0.04]}>
        <torusGeometry args={[0.075, 0.022, 8, 14]} />
        <meshStandardMaterial color="#d4a855" roughness={0.88} />
      </mesh>
      <mesh position={[-0.02, 0.115, 0.02]} rotation={[0, 0.8, 0]}>
        <torusGeometry args={[0.05, 0.016, 6, 10]} />
        <meshStandardMaterial color="#c89a40" roughness={0.9} />
      </mesh>
      {/* Chashu pork slice */}
      <mesh position={[-0.08, 0.12, 0.05]} rotation={[0.1, 0.3, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.018, 10]} />
        <meshStandardMaterial color="#7a3018" roughness={0.8} />
      </mesh>
      {/* Egg halved */}
      <mesh position={[-0.07, 0.125, -0.07]}>
        <sphereGeometry args={[0.055, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#fffbd8" roughness={0.5} />
      </mesh>
      {/* Egg yolk */}
      <mesh position={[-0.07, 0.125, -0.07]}>
        <sphereGeometry args={[0.03, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#f0a800" emissive="#c07800" emissiveIntensity={0.3} roughness={0.5} />
      </mesh>
      {/* Nori sheet */}
      <mesh position={[0.1, 0.125, -0.06]} rotation={[0.1, -0.3, 0.1]}>
        <boxGeometry args={[0.025, 0.09, 0.06]} />
        <meshStandardMaterial color="#0a1a0a" roughness={1} />
      </mesh>
      {/* Green onion bits */}
      {[[-0.03, 0.12, 0.1], [0.06, 0.12, -0.1]].map(([x, y, z], i) => (
        <mesh key={i} position={[x as number, y as number, z as number]}>
          <sphereGeometry args={[0.012, 5, 5]} />
          <meshStandardMaterial color="#3a8a2a" roughness={0.9} />
        </mesh>
      ))}
      {/* Chopsticks */}
      {([0.07, 0.11] as number[]).map((xOff, i) => (
        <mesh key={i} position={[xOff, 0.19, 0.02]} rotation={[0.18, 0.25, -0.12 + i * 0.07]}>
          <cylinderGeometry args={[0.007, 0.005, 0.55, 6]} />
          <meshStandardMaterial color="#8B4513" roughness={0.88} />
        </mesh>
      ))}
      {/* Steam particles */}
      <Sparkles count={22} scale={[0.38, 1.1, 0.38]} position={[0, 0.55, 0]} size={2.2} speed={0.2} color="#ffffff" opacity={0.3} />
    </group>
  );
}

// ─── Character ────────────────────────────────────────────────────────────────
function Character() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const rArmRef = useRef<THREE.Group>(null);
  const lArmRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (groupRef.current) groupRef.current.position.y = Math.sin(t * 0.65) * 0.01;
    if (headRef.current) {
      headRef.current.rotation.z = Math.sin(t * 0.28) * 0.035;
      headRef.current.rotation.x = 0.22 + Math.sin(t * 0.45) * 0.018;
    }
    // Subtle typing animation
    if (rArmRef.current) rArmRef.current.rotation.x = 0.9 + Math.sin(t * 4.8) * 0.04;
    if (lArmRef.current) lArmRef.current.rotation.x = 0.9 + Math.sin(t * 4.8 + 0.3) * 0.04;
  });

  const skinColor = "#c8845a";
  const shirtColor = "#1c3461";
  const darkColor = "#0f0f0f";
  const hairColor = "#0d0505";

  return (
    <group ref={groupRef} position={[0.5, 0, -3.5]}>
      {/* ── Chair ── */}
      {/* Seat */}
      <mesh position={[0, 0.7, 0.22]} castShadow receiveShadow>
        <boxGeometry args={[0.56, 0.06, 0.56]} />
        <meshStandardMaterial color={darkColor} roughness={0.9} />
      </mesh>
      {/* Seat cushion */}
      <mesh position={[0, 0.74, 0.22]} castShadow>
        <boxGeometry args={[0.52, 0.04, 0.52]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.95} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 1.26, 0.5]} castShadow receiveShadow>
        <boxGeometry args={[0.52, 0.9, 0.065]} />
        <meshStandardMaterial color={darkColor} roughness={0.9} />
      </mesh>
      {/* Backrest cushion */}
      <mesh position={[0, 1.26, 0.47]} castShadow>
        <boxGeometry args={[0.48, 0.84, 0.04]} />
        <meshStandardMaterial color="#1c1c1c" roughness={0.95} />
      </mesh>
      {/* Armrests */}
      {[-0.3, 0.3].map((x, i) => (
        <mesh key={i} position={[x, 0.92, 0.22]} castShadow>
          <boxGeometry args={[0.055, 0.04, 0.52]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
      ))}
      {/* Chair legs */}
      {([[-0.24, -0.04], [0.24, -0.04], [-0.24, 0.5], [0.24, 0.5]] as [number, number][]).map(([x, z], i) => (
        <mesh key={i} position={[x, 0.35, z]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.7, 6]} />
          <meshStandardMaterial color="#111" roughness={0.6} metalness={0.4} />
        </mesh>
      ))}
      {/* Caster wheels */}
      {([[-0.24, -0.04], [0.24, -0.04], [-0.24, 0.5], [0.24, 0.5]] as [number, number][]).map(([x, z], i) => (
        <mesh key={i} position={[x, 0.04, z]}>
          <sphereGeometry args={[0.028, 6, 6]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.5} />
        </mesh>
      ))}

      {/* ── Body ── */}
      {/* Torso */}
      <mesh position={[0, 1.46, 0.1]} castShadow>
        <boxGeometry args={[0.46, 0.62, 0.28]} />
        <meshStandardMaterial color={shirtColor} roughness={0.88} />
      </mesh>
      {/* Shoulder pads */}
      {[-0.28, 0.28].map((x, i) => (
        <mesh key={i} position={[x, 1.6, 0.08]} castShadow>
          <boxGeometry args={[0.12, 0.1, 0.28]} />
          <meshStandardMaterial color={shirtColor} roughness={0.88} />
        </mesh>
      ))}
      {/* Collar */}
      <mesh position={[0, 1.75, 0.05]} castShadow>
        <boxGeometry args={[0.28, 0.1, 0.24]} />
        <meshStandardMaterial color="#162a50" roughness={0.9} />
      </mesh>

      {/* ── Arms ── */}
      {/* Left upper arm */}
      <mesh position={[-0.32, 1.42, 0.08]} rotation={[0.3, 0, 0.18]} castShadow>
        <boxGeometry args={[0.14, 0.42, 0.15]} />
        <meshStandardMaterial color={shirtColor} roughness={0.88} />
      </mesh>
      {/* Left forearm */}
      <group ref={lArmRef} position={[-0.31, 1.18, -0.22]}>
        <mesh rotation={[0.9, 0, 0.1]} castShadow>
          <boxGeometry args={[0.13, 0.38, 0.13]} />
          <meshStandardMaterial color={shirtColor} roughness={0.88} />
        </mesh>
      </group>

      {/* Right upper arm */}
      <mesh position={[0.32, 1.42, 0.08]} rotation={[0.3, 0, -0.18]} castShadow>
        <boxGeometry args={[0.14, 0.42, 0.15]} />
        <meshStandardMaterial color={shirtColor} roughness={0.88} />
      </mesh>
      {/* Right forearm */}
      <group ref={rArmRef} position={[0.31, 1.18, -0.22]}>
        <mesh rotation={[0.9, 0, -0.1]} castShadow>
          <boxGeometry args={[0.13, 0.38, 0.13]} />
          <meshStandardMaterial color={shirtColor} roughness={0.88} />
        </mesh>
      </group>

      {/* Hands */}
      {([[-0.28, 1.0, -0.44], [0.28, 1.0, -0.44]] as [number, number, number][]).map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <boxGeometry args={[0.12, 0.075, 0.1]} />
          <meshStandardMaterial color={skinColor} roughness={0.88} />
        </mesh>
      ))}

      {/* Lower body */}
      {/* Waist/belt area */}
      <mesh position={[0, 1.12, 0.14]} castShadow>
        <boxGeometry args={[0.46, 0.08, 0.28]} />
        <meshStandardMaterial color="#111" roughness={0.7} metalness={0.2} />
      </mesh>
      {/* Thighs */}
      {([[-0.13, 0.94, 0.22], [0.13, 0.94, 0.22]] as [number, number, number][]).map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <boxGeometry args={[0.2, 0.16, 0.54]} />
          <meshStandardMaterial color="#1e1e1e" roughness={0.9} />
        </mesh>
      ))}

      {/* ── Head ── */}
      <group ref={headRef} position={[0, 1.94, -0.02]}>
        {/* Head base */}
        <mesh castShadow>
          <boxGeometry args={[0.36, 0.38, 0.33]} />
          <meshStandardMaterial color={skinColor} roughness={0.86} />
        </mesh>
        {/* Jaw taper */}
        <mesh position={[0, -0.16, 0]} castShadow>
          <boxGeometry args={[0.32, 0.1, 0.28]} />
          <meshStandardMaterial color={skinColor} roughness={0.86} />
        </mesh>
        {/* Hair top */}
        <mesh position={[0, 0.22, 0.02]} castShadow>
          <boxGeometry args={[0.37, 0.1, 0.33]} />
          <meshStandardMaterial color={hairColor} roughness={0.95} />
        </mesh>
        {/* Hair volume */}
        <mesh position={[0, 0.16, 0.03]} castShadow>
          <boxGeometry args={[0.38, 0.12, 0.34]} />
          <meshStandardMaterial color={hairColor} roughness={0.98} />
        </mesh>
        {/* Hair back */}
        <mesh position={[0, 0.04, 0.14]} castShadow>
          <boxGeometry args={[0.34, 0.32, 0.08]} />
          <meshStandardMaterial color={hairColor} roughness={1} />
        </mesh>
        {/* Hair sides */}
        {([[-0.19, 0.06, 0.02], [0.19, 0.06, 0.02]] as [number, number, number][]).map((pos, i) => (
          <mesh key={i} position={pos} castShadow>
            <boxGeometry args={[0.04, 0.28, 0.32]} />
            <meshStandardMaterial color={hairColor} roughness={1} />
          </mesh>
        ))}
        {/* Forehead */}
        <mesh position={[0, 0.1, -0.17]} castShadow>
          <boxGeometry args={[0.32, 0.06, 0.02]} />
          <meshStandardMaterial color={hairColor} roughness={1} />
        </mesh>
        {/* Ears */}
        {([[-0.2, -0.02, 0.0], [0.2, -0.02, 0.0]] as [number, number, number][]).map((pos, i) => (
          <mesh key={i} position={pos} castShadow>
            <boxGeometry args={[0.04, 0.08, 0.1]} />
            <meshStandardMaterial color={skinColor} roughness={0.88} />
          </mesh>
        ))}
        {/* Nose */}
        <mesh position={[0, -0.04, -0.18]} castShadow>
          <boxGeometry args={[0.06, 0.07, 0.05]} />
          <meshStandardMaterial color="#b87050" roughness={0.88} />
        </mesh>
        {/* Glasses frames */}
        {([[-0.09, 0.04, -0.18], [0.09, 0.04, -0.18]] as [number, number, number][]).map((pos, i) => (
          <mesh key={i} position={pos} castShadow>
            <boxGeometry args={[0.115, 0.072, 0.015]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}
        {/* Glasses bridge */}
        <mesh position={[0, 0.04, -0.185]}>
          <boxGeometry args={[0.044, 0.014, 0.01]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Glasses arms */}
        {([[-0.19, 0.04, -0.1], [0.19, 0.04, -0.1]] as [number, number, number][]).map((pos, i) => (
          <mesh key={i} position={pos} rotation={[0, 0.15 * (i === 0 ? -1 : 1), 0]}>
            <boxGeometry args={[0.01, 0.01, 0.18]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}
        {/* Eye shine (subtle emissive dot) */}
        {([[-0.09, 0.02, -0.185], [0.09, 0.02, -0.185]] as [number, number, number][]).map((pos, i) => (
          <mesh key={i} position={pos}>
            <boxGeometry args={[0.016, 0.016, 0.001]} />
            <meshStandardMaterial color="#223366" emissive="#223366" emissiveIntensity={1.2} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// ─── Neon Sign ─────────────────────────────────────────────────────────────────
function NeonSign() {
  const refs = [
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
  ];

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    refs.forEach((ref, i) => {
      if (!ref.current) return;
      const mat = ref.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 2.6 + Math.sin(t * 4.5 + i * 1.1) * 0.4;
    });
  });

  const neonProps = { color: "#ff2845" as string, emissive: "#ff2845" as string, emissiveIntensity: 2.6 };

  return (
    <group position={[-1.5, 4.0, -5.48]}>
      {/* Backing board */}
      <mesh receiveShadow>
        <boxGeometry args={[2.0, 0.58, 0.045]} />
        <meshStandardMaterial color="#050202" roughness={1} />
      </mesh>
      {/* Top bar */}
      <mesh ref={refs[0]} position={[0, 0.2, 0.06]}>
        <boxGeometry args={[1.7, 0.04, 0.04]} />
        <meshStandardMaterial {...neonProps} />
      </mesh>
      {/* Middle bar */}
      <mesh ref={refs[1]} position={[0.08, 0, 0.06]}>
        <boxGeometry args={[1.4, 0.04, 0.04]} />
        <meshStandardMaterial {...neonProps} />
      </mesh>
      {/* Bottom bar */}
      <mesh ref={refs[2]} position={[0, -0.2, 0.06]}>
        <boxGeometry args={[1.7, 0.04, 0.04]} />
        <meshStandardMaterial {...neonProps} />
      </mesh>
      {/* Left vertical */}
      <mesh ref={refs[3]} position={[-0.82, 0, 0.06]}>
        <boxGeometry args={[0.04, 0.4, 0.04]} />
        <meshStandardMaterial {...neonProps} />
      </mesh>
      {/* Right vertical */}
      <mesh ref={refs[4]} position={[0.82, 0, 0.06]}>
        <boxGeometry args={[0.04, 0.4, 0.04]} />
        <meshStandardMaterial {...neonProps} />
      </mesh>
      {/* Neon glow light */}
      <pointLight position={[0, 0, 0.7]} intensity={3.0} color="#ff2845" distance={5.5} castShadow />
      <pointLight position={[0, 0, 0.3]} intensity={1.2} color="#ff6080" distance={2.5} />
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
    ref.current.rotation.z = Math.sin(t * 0.38) * 0.045;
    ref.current.position.y = baseY + Math.sin(t * 0.3 + position[0]) * 0.025;
  });

  return (
    <group ref={ref} position={position}>
      {/* Hanging cord */}
      <mesh position={[0, 0.36, 0]} castShadow>
        <cylinderGeometry args={[0.007, 0.007, 0.72, 4]} />
        <meshStandardMaterial color="#1a1208" roughness={1} />
      </mesh>
      {/* Body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.15, 0.12, 0.3, 10]} />
        <meshStandardMaterial color="#e85518" emissive="#d94010" emissiveIntensity={4.0} transparent opacity={0.9} roughness={0.7} />
      </mesh>
      {/* Cross slats */}
      {[0, Math.PI / 2].map((rot, i) => (
        <mesh key={i} rotation={[0, rot, 0]} position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.005, 0.28, 0.3]} />
          <meshStandardMaterial color="#3a0e04" roughness={1} />
        </mesh>
      ))}
      {/* Top cap */}
      <mesh position={[0, 0.18, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.15, 0.07, 10]} />
        <meshStandardMaterial color="#1a0a04" roughness={1} />
      </mesh>
      {/* Bottom cap */}
      <mesh position={[0, -0.18, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.09, 0.07, 10]} />
        <meshStandardMaterial color="#1a0a04" roughness={1} />
      </mesh>
      {/* Tassel */}
      <mesh position={[0, -0.27, 0]}>
        <cylinderGeometry args={[0.018, 0.002, 0.12, 6]} />
        <meshStandardMaterial color="#c03010" roughness={1} />
      </mesh>
      <pointLight intensity={4.5} color="#e85518" distance={5.5} castShadow />
    </group>
  );
}

// ─── Desk Decor ────────────────────────────────────────────────────────────────
function DeskDecor() {
  const leafAngles = [0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5];

  return (
    <>
      {/* Coffee mug */}
      <group position={[1.42, 1.225, -4.15]}>
        {/* Mug body */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.068, 0.060, 0.14, 12]} />
          <meshStandardMaterial color="#111" roughness={0.5} metalness={0.3} />
        </mesh>
        {/* Mug handle */}
        <mesh position={[0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.048, 0.012, 6, 10, Math.PI]} />
          <meshStandardMaterial color="#111" roughness={0.5} metalness={0.3} />
        </mesh>
        {/* Coffee surface */}
        <mesh position={[0, 0.067, 0]}>
          <cylinderGeometry args={[0.057, 0.057, 0.005, 12]} />
          <meshStandardMaterial color="#1a0a04" roughness={0.3} />
        </mesh>
        {/* Mug text accent */}
        <mesh position={[-0.05, 0, -0.069]}>
          <boxGeometry args={[0.04, 0.04, 0.001]} />
          <meshStandardMaterial color="#ff2845" emissive="#ff2845" emissiveIntensity={0.6} />
        </mesh>
        {/* Steam */}
        <Sparkles count={8} scale={[0.15, 0.5, 0.15]} position={[0, 0.28, 0]} size={1.2} speed={0.3} color="#ffffff" opacity={0.2} />
      </group>

      {/* Small succulent plant */}
      <group position={[-1.58, 1.22, -3.52]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.08, 0.065, 0.13, 9]} />
          <meshStandardMaterial color="#5a2c14" roughness={0.88} />
        </mesh>
        {/* Soil */}
        <mesh position={[0, 0.066, 0]}>
          <cylinderGeometry args={[0.075, 0.075, 0.005, 9]} />
          <meshStandardMaterial color="#2a1808" roughness={1} />
        </mesh>
        {/* Leaves */}
        {leafAngles.map((angle, i) => (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 0.045,
              0.12 + (i % 2) * 0.025,
              Math.sin(angle) * 0.045,
            ]}
            rotation={[
              Math.sin(angle) * 0.55,
              0,
              Math.cos(angle) * 0.55,
            ]}
            castShadow
          >
            <boxGeometry args={[0.022, 0.09, 0.048]} />
            <meshStandardMaterial color={i % 2 === 0 ? "#1f6020" : "#2a7a22"} roughness={0.9} />
          </mesh>
        ))}
        {/* Center bud */}
        <mesh position={[0, 0.18, 0]}>
          <sphereGeometry args={[0.025, 7, 7]} />
          <meshStandardMaterial color="#5a9a18" roughness={0.9} />
        </mesh>
      </group>

      {/* Sticky note pad */}
      <mesh position={[-0.6, 1.195, -3.55]} rotation={[-Math.PI / 2, 0, 0.1]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.2, 0.012]} />
        <meshStandardMaterial color="#f0d060" roughness={0.9} />
      </mesh>
      {/* Pen */}
      <mesh position={[-0.55, 1.207, -3.72]} rotation={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.006, 0.005, 0.24, 7]} />
        <meshStandardMaterial color="#111" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Pen tip */}
      <mesh position={[-0.56, 1.207, -3.84]} rotation={[0, 0.2, 0]} castShadow>
        <coneGeometry args={[0.006, 0.025, 7]} />
        <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
      </mesh>
    </>
  );
}

// ─── Scene ─────────────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <color attach="background" args={["#080604"]} />
      <fog attach="fog" args={["#080604", 14, 26]} />

      {/* Hemisphere ambient – warm ceiling, cool floor */}
      <hemisphereLight args={["#ffaa55", "#221810", 2.5]} />

      {/* Soft base ambient */}
      <ambientLight intensity={1.2} color="#ffaa55" />

      {/* Primary key light – directional from upper-left */}
      <directionalLight
        position={[-4, 6, 2]}
        intensity={2.2}
        color="#ffd0a0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.1}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.001}
      />

      {/* Back wall warm fill */}
      <pointLight position={[0, 3.5, -5.0]} intensity={2.8} color="#ff9944" distance={9} castShadow />

      {/* Ceiling area light simulation */}
      <pointLight position={[-1.5, 5.5, -3.0]} intensity={1.5} color="#ffcc88" distance={10} />
      <pointLight position={[1.5, 5.5, -3.0]} intensity={1.5} color="#ffcc88" distance={10} />

      <Room />
      <Window />
      <WallArt />
      <WallShelf />
      <Desk />
      <DeskLamp />
      <Monitor />
      <SideMonitor />
      <Keyboard />
      <Mouse />
      <RamenBowl />
      <Character />
      <NeonSign />
      <DeskDecor />

      <Lantern position={[1.8, 4.7, -2.2]} />
      <Lantern position={[-0.8, 4.8, -1.6]} />
      <Lantern position={[0.4, 4.9, -4.2]} />
      <Lantern position={[-2.5, 4.6, -3.5]} />

      {/* Floating dust motes */}
      <Sparkles count={40} scale={[7, 4, 6]} position={[0, 2.5, -2.5]} size={0.7} speed={0.05} color="#ffaa66" opacity={0.12} />

      {/* Full 360° orbit — unrestricted azimuth */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.25}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.05}
        minDistance={2}
        maxDistance={10}
        target={[0.3, 1.8, -3.4]}
      />
    </>
  );
}

// ─── Loader ────────────────────────────────────────────────────────────────────
function Loader() {
  return (
    <div className="w-full h-full bg-[#080604] flex flex-col items-center justify-center gap-4 overflow-hidden">
      <div className="flex flex-col items-center gap-3">
        {/* Fake monitor outline */}
        <div className="w-40 h-24 border border-zinc-800 flex flex-col justify-center items-start gap-1.5 px-3 animate-pulse">
          <div className="h-1 w-20 bg-emerald-900/60" />
          <div className="h-1 w-14 bg-purple-900/60" />
          <div className="h-1 w-18 bg-emerald-900/60" />
          <div className="h-1 w-10 bg-yellow-900/60" />
        </div>
        <div className="w-3 h-3 bg-zinc-800/60 animate-pulse" />
        <div className="w-16 h-0.5 bg-zinc-800/60 animate-pulse" />
      </div>
      <div className="flex items-center gap-2 mt-2">
        <div
          className="w-3 h-3 border border-zinc-700 border-t-orange-600/60 animate-spin"
          style={{ borderRadius: 0 }}
        />
        <span className="text-[10px] text-zinc-600 tracking-widest font-mono uppercase">
          Rendering scene…
        </span>
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
          shadows
          camera={{ position: [-3.5, 2.8, 1.5], fov: 44, near: 0.1, far: 30 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
          style={{ width: "100%", height: "100%" }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}