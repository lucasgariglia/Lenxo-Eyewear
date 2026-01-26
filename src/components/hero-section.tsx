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
    if (!stageHeight || typeof stageHeight !== 'number') return;

    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      // 1. Initial Load Animation (The "Unveil")
      const introTl = gsap.timeline({ 
        defaults: { ease: "power4.out" },
        onComplete: () => ScrollTrigger.refresh()
      });

      introTl.fromTo(mainImageRef.current, 
        { scale: 1.4, filter: "blur(20px)" },
        { scale: 1, filter: "blur(0px)", duration: 2.5 }
      )
      .fromTo(titleRef.current?.querySelectorAll('.line'),
        { y: 120, opacity: 0, skewY: 5 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.5, stagger: 0.1 },
        "<+0.2"
      );

      if (!isMobile) {
        introTl.fromTo(descRef.current,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 1 },
          "-=1"
        )
        .fromTo(hudRef.current?.querySelectorAll('.hud-item'),
          { opacity: 0 },
          { opacity: 1, duration: 1, stagger: 0.1 },
          "-=0.5"
        );

        // 2. Cinematic Scroll Interaction (Immersive Zoom)
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: stickyWrapperRef.current,
            pinSpacing: false,
            anticipatePin: 1,
            scrub: 1.5,
            animation: gsap.timeline()
                .to(mainImageRef.current, {
                    scale: 1.8, // Immersive "Inside the Lens" Zoom
                    y: 50,
                    filter: "contrast(110%) brightness(80%)",
                    ease: "power2.inOut"
                }, 0)
                .to(titleRef.current, {
                    y: -150,
                    opacity: 0,
                    scale: 0.9,
                    filter: "blur(20px)",
                    ease: "power2.in"
                }, 0)
                .to(descRef.current, {
                    y: 100,
                    opacity: 0,
                    ease: "power2.in"
                }, 0)
                .to(edgeDistortRef.current, {
                    opacity: 1,
                    scale: 1.2,
                    ease: "power2.inOut"
                }, 0)
                .to(hudRef.current, {
                    opacity: 0,
                    y: -50,
                    ease: "power2.in"
                }, 0)
        });
      }

      // Continuous Biometric Scanner
      gsap.to(scannerRef.current, {
        height: "100%",
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

    }, containerRef);

    return () => ctx.revert();
  }, [stageHeight]); // Dependency lock ensures sync with engine

  // Calculate pixel-perfect heights for Chromebooks
  const containerStyle = typeof stageHeight === 'number' 
    ? { height: `${stageHeight * 3}px` } // Increased track for smoother cinematic flow
    : {};
    
  const wrapperStyle = typeof stageHeight === 'number'
    ? { height: `${stageHeight}px`, width: '1600px' }
    : {};

  return (
    <section 
      ref={containerRef} 
      className="relative w-full md:w-[1600px] h-[90vh] md:h-auto bg-black text-white"
      style={containerStyle}
    >
      
      {/* Sticky Wrapper - Viewport Anchor */}
      <div 
        ref={stickyWrapperRef} 
        className="relative md:h-auto w-full overflow-hidden flex flex-col justify-center md:block"
        style={wrapperStyle}
      >
        {/* Chromatic Aberration / Lens Distortion */}
        <div 
            ref={edgeDistortRef}
            className="hidden md:block absolute inset-0 z-50 pointer-events-none opacity-0 mix-blend-overlay transition-opacity"
            style={{
                background: 'radial-gradient(circle at center, transparent 30%, rgba(20, 20, 20, 0.9) 100%)',
                boxShadow: 'inset 0 0 200px rgba(0,0,0,0.8)'
            }}
        ></div>

        {/* 1. Main Subject Layer (The Lens) */}
        <div 
            ref={mainImageRef}
            className="absolute top-0 right-0 w-full md:w-[1200px] h-full z-0 origin-center will-change-transform"
        >
            <Image 
            src="/pictures/hero-glasses.jpg" 
            alt="Absolute Vision" 
            fill 
            className="object-cover"
            priority
            />
            <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black via-black/40 md:via-transparent to-transparent" />
        </div>

        {/* 2. Typography Layer */}
        <div className="relative md:absolute top-auto md:top-[40%] left-0 md:left-[144px] z-10 pointer-events-none px-6 md:px-0">
            <h1 ref={titleRef} className="font-display text-[60px] md:text-[220px] leading-[0.85] md:leading-[0.75] tracking-tighter uppercase md:kinetic-serif mix-blend-difference will-change-transform">
            <div className="overflow-hidden h-[60px] md:h-[180px]">
                <span className="line inline-block">Vision</span>
            </div>
            <div className="overflow-hidden h-[70px] md:h-[200px] mt-2 md:-mt-4 ml-0 md:ml-64 md:px-4">
                <span className="line inline-block italic text-[#C5A880]">Refined</span>
            </div>
            </h1>
        </div>

        {/* 3. Description Layer */}
        <div ref={descRef} className="hidden md:block absolute top-64 right-32 z-30 pointer-events-none text-right">
            <p className="font-sans text-[11px] tracking-[0.5em] text-white/60 leading-relaxed uppercase mix-blend-difference max-w-[320px]">
                Architecting the future of optics through <br/>
                absolute geometric purity and <br/>
                technical materiality.
            </p>
        </div>

        {/* 4. HUD Layer */}
        <div ref={hudRef} className="absolute inset-0 pointer-events-none z-30">
            <div className="hud-item absolute top-40 left-6 md:left-[144px] flex items-center gap-4">
            <span className="w-8 h-[0.5px] bg-white/40"></span>
            <span className="font-mono text-[8px] md:text-[10px] tracking-[0.3em] uppercase text-white/50">Volume No. 01</span>
            </div>

            <div className="hidden md:flex hud-item absolute bottom-12 left-[144px] items-center gap-4">
            <span className="w-8 h-[0.5px] bg-white/40"></span>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/50">Designed in California</span>
            </div>
            
            <div className="hidden md:flex hud-item absolute top-1/2 right-12 -translate-y-1/2 flex-col items-center gap-4">
                <div className="w-[1px] h-40 bg-white/10 relative">
                    <div ref={scannerRef} className="absolute top-0 left-0 w-full bg-[#C5A880] h-0 shadow-[0_0_15px_#C5A880]"></div>
                </div>
                <span className="font-mono text-[8px] vertical-text tracking-[0.5em] uppercase text-white/30">Optical Scanner Active</span>
            </div>

            <div className="hidden md:block hud-item absolute top-0 left-[25%] w-[0.5px] h-full bg-white/5"></div>
        </div>

        {/* Interactive Elements */}
        <div className="hidden md:block absolute bottom-12 right-[8%] z-40">
            <button className="group relative flex items-center gap-6 px-12 py-5 overflow-hidden rounded-full border border-white/20 bg-white/5 backdrop-blur-xl transition-all hover:border-[#C5A880] pointer-events-auto">
                <span className="font-sans text-[11px] font-bold tracking-[0.4em] uppercase transition-colors group-hover:text-[#C5A880]">Explore Archive</span>
                <div className="w-2 h-2 rounded-full bg-[#C5A880] group-hover:scale-150 transition-transform shadow-[0_0_10px_#C5A880]"></div>
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