import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data';
import { Product } from '../types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Handle Search
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    const filtered = PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.category.toLowerCase().includes(lowerQuery)
    );
    setResults(filtered);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl flex flex-col"
        >
          {/* Header */}
          <div className="container mx-auto px-6 xl:px-[4vw] py-8 flex justify-end">
            <button 
              onClick={onClose}
              className="w-12 h-12 rounded-full hover:bg-zinc-100 flex items-center justify-center transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Search Input */}
          <div className="container mx-auto px-6 xl:px-[4vw] mt-12">
            <div className="relative border-b border-zinc-200 pb-4">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-400" size={32} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search models, categories..."
                className="w-full bg-transparent text-4xl md:text-6xl font-bold tracking-tighter pl-12 md:pl-16 outline-none placeholder:text-zinc-200 text-black"
              />
            </div>
          </div>

          {/* Results Area */}
          <div className="flex-1 overflow-y-auto mt-12 px-6 xl:px-[4vw] container mx-auto pb-24">
            {results.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {results.map(product => (
                    <Link 
                      key={product.id} 
                      to={`/product/${product.id}`} 
                      onClick={onClose}
                      className="group block"
                    >
                       <div className="flex items-center gap-6 p-4 rounded-2xl hover:bg-zinc-50 transition-colors">
                          <div className="w-24 h-24 bg-zinc-100 rounded-xl overflow-hidden shrink-0">
                             <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                             <h4 className="text-xl font-bold">{product.name}</h4>
                             <p className="text-zinc-500 text-sm">{product.category}</p>
                             <div className="flex items-center gap-2 mt-2 text-sm font-bold uppercase tracking-widest group-hover:underline decoration-1 underline-offset-4">
                                View <ArrowRight size={12} />
                             </div>
                          </div>
                       </div>
                    </Link>
                 ))}
               </div>
            ) : (
                query !== '' && (
                  <div className="text-zinc-400 text-lg">No results found for "{query}"</div>
                )
            )}

            {/* Default Suggestions if empty */}
            {query === '' && (
               <div className="mt-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">Popular Searches</p>
                  <div className="flex flex-wrap gap-4">
                     {['Obsidian', 'Sun', 'Optical', 'Best Sellers'].map(term => (
                        <button 
                           key={term}
                           onClick={() => setQuery(term)}
                           className="px-6 py-2 rounded-full border border-zinc-200 hover:border-black hover:bg-black hover:text-white transition-all text-sm"
                        >
                           {term}
                        </button>
                     ))}
                  </div>
               </div>
            )}
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};