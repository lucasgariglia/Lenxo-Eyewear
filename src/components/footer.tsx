"use client";

import React from 'react';
import { Facebook, Instagram, Twitter, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative w-[1600px] bg-black text-white pt-24 pb-12 px-12 overflow-hidden">
        <div className="grid grid-cols-12 gap-8 mb-24">
            {/* Brand Column */}
            <div className="col-span-4 pr-12">
                <h2 className="font-display text-5xl mb-8 uppercase">Lenxo</h2>
                <p className="font-sans text-gray-400 leading-relaxed max-w-sm">
                    Crafting the future of vision with absolute precision and editorial aesthetics. 
                    Designed for those who see the world differently.
                </p>
            </div>

            {/* Links */}
            <div className="col-span-2">
                <h4 className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-8">Shop</h4>
                <ul className="space-y-4 font-sans text-sm">
                    <li><a href="#" className="hover:text-[#C5A880] transition-colors">New Arrivals</a></li>
                    <li><a href="#" className="hover:text-[#C5A880] transition-colors">Optical</a></li>
                    <li><a href="#" className="hover:text-[#C5A880] transition-colors">Sun</a></li>
                    <li><a href="#" className="hover:text-[#C5A880] transition-colors">Accessories</a></li>
                </ul>
            </div>

            <div className="col-span-2">
                <h4 className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-8">Company</h4>
                <ul className="space-y-4 font-sans text-sm">
                    <li><a href="#" className="hover:text-[#C5A880] transition-colors">Our Story</a></li>
                    <li><a href="#" className="hover:text-[#C5A880] transition-colors">Journal</a></li>
                    <li><a href="#" className="hover:text-[#C5A880] transition-colors">Careers</a></li>
                    <li><a href="#" className="hover:text-[#C5A880] transition-colors">Contact</a></li>
                </ul>
            </div>

             {/* Newsletter */}
             <div className="col-span-4">
                <h4 className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-8">Newsletter</h4>
                <p className="font-sans text-sm text-gray-400 mb-6">Subscribe to receive updates, access to exclusive deals, and more.</p>
                <div className="flex border-b border-white/20 pb-4">
                    <input 
                        type="email" 
                        placeholder="Your email address" 
                        className="bg-transparent border-none outline-none text-white placeholder-gray-600 flex-1 font-sans"
                    />
                    <button className="text-white hover:text-[#C5A880] transition-colors">
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex justify-between items-end border-t border-white/10 pt-8">
            <div className="flex gap-8">
                 <a href="#" className="text-gray-500 hover:text-white transition-colors"><Instagram className="w-5 h-5"/></a>
                 <a href="#" className="text-gray-500 hover:text-white transition-colors"><Twitter className="w-5 h-5"/></a>
                 <a href="#" className="text-gray-500 hover:text-white transition-colors"><Facebook className="w-5 h-5"/></a>
            </div>
            
            <div className="flex gap-8 font-mono text-xs text-gray-600 uppercase tracking-wider">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <span>© 2026 Lenxo Inc.</span>
            </div>
        </div>
    </footer>
  );
}
