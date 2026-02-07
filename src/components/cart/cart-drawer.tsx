"use client";

import React, { useRef, useEffect } from 'react';
import { useShop } from '@/context/shop-context';
import { X, Minus, Plus, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { EditorialEase } from '@/lib/constants';
import { ScrollArea } from '../ui/scroll-area';

export default function CartDrawer() {
  const { isCartOpen, closeCart, cart, removeFromCart, updateQuantity, cartTotal } = useShop();
  const drawerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCartOpen) {
      // Open Animation
      gsap.to(backdropRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.5,
        ease: 'power2.out'
      });
      gsap.fromTo(drawerRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.8, ease: EditorialEase }
      );
      
      // Strict Scroll Lock
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = 'var(--removed-body-scroll-bar-size, 0px)'; // Prevent layout shift
    } else {
      // Close Animation
      gsap.to(backdropRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.5,
        ease: 'power2.in',
        delay: 0.2
      });
      gsap.to(drawerRef.current, {
        x: '100%',
        duration: 0.6,
        ease: 'power4.in' // Snappy exit
      });
      
      // Release Scroll Lock
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    
    return () => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    };
  }, [isCartOpen]);

  return (
    <div className="fixed inset-0 z-[10020] pointer-events-none">
      {/* Backdrop */}
      <div 
        ref={backdropRef}
        onClick={closeCart}
        className="absolute inset-0 bg-black/40 backdrop-blur-3xl opacity-0 cursor-pointer pointer-events-auto"
        onWheel={(e) => e.stopPropagation()} // Prevent scroll bleed from backdrop
      />

      {/* Drawer Panel */}
      <div 
        ref={drawerRef}
        className="absolute top-0 right-0 w-full max-w-[500px] h-full bg-[#050505]/95 backdrop-blur-2xl border-l border-white/10 flex flex-col pointer-events-auto transform translate-x-full shadow-[-50px_0_100px_rgba(0,0,0,0.5)]"
        onWheel={(e) => e.stopPropagation()} // Capture scroll inside drawer
      >
        {/* Header - Optical Blend */}
        <div className="h-[100px] flex items-center justify-between px-10 border-b border-white/10 shrink-0">
          <div className="flex flex-col">
            <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-[#C5A880]">Procurement</span>
            <span className="font-display text-2xl uppercase tracking-tighter text-white">Manifest ({cart.length})</span>
          </div>
          <button 
            onClick={closeCart}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:border-[#C5A880] text-white/50 hover:text-[#C5A880] transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Cart Items - Scroll Area Implementation */}
        <ScrollArea className="flex-grow" type="scroll" hideScrollbar> {/* Force scroll behavior */}
          <div className="px-10 py-10 space-y-10">
            {cart.length === 0 ? (
              <div className="h-[40vh] flex flex-col items-center justify-center text-white/30">
                 <span className="font-mono text-[10px] tracking-[0.2em] uppercase mb-4">Manifest Empty</span>
                 <Link 
                    href="/collection"
                    onClick={closeCart}
                    className="font-display text-xl uppercase underline hover:text-[#C5A880]"
                 >
                    Browse Collection
                 </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-8 group">
                  <div className="relative w-32 h-32 bg-white/5 border border-white/10 overflow-hidden shrink-0">
                    <Image src={item.images.hero} alt={item.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-between py-2">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-display text-2xl uppercase text-white leading-none tracking-tight">{item.name}</h4>
                        <span className="font-mono text-[11px] text-[#C5A880] tracking-wider">${item.price}</span>
                      </div>
                      <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/30">{item.subtitle}</span>
                    </div>

                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-6 border border-white/10 px-4 py-2 bg-white/5 rounded-full">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-white/40 hover:text-[#C5A880] transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-mono text-xs text-white w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-white/40 hover:text-[#C5A880] transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      
                      <button 
                         onClick={() => removeFromCart(item.id)}
                         className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/20 hover:text-red-500 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Footer / Checkout */}
        <div className="p-10 border-t border-white/10 bg-black/40 backdrop-blur-xl shrink-0">
           <div className="flex justify-between items-center mb-8">
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40">Total Amount</span>
              <span className="font-display text-4xl text-white tracking-tighter">${cartTotal}</span>
           </div>
           
           <Link 
              href="/checkout" 
              onClick={closeCart}
              className="w-full h-20 bg-[#C5A880] text-black hover:bg-white transition-all duration-700 flex items-center justify-between px-10 group overflow-hidden relative"
           >
              <span className="font-sans text-xs font-bold tracking-[0.4em] uppercase relative z-10">Procure Series</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-expo"></div>
           </Link>
           
           <p className="mt-8 font-mono text-[8px] text-center text-white/20 uppercase tracking-[0.3em]">
              Architectural Optics / Secured Protocol
           </p>
        </div>
      </div>
    </div>
  );
}
