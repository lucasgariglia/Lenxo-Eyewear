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
    
    // Refresh ScrollTrigger after DOM update
    setTimeout(() => {
        ScrollTrigger.refresh();
        // Re-run enter animation for new items
        if (gridRef.current) {
             gsap.fromTo(gridRef.current.children, 
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power2.out", overwrite: true }
             );
        }
    }, 100);
  }, [activeCategory]);
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger Reveal for Grid Items (Initial Load)
      gsap.from(".product-card", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".product-grid",
          start: "top 80%",
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <LayoutStage>
      <div className="w-full flex flex-col">
        
        {/* SECTION 1: DARK HERO (Obsidian) */}
        <section className="w-full px-6 lg:px-20 pb-20 lg:pb-32 text-white relative z-10">
            {/* Header */}
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

        {/* SECTION 2: LIGHT GALLERY (Alabaster) */}
        <section className="w-full bg-[#FAFAFA] text-black px-6 lg:px-20 pt-16 lg:pt-24 pb-20 lg:pb-40 relative z-20">
            {/* Seamless Transition Cover - Optional visual bridge */}
            <div className="absolute top-0 left-0 w-full h-px bg-white/10"></div>

            {/* Filters (Active) */}
            <div className="flex gap-8 lg:gap-12 border-b border-black/10 pb-6 mb-12 lg:mb-20 font-mono text-[9px] lg:text-[10px] tracking-[0.3em] uppercase text-black/40 overflow-x-auto no-scrollbar whitespace-nowrap">
                {CATEGORIES.map((cat) => (
                    <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`transition-all duration-300 ${
                            activeCategory === cat 
                            ? "text-black border-b border-[#C5A880] pb-6 -mb-6 font-bold" 
                            : "hover:text-black cursor-pointer"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            <div ref={gridRef} className="product-grid grid grid-cols-1 lg:grid-cols-2 gap-x-0 lg:gap-x-20 gap-y-20 lg:gap-y-32">
                {filteredProducts.map((product) => (
                    <Link key={product.id} href={`/product/${product.slug}`} className="product-card group block relative">
                        {/* Image Container - Light Mode Adaptation */}
                        <div className="relative aspect-[4/3] bg-[#F0F0F0] overflow-hidden mb-6 lg:mb-8 border border-black/5 group-hover:border-[#C5A880]/50 transition-colors duration-500">
                            <Image 
                                src={product.images.hero} 
                                alt={product.name} 
                                fill 
                                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 mix-blend-multiply opacity-90 group-hover:opacity-100"
                            />
                            
                            {/* Blueprint Overlay - Dark Lines for Light Background */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none flex items-center justify-center p-12">
                                 <div className="w-full h-full border border-[#C5A880]/60 relative flex items-center justify-center">
                                     <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#C5A880]"></div>
                                     <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#C5A880]"></div>
                                     <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#C5A880]"></div>
                                     <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#C5A880]"></div>
                                     
                                     <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-[#C5A880] bg-white/90 backdrop-blur px-3 py-1">
                                        Analyze Object
                                     </span>
                                 </div>
                            </div>
                        </div>

                        {/* Meta Data - Dark Text */}
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#C5A880] mb-2 block">{product.subtitle}</span>
                                <h3 className="font-display text-3xl lg:text-4xl uppercase mb-1 group-hover:italic transition-all">{product.name}</h3>
                                <span className="font-mono text-[9px] text-black/40 uppercase tracking-widest">{product.specs.material}</span>
                            </div>
                            
                            <div className="text-right">
                                 <span className="font-display text-xl lg:text-2xl block mb-2">${product.price}</span>
                                 <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0 hidden lg:flex">
                                     <span className="font-mono text-[8px] uppercase tracking-widest">View Spec</span>
                                     <ArrowUpRight size={12} className="text-[#C5A880]" />
                                 </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            
            {filteredProducts.length === 0 && (
                <div className="w-full py-20 text-center">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-black/40">No artifacts found matching criteria.</span>
                </div>
            )}
        </section>

      </div>
    </LayoutStage>
  );
}
