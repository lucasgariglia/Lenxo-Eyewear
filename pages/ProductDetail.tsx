import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Shield, Truck } from 'lucide-react';
import { PRODUCTS } from '../data';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === id);
  const { addToCart } = useCart();

  if (!product) return <div className="h-screen flex items-center justify-center">Product not found</div>;

  return (
    <div className="bg-white min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-0 xl:px-[4vw] max-w-[1800px]">
        
        <Link to="/" className="inline-flex items-center gap-2 ml-6 mb-8 text-sm font-bold uppercase tracking-widest hover:opacity-50 transition-opacity">
           <ArrowLeft size={16} /> Back
        </Link>

        <div className="flex flex-col lg:flex-row gap-12 xl:gap-24">
           {/* Left: Scrolling Gallery */}
           <div className="lg:w-3/5 flex flex-col gap-4 px-6 lg:px-0">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full aspect-[4/5] bg-zinc-100 rounded-3xl overflow-hidden"
              >
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </motion.div>
              
              <div className="grid grid-cols-2 gap-4">
                 <div className="aspect-square bg-zinc-100 rounded-3xl overflow-hidden">
                    <img src={product.image} alt="Detail" className="w-full h-full object-cover scale-150" />
                 </div>
                 <div className="aspect-square bg-zinc-900 rounded-3xl flex items-center justify-center text-white p-8">
                    <p className="font-serif italic text-3xl text-center">"Designed to disappear."</p>
                 </div>
              </div>
           </div>

           {/* Right: Sticky Details */}
           <div className="lg:w-2/5 px-6 lg:pr-12 relative">
              <div className="sticky top-32">
                 <motion.div
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.2 }}
                 >
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-zinc-100 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-500">{product.category}</span>
                      {product.id === 'obsidian' && <span className="px-3 py-1 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest">Best Seller</span>}
                    </div>

                    <h1 className="text-6xl xl:text-7xl font-bold tracking-tighter mb-4">{product.name}</h1>
                    <p className="text-3xl font-medium mb-8">${product.price}</p>
                    
                    <p className="text-zinc-500 text-lg leading-relaxed mb-10 border-b border-zinc-100 pb-10">
                      {product.description}
                    </p>

                    {/* Color Selection */}
                    <div className="mb-8">
                       <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 block mb-3">Select Color</span>
                       <div className="flex gap-4">
                          {product.colors.map((c, i) => (
                            <button key={i} className={`w-12 h-12 rounded-full border-2 ${i === 0 ? 'border-black' : 'border-transparent hover:border-zinc-300'}`} style={{ backgroundColor: c }}></button>
                          ))}
                       </div>
                    </div>

                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full bg-black text-white py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-xl mb-6"
                    >
                      Add to Cart — ${product.price}
                    </button>

                    <div className="grid grid-cols-2 gap-4 text-xs font-bold uppercase tracking-widest text-zinc-500 mb-12">
                       <div className="flex items-center gap-2"><Truck size={14}/> Free Shipping</div>
                       <div className="flex items-center gap-2"><Shield size={14}/> 2 Year Warranty</div>
                       <div className="flex items-center gap-2"><Check size={14}/> 30-Day Returns</div>
                       <div className="flex items-center gap-2"><Check size={14}/> Authenticity Guaranteed</div>
                    </div>

                    {/* Accordion Specs */}
                    <div className="space-y-4">
                       <div className="border-t border-zinc-200 pt-4">
                          <p className="font-bold mb-2">Technical Specifications</p>
                          <div className="grid grid-cols-2 gap-y-2 text-sm text-zinc-600">
                             <span>Material</span>
                             <span className="text-right">{product.specs?.material}</span>
                             <span>Lens Type</span>
                             <span className="text-right">{product.specs?.lens}</span>
                             <span>Fit</span>
                             <span className="text-right">{product.specs?.fit}</span>
                          </div>
                       </div>
                    </div>

                 </motion.div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};