"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function IcosahedronWireframe() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.08;
      meshRef.current.rotation.x += delta * 0.03;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 1]} />
      <meshBasicMaterial
        color="#818cf8"
        wireframe
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}

// Generate particle positions deterministically (seeded) to avoid lint purity warnings.
// Uses a simple linear congruential generator for stable output across renders.
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

const PARTICLE_COUNT = 400;
const rand = seededRandom(42);
const POSITIONS = new Float32Array(PARTICLE_COUNT * 3);
const SIZES = new Float32Array(PARTICLE_COUNT);

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const theta = rand() * Math.PI * 2;
  const phi = Math.acos(2 * rand() - 1);
  const r = 1.8 + rand() * 1.5;

  POSITIONS[i * 3] = r * Math.sin(phi) * Math.cos(theta);
  POSITIONS[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
  POSITIONS[i * 3 + 2] = r * Math.cos(phi);
  SIZES[i] = 1 + rand() * 2;
}

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[POSITIONS, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[SIZES, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#06b6d4"
        size={0.06}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

export function ParticleHero() {
  return (
    <group>
      <IcosahedronWireframe />
      <FloatingParticles />
      <ambientLight intensity={0.5} />
    </group>
  );
}
