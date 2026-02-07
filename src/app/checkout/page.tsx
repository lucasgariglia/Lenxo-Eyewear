"use client";

import React, { useState } from 'react';
import LayoutStage from '@/components/layout-stage';
import { useShop } from '@/context/shop-context';
import { CheckCircle, Lock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cartTotal } = useShop();
  const [step, setStep] = useState(1);
  const router = useRouter();

  return (
    <LayoutStage>
       <div className="min-h-screen w-full bg-[#050505] text-white pt-40 px-20 pb-40">
          
          <div className="grid grid-cols-12 gap-20">
             
             {/* Main Checkout Form */}
             <div className="col-span-7">
                <div className="flex items-center gap-4 mb-12">
                   <Lock size={16} className="text-[#C5A880]" />
                   <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">Secure Transaction Protocol</span>
                </div>

                {/* Steps */}
                <div className="flex gap-8 border-b border-white/10 pb-8 mb-12 font-mono text-[10px] tracking-[0.3em] uppercase">
                   <span className={step >= 1 ? "text-white" : "text-white/30"}>01. Identity</span>
                   <span className={step >= 2 ? "text-white" : "text-white/30"}>02. Logistics</span>
                   <span className={step >= 3 ? "text-white" : "text-white/30"}>03. Payment</span>
                </div>

                {/* Form Simulation */}
                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                   <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                         <label className="font-mono text-[9px] uppercase tracking-widest text-white/50">First Name</label>
                         <input type="text" className="w-full bg-transparent border-b border-white/20 py-3 focus:border-[#C5A880] outline-none font-sans" placeholder="ENTER FIRST NAME" />
                      </div>
                      <div className="space-y-2">
                         <label className="font-mono text-[9px] uppercase tracking-widest text-white/50">Last Name</label>
                         <input type="text" className="w-full bg-transparent border-b border-white/20 py-3 focus:border-[#C5A880] outline-none font-sans" placeholder="ENTER LAST NAME" />
                      </div>
                   </div>

                   <div className="space-y-2">
                        <label className="font-mono text-[9px] uppercase tracking-widest text-white/50">Email Address</label>
                        <input type="email" className="w-full bg-transparent border-b border-white/20 py-3 focus:border-[#C5A880] outline-none font-sans" placeholder="ENTER EMAIL" />
                   </div>

                   <div className="pt-8">
                      <button 
                        onClick={() => {
                            if (step === 3) {
                                alert("Order Placed Successfully!");
                                router.push('/');
                            } else {
                                setStep(prev => prev + 1);
                            }
                        }}
                        className="w-full h-16 bg-white text-black hover:bg-[#C5A880] transition-colors font-sans text-xs font-bold tracking-[0.3em] uppercase"
                      >
                         {step === 3 ? "Complete Order" : "Continue"}
                      </button>
                   </div>
                </form>

             </div>

             {/* Order Summary Sidebar */}
             <div className="col-span-5 pl-10 border-l border-white/10">
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40 mb-8 block">Manifest Summary</span>
                
                <div className="space-y-4 mb-8">
                   <div className="flex justify-between font-mono text-xs uppercase text-white/60">
                      <span>Subtotal</span>
                      <span>${cartTotal}</span>
                   </div>
                   <div className="flex justify-between font-mono text-xs uppercase text-white/60">
                      <span>Shipping</span>
                      <span>Free</span>
                   </div>
                   <div className="flex justify-between font-mono text-xs uppercase text-white/60">
                      <span>Taxes</span>
                      <span>$0.00</span>
                   </div>
                </div>

                <div className="flex justify-between border-t border-white/10 pt-6 font-display text-3xl uppercase mb-12">
                   <span>Total</span>
                   <span>${cartTotal}</span>
                </div>

                <div className="bg-[#111] p-6 border border-white/5">
                   <p className="font-mono text-[9px] text-white/40 leading-relaxed uppercase">
                      By proceeding, you agree to the Terms of Service. All assets are subject to final inspection before deployment.
                   </p>
                </div>
             </div>

          </div>
       </div>
    </LayoutStage>
  );
}
