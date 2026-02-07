"use client";

import React from 'react';
import LayoutStage from '@/components/layout-stage';
import KineticText from '@/components/ui/kinetic-text';

export default function AboutPage() {
  return (
    <LayoutStage>
      <div className="min-h-screen w-full bg-[#050505] text-white pt-40 px-20 pb-40">
          
          {/* Header */}
          <div className="max-w-4xl mb-40">
             <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#C5A880] mb-8 block">The Origin / Est. 2024</span>
             <h1 className="font-display text-[120px] leading-[0.85] uppercase tracking-tighter mb-12 kinetic-serif">
                Forging <br/> <span className="italic text-[#C5A880]">Permanence.</span>
             </h1>
             <p className="font-sans text-xl text-white/60 leading-relaxed max-w-2xl">
                We are an experimental design collective operating at the intersection of Japanese craftsmanship and digital brutalism.
                We believe in the absolute reduction of form to its most essential state.
             </p>
          </div>

          {/* Section: The Process */}
          <div className="grid grid-cols-12 gap-20 border-t border-white/10 pt-20">
             <div className="col-span-4">
                 <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40 mb-8 block">01 / The Process</span>
                 <h2 className="font-display text-5xl uppercase mb-8">Slow <br/> Manufacturing</h2>
                 <p className="font-sans text-sm text-white/60 leading-relaxed">
                    Each frame requires 200 individual steps to complete. From the hand-polishing of the acetate to the laser-etching of the titanium core, 
                    we reject mass production in favor of obsessive detail.
                 </p>
             </div>
             <div className="col-span-8 h-[600px] bg-white/5 relative overflow-hidden border border-white/10">
                 {/* Placeholder for video */}
                 <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-white/20">Manufacturing Loop</span>
                 </div>
             </div>
          </div>

          {/* Section: The Philosophy */}
          <div className="mt-40 text-center">
             <h3 className="font-display text-6xl uppercase leading-tight mb-12">
                "We do not design for the <br/> current moment, but for the <br/> <span className="text-[#C5A880] italic">Archive</span>."
             </h3>
             <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">The Lenxo Manifesto</span>
          </div>

      </div>
    </LayoutStage>
  );
}
