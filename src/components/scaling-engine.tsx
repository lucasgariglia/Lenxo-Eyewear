"use client";

import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from './hero-section';
import EditorialContent from './editorial-content';
import Navigation from './navigation';
import Footer from './footer';
import ManifestoPreloader from './manifesto-preloader';
import MobileLayout from './mobile-layout';
import { useScalingLogic } from '@/hooks/use-scaling-logic';

gsap.registerPlugin(ScrollTrigger);

const CANVAS_WIDTH = 1600;

export default function ScalingEngine() {
  const [isLoaded, setIsLoaded] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const lightLeakRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Use the extracted logic hook
  const { isMobile, scale, stageHeight } = useScalingLogic(wrapperRef, contentRef);

  // 1. Initialize Lenis & GSAP Sync
  useLayoutEffect(() => {
    if (isMobile) return;

    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    // Immediately stop if not loaded
    if (!isLoaded) lenis.stop();

    // -- SCROLLER PROXY LOCK --
    // This is critical. It tells ScrollTrigger to ask Lenis for the scroll position
    // instead of the native window, ensuring they are perfectly in sync.
    ScrollTrigger.scrollerProxy(window, {
        scrollTop(value) {
            if (arguments.length) {
                lenis.scrollTo(value as number, { immediate: true });
            }
            return lenis.scroll;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        }
    });

    // Refresh GSAP after proxy setup to ensure all triggers bind correctly
    ScrollTrigger.refresh();

    // Use GSAP's ticker for Lenis animations to ensure perfect sync
    // We remove lenis.on('scroll', ScrollTrigger.update) to avoid double-firing/jitter
    // as ScrollTrigger automatically listens to the native window scroll event which Lenis drives.
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
        ScrollTrigger.update(); // Update ScrollTrigger on every frame of Lenis
    });

    // Disable lag smoothing to prevent jumps
    gsap.ticker.lagSmoothing(0);

    const moveCursor = (e: MouseEvent) => {
        gsap.to(cursorRef.current, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.6,
            ease: "power3.out"
        });
    };
    window.addEventListener('mousemove', moveCursor);

    lenis.on('scroll', ({ velocity }: { velocity: number }) => {
        const v = Math.abs(velocity);
        gsap.to(lightLeakRef.current, {
            opacity: Math.min(v * 0.05, 0.3),
            x: velocity * 2,
            duration: 1,
            ease: "power2.out"
        });
    });

    return () => {
        window.removeEventListener('mousemove', moveCursor);
        // Clean up GSAP integration
        gsap.ticker.remove(lenis.raf);
        lenis.destroy();
        lenisRef.current = null;
    };
  }, [isMobile]); // Removing isLoaded from deps to prevent re-initialization

  // 2. Control Scroll based on Loading State
  useEffect(() => {
    if (lenisRef.current) {
        if (isLoaded) {
            lenisRef.current.start();
        } else {
            lenisRef.current.stop();
        }
    }
  }, [isLoaded]);

  // Initial render guard
  if (scale === 0 && !isMobile) return null;

  if (isMobile) {
    return <MobileLayout />;
  }

  return (
    <>
      {!isLoaded && <ManifestoPreloader onComplete={() => setIsLoaded(true)} />}
      
      <div 
          ref={wrapperRef}
          className={`digital-grain transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'} cursor-none`}
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

         {/* Focus Ring Cursor - Desktop Only */}
         <div 
            ref={cursorRef}
            className="fixed top-0 left-0 w-12 h-12 border border-[#C5A880]/40 rounded-full pointer-events-none z-[10000] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        >
            <div className="w-1 h-1 bg-[#C5A880] rounded-full"></div>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[6px] tracking-widest text-[#C5A880] opacity-40 uppercase">Focus_Active</div>
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
           <div style={{ position: 'relative' }}>
               <HeroSection stageHeight={stageHeight} /> 
           </div>
           
           <div className="relative z-20 bg-[#FAFAFA]">
               <EditorialContent />
               <Footer />
           </div>
        </div>
      </div>
    </>
  );
}