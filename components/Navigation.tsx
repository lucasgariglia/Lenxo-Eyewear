import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { SearchOverlay } from './SearchOverlay';

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { toggleCart, cartCount } = useCart();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Smart Contrast Logic
  // Home ('/') and About ('/about') have dark backgrounds -> Default to White text
  // All other pages (Collection, Product, etc.) have light backgrounds -> Default to Black text
  const isDarkPage = location.pathname === '/' || location.pathname === '/about';
  
  // If we are scrolled, we always want dark text on the glass background.
  // If we are NOT scrolled, we check the page type.
  // !isDarkPage (Light Page) -> Dark Text
  // isDarkPage (Dark Page) -> White Text
  const shouldUseDarkText = isScrolled || !isDarkPage;

  const textColor = shouldUseDarkText ? "text-zinc-900" : "text-white";
  const hoverColor = shouldUseDarkText ? "hover:text-black" : "hover:text-white/80";
  const iconColor = shouldUseDarkText ? "text-zinc-900" : "text-white";
  
  // Button logic: 
  // On light pages (or scrolled), we want a Dark Button (High Contrast).
  // On dark pages (unscrolled), we want a White Button.
  const buttonClass = shouldUseDarkText 
    ? 'bg-zinc-900 text-white hover:bg-zinc-800' 
    : 'bg-white text-black hover:bg-zinc-200';

  return (
    <>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div
                initial={{ opacity: 0, y: '-100%' }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: '-100%' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-0 bg-[#09090B] z-[60] flex flex-col"
            >
                <div className="container mx-auto px-6 py-8 flex justify-between items-center">
                    <span className="text-2xl font-bold tracking-tighter text-white">Lenxo</span>
                    <button 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 flex flex-col justify-center px-6 gap-8">
                    {[
                        { label: 'Home', href: '/' },
                        { label: 'Collection', href: '/collection' },
                        { label: 'Our Story', href: '/about' },
                        { label: 'Checkout', href: '/checkout' }
                    ].map((item, i) => (
                        <Link key={i} to={item.href}>
                             <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + (i * 0.1) }}
                                className="group flex items-center justify-between border-b border-white/10 pb-4"
                             >
                                <span className="text-5xl font-bold tracking-tighter text-white group-hover:text-zinc-400 transition-colors">{item.label}</span>
                                <ArrowRight className="text-white opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" size={32} />
                             </motion.div>
                        </Link>
                    ))}
                </div>

                <div className="p-6">
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4">Follow Us</p>
                    <div className="flex gap-4 text-white">
                        <span>Instagram</span>
                        <span>Twitter</span>
                        <span>Facebook</span>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out border-b ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-md py-4 border-zinc-200' 
            : 'bg-transparent py-8 border-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-12">
            <Link to="/" className={`text-2xl font-bold tracking-tighter transition-colors duration-300 ${textColor}`}>Lenxo</Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className={`text-sm font-medium transition-colors duration-300 ${textColor} ${hoverColor}`}>Home</Link>
              <Link to="/collection" className={`text-sm font-medium transition-colors duration-300 ${textColor} ${hoverColor}`}>Collection</Link>
              <Link to="/about" className={`text-sm font-medium transition-colors duration-300 ${textColor} ${hoverColor}`}>About</Link>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search" 
              className={`transition-colors duration-300 ${iconColor} hover:scale-110`}
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
            
            <button 
              onClick={toggleCart}
              aria-label="Cart" 
              className={`relative transition-colors duration-300 ${iconColor} hover:scale-110 group`}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 text-[10px] font-bold flex items-center justify-center rounded-full text-black">
                  {cartCount}
                </span>
              )}
            </button>

            <Link to="/checkout" className={`hidden md:block px-6 py-2 text-xs font-bold tracking-widest uppercase rounded-full transition-all hover:scale-105 ${buttonClass}`}>
              Checkout
            </Link>
            
            <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className={`md:hidden ${iconColor}`}
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.nav>
    </>
  );
};