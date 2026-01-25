"use client";

import React from 'react';
import { Facebook, Instagram, Twitter, ArrowRight, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-[1600px] bg-[#091E1D] text-white pt-40 pb-20 px-20 overflow-hidden">
        {/* Background Graphic - Subtle Vertical Line */}
        <div className="absolute top-0 left-[25%] w-[0.5px] h-full bg-white/5"></div>
        
        <div className="grid grid-cols-12 gap-20 mb-40 relative z-10">
            {/* 1. Brand Statement */}
            <div className="col-span-4 flex flex-col justify-between">
                <div>
                  <h2 className="font-display text-8xl mb-12 uppercase tracking-tighter">Lenxo</h2>
                  <p className="font-sans text-sm tracking-wide text-white/40 leading-relaxed max-w-xs uppercase">
                      The Absolute Scaling Engine. <br/>
                      Architecting vision through geometric purity and technical precision.
                  </p>
                </div>
                
                <div className="mt-20 flex gap-4">
                   <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer">
                      <Instagram className="w-4 h-4" />
                   </div>
                   <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer">
                      <Twitter className="w-4 h-4" />
                   </div>
                   <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer">
                      <Facebook className="w-4 h-4" />
                   </div>
                </div>
            </div>

            {/* 2. Quick Access */}
            <div className="col-span-2">
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/20 mb-10 block">Navigation</span>
                <ul className="space-y-6 font-sans text-[11px] font-bold tracking-[0.2em] uppercase">
                    <li><a href="#" className="hover:text-[#C5A880] transition-colors">The Series</a></li>
                    <li><a href="#" className="hover:text-[#C5A880] transition-colors">Our Archive</a></li>
                    <li><a href="#" className="hover:text-[#C5A880] transition-colors">Editorial</a></li>
                    <li><a href="#" className="hover:text-[#C5A880] transition-colors">Boutiques</a></li>
                </ul>
            </div>

            <div className="col-span-2">
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/20 mb-10 block">Support</span>
                <ul className="space-y-6 font-sans text-[11px] font-bold tracking-[0.2em] uppercase">
                    <li><a href="#" className="hover:text-[#C5A880] transition-colors">Logistics</a></li>
                    <li><a href="#" className="hover:text-[#C5A880] transition-colors">Optical Care</a></li>
                    <li><a href="#" className="hover:text-[#C5A880] transition-colors">Contact</a></li>
                    <li><a href="#" className="hover:text-[#C5A880] transition-colors">FAQ</a></li>
                </ul>
            </div>

             {/* 3. Newsletter / Action */}
             <div className="col-span-4 flex flex-col justify-between items-end text-right">
                <div className="w-full">
                  <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/20 mb-10 block">Intel Subscription</span>
                  <div className="relative group border-b border-white/10 pb-4">
                      <input 
                          type="email" 
                          placeholder="ENTER EMAIL ADDRESS" 
                          className="w-full bg-transparent border-none outline-none text-white placeholder-white/20 text-xs tracking-[0.2em] font-sans"
                      />
                      <button className="absolute right-0 top-0 text-white/40 hover:text-white transition-colors">
                          <ArrowRight className="w-4 h-4" />
                      </button>
                  </div>
                </div>

                <div 
                  onClick={scrollToTop}
                  className="mt-20 flex items-center gap-4 cursor-pointer group"
                >
                  <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-white/40 group-hover:text-white">Return to Zenith</span>
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white transition-all">
                    <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
            </div>
        </div>

        {/* --- BOTTOM HUD --- */}
        <div className="relative pt-10 border-t border-white/5 flex justify-between items-center font-mono text-[9px] tracking-[0.3em] uppercase text-white/20">
            <div className="flex gap-10">
              <span className="text-white/40">© 2026 Lenxo Inc.</span>
              <a href="#" className="hover:text-white">Privacy Protocol</a>
              <a href="#" className="hover:text-white">Terms of Engagement</a>
            </div>
            
            <div className="flex gap-10">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500/40"></div>
                  <span>System Nominal</span>
                </div>
                <span>1600px Absolute Engine / V1.0.4</span>
            </div>
        </div>
    </footer>
  );
}