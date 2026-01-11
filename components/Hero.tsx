import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Play, Navigation, Music } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroProps {
  onPlayVideo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onPlayVideo }) => {
  const { scrollY } = useScroll();

  // AR Card Scroll Logic
  // Maps scroll position (0px to 300px) to opacity (0 to 1) and Y offset (50px to 0px)
  // This creates the "Augmented Reality activation" effect as the user starts their journey.
  const arOpacityRaw = useTransform(scrollY, [0, 300], [0, 1]);
  const arYRaw = useTransform(scrollY, [0, 300], [50, 0]);
  
  // Add physics spring for luxurious smoothness
  const arOpacity = useSpring(arOpacityRaw, { stiffness: 100, damping: 20 });
  const arY = useSpring(arYRaw, { stiffness: 100, damping: 20 });

  return (
    <section className="relative w-full overflow-hidden bg-[#050505]">
      
      {/* 
        DESKTOP SCALING ENGINE (>= 700px) 
        Cinematic Video Ratio: 65vw Height
      */}
      <div className="hidden xl:block relative w-full h-[65vw] overflow-hidden">
        
        {/* 1. Cinematic Background (Simulated Video Motion) */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2680&auto=format&fit=crop" 
            alt="Lenxo Smart Glasses"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/40"></div>
        </motion.div>

        {/* 2. Primary Typography: 'VISION AUGMENTED' */}
        {/* Adjusted top position to 24vw to clear the navbar area completely */}
        <div className="absolute top-[24vw] left-[6vw] z-20">
           <motion.h1 
             initial={{ opacity: 0, y: 100 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
             className="text-[9vw] font-bold tracking-tighter leading-[0.85] text-white drop-shadow-2xl"
           >
             VISION<br/>
             <span className="text-zinc-300">AUGMENTED</span>
           </motion.h1>
           
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5, duration: 1 }}
             className="mt-[3vw] flex items-center gap-[2vw]"
           >
             <Link to="/collection" className="bg-white text-black px-[2.5vw] py-[1vw] rounded-full flex items-center gap-[0.5vw] hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]">
               <span className="text-[1vw] font-bold uppercase tracking-widest">Pre-Order</span>
               <ArrowRight size="1.2vw" />
             </Link>
             <div 
                onClick={onPlayVideo}
                className="flex items-center gap-[0.8vw] text-white cursor-pointer group"
             >
               <div className="w-[3vw] h-[3vw] rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white/10 transition-colors backdrop-blur-sm">
                 <Play size="1.2vw" fill="white" />
               </div>
               <span className="text-[0.9vw] font-medium tracking-wide shadow-black drop-shadow-md">Watch the Film</span>
             </div>
           </motion.div>
        </div>

        {/* 3. AR Floating Interface - Scroll Activated */}
        <motion.div 
          style={{ opacity: arOpacity, y: arY }}
          className="absolute top-[24vw] right-[10vw] w-[22vw] bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2vw] p-[1.5vw] z-30 shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden"
        >
           {/* AR Glow Effect */}
           <div className="absolute -top-[10vw] -right-[10vw] w-[20vw] h-[20vw] bg-blue-500/30 blur-[4vw] rounded-full pointer-events-none"></div>

           <div className="flex items-center justify-between mb-[1.5vw] relative z-10">
              <div className="flex items-center gap-[0.5vw]">
                 <div className="w-[0.6vw] h-[0.6vw] bg-green-400 rounded-full animate-pulse"></div>
                 <span className="text-[0.8vw] text-white/80 font-mono uppercase tracking-widest">Live Connect</span>
              </div>
              <Music size="1.2vw" className="text-white/60" />
           </div>

           <div className="relative z-10">
              <h3 className="text-[1.8vw] text-white font-medium leading-tight mb-[0.5vw]">Midnight City</h3>
              <p className="text-[1vw] text-zinc-400 mb-[1.5vw]">M83 • Hurry Up, We're Dreaming</p>
              
              <div className="w-full h-[0.3vw] bg-white/20 rounded-full overflow-hidden flex items-center">
                 <motion.div 
                   initial={{ width: "0%" }}
                   animate={{ width: "65%" }}
                   transition={{ duration: 2, delay: 1.5 }}
                   className="h-full bg-white rounded-full"
                 ></motion.div>
              </div>
              <div className="flex justify-between mt-[0.5vw] text-[0.7vw] text-zinc-500 font-mono">
                 <span>2:14</span>
                 <span>-1:49</span>
              </div>
           </div>
        </motion.div>

        {/* 4. Secondary AR Widget */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 1.2, duration: 1 }}
           className="absolute bottom-[10vw] right-[28vw] bg-black/60 backdrop-blur-md border border-white/10 rounded-[1vw] px-[1.2vw] py-[0.8vw] flex items-center gap-[1vw] z-20"
        >
           <Navigation size="1.2vw" className="text-blue-400" />
           <div>
              <p className="text-[0.8vw] text-white font-bold">Turn right in 200ft</p>
              <p className="text-[0.7vw] text-zinc-400">Broadway & 5th Ave</p>
           </div>
        </motion.div>

        {/* 5. Editorial Disclaimer - Pushed up slightly */}
        <div className="absolute bottom-[6vw] left-[6vw] max-w-[25vw] z-20">
           <div className="w-[2vw] h-[1px] bg-white/50 mb-[1vw]"></div>
           <p className="text-[0.9vw] text-zinc-400 leading-[1.4]">
             *Simulated in-lens display. Actual field of view may vary based on environmental lighting conditions.
           </p>
        </div>
      </div>

      {/* 
        MOBILE PIVOT (< 700px) 
      */}
      <div className="xl:hidden relative w-full h-screen max-h-[900px] flex flex-col justify-end pb-24 px-6 bg-[#050505]">
         <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1200&auto=format&fit=crop" 
              alt="Background"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
         </div>

         <div className="relative z-10">
            <h1 className="text-6xl font-bold tracking-tighter text-white leading-[0.9] mb-6">
              VISION<br/>
              <span className="text-zinc-300">AUGMENTED</span>
            </h1>
            <p className="text-zinc-400 text-lg mb-8 max-w-xs">
              Experience the world with intelligent overlays that disappear when you don't need them.
            </p>
            <div className="flex flex-col gap-4">
                <Link to="/collection" className="w-full bg-white text-black py-4 rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                   Pre-Order Now
                </Link>
                <button onClick={onPlayVideo} className="w-full bg-white/10 backdrop-blur text-white py-4 rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 border border-white/20">
                   <Play size={12} fill="currentColor" /> Watch Film
                </button>
            </div>
         </div>
      </div>
    </section>
  );
};