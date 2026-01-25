"use client";

import React, { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Animation
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(mainImageRef.current, 
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 0.7, duration: 2 }
      )
      .fromTo(titleRef.current?.querySelectorAll('.line'),
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1 },
        "-=1"
      )
      .fromTo(hudRef.current?.querySelectorAll('.hud-item'),
        { opacity: 0 },
        { opacity: 1, duration: 1, stagger: 0.1 },
        "-=0.5"
      );

      // Continuous Subtle Zoom
      gsap.to(mainImageRef.current, {
        scale: 1.05,
        duration: 20,
        ease: "none",
        repeat: -1,
        yoyo: true
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="absolute top-0 left-0 w-[1600px] h-full overflow-hidden bg-black text-white">
      {/* 1. Main Subject - Full Bleed Background (Quadrant 2 Focus) */}
      <div 
        ref={mainImageRef}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <Image 
          src="/pictures/hero-glasses.jpg" 
          alt="Absolute Vision" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      </div>

      {/* 2. Hero Typography - Centered & Lowered to clear Logo */}
      <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10 text-center w-full pointer-events-none">
        <h1 ref={titleRef} className="font-display text-[210px] leading-[0.8] tracking-tighter uppercase mix-blend-difference">
          <div className="overflow-hidden h-[170px]">
            <span className="line inline-block">Vision</span>
          </div>
          <div className="overflow-hidden h-[170px]">
            <span className="line inline-block italic text-[#C5A880]">Refined</span>
          </div>
        </h1>
        
        <div className="overflow-hidden mt-12 flex justify-center">
          <p className="line max-w-lg font-sans text-[10px] tracking-[0.5em] text-white/50 leading-relaxed uppercase">
            Architecting the future of optics through <br/>
            absolute geometric purity and technical materiality.
          </p>
        </div>
      </div>

      {/* 3. Refined HUD Elements */}
      <div ref={hudRef} className="absolute inset-0 pointer-events-none z-30">
        <div className="hud-item absolute top-12 left-12 flex items-center gap-4">
          <span className="w-8 h-[0.5px] bg-white/40"></span>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/50">Volume No. 01</span>
        </div>

        <div className="hud-item absolute bottom-12 right-12 flex items-center gap-4">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/50">Designed in California</span>
          <span className="w-8 h-[0.5px] bg-white/40"></span>
        </div>
      </div>

      {/* CTA Button */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40">
        <button className="group relative flex items-center gap-4 px-12 py-4 overflow-hidden rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-all hover:border-[#C5A880]">
          <span className="font-sans text-[10px] font-bold tracking-[0.3em] uppercase transition-colors group-hover:text-[#C5A880]">Enter Collection</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#C5A880] group-hover:scale-150 transition-transform"></div>
        </button>
      </div>
    </section>
  );
}
