"use client";

import React, { useLayoutEffect, useRef, useState } from 'react';
import { ShoppingBag, Search, Globe, Menu } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isDocked, setIsDocked] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -20,
        duration: 1.5,
        ease: "power4.out"
      });

      ScrollTrigger.create({
        start: "top -100",
        onToggle: self => setIsDocked(self.isActive),
      });

      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        }
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <nav 
      ref={navRef} 
      className={`relative w-full z-[9999] transition-all duration-700 ease-expo 
        ${isDocked ? 'border-b border-white/10' : ''} 
        h-[140px] p-0`}
      style={{ 
        backgroundColor: 'transparent',
        background: 'transparent !important',
        height: isDocked ? '100px' : undefined
      }}
    >
      <div className="flex justify-between items-center w-full h-full">
        {/* 1. Logo - Always Absolute in Scaled Context */}
        <a 
            href="#" 
            className="absolute left-12 font-display text-4xl font-bold tracking-tighter uppercase transition-all duration-700 text-white"
            style={{ 
                top: isDocked ? '32px' : '48px',
            }}
        >
            Lenxo
        </a>

        {/* 2. Collective Label */}
        {!isDocked && (
            <span 
                className="flex absolute left-48 top-[60px] font-mono text-[9px] tracking-[0.4em] uppercase border-l border-white/20 pl-6 items-center gap-3 transition-opacity duration-500 text-white"
            >
                Collective
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
            </span>
        )}

        {/* 3. Navigation Links */}
        <div className="flex absolute left-1/2 -translate-x-1/2 items-center px-8 py-3 rounded-full border border-white/20 gap-10 transition-all duration-700 bg-transparent"
            style={{ 
                top: isDocked ? '26px' : '44px'
            }}
        >
            {['The Series', 'Craft', 'Heritage', 'Archive'].map((item) => (
                <a key={item} href="#" className="font-sans text-[10px] font-bold tracking-[0.3em] uppercase transition-all hover:opacity-50 text-white">
                    {item}
                </a>
            ))}
        </div>

        {/* 4. Interaction Hub */}
        <div className="flex items-center gap-10 text-white absolute right-12"
             style={{ 
                top: isDocked ? '48px' : '68px'
             }}
        >
            {!isDocked && (
                <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5" />
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase">EN / USD</span>
                </div>
            )}
            <Search className="w-4 h-4 cursor-pointer" />
            <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                <span className="absolute -top-1.5 -right-1.5 text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-black bg-white text-black">
                    02
                </span>
            </div>
        </div>
      </div>

      {/* Progress Hairline - Pure White */}
      <div 
        ref={progressRef}
        className="absolute bottom-0 left-0 w-full h-[1.5px] origin-left scale-x-0 transition-all duration-700 bg-white"
        style={{ opacity: isDocked ? 1 : 0 }}
      ></div>
    </nav>
  );
}
