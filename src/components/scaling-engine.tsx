"use client";

import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import Lenis from 'lenis';
import MobileLayout from './mobile-layout';
import HeroSection from './hero-section';
import EditorialContent from './editorial-content';
import Navigation from './navigation';
import Footer from './footer';

const DESKTOP_BREAKPOINT = 769;
const CANVAS_WIDTH = 1600;

export default function ScalingEngine() {
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
        window.removeEventListener('resize', handleResize);
        lenis.destroy();
    };
  }, []);

  useLayoutEffect(() => {
    if (windowSize.width < DESKTOP_BREAKPOINT) return;
    
    // Height Sync Logic
    const syncHeight = () => {
        if (contentRef.current && wrapperRef.current) {
            const scale = windowSize.width / CANVAS_WIDTH;
            const contentHeight = contentRef.current.offsetHeight;
            // We set the wrapper height to the "scaled" visual height
            wrapperRef.current.style.height = `${contentHeight * scale}px`;
        }
    };

    syncHeight();
    
    // Create a ResizeObserver to handle dynamic content height changes
    const observer = new ResizeObserver(syncHeight);
    if (contentRef.current) {
        observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, [windowSize]);

  if (windowSize.width === 0) return null;

  if (windowSize.width < DESKTOP_BREAKPOINT) {
    return <MobileLayout />;
  }

  const scale = windowSize.width / CANVAS_WIDTH;
  const stageHeight = windowSize.height / scale;

  return (
    <div 
        ref={wrapperRef}
        style={{
            width: '100%',
            overflow: 'hidden', // Hide any potential overflow from the raw unscaled box
            position: 'relative'
        }}
    >
       <div
        ref={contentRef}
        style={{
            width: `${CANVAS_WIDTH}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            position: 'absolute', // Remove from flow so it doesn't push bounds wrongly
            top: 0,
            left: 0,
        }}
      >
         {/* Hero Section */}
         <div style={{ height: `${stageHeight}px`, position: 'relative' }}>
             <Navigation />
             <HeroSection /> 
         </div>
         
         {/* Editorial Content */}
         <div className="relative z-20 bg-[#FAFAFA]">
             <EditorialContent />
             <Footer />
         </div>
      </div>
    </div>
  );
}