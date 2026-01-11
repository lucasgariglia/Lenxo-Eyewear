import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ShoppingBag } from 'lucide-react';

export const CraftedDaily: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragConstraint, setDragConstraint] = useState(0);

  // Calculate drag constraints on mount/resize
  useEffect(() => {
    const calculateConstraints = () => {
      if (containerRef.current) {
        // Total width of all cards (6 cards * 22vw width + 5 gaps * 1.5vw) approx
        // A safer way is to rely on scrollWidth, but since we are using flex, 
        // we can estimate based on the known card sizes in VW.
        // Let's allow a generous scroll area.
        const windowWidth = window.innerWidth;
        // Updated to 700 to match the new 'xl' breakpoint in tailwind config
        if (windowWidth >= 700) {
            // Approx width of content in pixels
            // 6 cards * (windowWidth * 0.22) + gaps
            const cardWidth = windowWidth * 0.22;
            const gap = windowWidth * 0.015;
            const totalWidth = (cardWidth * 6) + (gap * 5);
            const viewPortWidth = windowWidth - (windowWidth * 0.08); // accounting for padding
            setDragConstraint(-(totalWidth - viewPortWidth) - 100);
        }
      }
    };

    calculateConstraints();
    window.addEventListener('resize', calculateConstraints);
    return () => window.removeEventListener('resize', calculateConstraints);
  }, []);

  // Common prevent default for images to allow slider drag
  const preventDrag = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <section className="w-full bg-[#09090B] text-white py-24 xl:py-[8vw] overflow-hidden">
      <div className="container mx-auto px-6 xl:px-[4vw] max-w-[1600px]">
        
        {/* Header */}
        <div className="flex flex-col xl:flex-row justify-between xl:items-end mb-16 xl:mb-[4vw] gap-12">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl xl:text-[5vw] leading-[0.9] font-bold tracking-tighter"
          >
            CRAFTED<br/>
            FOR DAILY<br/>
            LIFE
          </motion.h2>

          <div className="xl:max-w-[30vw]">
             <p className="text-zinc-400 text-lg xl:text-[1.2vw] leading-relaxed mb-8">
               From lightweight frames to precise lenses, our goal is simple: eyewear that disappears the moment you put it on, letting you focus on life.
             </p>
             <button className="bg-white text-black px-8 py-3 rounded-full flex items-center gap-2 hover:bg-zinc-200 transition-colors group">
               <span className="text-sm font-bold uppercase tracking-widest">Explore All</span>
               <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        </div>

        {/* 
            MOBILE LAYOUT (< 700px) 
            Vertical Stack, Standard Scroll
        */}
        <div className="flex flex-col gap-6 xl:hidden">
            {/* Card 1: Stats */}
            <div className="bg-[#27272A] rounded-2xl p-8 aspect-square flex flex-col justify-end relative overflow-hidden">
                <p className="text-6xl font-serif italic text-zinc-500 mb-4">1</p>
                <div className="flex -space-x-4 mb-4">
                  {["https://images.unsplash.com/photo-1534528741775-53994a69daeb", "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"].map((src, i) => (
                    <img key={i} src={`${src}?q=80&w=100&auto=format&fit=crop`} className="w-10 h-10 rounded-full border-2 border-[#27272A] object-cover" alt="user" />
                  ))}
                </div>
                <p className="text-sm font-medium text-zinc-300">95% Customer<br/>Satisfaction</p>
            </div>
            
            {/* Card 2: Lifestyle */}
            <div className="bg-[#F3EAD5] rounded-2xl aspect-square relative overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1509695507497-903c140c43b0?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover mix-blend-multiply opacity-90" alt="Lifestyle" />
            </div>

            {/* Card 3: Product */}
            <div className="bg-white rounded-2xl aspect-square relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Product" />
                <div className="absolute bottom-6 left-6 text-black">
                   <p className="font-bold text-lg">Crystal Frame</p>
                   <p className="text-sm text-zinc-500">$249.00</p>
                </div>
            </div>
        </div>


        {/* 
            DESKTOP LAYOUT (>= 700px) 
            Horizontal Draggable Slider
        */}
        <div className="hidden xl:block w-full overflow-visible" ref={containerRef}>
          <motion.div 
            drag="x"
            dragConstraints={{ right: 0, left: dragConstraint }}
            whileTap={{ cursor: "grabbing" }}
            className="flex gap-[1.5vw] cursor-grab active:cursor-grabbing w-max"
          >
            
            {/* Card 1: Customer Satisfaction */}
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="w-[22vw] aspect-square bg-[#27272A] rounded-2xl p-[2vw] flex flex-col justify-end relative overflow-hidden group shrink-0 select-none"
            >
               <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 blur-2xl"></div>
               </div>
               <p className="text-[4vw] font-serif italic text-zinc-500 mb-4 group-hover:text-white transition-colors duration-500">1</p>
               <div className="flex -space-x-[0.5vw] mb-4">
                 {["https://images.unsplash.com/photo-1534528741775-53994a69daeb", "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"].map((src, i) => (
                   <div key={i} className="w-[3vw] h-[3vw] rounded-full border-2 border-[#27272A] bg-zinc-600 overflow-hidden">
                     <img 
                      src={`${src}?q=80&w=200&auto=format&fit=crop`} 
                      className="w-full h-full object-cover" 
                      alt="avatar" 
                      draggable="false"
                      onDragStart={preventDrag}
                     />
                   </div>
                 ))}
               </div>
               <p className="text-[1vw] font-medium text-zinc-300">95% Customer<br/>Satisfaction</p>
            </motion.div>

            {/* Card 2: Lifestyle Link */}
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="w-[22vw] aspect-square bg-[#F3EAD5] rounded-2xl overflow-hidden relative group shrink-0 select-none"
            >
               <img 
                 src="https://images.unsplash.com/photo-1509695507497-903c140c43b0?q=80&w=800&auto=format&fit=crop" 
                 className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-110 transition-transform duration-700" 
                 alt="Lifestyle" 
                 draggable="false"
                 onDragStart={preventDrag}
               />
               <div className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-lg group-hover:scale-110 transition-transform">
                 <ArrowRight size={20} />
               </div>
            </motion.div>

            {/* Card 3: Quick Add Product (Actionable) */}
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="w-[22vw] aspect-square bg-white rounded-2xl relative overflow-hidden group shrink-0 select-none"
            >
               <img 
                 src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop" 
                 className="w-full h-full object-cover" 
                 alt="Glasses Detail" 
                 draggable="false"
                 onDragStart={preventDrag}
               />
               
               {/* Overlay on Hover */}
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <button className="bg-white text-black px-8 py-3 rounded-full flex items-center gap-2 hover:scale-105 transition-transform">
                    <ShoppingBag size={16} />
                    <span className="text-xs font-bold uppercase tracking-widest">Quick Add</span>
                  </button>
               </div>
               
               <div className="absolute bottom-[2vw] left-[2vw] opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <p className="text-black font-bold text-lg">Crystal Series</p>
                  <p className="text-zinc-500 text-sm">$249.00</p>
               </div>
            </motion.div>

            {/* Card 4: Video Process (Fixed Image) */}
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="w-[22vw] aspect-square bg-zinc-900 rounded-2xl relative overflow-hidden group shrink-0 select-none"
            >
               {/* Updated with a reliable Craftsmanship/Process Image - Tools/Hands */}
               <img 
                 src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop" 
                 className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" 
                 alt="Process" 
                 draggable="false"
                 onDragStart={preventDrag}
               />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center pl-1 group-hover:scale-110 transition-transform duration-300 border border-white/20">
                     <Play size={24} fill="white" className="text-white" />
                  </div>
               </div>
               <div className="absolute bottom-[2vw] left-[2vw]">
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">Process</p>
                  <p className="text-[1.5vw] font-serif italic leading-none">Handcrafted<br/>Precision</p>
               </div>
            </motion.div>

             {/* Card 5: Shop The Look */}
             <motion.div 
              whileHover={{ scale: 0.98 }}
              className="w-[22vw] aspect-square bg-[#E4E4E7] rounded-2xl relative overflow-hidden group shrink-0 select-none"
            >
               <img 
                 src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop" 
                 className="w-full h-full object-cover mix-blend-multiply" 
                 alt="Look" 
                 draggable="false"
                 onDragStart={preventDrag}
               />
               
               {/* Floating Tag */}
               <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute top-[40%] left-[60%] bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform"
               >
                 <p className="text-xs font-bold text-black">$189</p>
               </motion.div>

               <div className="absolute bottom-[2vw] left-[2vw]">
                  <p className="text-black font-bold text-lg">Obsidian</p>
                  <button className="mt-2 text-xs font-bold uppercase tracking-widest text-zinc-600 border-b border-zinc-400 pb-1 hover:text-black hover:border-black transition-colors">Shop Look</button>
               </div>
            </motion.div>

            {/* Card 6: View Gallery (End Card) */}
             <motion.div 
              whileHover={{ scale: 0.98 }}
              className="w-[22vw] aspect-square bg-[#18181B] rounded-2xl p-[2vw] flex items-center justify-center relative overflow-hidden group shrink-0 cursor-pointer select-none"
            >
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"></div>
               <div className="relative z-10 text-center flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                    <ArrowRight size={24} />
                  </div>
                  <span className="text-sm uppercase tracking-widest font-bold">View Full Gallery</span>
               </div>
            </motion.div>

          </motion.div>
        </div>

        {/* Drag Hint Indicator */}
        <div className="hidden xl:flex justify-end mt-8 gap-2 items-center text-zinc-500">
            <span className="text-xs uppercase tracking-widest">Drag to explore</span>
            <div className="w-12 h-[1px] bg-zinc-800"></div>
        </div>

      </div>
    </section>
  );
};