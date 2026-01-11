import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Dynamic text colors based on scroll state (Hero is Dark, so default is White)
  const textColor = isScrolled ? "text-zinc-800" : "text-white";
  const hoverColor = isScrolled ? "hover:text-black" : "hover:text-white/80";
  const iconColor = isScrolled ? "text-zinc-800" : "text-white";

  return (
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
          <a href="#" className={`text-2xl font-bold tracking-tighter transition-colors duration-300 ${textColor}`}>Lenxo</a>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className={`text-sm font-medium transition-colors duration-300 ${textColor} ${hoverColor}`}>Home</a>
            <a href="#" className={`text-sm font-medium transition-colors duration-300 ${textColor} ${hoverColor}`}>About</a>
            <a href="#" className={`text-sm font-medium transition-colors duration-300 ${textColor} ${hoverColor}`}>Collection</a>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <button aria-label="Search" className={`transition-colors duration-300 ${iconColor} hover:scale-110`}>
            <Search size={20} strokeWidth={1.5} />
          </button>
          
          <button aria-label="Cart" className={`relative transition-colors duration-300 ${iconColor} hover:scale-110 group`}>
            <ShoppingBag size={20} strokeWidth={1.5} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
          </button>

          <button className={`hidden md:block px-6 py-2 text-xs font-bold tracking-widest uppercase rounded-full transition-all hover:scale-105 ${
            isScrolled 
              ? 'bg-zinc-900 text-white hover:bg-zinc-800' 
              : 'bg-white text-black hover:bg-zinc-200'
          }`}>
            Log In
          </button>
          
          <button className={`md:hidden ${iconColor}`}>
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </motion.nav>
  );
};