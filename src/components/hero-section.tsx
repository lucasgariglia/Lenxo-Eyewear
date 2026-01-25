"use client";

import React, { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);
  const edgeDistortRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      // Intro Animation
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(mainImageRef.current, 
        { x: isMobile ? 0 : 100, y: isMobile ? 50 : 0, opacity: 0, scale: 1.1 },
        { x: 0, y: 0, opacity: isMobile ? 1 : 0.6, scale: 1, duration: 2.5 }
      )
      .fromTo(titleRef.current?.querySelectorAll('.line'),
        { y: 80, opacity: 0, skewY: 10 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.5, stagger: 0.1 },
        "-=1.5"
      );

      if (!isMobile) {
        tl.fromTo(descRef.current?.querySelectorAll('.line'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=1"
        )
        .fromTo(hudRef.current?.querySelectorAll('.hud-item'),
          { opacity: 0 },
          { opacity: 1, duration: 1, stagger: 0.1 },
          "-=0.5"
        );

        // Kinetic Typography
        gsap.to(titleRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          letterSpacing: "0.05em",
          ease: "none"
        });

        // Chromatic Aberration on Scroll
        gsap.to(edgeDistortRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          opacity: 0.4,
          scale: 1.02,
          ease: "none"
        });

        // Section Push Transition
        gsap.to(containerRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "bottom bottom",
            end: "bottom top",
            scrub: true,
          },
          scale: 0.95,
          opacity: 0.5,
          ease: "none"
        });
      }

      // Biometric Scanner Animation
      gsap.to(scannerRef.current, {
        height: "100%",
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      // Continuous Subtle Motion
      gsap.to(mainImageRef.current, {
        x: isMobile ? 0 : -40,
        y: isMobile ? -20 : 0,
        duration: 20,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const goldenPadding = "144px";

  return (
    <section ref={containerRef} className="relative md:absolute top-0 left-0 w-full md:w-[1600px] h-[80vh] md:h-full overflow-hidden bg-black text-white flex flex-col justify-center md:block">
      {/* Chromatic Aberration Edge Overlay - Desktop Only */}
      <div 
        ref={edgeDistortRef}
        className="hidden md:block absolute inset-0 z-50 pointer-events-none opacity-0 border-[40px] border-transparent"
        style={{
            boxShadow: 'inset 0 0 100px rgba(255,0,0,0.1), inset 0 0 100px rgba(0,0,255,0.1)',
            filter: 'blur(20px)'
        }}
      ></div>

      {/* 1. Main Subject */}
      <div 
        ref={mainImageRef}
        className="absolute top-0 right-0 w-full md:w-[1000px] h-full z-0"
      >
        <Image 
          src="/pictures/hero-glasses.jpg" 
          alt="Absolute Vision" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black via-black/20 md:via-transparent to-transparent" />
      </div>

      {/* 2. Hero Typography */}
      <div className="relative md:absolute top-auto md:top-[35%] left-0 md:left-[9%] z-10 pointer-events-none px-6 md:px-0" style={{ left: typeof window !== 'undefined' && window.innerWidth < 768 ? '0' : goldenPadding }}>
        <h1 ref={titleRef} className="font-display text-[60px] md:text-[200px] leading-[0.85] md:leading-[0.75] tracking-tighter uppercase md:kinetic-serif mix-blend-difference">
          <div className="overflow-hidden h-[60px] md:h-[160px]">
            <span className="line inline-block">Vision</span>
          </div>
          <div className="overflow-hidden h-[70px] md:h-[180px] mt-2 md:-mt-4 ml-0 md:ml-48 md:px-4">
            <span className="line inline-block italic text-[#C5A880]">Refined</span>
          </div>
        </h1>
        
        {/* Mobile-only CTA */}
        <div className="mt-12 md:hidden pointer-events-auto">
            <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-[10px] tracking-widest uppercase">
                Explore Collection
            </button>
        </div>
      </div>

      {/* 2.1 Description - Desktop Only */}
      <div ref={descRef} className="hidden md:block absolute top-48 right-32 z-30 pointer-events-none text-right">
        <div className="overflow-hidden">
          <p className="line max-w-[280px] font-sans text-[10px] tracking-[0.4em] text-white/60 leading-relaxed uppercase mix-blend-difference">
            Architecting the future of optics through <br/>
            absolute geometric purity and <br/>
            technical materiality.
          </p>
        </div>
      </div>

      {/* 3. HUD Elements - Desktop Optimized */}
      <div ref={hudRef} className="absolute inset-0 pointer-events-none z-30">
        <div className="hud-item absolute top-40 left-6 md:left-12 flex items-center gap-4" style={{ left: typeof window !== 'undefined' && window.innerWidth < 768 ? '24px' : goldenPadding }}>
          <span className="w-8 h-[0.5px] bg-white/40"></span>
          <span className="font-mono text-[8px] md:text-[10px] tracking-[0.3em] uppercase text-white/50">Volume No. 01</span>
        </div>

        <div className="hidden md:flex hud-item absolute bottom-12 left-12 items-center gap-4" style={{ left: goldenPadding }}>
          <span className="w-8 h-[0.5px] bg-white/40"></span>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/50">Designed in California</span>
        </div>
        
        {/* Technical Biometric HUD - Desktop Only */}
        <div className="hidden md:flex hud-item absolute top-1/2 right-12 -translate-y-1/2 flex-col items-center gap-4">
            <div className="w-[1px] h-40 bg-white/10 relative">
                <div ref={scannerRef} className="absolute top-0 left-0 w-full bg-[#C5A880] h-0 shadow-[0_0_15px_#C5A880]"></div>
            </div>
            <span className="font-mono text-[8px] vertical-text tracking-[0.5em] uppercase text-white/30">Optical Scanner Active</span>
        </div>

        <div className="hidden md:block hud-item absolute top-0 left-[25%] w-[0.5px] h-full bg-white/5"></div>
      </div>

      <div className="hidden md:block absolute bottom-12 right-[5%] z-40">
        <button className="group relative flex items-center gap-4 px-10 py-4 overflow-hidden rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-all hover:border-[#C5A880] pointer-events-auto">
          <span className="font-sans text-[10px] font-bold tracking-[0.3em] uppercase transition-colors group-hover:text-[#C5A880]">Explore Archive</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#C5A880] group-hover:scale-150 transition-transform"></div>
        </button>
      </div>

      <style jsx>{`
        .vertical-text {
            writing-mode: vertical-rl;
            text-orientation: mixed;
        }
      `}</style>
    </section>
  );
}