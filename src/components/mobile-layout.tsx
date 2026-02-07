"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from "next/image";
import { ArrowRight, Plus } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from './ui/button';
import Footer from './footer';
import Link from 'next/link';
import { useShop } from '@/context/shop-context';
import Navigation from './navigation';

export default function MobileLayout() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false,
    dragFree: true,
    containScroll: 'trimSnaps'
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const { openCart } = useShop();

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const getSlug = (i: number) => {
      if (i === 1) return 'archon-801';
      if (i === 2) return 'stitch-802';
      return 'vision-803';
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* 1. Unified Navigation */}
      <div className="fixed top-0 left-0 w-full z-[10000] pointer-events-none">
          <Navigation />
      </div>
      
      {/* 2. THE DECK (Horizontal Snap Hero) */}
      <div className="relative h-[100vh] w-full bg-black overflow-hidden">
          <div className="h-full touch-pan-y" ref={emblaRef}>
              <div className="flex h-full">
                  
                  {/* SLIDE 1: MAIN HERO */}
                  <div className="flex-[0_0_100%] min-w-0 relative h-full flex flex-col items-center justify-center px-6 text-center">
                        <div className="absolute inset-0 z-0">
                            <Image 
                                src="/pictures/hero-glasses.jpg" 
                                alt="Absolute Vision" 
                                fill 
                                className="object-cover opacity-80" 
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
                        </div>
                        <div className="relative z-10 w-full mt-20">
                            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C5A880] mb-4 block animate-in fade-in slide-in-from-bottom-4 duration-1000">Volume 01</span>
                            <h1 className="font-display text-7xl leading-[0.8] mb-6 uppercase tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                                Vision <br/> 
                                <span className="italic text-[#C5A880]">Refined</span>
                            </h1>
                            <p className="font-sans text-[10px] text-white/60 max-w-[240px] mx-auto leading-relaxed mb-8 tracking-[0.2em] uppercase animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
                                Architecting the future of optics.
                            </p>
                        </div>
                  </div>

                  {/* SLIDE 2: PHILOSOPHY */}
                  <div className="flex-[0_0_100%] min-w-0 relative h-full flex flex-col items-center justify-center p-8 bg-[#111]">
                        <div className="absolute inset-0 opacity-40">
                             <Image 
                                src="/pictures/hero-minimal.jpg" 
                                alt="Philosophy" 
                                fill 
                                className="object-cover grayscale" 
                            />
                        </div>
                        <div className="relative z-10 text-center w-full mt-20">
                             <h2 className="font-display text-6xl leading-[0.8] uppercase mb-6">
                                Lightness <br/> <span className="text-[#C5A880] italic">As Form</span>
                             </h2>
                             <p className="font-sans text-xs text-white/50 leading-relaxed mb-10 max-w-xs mx-auto uppercase tracking-widest">
                                Our frames weigh less than a standard envelope. By removing the unnecessary, we expose the essential beauty.
                             </p>
                             <Button variant="outline" className="text-white border-white/20 hover:bg-white hover:text-black rounded-full text-xs tracking-widest uppercase px-10 py-6" asChild>
                                <Link href="/about">
                                    Read Manifesto
                                </Link>
                             </Button>
                        </div>
                  </div>

                  {/* SLIDE 3: COLLECTION PREVIEW */}
                  <div className="flex-[0_0_100%] min-w-0 relative h-full flex flex-col items-center justify-center px-6 text-center bg-[#0E2A47]">
                        <div className="absolute inset-0 opacity-60">
                             <Image 
                                src="/pictures/collection-1.jpg" 
                                alt="Collection" 
                                fill 
                                className="object-cover" 
                            />
                        </div>
                        <div className="relative z-10 w-full mt-20">
                            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C5A880] mb-4 block">Series 02</span>
                            <h2 className="font-display text-6xl leading-[0.8] uppercase mb-10">
                                Bio-Titanium <br/> Construction
                            </h2>
                            <Button className="bg-white text-black hover:bg-[#C5A880] hover:text-black rounded-full w-full py-7 text-xs tracking-widest uppercase" asChild>
                                <Link href="/collection">
                                    Shop Collection
                                </Link>
                            </Button>
                        </div>
                  </div>

              </div>
          </div>

          {/* DECK INDICATORS */}
          <div className="absolute bottom-32 left-0 w-full flex justify-center gap-3 z-20 px-6 pointer-events-none mix-blend-difference">
               {scrollSnaps.map((_, index) => (
                   <div 
                        key={index}
                        className={`h-[1px] rounded-full transition-all duration-700 ${index === selectedIndex ? 'bg-white w-12' : 'bg-white/40 w-6'}`}
                   />
               ))}
          </div>
          
          {/* Scroll Hint */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 pointer-events-none mix-blend-difference">
              <div className="w-[1px] h-10 bg-gradient-to-b from-white/60 to-transparent"></div>
              <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-white/60">Swipe / Scroll</span>
          </div>
      </div>

      {/* 3. VERTICAL EDITORIAL CONTENT */}
      <div className="relative z-10 bg-[#FAFAFA] rounded-t-[40px] -mt-10 pt-16 pb-0 shadow-[0_-40px_80px_rgba(0,0,0,0.3)]">
            {/* A. Curated Selection */}
            <div className="px-6 mb-24">
                 <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/40 mb-2 block">
                    The Archive
                </span>
                <h3 className="font-display text-3xl uppercase leading-none mb-8">
                    Curated <br/> Selection
                </h3>
                
                <div className="space-y-8">
                    {[1, 2, 3].map((i) => (
                        <Link href={`/product/${getSlug(i)}`} key={i} className="flex gap-4 items-center group cursor-pointer">
                            <div className="relative w-24 h-24 bg-gray-200 shrink-0 overflow-hidden">
                                <Image src={`/pictures/collection-${i}.jpg`} alt="Item" fill className="object-cover" />
                            </div>
                            <div>
                                <h4 className="font-display text-xl uppercase">Model 80{i}</h4>
                                <span className="font-mono text-xs text-[#C5A880]">$450.00</span>
                            </div>
                            <div className="ml-auto w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                                <Plus className="w-4 h-4" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* B. Editorial Portrait Section (Parity Addition) */}
            <div className="mb-24 px-6">
                <div className="relative aspect-[3/4] w-full mb-8 overflow-hidden rounded-sm">
                    <Image 
                        src="/pictures/editorial-portrait.jpg" 
                        alt="Editorial" 
                        fill 
                        className="object-cover" 
                    />
                </div>
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/40 mb-2 block">
                    Philosophy
                </span>
                <h3 className="font-display text-3xl uppercase leading-none mb-4">
                    The Essential <br/> <span className="text-[#C5A880] italic">Beauty</span>
                </h3>
                <p className="font-sans text-xs text-gray-500 leading-relaxed uppercase tracking-wider mb-6">
                    By removing the unnecessary, we expose the true architecture of the face.
                </p>
                <div className="w-full h-[1px] bg-black/10"></div>
            </div>

            {/* C. Cinematic Statement (Parity Addition) */}
            <div className="relative h-[60vh] w-full mb-0 overflow-hidden flex items-center justify-center text-center">
                 <Image 
                    src="/pictures/hero-final-vision.jpg" 
                    alt="Final Vision" 
                    fill 
                    className="object-cover grayscale" 
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative z-10 px-6">
                     <h2 className="font-display text-4xl text-white uppercase leading-none mb-6">
                        See Without <br/> <span className="italic text-[#C5A880]">Obstruction</span>
                     </h2>
                     <Button variant="outline" className="text-white border-white/30 rounded-full text-[10px] tracking-[0.2em] uppercase hover:bg-white hover:text-black" asChild>
                        <Link href="/contact">
                            Find Boutique
                        </Link>
                     </Button>
                </div>
            </div>

            {/* Final Call to Action (Moved out of editorial div for better flow) */}
            <div className="bg-black text-white p-8 pt-16 pb-12 text-center relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="font-display text-3xl uppercase mb-4">Join the <br/> Inner Circle</h2>
                    <p className="font-sans text-xs text-white/60 mb-8">Get early access to limited drops.</p>
                    <div className="flex border-b border-white/20 pb-2 mb-8 max-w-sm mx-auto">
                        <input type="email" placeholder="EMAIL ADDRESS" className="bg-transparent w-full text-xs tracking-widest outline-none placeholder:text-white/20 uppercase" />
                        <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                    </div>
                </div>
            </div>

            {/* Same Footer as Collection Page */}
            <Footer />
      </div>
    </div>
  );
}
