"use client";

import React, { useLayoutEffect, useRef } from 'react';
import LayoutStage from '@/components/layout-stage';
import { PRODUCTS } from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Plus } from 'lucide-react';
import { useScalingLogic } from '@/hooks/use-scaling-logic';

gsap.registerPlugin(ScrollTrigger);

const CANVAS_WIDTH = 1600;

export default function SeriesPage() {
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const stickyViewportRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const { stageHeight } = useScalingLogic(null as any, null as any);

  useLayoutEffect(() => {
    if (!stageHeight || stageHeight === 'auto') return;
    
    const sections = gsap.utils.toArray('.series-panel');
    const scrollDistance = (sections.length - 1) * CANVAS_WIDTH;
    
    const ctx = gsap.context(() => {
      // 1. Manual Pin: Counter-animate the viewport to stay at top
      gsap.to(stickyViewportRef.current, {
        y: scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0,
          invalidateOnRefresh: true,
        }
      });

      // 2. Horizontal Scroll Animation
      gsap.to(horizontalSectionRef.current, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
        }
      });

      // Background Parallax for each panel
      sections.forEach((section: any) => {
          const img = section.querySelector('.bg-image');
          gsap.fromTo(img, 
            { x: 150 },
            { 
                x: -150,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    containerAnimation: undefined, 
                    start: "left right",
                    end: "right left",
                    scrub: true
                }
            }
          );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [stageHeight]);

  const scrollDistance = (PRODUCTS.length - 1) * 1600;
  const triggerHeight = typeof stageHeight === 'number' ? stageHeight + scrollDistance : 2000;

  return (
    <LayoutStage>
      <div ref={containerRef} className="w-full bg-[#050505]">
        
        {/* Intro Section - Compressed */}
        <section className="h-[500px] flex flex-col justify-center px-24 text-white relative z-10">
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-[#C5A880] mb-6 block">Series Vol. 01</span>
            <h1 className="font-display text-[120px] leading-[0.85] uppercase tracking-tighter max-w-4xl">
                The Digital <br/> <span className="italic text-[#C5A880]">Showroom</span>
            </h1>
            <div className="mt-8 flex items-center gap-8">
                <div className="w-20 h-[1px] bg-white/20"></div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-white/40">Scroll to Exhibition</p>
            </div>
        </section>

        {/* Horizontal Container Trigger Area */}
        <div 
          ref={triggerRef} 
          className="relative" 
          style={{ height: `${triggerHeight}px` }}
        >
            
            {/* The "Manual Pin" Viewport */}
            <div 
              ref={stickyViewportRef}
              className="absolute top-0 left-0 w-[1600px] overflow-hidden bg-[#050505]"
              style={{ height: typeof stageHeight === 'number' ? `${stageHeight}px` : '100vh' }}
            >
                <div ref={horizontalSectionRef} className="flex h-full" style={{ width: `${PRODUCTS.length * 1600}px` }}>
                    {PRODUCTS.map((product, i) => (
                        <section 
                            key={product.id} 
                            className="series-panel relative w-[1600px] h-full flex flex-col items-center justify-center overflow-hidden flex-shrink-0 bg-[#050505]"
                        >
                            {/* Background Layer */}
                            <div className="absolute inset-0 z-0">
                                <Image 
                                    src={product.images.hero} 
                                    alt={product.name} 
                                    fill 
                                    className="bg-image object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-[2s]"
                                    priority={i === 0}
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
                            </div>

                            {/* Content Layer */}
                            <div className="relative z-10 text-center px-40">
                                <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#C5A880] mb-4 block">
                                    Asset {String(i + 1).padStart(2, '0')}
                                </span>
                                <h2 className="font-display text-[140px] leading-none uppercase tracking-tighter mb-8 text-white drop-shadow-2xl">
                                    {product.name}
                                </h2>
                                
                                <div className="flex flex-col items-center gap-10">
                                    <p className="font-sans text-[11px] text-white/60 tracking-[0.2em] uppercase max-w-xl leading-relaxed">
                                        {product.description}
                                    </p>
                                    
                                    <div className="flex gap-6">
                                        <Link 
                                            href={`/product/${product.slug}`}
                                            className="h-16 px-10 border border-white/20 rounded-full flex items-center gap-4 hover:bg-white hover:text-black transition-all duration-500 group"
                                        >
                                            <span className="font-mono text-[10px] uppercase tracking-widest">View Details</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                        </Link>
                                        
                                        <button className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#C5A880] hover:border-[#C5A880] transition-all duration-500 group">
                                            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Folio info */}
                            <div className="absolute bottom-12 left-12 flex flex-col gap-2">
                                <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-white/20">Composition</span>
                                <span className="font-mono text-[10px] uppercase text-white/60 tracking-widest">{product.specs.material}</span>
                            </div>
                            
                            <div className="absolute bottom-12 right-12 text-right">
                                <span className="font-display text-4xl italic text-[#C5A880] tracking-tighter">${product.price}</span>
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>

        {/* Closing Section - Compressed */}
        <section className="h-[800px] flex flex-col items-center justify-center text-center bg-[#FAFAFA] text-black relative z-10 shadow-[0_-50px_100px_rgba(0,0,0,0.3)]">
             <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-black/20 mb-8 block">End of Series 01</span>
             <h3 className="font-display text-[80px] leading-[0.9] uppercase tracking-tighter mb-12">Deep into the <br/> <span className="italic text-[#C5A880]">Archive</span></h3>
             <Link 
                href="/collection"
                className="font-mono text-[12px] tracking-[0.3em] uppercase border-b-2 border-black pb-2 hover:text-[#C5A880] hover:border-[#C5A880] transition-colors"
             >
                Enter the Index
             </Link>
        </section>

      </div>
    </LayoutStage>
  );
}