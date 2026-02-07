"use client";

import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import './optical-material'; // Register the material
import Lenis from 'lenis';

interface HeroGLProps {
    imageUrl: string;
    lenis: Lenis | null;
}

export default function HeroGL({ imageUrl, lenis }: HeroGLProps) {
    const materialRef = useRef<any>(null);
    const texture = useTexture(imageUrl);
    const { viewport, size } = useThree();

    // Responsive plane size (cover)
    const scale = useMemo(() => {
        // Just fill the screen for now
        return [viewport.width, viewport.height, 1];
    }, [viewport]);

    useFrame((state) => {
        if (!materialRef.current) return;
        
        const time = state.clock.getElapsedTime();
        materialRef.current.uTime = time;

        // Sync velocity from Lenis if available
        if (lenis) {
            // Smooth damp the velocity value for the shader
            materialRef.current.uScrollVelocity = THREE.MathUtils.lerp(
                materialRef.current.uScrollVelocity,
                lenis.velocity / 500, // Normalize velocity
                0.1
            );
        }

        materialRef.current.uResolution = new THREE.Vector2(size.width, size.height);
        materialRef.current.uImageResolution = new THREE.Vector2((texture.image as any).width, (texture.image as any).height);
    });

    return (
        <mesh scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1, 32, 32]} />
            <opticalMaterial 
                ref={materialRef} 
                uTexture={texture}
                transparent
            />
        </mesh>
    );
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      opticalMaterial: any;
    }
  }
}
