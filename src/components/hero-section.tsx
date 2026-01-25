"use client";

import React, { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const secondaryImageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Animation
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(mainImageRef.current, 
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2 }
      )
      .fromTo(secondaryImageRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5 },
        "-=1.5"
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
        y: -20,
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="absolute top-0 left-0 w-[1600px] h-full overflow-hidden bg-black text-white">
      {/* 1. Main Subject - The Glasses (Quadrant 2) */}
      <div 
        ref={mainImageRef}
        className="absolute top-20 right-20 w-[800px] h-[500px] z-0 overflow-hidden border border-white/5"
      >
        <Image 
          src="/pictures/hero-glasses.jpg" 
          alt="Absolute Vision" 
          fill 
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* 2. Secondary Subject - The Model (Quadrant 4) */}
      <div 
        ref={secondaryImageRef}
        className="absolute bottom-20 right-[450px] w-[340px] h-[440px] z-20 overflow-hidden border border-white/10 shadow-2xl"
      >
        <Image 
          src="/pictures/hero-fashion.jpg" 
          alt="Detail" 
          fill 
          className="object-cover scale-110 opacity-90"
        />
      </div>

      {/* 3. Hero Typography - Left Anchor (Quadrant 1 & 3) */}
      <div className="absolute top-[25%] left-[6%] z-10 pointer-events-none">
        <h1 ref={titleRef} className="font-display text-[190px] leading-[0.75] tracking-tighter uppercase">
          <div className="overflow-hidden h-[150px]">
            <span className="line inline-block">Vision</span>
          </div>
          <div className="overflow-hidden h-[150px] ml-32">
            <span className="line inline-block italic text-[#C5A880]">Refined</span>
          </div>
        </h1>
        
        <div className="overflow-hidden mt-24 ml-36">
          <p className="line max-w-sm font-sans text-[10px] tracking-[0.4em] text-white/40 leading-relaxed uppercase">
            Architecting the future of optics through <br/>
            absolute geometric purity and <br/>
            technical materiality.
          </p>
        </div>
      </div>

      {/* Refined HUD Elements - Golden Ratio Anchors */}
      <div ref={hudRef} className="absolute inset-0 pointer-events-none z-30">
        {/* Top Left Label */}
        <div className="hud-item absolute top-12 left-12 flex items-center gap-4">
          <span className="w-8 h-[0.5px] bg-white/40"></span>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/50">Volume No. 01</span>
        </div>

        {/* Bottom Right Label */}
        <div className="hud-item absolute bottom-12 right-12 flex items-center gap-4">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/50">Designed in California</span>
          <span className="w-8 h-[0.5px] bg-white/40"></span>
        </div>

        {/* Diagonal hairlines for "Magazine" structure */}
        <div className="hud-item absolute top-[20%] left-[45%] w-[1px] h-40 bg-gradient-to-b from-white/20 to-transparent"></div>
        <div className="hud-item absolute bottom-[15%] right-[40%] w-40 h-[1px] bg-gradient-to-l from-white/20 to-transparent"></div>
      </div>

      {/* CTA Button */}
      <div className="absolute bottom-12 left-[10%] z-40">
        <button className="group relative flex items-center gap-4 px-10 py-4 overflow-hidden rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-all hover:border-[#C5A880]">
          <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase transition-colors group-hover:text-[#C5A880]">Explore Series</span>
          <div className="w-2 h-2 rounded-full bg-[#C5A880] group-hover:scale-150 transition-transform"></div>
        </button>
      </div>
    </section>
  );
}