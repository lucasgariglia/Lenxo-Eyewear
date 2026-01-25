"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, extend, ReactThreeFiber } from "@react-three/fiber";
import { useTexture, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// --- Shader Definition ---
const LiquidDistortionMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uTime: 0,
    uHover: 0, // 0 to 1
    uMouse: new THREE.Vector2(0, 0),
    uResolution: new THREE.Vector2(1, 1),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying float vWave;
    uniform float uTime;
    uniform float uHover;
    uniform vec2 uMouse;

    void main() {
      vUv = uv;

      // Distance from mouse
      vec3 pos = position;
      
      // Simple sine wave flow
      float noiseFreq = 2.0;
      float noiseAmp = 0.05; // Base subtle movement
      vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
      
      // Combine with hover/interaction if desired (for now just continuous flow)
      pos.z += sin(pos.y * 3.0 + uTime) * 0.05;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform float uHover;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      // Liquid effect via UV distortion
      float wave = sin(uv.y * 10.0 + uTime) * 0.005;
      float waveX = cos(uv.x * 10.0 + uTime) * 0.005;
      
      uv.x += wave;
      uv.y += waveX;
      
      // RGB Shift (Chromatic Aberration) based on movement
      float rgbShift = 0.01 + uHover * 0.02;
      
      float r = texture2D(uTexture, uv + vec2(rgbShift, 0.0)).r;
      float g = texture2D(uTexture, uv).g;
      float b = texture2D(uTexture, uv - vec2(rgbShift, 0.0)).b;

      vec3 color = vec3(r, g, b);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ LiquidDistortionMaterial });

// Add to TypeScript JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      liquidDistortionMaterial: ReactThreeFiber.Object3DNode<
        THREE.ShaderMaterial,
        typeof LiquidDistortionMaterial
      >;
    }
  }
}

const Scene = ({ imagePath }: { imagePath: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // Load texture
  const texture = useTexture(imagePath);
  
  // Fix texture aspect ratio (cover logic equivalent)
  const { width, height } = texture.image;
  
  // Viewport is normalized in R3F by default if we use a Plane covering screen?
  // Actually, simpler to just use a standard Plane and scale it.
  // For this demo, we assume the plane fills the view.

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime() * 0.5;
      // We could hook up uHover to mouse position here for interaction
    }
  });

  return (
    <mesh ref={meshRef} scale={[16, 9, 1]}> 
      {/* Aspect ratio 16:9 roughly to cover our 1600px stage usually, 
          but best is to measure viewport. For strict absolute engine, 
          we can hardcode a large plane that covers the 1600x900 stage. */}
      <planeGeometry args={[1, 1, 32, 32]} />
      <liquidDistortionMaterial
        ref={materialRef}
        uTexture={texture}
        transparent
      />
    </mesh>
  );
};

// --- Main Component ---
interface LiquidHeroProps {
  className?: string;
  image: string;
}

export default function LiquidHero({ className, image }: LiquidHeroProps) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 1] }}> 
      {/* 
         Orthographic camera is often better for 2D-like image planes, 
         but Perspective gives depth for the liquid z-movement. 
         Let's stick to default Perspective but adjust FOV/Distance if needed.
         Actually, creating a full screen quad is easiest. 
      */}
        <Scene imagePath={image} />
      </Canvas>
    </div>
  );
}
