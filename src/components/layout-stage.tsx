"use client";

import React, { useRef, useLayoutEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScalingLogic } from '@/hooks/use-scaling-logic';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import FilmGrain from '@/components/ui/film-grain';
import MagneticCursor from '@/components/ui/magnetic-cursor';

gsap.registerPlugin(ScrollTrigger);

const CANVAS_WIDTH = 1600;

export default function LayoutStage({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const { isMobile, scale } = useScalingLogic(wrapperRef, contentRef);

  // Initialize Lenis
  useLayoutEffect(() => {
    if (isMobile) return;

    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

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

    ScrollTrigger.refresh();

    // Ensure we start at the top on mount
    lenis.scrollTo(0, { immediate: true });

    const update = (time: number) => {
        lenis.raf(time * 1000);
        ScrollTrigger.update();
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
        gsap.ticker.remove(update);
        lenis.destroy();
    };
  }, [isMobile]);

  if (scale === 0 && !isMobile) return null;

  return (
    <>
      <FilmGrain />
      {!isMobile && <MagneticCursor />}
      
      <div 
          ref={wrapperRef}
          className={`relative w-full opacity-100 ${!isMobile ? 'cursor-none' : ''}`} // Only hide cursor if not mobile
          style={{
              width: '100%',
              position: 'relative',
              isolation: 'auto',
          }}
      >
         {/* Navigation - Always Pinned/Scaled */}
         <div 
            className="fixed top-0 left-0 z-[10010] w-full mix-blend-difference"
            style={{ 
                width: isMobile ? '100%' : `${CANVAS_WIDTH}px`, 
                transform: isMobile ? 'none' : `scale(${scale})`, 
                transformOrigin: 'top left',
                pointerEvents: 'none'
            }}
         >
            <div className="pointer-events-auto">
                <Navigation />
            </div>
         </div>

         {/* Content Stage */}
         <div
          ref={contentRef}
          className={isMobile ? "relative w-full" : "absolute top-0 left-0"}
          style={{
              width: isMobile ? '100%' : `${CANVAS_WIDTH}px`,
              transformOrigin: 'top left',
              backgroundColor: '#050505', // Default dark background for inner pages
              minHeight: '100vh',
          }}
        >
           {/* Padding for Nav */}
           <div className="pt-[140px]">
               {children}
           </div>
           
           <Footer />
        </div>
      </div>
    </>
  );
}
