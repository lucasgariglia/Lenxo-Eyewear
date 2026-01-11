import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl pointer-events-auto flex flex-col md:flex-row max-h-[90vh] md:h-[500px]"
            >
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-1/2 h-64 md:h-full bg-zinc-100 relative overflow-hidden group">
                 <img 
                   src={product.image} 
                   alt={product.name} 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                 />
                 <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
                    {product.category} Series
                 </div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                 <div className="mb-auto">
                    <h2 className="text-4xl font-bold tracking-tight mb-2">{product.name}</h2>
                    <p className="text-2xl text-zinc-900 font-medium mb-6">${product.price}</p>
                    <p className="text-zinc-500 leading-relaxed mb-8">
                       {product.description}
                    </p>
                    
                    <div className="flex gap-3 mb-8">
                       {product.colors.map((c, i) => (
                          <div key={i} className="w-6 h-6 rounded-full border border-zinc-200" style={{ backgroundColor: c }}></div>
                       ))}
                    </div>
                 </div>

                 <div className="flex flex-col gap-3 mt-4">
                    <button 
                      onClick={() => {
                        addToCart(product);
                        onClose();
                      }}
                      className="w-full bg-black text-white py-4 rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all hover:scale-[1.02]"
                    >
                      <ShoppingBag size={16} /> Add to Cart
                    </button>
                    
                    <Link 
                      to={`/product/${product.id}`}
                      className="w-full bg-white border border-zinc-200 text-black py-4 rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-zinc-50 transition-colors"
                    >
                      View Full Details <ArrowRight size={16} />
                    </Link>
                 </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};