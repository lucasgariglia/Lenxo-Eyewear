import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data';
import { ArrowRight } from 'lucide-react';

export const Collection: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Optical' | 'Sun'>('All');

  const filteredProducts = filter === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* Header */}
      <div className="pt-12 px-6 xl:px-[4vw] container mx-auto max-w-[1800px] mb-16">
         <h1 className="text-6xl xl:text-8xl font-bold tracking-tighter mb-6">Full Collection</h1>
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p className="text-xl text-zinc-500 max-w-2xl">
                Explore our complete range of handcrafted eyewear, where Japanese engineering meets Italian acetate.
            </p>
            
            {/* Filters */}
            <div className="flex gap-2">
               {['All', 'Optical', 'Sun'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat as any)}
                    className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${
                        filter === cat 
                        ? 'bg-black text-white' 
                        : 'bg-white text-zinc-500 hover:bg-zinc-100'
                    }`}
                  >
                    {cat}
                  </button>
               ))}
            </div>
         </div>
      </div>

      {/* Grid */}
      <div className="px-6 xl:px-[4vw] container mx-auto max-w-[1800px]">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
           <AnimatePresence mode="popLayout">
               {filteredProducts.map((product) => (
                 <Link to={`/product/${product.id}`} key={product.id} className="group block">
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ y: -10 }}
                      className="aspect-[4/5] bg-zinc-100 rounded-2xl overflow-hidden mb-6 relative"
                    >
                       <img 
                         src={product.image} 
                         alt={product.name} 
                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                       />
                       
                       {/* Quick view overlay */}
                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                          <div className="bg-white text-black px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                             View Details <ArrowRight size={12} />
                          </div>
                       </div>
                    </motion.div>
                    
                    <div className="flex justify-between items-start">
                       <div>
                          <h3 className="text-xl font-bold mb-1">{product.name}</h3>
                          <p className="text-zinc-500 text-sm">{product.category} • {product.specs?.fit} Fit</p>
                       </div>
                       <span className="font-medium">${product.price}</span>
                   </div>
                 </Link>
               ))}
           </AnimatePresence>
        </motion.div>
        
        {filteredProducts.length === 0 && (
            <div className="py-24 text-center text-zinc-400">
                No products found in this category.
            </div>
        )}
      </div>
    </div>
  );
};