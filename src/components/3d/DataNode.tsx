'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedNode() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Icosahedron ref={meshRef} args={[1.5, 2]}>
        <MeshDistortMaterial
          color="#00ffa3"
          emissive="#00ffa3"
          emissiveIntensity={0.5}
          wireframe={true}
          transparent
          opacity={0.8}
          distort={0.4}
          speed={2}
        />
      </Icosahedron>
      
      {/* A solid core inside the wireframe */}
      <Icosahedron args={[0.8, 1]}>
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </Icosahedron>
    </Float>
  );
}

export default function DataNode3D() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#00ffa3" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#4ade80" />
        <AnimatedNode />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
