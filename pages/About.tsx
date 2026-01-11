import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Navigation, Languages, Cpu, Fingerprint, Activity, ArrowRight, Layers, PenTool, Zap } from 'lucide-react';

export const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scroll Trigger Phases for the Simulation
  // Phase 1: 0 - 0.3 (System Boot)
  // Phase 2: 0.3 - 0.6 (Navigation)
  // Phase 3: 0.6 - 1.0 (Translation)
  const phase1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.25], [0, 1, 0]);
  const phase2Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.55], [0, 1, 0]);
  const phase3Opacity = useTransform(scrollYProgress, [0.6, 0.7, 0.95], [0, 1, 1]); 

  // Blur effects
  const bgBlur = useTransform(scrollYProgress, [0.6, 0.8], ["0px", "8px"]);

  return (
    <div className="bg-black text-white min-h-screen">
      
      {/* ACT I: The Philosophy */}
      <section className="h-screen flex flex-col justify-center items-center px-6 text-center pt-24">
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="max-w-5xl"
         >
           <h1 className="text-[10vw] xl:text-[8vw] leading-[0.85] font-bold tracking-tighter mb-12">
             NOT GLASSES.<br/>
             <span className="text-zinc-600">VISION.</span>
           </h1>
           <p className="text-lg md:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
             We didn't just build a new frame. We upgraded the way you perceive reality.
             Silicon intelligence meets Italian craftsmanship.
           </p>
         </motion.div>
         
         <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-12 text-zinc-600 text-xs font-bold uppercase tracking-widest animate-pulse"
         >
            Scroll to Initiate System
         </motion.div>
      </section>

      {/* ACT II: The Simulation (Sticky Scroll) */}
      <section ref={containerRef} className="h-[400vh] relative">
         <div className="sticky top-0 h-screen overflow-hidden w-full">
            
            {/* Background Video/Image Layer */}
            <motion.div className="absolute inset-0 z-0" style={{ filter: bgBlur }}>
               <img
                 src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2000&auto=format&fit=crop"
                 alt="Tokyo Night"
                 className="w-full h-full object-cover opacity-60"
               />
               <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/80"></div>
            </motion.div>

            {/* Lens OS Interface Layer */}
            <div className="absolute inset-0 z-10 p-6 md:p-12 flex flex-col justify-between pointer-events-none">
               
               {/* Static HUD Elements (Always Visible) */}
               <div className="flex justify-between items-start">
                  <div className="flex gap-3 items-center bg-black/50 backdrop-blur px-4 py-2 rounded-full border border-white/10">
                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                     <span className="font-mono text-[10px] md:text-xs text-green-500 tracking-widest">LENS_OS v2.0 // ONLINE</span>
                  </div>
                  <div className="font-mono text-xs text-white/70 flex items-center gap-2 bg-black/50 backdrop-blur px-4 py-2 rounded-full border border-white/10">
                    <Activity size={14} />
                    98%
                  </div>
               </div>

               {/* PHASE 1: BOOT & SCAN */}
               <motion.div style={{ opacity: phase1Opacity }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center relative">
                     <motion.div
                       initial={{ scale: 0.8, opacity: 0 }}
                       whileInView={{ scale: 1, opacity: 1 }}
                       transition={{ duration: 0.5 }}
                       className="w-48 h-48 md:w-64 md:h-64 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8 relative"
                     >
                        <div className="absolute inset-0 border-t-2 border-green-500 rounded-full animate-spin [animation-duration:3s]"></div>
                        <div className="absolute inset-4 border-b-2 border-white/20 rounded-full animate-spin [animation-duration:5s] direction-reverse"></div>
                        <Fingerprint size={64} className="text-white/80" strokeWidth={1} />
                     </motion.div>
                     <div className="bg-black/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 inline-block">
                        <h2 className="text-2xl md:text-4xl font-mono font-bold tracking-tighter mb-2">BIOMETRIC SYNC</h2>
                        <p className="text-green-500 font-mono text-xs md:text-sm tracking-widest">RETINA VERIFIED • USER: ADMIN</p>
                     </div>
                  </div>
               </motion.div>

               {/* PHASE 2: NAVIGATION */}
               <motion.div style={{ opacity: phase2Opacity }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {/* Simulated AR Path */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40vw] h-[60vh] bg-gradient-to-t from-blue-500/10 to-transparent skew-x-12 origin-bottom transform border-r border-blue-500/30"></div>
                  
                  <div className="bg-black/90 backdrop-blur-xl border border-blue-500/30 p-8 rounded-2xl max-w-md relative shadow-[0_0_50px_rgba(59,130,246,0.2)]">
                     <div className="absolute -top-3 left-8 px-2 bg-black text-blue-500 text-[10px] font-bold uppercase tracking-widest">Navigation Active</div>
                     <div className="flex items-center gap-6 mb-6">
                        <Navigation className="text-blue-500" size={48} fill="currentColor" fillOpacity={0.2} />
                        <div>
                           <div className="text-3xl font-bold mb-1">Turn Right</div>
                           <div className="text-zinc-400 font-mono text-sm">150m • Shibuya Crossing</div>
                        </div>
                     </div>
                     <div className="h-1 bg-zinc-800 rounded-full overflow-hidden w-full">
                        <motion.div 
                            animate={{ width: ["0%", "70%"] }} 
                            transition={{ duration: 2, repeat: Infinity }} 
                            className="h-full bg-blue-500"
                        />
                     </div>
                  </div>
               </motion.div>

               {/* PHASE 3: TRANSLATION */}
               <motion.div style={{ opacity: phase3Opacity }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                     
                     {/* Original Text */}
                     <div className="text-center md:text-right opacity-60 blur-[1px]">
                        <p className="text-7xl md:text-9xl font-serif font-bold text-red-500 mb-4 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">居酒屋</p>
                        <div className="inline-block border border-red-500/50 text-red-500 px-3 py-1 text-xs font-mono rounded">DETECTED</div>
                     </div>
                     
                     <div className="hidden md:block">
                        <ArrowRight className="text-white/20 w-12 h-12" />
                     </div>

                     {/* Translated Text */}
                     <div className="text-center md:text-left relative">
                        <div className="absolute -inset-8 bg-green-500/5 blur-3xl rounded-full"></div>
                        <p className="text-7xl md:text-9xl font-bold text-white mb-4 relative z-10">Izakaya</p>
                        <div className="flex items-center justify-center md:justify-start gap-3 text-green-400 font-mono text-xs md:text-sm bg-green-900/20 px-4 py-2 rounded-lg border border-green-500/30 w-fit mx-auto md:mx-0">
                           <Languages size={14} />
                           <span>TRANSLATED (99% CONFIDENCE)</span>
                        </div>
                     </div>
                  </div>
               </motion.div>

               {/* Bottom Coordinates */}
               <div className="flex justify-between items-end font-mono text-[10px] text-white/30">
                  <p>35.6591° N, 139.7006° E</p>
                  <p>SYSTEM_READY</p>
               </div>
            </div>
         </div>
      </section>

      {/* ACT III: The Material */}
      <section className="bg-[#09090B] py-32 px-6 xl:px-[4vw] relative z-20">
         <div className="container mx-auto max-w-[1600px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
               <div className="order-2 lg:order-1">
                  <h2 className="text-5xl md:text-7xl xl:text-[6vw] font-bold tracking-tighter mb-8 leading-[0.9]">
                     ITALIAN<br/><span className="text-zinc-600">SOUL.</span>
                  </h2>
                  <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-12 max-w-xl">
                     Beneath the silicon intelligence lies a frame carved from hand-polished Italian acetate. 
                     The 5-barrel hinges ensure durability, while the weight distribution is engineered for 
                     all-day weightlessness. It is not a gadget. It is an extension of you.
                  </p>
                  <ul className="space-y-8">
                     <li className="flex items-start gap-6 border-b border-white/10 pb-8">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10">
                             <Cpu className="text-white" size={24} />
                        </div>
                        <div>
                            <span className="text-xl font-bold block mb-1">Snapdragon AR2 Gen 1</span>
                            <span className="text-zinc-500 text-sm">Distributed processing architecture for minimal heat and weight.</span>
                        </div>
                     </li>
                     <li className="flex items-start gap-6 border-b border-white/10 pb-8">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10">
                             <Activity className="text-white" size={24} />
                        </div>
                        <div>
                            <span className="text-xl font-bold block mb-1">12-Hour Battery</span>
                            <span className="text-zinc-500 text-sm">All-day active assistance with rapid inductive charging case.</span>
                        </div>
                     </li>
                  </ul>
               </div>
               
               <div className="order-1 lg:order-2 h-[60vh] lg:h-[80vh] bg-zinc-900 rounded-[2rem] overflow-hidden relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=1600&auto=format&fit=crop" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out" 
                    alt="Craftsmanship"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-12">
                     <p className="text-white font-serif italic text-2xl">"Perfection in every detail."</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* ACT IV: THE PROCESS */}
      <section className="bg-zinc-900 text-white py-32 px-6 xl:px-[4vw] border-t border-white/10 relative z-20">
         <div className="container mx-auto max-w-[1600px]">
            <div className="mb-24">
                <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Layers size={12}/> The Methodology
                </p>
                <h2 className="text-5xl md:text-7xl xl:text-[5vw] font-bold tracking-tighter leading-[0.9]">
                    200 STEPS.<br/>
                    <span className="text-zinc-600">ZERO COMPROMISE.</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Step 1 */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="group"
                >
                    <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-8 relative">
                        <img 
                            src="https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=800&auto=format&fit=crop" 
                            alt="Acetate Sheets" 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110" 
                        />
                        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-3 py-1 rounded-full border border-white/20 text-xs font-mono uppercase">
                            01 // Curing
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                        <Layers size={20} className="text-zinc-600"/>
                        <h3 className="text-2xl font-bold">Aged Acetate</h3>
                    </div>
                    <p className="text-zinc-400 leading-relaxed border-l border-zinc-800 pl-4">
                        Our plant-based acetate is aged for 90 days in climate-controlled vaults to ensure maximum stability and depth of color before a single cut is made.
                    </p>
                </motion.div>

                 {/* Step 2 - Staggered Down */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="group md:mt-24"
                > 
                    <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-8 relative">
                        {/* REPLACED IMAGE HERE */}
                        <img 
                            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop" 
                            alt="Milling" 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110" 
                        />
                        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-3 py-1 rounded-full border border-white/20 text-xs font-mono uppercase">
                            02 // Sculpting
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                        <Zap size={20} className="text-zinc-600"/>
                        <h3 className="text-2xl font-bold">5-Axis Milling</h3>
                    </div>
                    <p className="text-zinc-400 leading-relaxed border-l border-zinc-800 pl-4">
                        Precision CNC machines carve the raw slab with micron-level accuracy, creating the housing for the delicate AR waveguide without compromising structural integrity.
                    </p>
                </motion.div>

                 {/* Step 3 - Staggered Further Down */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="group md:mt-48"
                > 
                    <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-8 relative">
                        <img 
                            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop" 
                            alt="Polishing" 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110" 
                        />
                        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-3 py-1 rounded-full border border-white/20 text-xs font-mono uppercase">
                            03 // Finishing
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                        <PenTool size={20} className="text-zinc-600"/>
                        <h3 className="text-2xl font-bold">Hand Polishing</h3>
                    </div>
                    <p className="text-zinc-400 leading-relaxed border-l border-zinc-800 pl-4">
                        Four stages of tumbling in beechwood chips, followed by 2 hours of expert hand-polishing to achieve our signature glass-like finish that feels organic to the touch.
                    </p>
                </motion.div>
            </div>
         </div>
      </section>

    </div>
  );
};