"use client";

import React from 'react';
import LayoutStage from '@/components/layout-stage';
import { useShop } from '@/context/shop-context';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useShop();

  return (
    <LayoutStage>
      <div className="min-h-screen w-full bg-[#050505] text-white pt-40 px-20 pb-40">
        <h1 className="font-display text-8xl uppercase tracking-tighter mb-20">Requisition <br/> <span className="text-[#C5A880] italic">List</span></h1>

        {cart.length === 0 ? (
           <div className="border-t border-white/10 py-20 text-center">
               <p className="font-mono text-sm uppercase tracking-widest text-white/40 mb-8">Manifest is empty.</p>
               <Link href="/collection" className="font-display text-2xl border-b border-white/20 hover:text-[#C5A880] hover:border-[#C5A880] transition-colors pb-1">Initialize Order</Link>
           </div>
        ) : (
           <div className="grid grid-cols-12 gap-20 border-t border-white/10 pt-10">
              {/* Left: Items */}
              <div className="col-span-8 space-y-12">
                  {cart.map((item) => (
                      <div key={item.id} className="flex gap-10 border-b border-white/5 pb-12">
                          <div className="relative w-40 h-40 bg-white/5 border border-white/10">
                              <Image src={item.images.hero} alt={item.name} fill className="object-cover" />
                          </div>
                          
                          <div className="flex-grow flex flex-col justify-between">
                              <div className="flex justify-between items-start">
                                  <div>
                                      <h3 className="font-display text-3xl uppercase mb-2">{item.name}</h3>
                                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#C5A880]">{item.subtitle}</span>
                                  </div>
                                  <span className="font-display text-2xl">${item.price * item.quantity}</span>
                              </div>

                              <div className="flex justify-between items-end">
                                  <div className="flex flex-col gap-2">
                                     <span className="font-mono text-[9px] text-white/30 uppercase">Quantity</span>
                                     <div className="flex items-center gap-6 border border-white/10 px-4 py-2">
                                        <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-[#C5A880]"><Minus size={12}/></button>
                                        <span className="font-mono text-sm w-4 text-center">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-[#C5A880]"><Plus size={12}/></button>
                                     </div>
                                  </div>
                                  
                                  <button onClick={() => removeFromCart(item.id)} className="flex items-center gap-2 text-white/30 hover:text-red-400 transition-colors">
                                      <Trash2 size={14} />
                                      <span className="font-mono text-[9px] uppercase tracking-widest">Remove Asset</span>
                                  </button>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>

              {/* Right: Summary */}
              <div className="col-span-4">
                  <div className="bg-white/5 border border-white/10 p-10 sticky top-40">
                      <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40 mb-8 block">Order Summary</span>
                      
                      <div className="flex justify-between mb-4 font-mono text-sm uppercase">
                          <span className="text-white/60">Subtotal</span>
                          <span>${cartTotal}</span>
                      </div>
                      <div className="flex justify-between mb-8 font-mono text-sm uppercase">
                          <span className="text-white/60">Shipping</span>
                          <span className="text-[#C5A880]">Calculated Next</span>
                      </div>
                      
                      <div className="border-t border-white/10 pt-6 mb-10 flex justify-between font-display text-2xl uppercase">
                          <span>Total</span>
                          <span>${cartTotal}</span>
                      </div>

                      <Link href="/checkout">
                         <button className="w-full h-16 bg-[#C5A880] text-black hover:bg-white transition-colors font-sans text-xs font-bold tracking-[0.3em] uppercase">
                             Begin Checkout
                         </button>
                      </Link>
                  </div>
              </div>
           </div>
        )}
      </div>
    </LayoutStage>
  );
}
