"use client";

import React from 'react';
import { Instagram, Twitter, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    // Shutter Effect resets to top
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <footer className="relative w-full lg:w-[1600px] bg-black text-white pt-20 lg:pt-60 pb-20 px-6 lg:px-20 overflow-hidden">
        {/* Editorial Background Hairlines - Desktop Only */}
        <div className="hidden lg:block absolute top-0 left-[25%] w-[0.5px] h-full bg-white/5"></div>
        <div className="hidden lg:block absolute top-0 left-[75%] w-[0.5px] h-full bg-white/5"></div>
        
        <div className="relative z-10">
            {/* 1. Master Headline */}
            <div className="mb-20 lg:mb-40">
                <span className="font-mono text-[10px] tracking-[0.6em] uppercase text-[#C5A880] block mb-8 lg:mb-12">Final Statement</span>
                <h2 className="font-display text-[60px] lg:text-[180px] leading-[0.9] lg:leading-[0.7] uppercase tracking-tighter kinetic-serif">
                    End of <br/>
                    <span className="italic text-[#C5A880]">Dialogue.</span>
                </h2>
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-20 mb-20 lg:mb-60">
                {/* 2. Brand Colophon */}
                <div className="lg:col-span-4">
                    <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/20 mb-6 lg:mb-10 block">Colophon</span>
                    <p className="font-sans text-xs tracking-[0.2em] text-white/40 leading-relaxed uppercase max-w-xs">
                        Architecting the future of optics through <br/>
                        absolute geometric purity and <br/>
                        technical materiality. <br/><br/>
                        Designed in California. <br/>
                        Manufactured in Japan.
                    </p>
                    
                    <div className="mt-12 lg:mt-20 flex gap-6">
                        <a href="#" className="font-mono text-[9px] tracking-[0.3em] uppercase hover:text-[#C5A880] transition-colors">Instagram</a>
                        <a href="#" className="font-mono text-[9px] tracking-[0.3em] uppercase hover:text-[#C5A880] transition-colors">Twitter / X</a>
                    </div>
                </div>

                {/* 3. Archive Index */}
                <div className="lg:col-span-4">
                    <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/20 mb-6 lg:mb-10 block">Archive Index</span>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-4 font-mono text-[9px] tracking-[0.2em] uppercase text-white/60">
                        <div className="flex justify-between border-b border-white/5 pb-2"><span>Model 801</span><span className="text-[#C5A880]">Archon</span></div>
                        <div className="flex justify-between border-b border-white/5 pb-2"><span>Model 802</span><span className="text-[#C5A880]">Stitch</span></div>
                        <div className="flex justify-between border-b border-white/5 pb-2"><span>Model 803</span><span className="text-[#C5A880]">Minimal</span></div>
                        <div className="flex justify-between border-b border-white/5 pb-2"><span>Model 804</span><span className="text-[#C5A880]">Refined</span></div>
                        <div className="flex justify-between border-b border-white/5 pb-2"><span>Model 805</span><span className="text-[#C5A880]">Vision</span></div>
                        <div className="flex justify-between border-b border-white/5 pb-2"><span>Model 806</span><span className="text-[#C5A880]">Statement</span></div>
                    </div>
                </div>

                {/* 4. Action Hub */}
                <div className="lg:col-span-4 flex flex-col justify-between items-start lg:items-end">
                    <div className="text-left lg:text-right w-full">
                        <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/20 mb-6 lg:mb-10 block">Navigation</span>
                        <ul className="space-y-4 font-display text-xl lg:text-2xl uppercase tracking-tighter">
                            <li><a href="#" className="hover:italic hover:text-[#C5A880] transition-all underline decoration-white/10 underline-offset-8">The Series</a></li>
                            <li><a href="#" className="hover:italic hover:text-[#C5A880] transition-all">Archive</a></li>
                            <li><a href="#" className="hover:italic hover:text-[#C5A880] transition-all">Heritage</a></li>
                            <li><a href="#" className="hover:italic hover:text-[#C5A880] transition-all">Contact</a></li>
                        </ul>
                    </div>

                    <div 
                        onClick={scrollToTop}
                        className="mt-12 lg:mt-20 flex items-center gap-6 cursor-pointer group"
                    >
                        <span className="font-mono text-[9px] tracking-[0.6em] uppercase text-white/20 group-hover:text-white transition-colors">Return to Zenith</span>
                        <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#C5A880] transition-all duration-700">
                            <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform text-white/40 group-hover:text-[#C5A880]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- TECHNICAL HUD FOOTER --- */}
            <div className="pt-10 border-t border-white/5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-0 font-mono text-[8px] tracking-[0.4em] uppercase text-white/10">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-12">
                    <span>LENXO COLLECTIVE © 2026</span>
                    <span>42.3601° N, 71.0589° W</span>
                    <span>Technical Materiality Protocol v1.0.4</span>
                </div>
                
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-1 rounded-full bg-[#C5A880] animate-pulse"></div>
                        <span>Engine Status: Nominal</span>
                    </div>
                    <span className="text-white/30 hidden lg:inline">1600px Stage Absolute</span>
                </div>
            </div>
        </div>
    </footer>
  );
}