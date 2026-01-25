"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function ManifestoPreloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            clipPath: 'inset(0 0 100% 0)',
            duration: 1.2,
            ease: "expo.inOut",
            onComplete: onComplete
          });
        }
      });

      // 1. Initial State
      tl.set([line1Ref.current, line2Ref.current], { y: 20, opacity: 0 });

      // 2. Counter Animation
      const counterObj = { value: 0 };
      tl.to(counterObj, {
        value: 100,
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: () => setCount(Math.floor(counterObj.value))
      })
      .to(line1Ref.current, { y: 0, opacity: 1, duration: 0.8 }, "-=2")
      .to(line2Ref.current, { y: 0, opacity: 1, duration: 0.8 }, "-=1.5")
      .to([line1Ref.current, line2Ref.current, counterRef.current], { 
        y: -20, 
        opacity: 0, 
        duration: 0.6, 
        delay: 0.2 
      });

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center text-white overflow-hidden"
      style={{ clipPath: 'inset(0 0 0% 0)' }}
    >
      <div className="flex flex-col items-center gap-8">
        <div className="overflow-hidden">
          <div ref={line1Ref} className="font-mono text-[10px] tracking-[0.6em] uppercase text-white/40">
            Absolute Geometric Purity
          </div>
        </div>
        
        <div className="flex items-baseline gap-2">
            <span ref={counterRef} className="font-display text-8xl tracking-tighter w-[160px] text-center">
                {count.toString().padStart(3, '0')}
            </span>
            <span className="font-mono text-xs text-[#C5A880] tracking-widest">%</span>
        </div>

        <div className="overflow-hidden">
          <div ref={line2Ref} className="font-mono text-[10px] tracking-[0.6em] uppercase text-white/40">
            Initialising Optical Engine
          </div>
        </div>
      </div>

      {/* Technical HUD Brackets */}
      <div className="absolute top-12 left-12 w-4 h-4 border-l border-t border-white/20"></div>
      <div className="absolute top-12 right-12 w-4 h-4 border-r border-t border-white/20"></div>
      <div className="absolute bottom-12 left-12 w-4 h-4 border-l border-b border-white/20"></div>
      <div className="absolute bottom-12 right-12 w-4 h-4 border-r border-b border-white/20"></div>
      
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
         <span className="font-mono text-[8px] tracking-[1em] uppercase text-white/10">Lenxo Collective // {new Date().getFullYear()}</span>
      </div>
    </div>
  );
}
