"use client";

import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import HeroSection from './hero-section';
import EditorialContent from './editorial-content';
import Navigation from './navigation';
import Footer from './footer';
import MobileLayout from './mobile-layout';
import FilmGrain from './ui/film-grain';
import MagneticCursor from './ui/magnetic-cursor';
import { useScalingLogic } from '@/hooks/use-scaling-logic';

const WebGLCanvas = dynamic(() => import('./webgl/webgl-canvas'), { ssr: false });
const HeroGL = dynamic(() => import('./webgl/hero-gl'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const CANVAS_WIDTH = 1600;

export default function ScalingEngine() {
  const [isLoaded, setIsLoaded] = useState(true);
  const [isEngineReady, setIsEngineReady] = useState(false);
  // Force a re-render to pass the lenis ref to WebGL
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lightLeakRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Use the extracted logic hook
  const { isMobile, scale, stageHeight } = useScalingLogic(wrapperRef, contentRef);

  // 1. Initialize Lenis & GSAP Sync
  useLayoutEffect(() => {
    if (isMobile) {
        setIsEngineReady(true);
        return;
    }

    // NUCLEAR RESET: Kill all existing triggers to prevent conflicts
    ScrollTrigger.getAll().forEach(t => t.kill());
    ScrollTrigger.clearScrollMemory();
    window.scrollTo(0, 0);

    // Prevent browser from restoring scroll position automatically
    if (typeof history !== 'undefined') {
        history.scrollRestoration = 'manual';
    }

    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // Immediately stop if not loaded
    if (!isLoaded) lenis.stop();

    // REMOVED: ScrollTrigger.scrollerProxy
    // Reason: Lenis scrolls the native window by default. The scrollerProxy was creating 
    // stale closure issues upon SPA navigation (reading from destroyed Lenis instances).
    // The gsap.ticker sync below is sufficient for frame-perfect alignment.

    // Refresh GSAP after setup to ensure all triggers bind correctly
    ScrollTrigger.refresh();

    // Signal that the engine is ready for children to mount
    setIsEngineReady(true);

    // Use GSAP's ticker for Lenis animations to ensure perfect sync
    // We create a named function to ensure we can remove it correctly on cleanup
    const update = (time: number, deltaTime: number, frame: number) => {
        lenis.raf(time * 1000);
        ScrollTrigger.update();
    };
    
    gsap.ticker.add(update);

    // Disable lag smoothing to prevent jumps
    gsap.ticker.lagSmoothing(0);

    lenis.on('scroll', ({ velocity }: { velocity: number }) => {
        const v = Math.abs(velocity);
        if (lightLeakRef.current) {
             gsap.to(lightLeakRef.current, {
                opacity: Math.min(v * 0.05, 0.3),
                x: velocity * 2,
                duration: 1,
                ease: "power2.out",
                overwrite: 'auto'
            });
        }
    });

    return () => {
        // Clean up GSAP integration
        gsap.ticker.remove(update);
        lenis.destroy();
        lenisRef.current = null;
        setLenisInstance(null);
        if (typeof history !== 'undefined') {
            history.scrollRestoration = 'auto';
        }
    };
  }, [isMobile]); // Removing isLoaded from deps to prevent re-initialization

  // 2. Control Scroll based on Loading State
  useEffect(() => {
    if (lenisRef.current && isEngineReady) {
        if (isLoaded) {
            // CRITICAL: Clear GSAP's cached scroll positions
            ScrollTrigger.clearScrollMemory();
            
            lenisRef.current.start();
            // Force browser to top
            window.scrollTo(0, 0);
            lenisRef.current.scrollTo(0, { immediate: true });
            
            // Immediate refresh to catch initial layout
            ScrollTrigger.refresh();
            
            // Allow layout to settle before final refresh
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 500);
        } else {
            lenisRef.current.stop();
        }
    }
  }, [isLoaded, isEngineReady]);

  // Initial render guard
  if (scale === 0 && !isMobile) return null;

  if (isMobile) {
    return <MobileLayout />;
  }

  return (
    <>
      <FilmGrain />
      {!isMobile && <MagneticCursor />}
      {!isMobile && (
        <WebGLCanvas>
             <HeroGL imageUrl="/pictures/hero-final-vision.jpg" lenis={lenisInstance} />
        </WebGLCanvas>
      )}

      {/* Cinematic Gradient Overlays (Global - Always on top of WebGL) */}
      {!isMobile && (
        <>
            <div className="fixed inset-0 bg-black/30 pointer-events-none z-[1]" />
            <div className="fixed inset-0 bg-gradient-to-r from-black/95 via-black/40 to-black/95 pointer-events-none z-[1]" />
        </>
      )}

      <div 
          ref={wrapperRef}
          className={`relative z-10 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'} cursor-none`}
          style={{
              width: '100%',
              position: 'relative',
              isolation: 'auto',
          }}
      >
         {/* Navigation Wrapper - Unified Blend Unit */}
         <div 
            className={`fixed top-0 left-0 z-[10010] w-full mix-blend-difference`}
            style={{ 
                width: `${CANVAS_WIDTH}px`, 
                transform: `scale(${scale})`, 
                transformOrigin: 'top left',
                pointerEvents: 'none'
            }}
         >
            <div className="pointer-events-auto">
                <Navigation />
            </div>
         </div>

         {/* Anamorphic Light Leak Layer - Desktop Only */}
         <div 
            ref={lightLeakRef}
            className="fixed inset-0 pointer-events-none z-[9998] opacity-0"
            style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(197, 168, 128, 0.05) 45%, rgba(197, 168, 128, 0.1) 50%, rgba(197, 168, 128, 0.05) 55%, transparent 100%)',
                filter: 'blur(100px)',
                transform: 'scaleX(2)'
            }}
         ></div>

         <div
          ref={contentRef}
          className="absolute top-0 left-0"
          style={{
              // Styles handled by useScalingLogic, except for initial render
              width: `${CANVAS_WIDTH}px`,
              transformOrigin: 'top left',
          }}
        >
           {isEngineReady && (
             <>
               <div style={{ position: 'relative' }}>
                   <HeroSection stageHeight={stageHeight} /> 
               </div>
               
               <div className="relative z-20 bg-[#FAFAFA]">
                   <EditorialContent />
                   <Footer />
               </div>
             </>
           )}
        </div>
      </div>
    </>
  );
}