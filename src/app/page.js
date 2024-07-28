'use client';
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Plane, SoftShadows } from '@react-three/drei';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

import CanvasLoader from './Loader';

export default function Home() {
  return (
    <main className="h-screen">
      <BikeCanvas />
    </main>
  );
}

const Bike = () => {
  const bike = useGLTF('/bike/scene.gltf');
  const bikeRef = useRef();

  useFrame((state) => {
    if (bikeRef.current) {
      bikeRef.current.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });
    }
  });

  return (
    <primitive ref={bikeRef} object={bike.scene} scale={10} position={[0, -5, 0]} />
  );
}

function Ground() {
  return (
    <Plane 
      receiveShadow 
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, -10.6, 0]} 
      args={[100, 100]}
    >
      <meshStandardMaterial color="#eeeee4" roughness={1} metalness={0} />
    </Plane>
  )
}

const BikeCanvas = () => {
  return (
    <Canvas
      frameloop='demand'
      shadows
      camera={{position: [20, 3, 5], fov: 65}}
      gl={{preserveDrawingBuffer: true}}
    >
      <SoftShadows size={10} samples={16} focus={0.5} />
      <color attach="background" args={['#f0f0f0']} />
      <fog attach="fog" args={['#f0f0f0', 10, 60]} />
      {/* <ambientLight intensity={0.5} /> */}
      <directionalLight
        castShadow
        position={[12, 5, 2]}
        intensity={2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <Suspense fallback={<CanvasLoader />}>
        <Environment preset="city" />
        <OrbitControls 
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 6}
        />
        <Bike />
        <Ground />
      </Suspense>
      <Preload all />
    </Canvas>
  )
}