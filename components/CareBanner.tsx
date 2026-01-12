import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CareBanner: React.FC = () => {
  return (
    <section className="px-6 xl:px-[4vw] pb-24 xl:pb-[8vw]">
      <div className="relative w-full aspect-[4/5] md:aspect-[16/10] xl:aspect-[2.4/1] rounded-[2rem] overflow-hidden">
        
        {/* Background Image: Calm, sharp focus */}
        <img 
          src="/images/lenxo-photo-1589578228447-e1a4e481c6c8.jpg" 
          alt="Eye care lifestyle" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Gradient Overlay: Vertical on mobile (bottom-up), Horizontal on desktop (left-right) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent md:bg-gradient-to-r md:from-black/60 md:via-black/20 md:to-transparent" />

        {/* Content: Bottom aligned on mobile, Center on desktop */}
        <div className="absolute inset-0 flex flex-col justify-end md:justify-center px-8 py-12 md:px-16 xl:px-[5vw]">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white text-4xl md:text-6xl xl:text-[5vw] font-bold tracking-tighter leading-[0.95] mb-6 md:mb-8 max-w-2xl"
          >
            YOUR EYES<br/>
            DESERVE<br/>
            BETTER CARE
          </motion.h2>
          
          <p className="text-zinc-200 text-base md:text-xl max-w-lg mb-8 md:mb-10 leading-relaxed drop-shadow-md">
            Carefully crafted frames and lenses designed for comfort, clarity, and style. Experience the difference of premium eyewear.
          </p>

          <Link to="/collection" className="bg-white text-black px-8 py-3 rounded-full flex items-center gap-3 w-fit hover:bg-zinc-200 transition-colors">
            <span className="text-sm font-bold uppercase tracking-widest">Explore All</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};