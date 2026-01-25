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
        { x: 100, opacity: 0 },
        { x: 0, opacity: 0.6, duration: 2 }
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

      // Continuous Subtle Motion
      gsap.to(mainImageRef.current, {
        x: -20,
        duration: 10,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="absolute top-0 left-0 w-[1600px] h-full overflow-hidden bg-black text-white">
      {/* 1. Main Subject - Asymmetric Background (Right Side) */}
      <div 
        ref={mainImageRef}
        className="absolute top-0 right-0 w-[1000px] h-full z-0"
      >
        <Image 
          src="/pictures/hero-glasses.jpg" 
          alt="Absolute Vision" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
      </div>

      {/* 2. Hero Typography - Left Anchor */}
      <div className="absolute top-[35%] left-[8%] z-10 pointer-events-none">
        <h1 ref={titleRef} className="font-display text-[200px] leading-[0.75] tracking-tighter uppercase">
          <div className="overflow-hidden h-[160px]">
            <span className="line inline-block">Vision</span>
          </div>
          <div className="overflow-hidden h-[160px] ml-48">
            <span className="line inline-block italic text-[#C5A880]">Refined</span>
          </div>
        </h1>
        
        <div className="overflow-hidden mt-16 ml-52">
          <p className="line max-w-sm font-sans text-[10px] tracking-[0.4em] text-white/40 leading-relaxed uppercase">
            Architecting the future of optics through <br/>
            absolute geometric purity and <br/>
            technical materiality.
          </p>
        </div>
      </div>

      {/* 3. Refined HUD Elements - Positioned to clear the Navigation Logo */}
      <div ref={hudRef} className="absolute inset-0 pointer-events-none z-30">
        {/* Top Left Label - Moved down to top-40 to clear LENXO logo */}
        <div className="hud-item absolute top-40 left-12 flex items-center gap-4">
          <span className="w-8 h-[0.5px] bg-white/40"></span>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/50">Volume No. 01</span>
        </div>

        {/* Bottom Right Label */}
        <div className="hud-item absolute bottom-12 right-12 flex items-center gap-4">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/50">Designed in California</span>
          <span className="w-8 h-[0.5px] bg-white/40"></span>
        </div>
        
        {/* Hairline Divider */}
        <div className="hud-item absolute top-0 left-[25%] w-[0.5px] h-full bg-white/5"></div>
      </div>

      {/* CTA Button - Moved to Bottom Right to clear typography and balance layout */}
      <div className="absolute bottom-12 right-[8%] z-40">
        <button className="group relative flex items-center gap-4 px-10 py-4 overflow-hidden rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-all hover:border-[#C5A880] pointer-events-auto">
          <span className="font-sans text-[10px] font-bold tracking-[0.3em] uppercase transition-colors group-hover:text-[#C5A880]">Explore Archive</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#C5A880] group-hover:scale-150 transition-transform"></div>
        </button>
      </div>
    </section>
  );
}