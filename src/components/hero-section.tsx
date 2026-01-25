"use client";

import React, { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        // 1. Image Intro & Continuous Zoom
        gsap.fromTo(imageRef.current, 
            { scale: 1.1, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" }
        );

        gsap.to(imageRef.current, {
            scale: 1.05,
            duration: 20,
            ease: "none",
            repeat: -1,
            yoyo: true,
            delay: 1.5
        });

        // 2. Text Reveal
        const tl = gsap.timeline({ delay: 0.5 });
        const chars = textRef.current?.querySelectorAll('.char');
        
        if (chars) {
            tl.fromTo(chars, 
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.05, ease: "power4.out" }
            );
        }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="absolute top-0 left-0 w-[1600px] h-full overflow-hidden bg-black text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-80">
        <Image 
            ref={imageRef as any}
            src="/pictures/hero-glasses.jpg" 
            alt="Absolute Vision" 
            fill 
            className="object-cover"
            priority
        />
        <div className="absolute inset-0 bg-black/20" /> {/* Cinematic tint */}
      </div>

      {/* Hero Typography - Centered Absolute */}
      <div 
        ref={textRef}
        className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10 text-center w-full"
      >
        <h1 className="font-display text-[160px] leading-[0.85] tracking-tighter uppercase mix-blend-difference">
            <div className="overflow-hidden h-[140px]">
                <span className="char inline-block">V</span>
                <span className="char inline-block">I</span>
                <span className="char inline-block">S</span>
                <span className="char inline-block">I</span>
                <span className="char inline-block">O</span>
                <span className="char inline-block">N</span>
            </div>
            <div className="overflow-hidden h-[140px] mt-2">
                <span className="char inline-block italic text-[#C5A880]">R</span>
                <span className="char inline-block italic text-[#C5A880]">E</span>
                <span className="char inline-block italic text-[#C5A880]">F</span>
                <span className="char inline-block italic text-[#C5A880]">I</span>
                <span className="char inline-block italic text-[#C5A880]">N</span>
                <span className="char inline-block italic text-[#C5A880]">E</span>
                <span className="char inline-block italic text-[#C5A880]">D</span>
            </div>
        </h1>
      </div>

      {/* HUD Elements */}
      <div className="absolute bottom-12 left-12 z-20 flex flex-col gap-2">
         <div className="w-12 h-[1px] bg-white/50 mb-4"></div>
         <span className="font-mono text-xs tracking-widest uppercase text-white/70">
            Est. 2026
         </span>
         <span className="font-mono text-xs tracking-widest uppercase text-white/70">
            California
         </span>
      </div>

      <div className="absolute bottom-12 right-12 z-20">
         <button className="px-8 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-sm font-medium tracking-wide hover:bg-white hover:text-black transition-colors duration-300">
            EXPLORE COLLECTION
         </button>
      </div>
    </section>
  );
}
