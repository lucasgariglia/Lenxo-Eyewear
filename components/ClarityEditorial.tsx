import React from 'react';
import { motion } from 'framer-motion';

export const ClarityEditorial: React.FC = () => {
  return (
    <section className="py-24 xl:py-[8vw] bg-[#F4F4F5] overflow-hidden">
      <div className="container mx-auto px-6 xl:px-[4vw]">
        
        {/* Main Composition */}
        <div className="relative xl:h-[40vw] flex flex-col xl:block">
          
          {/* "CLARITY" */}
          <h2 className="text-[15vw] xl:text-[14vw] font-bold tracking-tighter leading-[0.8] text-zinc-950 z-0">
            CLARITY
          </h2>

          {/* "YOU" */}
          <div className="relative">
             <h2 className="text-[15vw] xl:text-[14vw] font-bold tracking-tighter leading-[0.8] text-zinc-950 z-0 xl:ml-[4vw]">
              YOU
            </h2>

            {/* Floating Image Intersection */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mt-8 xl:mt-0 xl:absolute xl:top-[-2vw] xl:left-[35vw] w-full xl:w-[22vw] aspect-[4/5] shadow-2xl z-20 rounded-3xl overflow-hidden bg-zinc-200 transform-gpu"
            >
              <img 
                src="https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=800&auto=format&fit=crop" 
                alt="Clarity Editorial" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* "NOTICE" */}
          <h2 className="text-[15vw] xl:text-[14vw] font-bold tracking-tighter leading-[0.8] text-zinc-300 xl:text-right xl:mt-[-4vw] relative z-10">
            NOTICE
          </h2>
        </div>

      </div>

      {/* Testimonial Section Integration */}
      <div className="mt-24 xl:mt-[10vw] container mx-auto px-6 xl:px-[4vw] flex justify-center">
        <div className="max-w-4xl text-center">
           <span className="text-6xl text-zinc-300 font-serif">"</span>
           <p className="text-3xl md:text-5xl font-serif italic text-zinc-800 leading-tight mb-12">
             I wear them for long hours, and my eyes feel <span className="text-zinc-400">relaxed even after screen time.</span>
           </p>
           
           <div className="flex items-center justify-center gap-4">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" className="w-12 h-12 rounded-full object-cover" alt="User" />
              <div className="text-left">
                <p className="text-sm font-bold text-zinc-900">Arafah Ahmed</p>
                <p className="text-xs text-zinc-500 uppercase tracking-wider">UI Designer</p>
              </div>
              
              <div className="ml-8 flex gap-2">
                 <button className="w-10 h-10 rounded-full border border-zinc-300 flex items-center justify-center hover:bg-black hover:text-white transition-colors">←</button>
                 <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:scale-105 transition-transform">→</button>
              </div>
           </div>
        </div>
      </div>

    </section>
  );
};