"use client";

import React, { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LiquidHero from './liquid-hero';

export default function EditorialContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        // Parallax Images
        // Note: For WebGL, we might need to animate the container instead of the img tag
        gsap.utils.toArray<HTMLElement>('.parallax-wrapper').forEach((wrapper) => {
            gsap.to(wrapper, {
                yPercent: -10, // Slight upward movement
                ease: "none",
                scrollTrigger: {
                    trigger: wrapper.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                }
            });
        });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-[1600px] bg-[#FAFAFA] text-black overflow-hidden pb-40">
        
        {/* Section 1: Introduction (Grid) */}
        <div className="relative h-[1200px] w-full pt-32 px-12">
            {/* Big Headline */}
            <h2 className="font-display text-[120px] leading-[0.9] tracking-tighter uppercase absolute top-32 left-12 z-10 mix-blend-difference text-black">
                Designed <br/> 
                <span className="ml-32 italic text-[#C5A880]">For Vision</span>
            </h2>

            {/* Floating Image 1 (Top Right) - WebGL Upgrade */}
            <div className="absolute top-20 right-20 w-[500px] h-[600px] overflow-hidden bg-gray-200 parallax-wrapper">
                <LiquidHero 
                    image="/pictures/col-tortoise.jpg" 
                    className="w-full h-full"
                />
            </div>

            {/* Floating Image 2 (Bottom Left overlap) - WebGL Upgrade */}
            <div className="absolute top-[600px] left-[200px] w-[400px] h-[500px] overflow-hidden bg-gray-300 z-20 shadow-2xl parallax-wrapper">
                 <LiquidHero 
                    image="/pictures/hero-fashion.jpg" 
                    className="w-full h-full"
                />
            </div>

            {/* Descriptive Text */}
            <div className="absolute top-[800px] right-[200px] w-[400px]">
                <h3 className="font-display text-4xl mb-6">Crafted for Daily Life</h3>
                <p className="font-sans text-lg text-gray-600 leading-relaxed">
                    From lightweight frames to precise lenses, our goal is simple: eyewear that disappears the moment you put it on, letting you focus on life.
                </p>
                <button className="mt-8 px-8 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-[#C5A880] transition-colors">
                    Learn More
                </button>
            </div>
        </div>

        {/* Section 2: The Grid Collection */}
        <div className="relative w-full px-12 mt-20">
            <div className="w-full border-t border-black/10 mb-12"></div>
            <div className="flex justify-between items-end mb-16">
                <h2 className="font-display text-[80px] leading-none uppercase">Our <br/> Collections</h2>
                <span className="font-mono text-xs uppercase tracking-widest mb-4">Fall / Winter 2026</span>
            </div>

            {/* The Grid */}
            <div className="grid grid-cols-3 gap-8 h-[800px]">
                {/* Item 1 - Yellow/Bold */}
                <div className="col-span-1 relative bg-[#E8E8E8] group cursor-pointer overflow-hidden">
                    <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                        <span className="font-mono text-xs uppercase">Luminous</span>
                        <div className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="material-icons-outlined text-sm">arrow_forward</span>
                        </div>
                    </div>
                     <Image 
                        src="/pictures/col-yellow.jpg" 
                        alt="Yellow" 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                </div>

                {/* Item 2 - Central Focus */}
                <div className="col-span-1 relative bg-[#C5A880] group cursor-pointer overflow-hidden">
                     <Image 
                        src="/pictures/hero-shoe.jpg" // Fallback aesthetic
                        alt="Crystal" 
                        fill 
                        className="object-cover mix-blend-multiply opacity-80" 
                    />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <Image src="/pictures/hero-glasses.jpg" alt="Glasses" width={300} height={200} className="drop-shadow-2xl" />
                     </div>
                     <div className="absolute bottom-8 left-8">
                        <h3 className="font-display text-2xl text-white">The Crystal Series</h3>
                     </div>
                </div>

                 {/* Item 3 - Classic */}
                <div className="col-span-1 relative bg-[#000000] text-white group cursor-pointer overflow-hidden">
                    <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                        <span className="font-mono text-xs uppercase text-gray-400">Obsidian</span>
                    </div>
                     <Image 
                        src="/pictures/collection-3.jpg" 
                        alt="Obsidian" 
                        fill 
                        className="object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-80" 
                    />
                </div>
            </div>
        </div>

        {/* Section 3: Full Width Statement */}
        <div className="relative w-full h-[800px] mt-32 overflow-hidden bg-orange-500">
             <Image 
                src="/pictures/hero-stitch.jpg" 
                alt="Statement" 
                fill 
                className="object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center px-20">
                <h2 className="font-display text-[100px] leading-none text-white max-w-4xl">
                    Your Eyes <br/>
                    <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Deserve Better</span>
                </h2>
            </div>
        </div>
    </div>
  );
}