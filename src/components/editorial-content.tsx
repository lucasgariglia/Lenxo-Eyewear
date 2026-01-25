"use client";

import React, { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function EditorialContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Smooth Parallax for all layers
      gsap.utils.toArray<HTMLElement>('.parallax-layer-1').forEach((el) => {
        gsap.to(el, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });

      gsap.utils.toArray<HTMLElement>('.parallax-layer-2').forEach((el) => {
        gsap.to(el, {
          yPercent: -40,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });

      // 2. Headline Reveal on Scroll
      gsap.from('.reveal-text', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.reveal-text',
          start: "top 90%",
        }
      });

      // 3. Image Scale Reveal
      gsap.utils.toArray<HTMLElement>('.image-reveal').forEach((el) => {
        gsap.from(el, {
          scale: 1.2,
          opacity: 0,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-[1600px] bg-[#FAFAFA] text-black overflow-hidden pb-60">
      
      {/* --- SPREAD 1: THE ASYMMETRIC OPENER --- */}
      <section className="relative h-[1600px] w-full px-20 pt-40">
        {/* Secondary HUD Hairline */}
        <div className="absolute top-40 left-20 w-[1px] h-[800px] bg-black/5 z-0"></div>
        
        {/* Main Spread Image - Offset Quadrant */}
        <div className="absolute top-20 right-20 w-[600px] h-[800px] overflow-hidden bg-gray-100 z-10">
          <Image 
            src="/pictures/hero-minimal.jpg" 
            alt="Editorial Eyewear" 
            fill 
            className="object-cover image-reveal parallax-layer-1" 
          />
        </div>

        {/* Asymmetric Headline - Intersecting with Layer 1 */}
        <div className="relative z-20 mt-60">
          <h2 className="font-display text-[140px] leading-[0.8] tracking-tighter uppercase mix-blend-difference text-black">
            <div className="overflow-hidden h-[120px]">
              <span className="reveal-text inline-block">The New</span>
            </div>
            <div className="overflow-hidden h-[120px] ml-40">
              <span className="reveal-text inline-block italic text-[#C5A880]">Language</span>
            </div>
            <div className="overflow-hidden h-[120px] ml-10">
              <span className="reveal-text inline-block">Of Vision</span>
            </div>
          </h2>
        </div>

        {/* Floating Detail Image - quadrant 3 overlap */}
        <div className="absolute top-[800px] left-[15%] w-[400px] h-[540px] overflow-hidden z-30 shadow-2xl border-[16px] border-white">
          <Image 
            src="/pictures/editorial-portrait.jpg" 
            alt="Portrait" 
            fill 
            className="object-cover parallax-layer-2" 
          />
        </div>

        {/* Floating Caption Spread */}
        <div className="absolute top-[1000px] right-[10%] w-[380px] z-20">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#C5A880]">Technical Insight</span>
            <div className="flex-grow h-[0.5px] bg-black/20"></div>
          </div>
          <h3 className="font-display text-4xl mb-6 uppercase leading-tight">Lightness as a <br/> Philosophy</h3>
          <p className="font-sans text-sm text-gray-500 leading-relaxed tracking-wide">
            Our frames weigh less than a standard envelope. By removing the unnecessary, we expose the essential beauty of your features.
          </p>
          <div className="mt-10 flex items-center gap-6">
            <button className="font-mono text-[10px] tracking-[0.3em] uppercase border-b border-black pb-1 hover:text-[#C5A880] hover:border-[#C5A880] transition-colors">
              Explore Craft
            </button>
            <span className="text-gray-300">/</span>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-gray-400">Page 04</span>
          </div>
        </div>
      </section>

      {/* --- SPREAD 2: THE MATERIAL GRID --- */}
      <section className="relative w-full px-20 mt-40">
        <div className="flex justify-between items-start mb-32">
          <div className="max-w-md">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-black/40 mb-4 block">Series 02 / Materiality</span>
            <h2 className="font-display text-7xl uppercase leading-none">A Synthesis of <br/> Glass & Steel</h2>
          </div>
          <div className="text-right">
             <span className="font-display text-xl italic text-[#C5A880] block mb-2">Curated Collection</span>
             <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-gray-400">Available Fall 2026</span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-10">
          {/* Main Feature - 7 columns */}
          <div className="col-span-7 relative h-[900px] overflow-hidden group cursor-pointer bg-gray-100">
             <Image 
               src="/pictures/col-modern.jpg" 
               alt="Modern" 
               fill 
               className="object-cover transition-transform duration-1000 group-hover:scale-105" 
             />
             <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="absolute bottom-12 left-12 text-white z-10">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase mb-2 block">Item 01 / Obsidian</span>
                <h3 className="font-display text-5xl uppercase">The Archon</h3>
             </div>
          </div>

          {/* Side Stack - 5 columns */}
          <div className="col-span-5 flex flex-col gap-10">
            <div className="relative h-[430px] overflow-hidden group cursor-pointer bg-gray-100">
               <Image 
                 src="/pictures/col-lifestyle.jpg" 
                 alt="Lifestyle" 
                 fill 
                 className="object-cover transition-transform duration-1000 group-hover:scale-110" 
               />
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm">
                  <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-black bg-white px-6 py-3 rounded-full">View Piece</span>
               </div>
            </div>
            
            <div className="relative h-[430px] bg-[#0E2A47] p-12 flex flex-col justify-between text-white">
               <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40">Technical Specs</span>
               <div>
                  <h4 className="font-display text-3xl mb-4 uppercase">Bio-Titanium <br/> Construction</h4>
                  <p className="font-sans text-xs text-white/60 leading-relaxed uppercase tracking-widest">
                    Unparalleled strength-to-weight ratio. <br/>
                    Hypoallergenic coating. <br/>
                    Laser-etched serial numbers.
                  </p>
               </div>
               <div className="w-12 h-[1px] bg-white/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SPREAD 3: THE CINEMATIC STATEMENT --- */}
      <section className="relative w-full h-[1000px] mt-60 overflow-hidden group">
        <Image 
          src="/pictures/hero-shoe.jpg" 
          alt="Statement" 
          fill 
          className="object-cover parallax-layer-1 grayscale hover:grayscale-0 transition-all duration-1000 scale-110" 
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-40">
          <span className="font-mono text-[12px] tracking-[0.6em] uppercase text-[#C5A880] mb-8 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
            The Final Word
          </span>
          <h2 className="font-display text-[120px] leading-none text-white uppercase max-w-5xl">
            See the World <br/>
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] to-white">Without Obstruction</span>
          </h2>
          <div className="mt-20 flex gap-12">
            <div className="flex flex-col items-center gap-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">Collection</span>
              <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-white">Full Series</span>
            </div>
            <div className="w-[1px] h-12 bg-white/10"></div>
            <div className="flex flex-col items-center gap-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">Retailers</span>
              <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-white">Find a Boutique</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Pull-in */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <span className="font-mono text-[10px] tracking-[1em] uppercase text-black/20 block mb-4">Scrolling down to</span>
        <h5 className="font-display text-2xl uppercase tracking-tighter">Information Architecture</h5>
      </div>
    </div>
  );
}
