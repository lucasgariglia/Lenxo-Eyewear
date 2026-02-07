"use client";

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrthographicCamera } from '@react-three/drei';

interface WebGLCanvasProps {
    children: React.ReactNode;
}

export default function WebGLCanvas({ children }: WebGLCanvasProps) {
    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            <Canvas 
                dpr={[1, 2]} 
                gl={{ 
                    antialias: true, 
                    alpha: true, 
                    powerPreference: "high-performance" 
                }}
            >
                <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={1} />
                <Suspense fallback={null}>
                    {children}
                </Suspense>
            </Canvas>
        </div>
    );
}
