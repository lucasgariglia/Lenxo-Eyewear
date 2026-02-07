"use client";

import React, { useLayoutEffect, useState, useEffect, useRef } from 'react';
import LayoutStage from '@/components/layout-stage';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/products';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["All Models", "Obsidian", "Titanium", "Acetate"];

export default function CollectionPage() {
  const [activeCategory, setActiveCategory] = useState("All Models");
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
  const gridRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLSectionElement>(null);

  // Filtering Logic
  useEffect(() => {
    let filtered = PRODUCTS;
    if (activeCategory === "Obsidian") {
        filtered = PRODUCTS.filter(p => p.subtitle.includes("Obsidian"));
    } else if (activeCategory === "Titanium") {
        filtered = PRODUCTS.filter(p => p.specs.material.includes("Titanium"));
    } else if (activeCategory === "Acetate") {
        filtered = PRODUCTS.filter(p => p.specs.material.includes("Acetate"));
    }
    setFilteredProducts(filtered);
    
    setTimeout(() => {
        ScrollTrigger.refresh();
        if (gridRef.current) {
             gsap.fromTo(gridRef.current.children, 
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power2.out", overwrite: true }
             );
        }
    }, 100);
  }, [activeCategory]);
  
  // Parallax & Transition Logic
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Parallax Fade
      gsap.to(heroRef.current, {
        yPercent: -20,
        opacity: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true
        }
      });

      // 2. Gallery "Passage" Reveal (Curtain effect handled by CSS stacking, refined by motion)
      gsap.from(galleryRef.current, {
        y: 100,
        ease: "power2.out",
        scrollTrigger: {
            trigger: galleryRef.current,
            start: "top bottom",
            end: "top center",
            scrub: 1
        }
      });

    });
    return () => ctx.revert();
  }, []);

  return (
    <LayoutStage>
      <div className="w-full flex flex-col relative">
        
        {/* SECTION 1: DARK HERO (Fixed/Sticky underneath) */}
        <section 
            ref={heroRef}
            className="w-full h-[80vh] px-6 lg:px-20 flex flex-col justify-end pb-32 text-white sticky top-[140px] z-0"
        >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 lg:gap-0">
                <div>
                    <span className="font-mono text-[9px] lg:text-[10px] tracking-[0.4em] uppercase text-[#C5A880] mb-4 lg:mb-6 block">The Series / 2026</span>
                    <h1 className="font-display text-[48px] lg:text-[100px] leading-[0.9] lg:leading-[0.85] uppercase tracking-tighter">
                        Optical <br/> <span className="italic text-[#C5A880]">Manifest</span>
                    </h1>
                </div>
                <div className="text-left lg:text-right">
                    <span className="font-mono text-[9px] lg:text-[10px] tracking-[0.2em] uppercase text-white/40 block mb-2">Total Assets</span>
                    <span className="font-display text-2xl lg:text-4xl">{filteredProducts.length.toString().padStart(2, '0')}</span>
                </div>
            </div>
        </section>

        {/* SECTION 2: LIGHT GALLERY (Scrolls over) */}
        <section 
            ref={galleryRef}
            className="w-full bg-[#FAFAFA] text-black px-6 lg:px-20 pt-24 pb-40 relative z-20 rounded-t-[40px] shadow-[0_-50px_100px_rgba(0,0,0,0.5)] min-h-screen"
        >
            {/* Filters (Sticky within section) */}
            <div className="sticky top-[100px] z-30 bg-[#FAFAFA]/90 backdrop-blur-md py-6 mb-20 border-b border-black/10">
                <div className="flex gap-8 lg:gap-12 font-mono text-[9px] lg:text-[10px] tracking-[0.3em] uppercase text-black/40 overflow-x-auto no-scrollbar whitespace-nowrap">
                    {CATEGORIES.map((cat) => (
                        <button 
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`transition-all duration-300 ${
                                activeCategory === cat 
                                ? "text-black text-[#C5A880] font-bold" 
                                : "hover:text-black cursor-pointer"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid - Editorial Breaking */}
            <div ref={gridRef} className="product-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-10 gap-y-32">
                {filteredProducts.map((product, i) => {
                    // Editorial Pattern: 
                    // Index 0: Hero Full Width (Col 1-12)
                    // Index 1: Left Focus (Col 1-5)
                    // Index 2: Right Focus (Col 7-12) with top offset
                    // Index 3: Center (Col 4-9)
                    
                    const isHero = i % 4 === 0;
                    let colSpan = "md:col-span-1 lg:col-span-6"; // Default: 1/2 on tablet, 1/2 on desktop
                    let offsetClass = "";
                    
                    if (isHero) {
                        colSpan = "md:col-span-2 lg:col-span-12"; 
                    } else if (i % 4 === 1) {
                        colSpan = "md:col-span-1 lg:col-span-5";
                    } else if (i % 4 === 2) {
                        colSpan = "md:col-span-1 lg:col-span-5 lg:col-start-8"; 
                        offsetClass = "lg:mt-32"; 
                    } else if (i % 4 === 3) {
                        colSpan = "md:col-span-2 lg:col-span-6 lg:col-start-4";
                    }

                    return (
                        <div key={product.id} className={`${colSpan} ${offsetClass}`}>
                            <Link href={`/product/${product.slug}`} className="product-card group block relative w-full">
                                {/* Image Container */}
                                <div className={`relative ${isHero ? 'aspect-[16/10]' : 'aspect-[4/3]'} bg-[#F0F0F0] overflow-hidden mb-6 border border-black/5 group-hover:border-[#C5A880]/50 transition-colors duration-500`}>
                                    <Image 
                                        src={product.images.hero} 
                                        alt={product.name} 
                                        fill 
                                        className={`object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 mix-blend-multiply opacity-90 group-hover:opacity-100 ${
                                            product.slug === 'archon-801' ? 'object-[center_75%]' : 'object-center'
                                        }`}
                                    />
                                    
                                    {/* Interactive Cursor Zone (Conceptual) */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
                                         <div className="w-20 h-20 rounded-full border border-[#C5A880] flex items-center justify-center bg-white/10 backdrop-blur-sm">
                                             <span className="font-mono text-[8px] uppercase tracking-widest text-black">View</span>
                                         </div>
                                    </div>
                                </div>

                                {/* Meta Data */}
                                <div className="flex justify-between items-start border-t border-black/10 pt-4">
                                    <div className="max-w-[70%]">
                                        <h3 className="font-display text-3xl lg:text-5xl uppercase mb-2 group-hover:text-[#C5A880] transition-colors">{product.name}</h3>
                                        <div className="flex gap-4">
                                            <span className="font-mono text-[9px] text-black/40 uppercase tracking-widest">{product.specs.material}</span>
                                            <span className="font-mono text-[9px] text-black/40 uppercase tracking-widest">— {product.subtitle}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="text-right">
                                         <span className="font-display text-xl lg:text-2xl block mb-2">${product.price}</span>
                                         <ArrowUpRight size={18} className="text-black/20 group-hover:text-[#C5A880] transition-colors ml-auto" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
            
            {filteredProducts.length === 0 && (
                <div className="w-full py-40 text-center">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/40">No artifacts found matching criteria.</span>
                </div>
            )}
        </section>

      </div>
    </LayoutStage>
  );
}
