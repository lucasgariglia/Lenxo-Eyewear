"use client";

import React from 'react';
import { ShoppingBag, Search, Menu } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-12 py-8 flex justify-between items-center mix-blend-difference text-white">
      {/* Logo */}
      <div className="flex-1">
        <a href="#" className="font-display text-3xl font-bold tracking-tight uppercase">
            Lenxo
        </a>
      </div>

      {/* Center Links */}
      <div className="hidden md:flex gap-12 flex-1 justify-center">
        {['Home', 'Collections', 'About', 'Journal'].map((item) => (
            <a key={item} href="#" className="font-sans text-sm tracking-widest uppercase hover:text-[#C5A880] transition-colors">
                {item}
            </a>
        ))}
      </div>

      {/* Right Actions */}
      <div className="flex-1 flex justify-end items-center gap-8">
         <Search className="w-5 h-5 cursor-pointer hover:opacity-70" />
         <div className="relative cursor-pointer hover:opacity-70">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-[#C5A880] text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">2</span>
         </div>
         <Menu className="w-6 h-6 md:hidden cursor-pointer" />
      </div>
    </nav>
  );
}