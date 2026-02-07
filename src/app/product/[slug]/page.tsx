"use client";

import React, { useLayoutEffect, useState } from 'react';
import LayoutStage from '@/components/layout-stage';
import Image from 'next/image';
import { useParams, notFound } from 'next/navigation';
import { PRODUCTS } from '@/lib/products';
import { useShop } from '@/context/shop-context';
import { Check, Plus, ShieldCheck, Truck } from 'lucide-react';
import KineticText from '@/components/ui/kinetic-text';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProductPage() {
  const { slug } = useParams();
  const product = PRODUCTS.find((p) => p.slug === slug);
  const { addToCart } = useShop();
  const [activeImg, setActiveImg] = useState(0);

  if (!product) {
     return notFound();
  }
  
  const allImages = [product.images.hero, ...product.images.gallery];

  useLayoutEffect(() => {
     gsap.from(".spec-anim", {
         y: 20,
         opacity: 0,
         duration: 0.8,
         stagger: 0.1,
         ease: "power2.out",
         delay: 0.5
     });
  }, []);

  return (
    <LayoutStage>
       <div className="min-h-screen w-full flex bg-[#050505] text-white overflow-hidden">
          
          {/* LEFT: Gallery (Scrollable) */}
          <div className="w-[60%] border-r border-white/10 relative">
             <div className="h-[1200px] overflow-y-auto no-scrollbar relative">
                 {allImages.map((src, i) => (
                     <div key={i} className="relative w-full h-[1000px] border-b border-white/10 group">
                         <Image src={src} alt={product.name} fill className="object-cover" />
                         <div className="absolute bottom-10 left-10 font-mono text-[10px] tracking-[0.2em] bg-black/50 backdrop-blur px-3 py-1 rounded-full text-white/60">
                            VIEW {String(i + 1).padStart(2, '0')}
                         </div>
                     </div>
                 ))}
             </div>
             
             {/* Sticky Label */}
             <div className="absolute top-8 left-8 z-10 pointer-events-none mix-blend-difference">
                 <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-white/50">Visual Data</span>
             </div>
          </div>

          {/* RIGHT: Technical Spec (Sticky) */}
          <div className="w-[40%] h-screen sticky top-0 flex flex-col justify-between pt-32 pb-20 px-16 bg-[#050505]">
             
             {/* Header */}
             <div className="spec-anim">
                 <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#C5A880]">{product.subtitle}</span>
                    <div className="flex items-center gap-2 text-[#C5A880]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse"></div>
                        <span className="font-mono text-[8px] tracking-[0.2em] uppercase">In Stock</span>
                    </div>
                 </div>
                 <h1 className="font-display text-7xl uppercase tracking-tighter mb-6">{product.name}</h1>
                 <p className="font-sans text-sm text-white/60 leading-relaxed max-w-md">
                    {product.description}
                 </p>
             </div>

             {/* Specs Grid */}
             <div className="grid grid-cols-2 gap-x-8 gap-y-12 my-12 py-12 border-t border-b border-white/10 spec-anim">
                 <div>
                     <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/30 block mb-2">Composition</span>
                     <span className="font-sans text-sm font-bold block">{product.specs.material}</span>
                 </div>
                 <div>
                     <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/30 block mb-2">Weight Class</span>
                     <span className="font-sans text-sm font-bold block">{product.specs.weight}</span>
                 </div>
                 <div>
                     <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/30 block mb-2">Origin</span>
                     <span className="font-sans text-sm font-bold block">{product.specs.origin}</span>
                 </div>
                 <div>
                     <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/30 block mb-2">Dimensions</span>
                     <span className="font-sans text-sm font-bold block">{product.specs.dimensions}</span>
                 </div>
             </div>
             
             {/* Actions */}
             <div className="spec-anim">
                 <div className="flex justify-between items-center mb-8">
                     <span className="font-display text-5xl">${product.price}</span>
                     <div className="flex gap-4">
                        <div className="flex items-center gap-2 text-white/40">
                            <Truck size={14} />
                            <span className="font-mono text-[8px] uppercase">Free Shipping</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/40">
                            <ShieldCheck size={14} />
                            <span className="font-mono text-[8px] uppercase">Lifetime Warranty</span>
                        </div>
                     </div>
                 </div>

                 <button 
                    onClick={() => addToCart(product)}
                    className="w-full h-20 bg-white text-black hover:bg-[#C5A880] transition-colors flex items-center justify-between px-10 group"
                 >
                     <span className="font-sans text-sm font-bold tracking-[0.3em] uppercase">Acquire Asset</span>
                     <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
                 </button>
             </div>

          </div>
       </div>
    </LayoutStage>
  );
}
