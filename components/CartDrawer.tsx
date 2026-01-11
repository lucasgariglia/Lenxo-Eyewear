import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, toggleCart, cartItems, removeFromCart, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-[#FAFAFA] z-[70] shadow-2xl flex flex-col border-l border-zinc-200"
          >
            {/* Header */}
            <div className="p-8 border-b border-zinc-200 flex items-center justify-between bg-white">
              <h2 className="text-2xl font-bold tracking-tight">Your Selection</h2>
              <button 
                onClick={toggleCart}
                className="w-10 h-10 rounded-full hover:bg-zinc-100 flex items-center justify-center transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-8">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-400 space-y-4">
                  <span className="text-6xl">∅</span>
                  <p>Your cart is empty.</p>
                  <button onClick={toggleCart} className="text-black border-b border-black pb-1 text-sm uppercase tracking-widest font-bold mt-4">Start Shopping</button>
                </div>
              ) : (
                <div className="flex flex-col gap-8">
                  {cartItems.map((item) => (
                    <motion.div 
                      layout
                      key={item.id} 
                      className="flex gap-6"
                    >
                      <div className="w-24 h-24 bg-zinc-100 rounded-xl overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg leading-none mb-1">{item.name}</h3>
                            <p className="text-sm text-zinc-500">{item.colors[0]}</p>
                          </div>
                          <p className="font-medium">${item.price}</p>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center gap-3 border border-zinc-200 rounded-full px-3 py-1">
                             <button className="text-zinc-400 hover:text-black"><Minus size={14}/></button>
                             <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                             <button className="text-zinc-400 hover:text-black"><Plus size={14}/></button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-zinc-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-8 border-t border-zinc-200 bg-white">
                <div className="flex justify-between items-end mb-6">
                   <p className="text-zinc-500 text-sm uppercase tracking-widest font-bold">Total</p>
                   <p className="text-3xl font-bold tracking-tighter">${cartTotal}</p>
                </div>
                <Link 
                  to="/checkout" 
                  onClick={toggleCart}
                  className="w-full bg-black text-white py-4 rounded-full flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors group"
                >
                  <span className="font-bold uppercase tracking-widest text-sm">Proceed to Checkout</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};