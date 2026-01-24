"use client";

import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MobileLayout from './mobile-layout';
import HeroSection from './hero-section';
import NaturalScrollSection from './natural-scroll-section';
import Navigation from './navigation';
import BiometricSyncHUD from './biometric-sync-hud';

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_BREAKPOINT = 769;
const CANVAS_WIDTH = 1600;

export default function ScalingEngine() {
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const mainRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useLayoutEffect(() => {
    if (windowSize.width < DESKTOP_BREAKPOINT) {
        ScrollTrigger.getAll().forEach(t => t.kill());
        if(sheetRef.current) {
            gsap.set(sheetRef.current, { clearProps: "all" });
        }
        return;
    }

    const sheet = sheetRef.current;
    const main = mainRef.current;
    if (!sheet || !main) return;

    const ctx = gsap.context(() => {
        gsap.to(sheet, {
            yPercent: -100,
            ease: "none",
            scrollTrigger: {
                trigger: main,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
            },
        });
    }, main);

    return () => ctx.revert();

  }, [windowSize]);

  if (windowSize.width === 0) {
    return <div className="bg-background w-full h-screen" />;
  }

  if (windowSize.width < DESKTOP_BREAKPOINT) {
    return <MobileLayout />;
  }

  const scale = windowSize.width / CANVAS_WIDTH;
  const stageHeight = windowSize.height / scale;

  return (
    <div ref={mainRef}>
      {/* Layer 2: Ghost Spacer */}
      <div style={{ height: '6000px' }} />

      {/* Scaled Container */}
      <div
        className="fixed top-0 left-0"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: `${CANVAS_WIDTH}px`,
          height: `${stageHeight}px`,
        }}
      >
        {/* Layer 1: Hero Stage */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <HeroSection />
            <BiometricSyncHUD />
            <Navigation />
        </div>

        {/* Layer 3: The Sheet */}
        <div
            ref={sheetRef}
            className="absolute left-0 w-full bg-accent z-50"
            style={{
                top: `${stageHeight}px`,
                height: `${stageHeight}px`,
            }}
        >
          <NaturalScrollSection />
        </div>
      </div>
    </div>
  );
}
