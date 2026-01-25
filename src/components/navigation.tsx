"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { ShoppingBag, Search, Globe } from 'lucide-react';
import gsap from 'gsap';

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -20,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 1.5
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef} className="absolute top-0 left-0 w-full z-50 px-12 py-10 flex justify-between items-center text-white">
      {/* 1. Left: Brand ID */}
      <div className="flex-1 flex items-center gap-6">
        <a href="#" className="font-display text-4xl font-bold tracking-tighter uppercase mix-blend-difference">
            Lenxo
        </a>
        <div className="hidden lg:flex items-center gap-3 pl-6 border-l border-white/10">
           <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-white/40">Collective</span>
           <div className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse"></div>
        </div>
      </div>

      {/* 2. Center: Glass Pill Navigation */}
      <div className="hidden md:flex items-center px-8 py-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 gap-10">
        {['The Series', 'Craft', 'Heritage', 'Archive'].map((item) => (
            <a key={item} href="#" className="font-sans text-[10px] font-bold tracking-[0.3em] uppercase hover:text-[#C5A880] transition-all duration-300">
                {item}
            </a>
        ))}
      </div>

      {/* 3. Right: Interaction Hub */}
      <div className="flex-1 flex justify-end items-center gap-10">
         <div className="hidden lg:flex items-center gap-2 cursor-pointer group">
            <Globe className="w-3.5 h-3.5 text-white/50 group-hover:text-white transition-colors" />
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/50 group-hover:text-white">EN / USD</span>
         </div>
         
         <div className="flex items-center gap-8">
            <div className="p-2 cursor-pointer hover:bg-white/10 rounded-full transition-colors">
              <Search className="w-4 h-4" />
            </div>
            
            <div className="relative group cursor-pointer">
               <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
               <span className="absolute -top-1.5 -right-1.5 bg-[#C5A880] text-black text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-black">
                  02
               </span>
            </div>
         </div>
      </div>

      {/* Top Hairline - Magazine Border */}
      <div className="absolute top-0 left-12 right-12 h-[0.5px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </nav>
  );
}
