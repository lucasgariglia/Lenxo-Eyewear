"use client";

import React, { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ stageHeight }: { stageHeight?: number | string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyWrapperRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);
  const edgeDistortRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // 1. Guard: Ensure engine is ready
    if (!stageHeight || typeof stageHeight !== 'number') return;

    const ctx = gsap.context(() => {
      // 2. Initial Load Animation (The "Unveil")
      const introTl = gsap.timeline({ 
        defaults: { ease: "power4.out" },
        onComplete: () => ScrollTrigger.refresh()
      });

      introTl.fromTo(mainImageRef.current, 
        { scale: 1.4, filter: "blur(20px)" },
        { scale: 1, filter: "blur(0px)", duration: 2.5 }
      )
      .fromTo(titleRef.current?.querySelectorAll('.line'),
        { y: 150, opacity: 0, skewY: 7 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.5, stagger: 0.15 },
        "<+0.3"
      );

      // 3. Cinematic Scroll Interaction (Inside the Lens)
      // Triggered by the 1600px scaled container
      ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: stickyWrapperRef.current,
          pinSpacing: false, // Architectural Mandate: Maintain height integrity
          pinType: "transform", // CRITICAL: Fixed fails inside scaled parents
          anticipatePin: 1,
          scrub: 1.2,
          animation: gsap.timeline()
              .to(mainImageRef.current, {
                  scale: 2.2, // Immersive "Inside the Lens" Zoom
                  x: -50,
                  y: 100,
                  filter: "contrast(115%) brightness(70%)",
                  ease: "power2.inOut"
              }, 0)
              .to(titleRef.current, {
                  y: -250,
                  opacity: 0,
                  scale: 0.85,
                  filter: "blur(30px)",
                  ease: "power2.in"
              }, 0)
              .to(descRef.current, {
                  y: 150,
                  opacity: 0,
                  ease: "power2.in"
              }, 0)
              .to(edgeDistortRef.current, {
                  opacity: 1,
                  scale: 1.3,
                  ease: "power2.inOut"
              }, 0)
              .to(hudRef.current, {
                  opacity: 0,
                  scale: 1.1,
                  y: -100,
                  ease: "power2.in"
              }, 0)
      });

      // 4. Continuous Technical Motion
      gsap.to(scannerRef.current, {
        height: "100%",
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

    }, containerRef);

    return () => ctx.revert();
  }, [stageHeight]);

  // Absolute Scaling Engine Geometry
  const containerStyle = typeof stageHeight === 'number' 
    ? { height: `${stageHeight * 3.5}px`, width: '1600px' } 
    : { width: '1600px' };
    
  const wrapperStyle = typeof stageHeight === 'number'
    ? { height: `${stageHeight}px`, width: '1600px' }
    : { width: '1600px' };

  return (
    <section 
      ref={containerRef} 
      className="relative bg-black text-white overflow-visible"
      style={containerStyle}
    >
      
      {/* Sticky Stage Wrapper - The Master Anchor */}
      <div 
        ref={stickyWrapperRef} 
        className="relative overflow-hidden md:block"
        style={wrapperStyle}
      >
        {/* Optical Distortion Layer */}
        <div 
            ref={edgeDistortRef}
            className="absolute inset-0 z-50 pointer-events-none opacity-0 mix-blend-overlay"
            style={{
                background: 'radial-gradient(circle at center, transparent 20%, rgba(10, 10, 10, 0.95) 100%)',
                boxShadow: 'inset 0 0 300px rgba(0,0,0,0.9)'
            }}
        ></div>

        {/* 1. Cinematic Asset Layer (The Subject) */}
        <div 
            ref={mainImageRef}
            className="absolute top-0 right-0 w-[1300px] h-full z-0 origin-center will-change-transform"
        >
            <Image 
            src="/pictures/hero-glasses.jpg" 
            alt="Absolute Vision" 
            fill 
            className="object-cover"
            priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent" />
        </div>

        {/* 2. Editorial Typography Layer */}
        <div className="absolute top-[240px] left-[144px] z-10 pointer-events-none">
            <h1 ref={titleRef} className="font-display text-[240px] leading-[0.75] tracking-tighter uppercase kinetic-serif mix-blend-difference will-change-transform">
            <div className="overflow-hidden h-[200px]">
                <span className="line inline-block">Vision</span>
            </div>
            <div className="overflow-hidden h-[220px] -mt-4 ml-64 px-4">
                <span className="line inline-block italic text-[#C5A880]">Refined</span>
            </div>
            </h1>
        </div>

        {/* 3. Narrative Description */}
        <div ref={descRef} className="absolute top-[280px] right-[144px] z-30 pointer-events-none text-right">
            <p className="font-sans text-[11px] tracking-[0.5em] text-white/50 leading-relaxed uppercase mix-blend-difference max-w-[340px]">
                Architecting the future of optics through <br/>
                absolute geometric purity and <br/>
                technical materiality.
            </p>
        </div>

        {/* 4. Golden Ratio HUD Layer */}
        <div ref={hudRef} className="absolute inset-0 pointer-events-none z-30">
            {/* Volume Label */}
            <div className="hud-item absolute top-[160px] left-[144px] flex items-center gap-6">
                <div className="w-12 h-[0.5px] bg-white/30"></div>
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40">Volume No. 01</span>
            </div>

            {/* Origin Label */}
            <div className="hud-item absolute bottom-[80px] left-[144px] flex items-center gap-6">
                <div className="w-12 h-[0.5px] bg-white/30"></div>
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40">Designed in California</span>
            </div>
            
            {/* Technical Scanner HUD */}
            <div className="hud-item absolute top-[400px] right-[80px] -translate-y-1/2 flex flex-col items-center gap-8">
                <div className="w-[1px] h-[320px] bg-white/5 relative">
                    <div ref={scannerRef} className="absolute top-0 left-0 w-full bg-[#C5A880] h-0 shadow-[0_0_20px_#C5A880]"></div>
                </div>
                <span className="font-mono text-[9px] vertical-text tracking-[0.6em] uppercase text-white/20">Optical_Engine_Active</span>
            </div>

            {/* Grid Alignment Marker */}
            <div className="hud-item absolute top-0 left-[400px] w-[0.5px] h-full bg-white/5"></div>
        </div>

        {/* 5. Immersive Interactions (The Call to Action) */}
        <div className="absolute bottom-[80px] right-[144px] z-40">
            <button className="group relative flex items-center gap-8 px-14 py-6 overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl transition-all hover:border-[#C5A880] pointer-events-auto">
                <span className="font-sans text-[12px] font-bold tracking-[0.5em] uppercase transition-colors group-hover:text-[#C5A880]">Explore Archive</span>
                <div className="w-2.5 h-2.5 rounded-full bg-[#C5A880] group-hover:scale-[1.8] transition-transform shadow-[0_0_15px_#C5A880]"></div>
            </button>
        </div>
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
