import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ShoppingBag, Eye, Sun, Scale, ShieldCheck, Star, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CraftedDailyProps {
  onQuickView: (productId: string) => void;
  onPlayVideo: () => void;
}

export const CraftedDaily: React.FC<CraftedDailyProps> = ({ onQuickView, onPlayVideo }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragConstraint, setDragConstraint] = useState(0);

  // Calculate drag constraints on mount/resize
  useEffect(() => {
    const calculateConstraints = () => {
      if (containerRef.current) {
        const windowWidth = window.innerWidth;
        if (windowWidth >= 700) {
            // Approx width of content in pixels
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

  const preventDrag = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <section className="w-full bg-[#09090B] text-white py-24 xl:py-[8vw] overflow-hidden">
      <div className="container mx-auto px-6 xl:px-[4vw] max-w-[1600px]">
        
        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-end mb-16 xl:mb-[4vw]">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl xl:text-[5vw] leading-[0.9] font-bold tracking-tighter shrink-0"
          >
            CRAFTED<br/>
            FOR DAILY<br/>
            LIFE
          </motion.h2>

          <div className="mt-12 xl:mt-0 xl:ml-[8vw] xl:max-w-[28vw] flex flex-col justify-end xl:pb-[0.5vw]">
             <p className="text-zinc-400 text-lg xl:text-[1.2vw] leading-relaxed mb-8">
               From lightweight frames to precise lenses, our goal is simple: eyewear that disappears the moment you put it on, letting you focus on life.
             </p>
             <Link to="/collection" className="bg-white text-black px-8 py-3 rounded-full flex items-center gap-2 hover:bg-zinc-200 transition-colors group w-fit">
               <span className="text-sm font-bold uppercase tracking-widest">Explore All</span>
               <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
        </div>

        {/* 
            MOBILE LAYOUT (< 700px) 
            Vertical Stack
        */}
        <div className="flex flex-col gap-6 xl:hidden">
            {/* Card 1 */}
            <div className="bg-[#27272A] rounded-2xl p-8 aspect-square flex flex-col justify-end relative overflow-hidden">
                <p className="text-6xl font-serif italic text-zinc-500 mb-4">1</p>
                <div className="flex -space-x-4 mb-4">
                  {["https://images.unsplash.com/photo-1534528741775-53994a69daeb", "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"].map((src, i) => (
                    <img key={i} src={`${src}?q=80&w=100&auto=format&fit=crop`} className="w-10 h-10 rounded-full border-2 border-[#27272A] object-cover" alt="user" />
                  ))}
                </div>
                <p className="text-sm font-medium text-zinc-300">95% Customer<br/>Satisfaction</p>
            </div>
            
            {/* Card 2: Lifestyle Mobile */}
            <div onClick={() => onQuickView('nebula')} className="bg-[#F3EAD5] rounded-2xl aspect-square relative overflow-hidden block">
               <img src="https://images.unsplash.com/photo-1509695507497-903c140c43b0?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover mix-blend-multiply opacity-90" alt="Lifestyle" />
               <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full border border-black/5 z-30">
                    <span className="text-xs font-bold uppercase tracking-widest text-black">Campaign 2024</span>
               </div>
               <div className="absolute bottom-6 left-6 z-10">
                 <h3 className="text-2xl font-bold text-black leading-none mb-1">Urban<br/>Exploration</h3>
                 <p className="text-zinc-600 text-sm">View Lookbook</p>
               </div>
               <div className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-lg z-10">
                 <ArrowRight size={20} />
               </div>
            </div>

            {/* Card 3: Product Mobile */}
            <div onClick={() => onQuickView('crystal')} className="bg-white rounded-2xl aspect-square relative overflow-hidden block">
                <img src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Product" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                   <p className="font-bold text-lg">Crystal Frame</p>
                   <p className="text-sm text-zinc-300">$249.00</p>
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

            {/* Card 2: Lifestyle Link - UPDATED WITH QUICK VIEW & BADGE FIX */}
            <motion.div 
              onClick={() => onQuickView('nebula')}
              whileHover={{ scale: 0.98 }}
              className="w-[22vw] aspect-square bg-[#F3EAD5] rounded-2xl overflow-hidden relative group shrink-0 select-none cursor-pointer"
            >
               <img 
                 src="https://images.unsplash.com/photo-1509695507497-903c140c43b0?q=80&w=800&auto=format&fit=crop" 
                 className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-110 transition-transform duration-700" 
                 alt="Lifestyle" 
                 draggable="false"
                 onDragStart={preventDrag}
               />
               
               {/* Badge - Z-Index 30 to sit above hover overlay */}
               <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full border border-black/5 z-30">
                    <span className="text-xs font-bold uppercase tracking-widest text-black">Campaign 2024</span>
               </div>
               
               {/* Globe Icon - Z-Index 30 */}
               <div className="absolute top-4 right-4 z-30">
                   <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-black border border-black/5" title="Global Edition">
                        <Globe size={14} />
                   </div>
               </div>
               
               {/* Overlay on Hover - Central Button */}
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm z-20">
                    <button className="bg-white text-black px-8 py-3 rounded-full flex items-center gap-2 hover:scale-105 transition-transform pointer-events-none">
                        <Eye size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Quick View</span>
                    </button>
               </div>

               <div className="absolute bottom-6 left-6 z-10">
                 <h3 className="text-2xl font-bold text-black leading-none mb-1">Urban<br/>Exploration</h3>
                 <p className="text-zinc-600 text-sm">View Lookbook</p>
               </div>
               
               {/* Arrow - Lower Z-index, obscured by hover if needed, or kept visible */}
               <div className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-lg z-10">
                 <ArrowRight size={20} />
               </div>
            </motion.div>

            {/* Card 3: Crystal Product - ADDED METADATA */}
            <motion.div 
              onClick={() => onQuickView('crystal')}
              whileHover={{ scale: 0.98 }}
              className="w-[22vw] aspect-square bg-white rounded-2xl relative overflow-hidden group shrink-0 select-none cursor-pointer"
            >
                <img 
                    src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop" 
                    className="w-full h-full object-cover" 
                    alt="Glasses Detail" 
                    draggable="false"
                    onDragStart={preventDrag}
                />
                
                {/* Metadata Icons - Top Left & Right */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-black" title="UV400">
                        <Sun size={14} />
                    </div>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                     <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-black" title="Ultralight">
                        <Scale size={14} />
                    </div>
                </div>

                {/* Overlay on Hover - Central Button */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm z-20">
                    <button className="bg-white text-black px-8 py-3 rounded-full flex items-center gap-2 hover:scale-105 transition-transform pointer-events-none">
                        <Eye size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Quick View</span>
                    </button>
                </div>
                
                {/* Bottom Gradient for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 z-10"></div>

                <div className="absolute bottom-[2vw] left-[2vw] z-20">
                    <p className="text-white font-bold text-lg">Crystal Series</p>
                    <p className="text-zinc-300 text-sm">$249.00</p>
                </div>
            </motion.div>

            {/* Card 4: Video Process */}
            <motion.div 
              onClick={onPlayVideo}
              whileHover={{ scale: 0.98 }}
              className="w-[22vw] aspect-square bg-zinc-900 rounded-2xl relative overflow-hidden group shrink-0 select-none cursor-pointer"
            >
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

             {/* Card 5: Shop The Look (Obsidian) - REFACTORED TO MATCH CRYSTAL */}
             <motion.div 
                onClick={() => onQuickView('obsidian')}
                whileHover={{ scale: 0.98 }}
                className="w-[22vw] aspect-square bg-[#111] rounded-2xl relative overflow-hidden group shrink-0 select-none cursor-pointer"
             >
                <img 
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop" 
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" 
                    alt="Look" 
                    draggable="false"
                    onDragStart={preventDrag}
                />
                
                {/* Metadata Icons - Top Left & Right */}
                <div className="absolute top-4 left-4 flex gap-2 z-20">
                    <div className="bg-black/80 backdrop-blur px-3 py-1.5 rounded-full text-white text-[10px] font-bold uppercase tracking-widest border border-white/10 flex items-center gap-1">
                        <Star size={10} fill="white" /> Best Seller
                    </div>
                </div>
                 <div className="absolute top-4 right-4 flex gap-2 z-20">
                     <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white border border-white/10" title="Impact Resistant">
                        <ShieldCheck size={14} />
                    </div>
                </div>

                {/* Overlay on Hover - Central Button */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm z-30">
                    <button className="bg-white text-black px-8 py-3 rounded-full flex items-center gap-2 hover:scale-105 transition-transform pointer-events-none">
                        <Eye size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Quick View</span>
                    </button>
                </div>

                {/* Bottom Gradient for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 z-10"></div>

                <div className="absolute bottom-[2vw] left-[2vw] z-20">
                    <p className="text-white font-bold text-lg">Obsidian</p>
                    <p className="text-zinc-300 text-sm">$289.00</p>
                </div>
             </motion.div>

            {/* Card 6: View Gallery (End Card) */}
             <Link to="/collection" className="block" draggable="false">
                <motion.div 
                    whileHover={{ scale: 0.98 }}
                    className="w-[22vw] aspect-square bg-[#18181B] rounded-2xl p-[2vw] flex items-center justify-center relative overflow-hidden group shrink-0 cursor-pointer select-none"
                >
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"></div>
                <div className="relative z-10 text-center flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                        <ArrowRight size={24} />
                    </div>
                    <span className="text-sm uppercase tracking-widest font-bold text-white">View Full Gallery</span>
                </div>
                </motion.div>
            </Link>

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