"use client";

import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import KineticText from './ui/kinetic-text';
import { EditorialEase } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

const Hotspot = ({ x, y, label, detail }: { x: string, y: string, label: string, detail: string }) => (
  <div 
    className="absolute group z-40 pointer-events-auto"
    style={{ top: y, left: x }}
  >
    <div className="relative flex items-center justify-center">
      <div className="absolute w-8 h-8 bg-[#C5A880]/20 rounded-full animate-ping"></div>
      <div className="relative w-6 h-6 bg-black border border-[#C5A880] rounded-full flex items-center justify-center cursor-help transition-transform group-hover:scale-125">
        <Plus className="w-3 h-3 text-[#C5A880]" />
      </div>
      
      {/* Tooltip */}
      <div className="absolute left-10 w-48 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0 pointer-events-none">
        <div className="bg-black/90 backdrop-blur-md p-4 border border-white/10 shadow-2xl">
          <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-[#C5A880] block mb-2">{label}</span>
          <p className="font-sans text-[10px] text-white/60 leading-relaxed uppercase tracking-widest">{detail}</p>
        </div>
        <div className="w-[0.5px] h-10 bg-[#C5A880] absolute -left-5 top-0 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-700"></div>
      </div>
    </div>
  </div>
);

export default function EditorialContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: "42.36", y: "71.05" });

  useEffect(() => {
    const interval = setInterval(() => {
        setCoords({
            x: (Math.random() * 100).toFixed(2),
            y: (Math.random() * 100).toFixed(2)
        });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Smooth Parallax with subtle rotation
      gsap.utils.toArray<HTMLElement>('.parallax-layer-1').forEach((el) => {
        gsap.fromTo(el, 
          { yPercent: 10 },
          {
            yPercent: -10,
            rotationZ: 0.01,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('.parallax-layer-2').forEach((el) => {
        gsap.fromTo(el,
          { yPercent: 15 },
          {
            yPercent: -15,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      });

      // 2. Headline Reveal with skew
      gsap.from('.reveal-text', {
        y: 100,
        skewY: 7,
        opacity: 0,
        duration: 1.5,
        ease: EditorialEase,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.reveal-text',
          start: "top bottom",
        }
      });

      // 3. Section Transitions: Safer Fade Reveal (Replaced risky Clip Path)
      const sections = gsap.utils.toArray<HTMLElement>('section.lens-section');
      sections.forEach((section, i) => {
        gsap.fromTo(section, 
          { opacity: 0, y: 100 },
          { 
            opacity: 1, 
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 95%", // Start revealing much earlier
              end: "top 50%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-[1600px] bg-[#FAFAFA] text-black overflow-hidden pb-60">
      
      {/* --- SPREAD 1: THE ASYMMETRIC OPENER --- */}
      <section className="relative h-[1200px] w-full px-20 pt-20">
        <div className="absolute top-10 left-20 z-40 flex flex-col gap-1">
            <span className="font-mono text-[8px] tracking-[0.5em] uppercase text-black/20">Coordinate System</span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#C5A880]">Lat: {coords.x}°N / Long: {coords.y}°W</span>
        </div>

        <div className="absolute top-20 left-20 w-[1px] h-[600px] bg-black/5 z-0"></div>
        
        <div className="absolute top-20 right-20 w-[600px] h-[800px] overflow-hidden bg-gray-100 z-10 shadow-[0_40px_100px_rgba(0,0,0,0.1)]">
          <Image 
            src="/pictures/hero-minimal.jpg" 
            alt="Editorial Eyewear" 
            fill 
            className="object-cover image-reveal parallax-layer-1 scale-125" 
          />
          <div className="absolute inset-0 bg-black/5 mix-blend-multiply pointer-events-none"></div>
          
          {/* Hotspots for Opener */}
          <Hotspot x="35%" y="45%" label="Refractive Surface" detail="Zero-Distortion Optical Glass with Grade 4 Coating." />
        </div>

        <div className="relative z-20 mt-32">
          <h2 className="font-display text-[140px] leading-[0.8] tracking-tighter uppercase kinetic-serif text-black">
            <div className="overflow-hidden h-[120px]">
              <span className="reveal-text inline-block">The New</span>
            </div>
            <div className="overflow-hidden h-[130px] ml-40">
              <span className="reveal-text inline-block italic text-[#C5A880] drop-shadow-sm">Language</span>
            </div>
            <div className="overflow-hidden h-[120px] ml-10">
              <span className="reveal-text inline-block backdrop-blur-[2px]">Of Vision</span>
            </div>
          </h2>
        </div>

        <div className="absolute top-[600px] left-[15%] w-[400px] h-[540px] overflow-hidden z-30 shadow-[0_50px_120px_rgba(0,0,0,0.15)] border-[16px] border-white ring-1 ring-black/5">
          <Image 
            src="/pictures/editorial-portrait.jpg" 
            alt="Portrait" 
            fill 
            className="object-cover parallax-layer-2 scale-125" 
          />
        </div>

        <div className="absolute top-[1000px] right-[10%] w-[380px] z-20">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#C5A880]">Technical Insight</span>
            <div className="flex-grow h-[0.5px] bg-black/20"></div>
          </div>
          <h3 className="font-display text-4xl mb-6 uppercase leading-tight kinetic-serif">Lightness as a <br/> Philosophy</h3>
          
          {/* Kinetic Read Implementation */}
          <KineticText className="font-sans text-sm text-gray-500 uppercase tracking-[0.1em]">
            Our frames weigh less than a standard envelope. By removing the unnecessary, we expose the essential beauty of your features.
          </KineticText>

          <div className="mt-10 flex items-center gap-6">
            <Link href="/about" className="font-mono text-[10px] tracking-[0.3em] uppercase border-b border-black pb-1 hover:text-[#C5A880] hover:border-[#C5A880] transition-all duration-500 cursor-pointer">
              Explore Craft
            </Link>
            <span className="text-gray-300">/</span>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-gray-400">Section 04</span>
          </div>
        </div>
      </section>

      {/* --- SPREAD 2: THE MATERIAL GRID (Lens Reveal Applied) --- */}
      <section className="lens-section relative w-full px-20 mt-40">
        <div className="flex justify-between items-start mb-32">
          <div className="max-w-md">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-black/40 mb-4 block">Series 02 / Materiality</span>
            <h2 className="font-display text-7xl uppercase leading-none kinetic-serif">A Synthesis of <br/> Glass & Steel</h2>
          </div>
          <div className="text-right">
             <span className="font-display text-xl italic text-[#C5A880] block mb-2 kinetic-serif">Curated Collection</span>
             <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-gray-400">Available Fall 2026</span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-10">
          {/* Main Feature - 7 columns with Blueprint Overlay */}
          <Link href="/product/archon-801" className="col-span-7 relative h-[900px] overflow-hidden group cursor-pointer bg-gray-100 shadow-xl block">
             <Image 
               src="/pictures/col-modern.jpg" 
               alt="Modern" 
               fill 
               className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110 group-hover:opacity-40" 
             />
             {/* Technical Blueprint Overlay */}
             <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none flex items-center justify-center p-20">
                <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#C5A880] stroke-[0.1] fill-none overflow-visible">
                    <circle cx="30" cy="50" r="15" />
                    <circle cx="70" cy="50" r="15" />
                    <path d="M 45 50 Q 50 50 55 50" />
                    <path d="M 15 50 L 5 50" />
                    <path d="M 85 50 L 95 50" />
                    {/* Measurements */}
                    <text x="50" y="45" fontSize="2" fill="#C5A880" textAnchor="middle" className="font-mono uppercase tracking-widest">52 [ ] 18 // 145</text>
                </svg>
             </div>
             
             <div className="absolute bottom-12 left-12 text-white z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase mb-2 block text-[#C5A880]">Item 01 / Obsidian</span>
                <h3 className="font-display text-5xl uppercase kinetic-serif group-hover:text-black transition-colors">The Archon</h3>
             </div>
          </Link>

          {/* Side Stack - 5 columns */}
          <div className="col-span-5 flex flex-col gap-10">
            <Link href="/product/archon-801" className="relative h-[430px] overflow-hidden group cursor-pointer bg-gray-100 shadow-lg block">
               <Image 
                 src="/pictures/collection-1.jpg" 
                 alt="Lifestyle" 
                 fill 
                 className="object-cover transition-transform duration-[3000ms] group-hover:scale-125" 
               />
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 bg-white/20 backdrop-blur-md">
                  <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-black bg-white/90 px-8 py-4 rounded-full shadow-2xl">View Piece</span>
               </div>
            </Link>
            
            <div className="relative h-[430px] bg-[#0E2A47] p-12 flex flex-col justify-between text-white shadow-lg overflow-hidden group">
               <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-[2000ms]"></div>
               
               <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40">Technical Specs</span>
               <div>
                  <h4 className="font-display text-3xl mb-4 uppercase kinetic-serif">Bio-Titanium <br/> Construction</h4>
                  <KineticText className="font-sans text-xs text-white/60 uppercase tracking-[0.2em]">
                    Unparalleled strength-to-weight ratio. Hypoallergenic coating. Laser-etched serial numbers.
                  </KineticText>
               </div>
               <div className="w-12 h-[1px] bg-[#C5A880]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SPREAD 3: THE CINEMATIC STATEMENT --- */}
      <section className="lens-section relative w-full h-[1000px] mt-60 overflow-hidden group">
        <Image 
          src="/pictures/hero-final-vision.jpg" 
          alt="Statement" 
          fill 
          className="object-cover parallax-layer-1 grayscale group-hover:grayscale-0 transition-all duration-[2000ms] scale-125" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-40 z-10">
          <span className="font-mono text-[12px] tracking-[0.8em] uppercase text-[#C5A880] mb-8 opacity-0 group-hover:opacity-100 transition-all duration-1000 translate-y-4 group-hover:translate-y-0">
            The Final Word
          </span>
          <h2 className="font-display text-[120px] leading-none text-white uppercase max-w-5xl kinetic-serif">
            See the World <br/>
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] to-white drop-shadow-2xl">Without Obstruction</span>
          </h2>
          
          <div className="mt-20 flex gap-20">
            <Link href="/collection" className="flex flex-col items-center gap-4 group/item cursor-pointer">
              <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-white/40 group-hover/item:text-[#C5A880] transition-colors">Collection</span>
              <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-white">Full Series</span>
            </Link>
            <div className="w-[1px] h-16 bg-white/20"></div>
            <Link href="/contact" className="flex flex-col items-center gap-4 group/item cursor-pointer">
              <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-white/40 group-hover/item:text-[#C5A880] transition-colors">Retailers</span>
              <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-white">Find a Boutique</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Pull-in Folio */}
      <div className="absolute bottom-20 left-12 flex flex-col gap-2 pointer-events-none">
        <span className="font-mono text-[8px] tracking-[1em] uppercase text-black/30 block">Editorial Index</span>
        <h5 className="font-display text-2xl uppercase tracking-tighter kinetic-serif">Information Architecture</h5>
      </div>
      
      <div className="absolute bottom-20 right-12 text-right pointer-events-none">
        <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-[#C5A880] block">Page No. 008</span>
        <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-black/20 block mt-2">© 2026 LENXO COLLECTIVE</span>
      </div>
    </div>
  );
}