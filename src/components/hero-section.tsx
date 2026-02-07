"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LucideWaves, LucideAperture, LucideScan } from 'lucide-react';
import { EditorialEase } from '@/lib/constants';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
    stageHeight?: number | string;
    scale?: number;
}

export default function HeroSection({ stageHeight, scale = 1 }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyWrapperRef = useRef<HTMLDivElement>(null);
  
  // Slide Refs
  const slideIntroRef = useRef<HTMLDivElement>(null);
  const slide1Ref = useRef<HTMLDivElement>(null);
  const slide2Ref = useRef<HTMLDivElement>(null);
  const slide3Ref = useRef<HTMLDivElement>(null);

  // HUD & Scanner Refs
  const hudRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);

  // Optical Sizing Calculation
  const dynamicTracking = `${-0.02 * scale}em`;

  useLayoutEffect(() => {
    // 1. Guard: Ensure engine is ready
    if (!stageHeight || typeof stageHeight !== 'number') return;
    
    // TRACK LENGTH: The virtual height of the scroll sequence
    const TRACK_LENGTH = 3500;

    const ctx = gsap.context(() => {
      
      // --- INITIAL SETUP ---
      // Hide all subsequent slides initially
      gsap.set([slide1Ref.current, slide2Ref.current, slide3Ref.current], { opacity: 0, pointerEvents: "none" });
      
      // 2. Initial Load Animation (The "Unveil")
      const introTl = gsap.timeline({ 
        defaults: { ease: EditorialEase, duration: 2.2 },
        onComplete: () => ScrollTrigger.refresh()
      });

      introTl.fromTo(slideIntroRef.current?.querySelectorAll('.line') || [],
        { y: 150, opacity: 0, skewY: 7 },
        { y: 0, opacity: 1, skewY: 0, stagger: 0.1 }
      );

      // 3. THE MANUAL PIN ENGINE
      // Instead of pin:true, we counter-animate the y position.
      // As the container scrolls UP (naturally), we move the wrapper DOWN.
      const pinTl = gsap.timeline({
          scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0, // Instant lock
              invalidateOnRefresh: true,
          }
      });
      
      const travelDistance = TRACK_LENGTH - stageHeight;
      
      pinTl.to(stickyWrapperRef.current, {
          y: travelDistance,
          ease: "none",
          force3D: true,
          immediateRender: false // CRITICAL: Prevent pre-calculation before layout is stable
      });


      // 4. THE STORY SEQUENCE (Parallax & Fades)
      const storyTl = gsap.timeline({
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1, // Smooth the animations
        }
      });

      // --- SCROLL SEQUENCE ---
      
      // A. Intro Exit (0% - 20%)
      storyTl.to(slideIntroRef.current, { opacity: 0, y: -100, filter: "blur(10px)", duration: 0.2, ease: "power2.in" }, 0.05);

      // SLIDE 1: VISION (Augmented Reality) (20% - 40%)
      storyTl.fromTo(slide1Ref.current, 
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 0.25, ease: EditorialEase }, 
        0.15
      );
      
      // Slide 1 Exit (40% - 45%)
      storyTl.to(slide1Ref.current, { opacity: 0, y: -100, filter: "blur(20px)", duration: 0.2, ease: "power2.in" }, 0.4);


      // SLIDE 2: NEURAL (Thought Control) (50% - 70%)
      storyTl.fromTo(slide2Ref.current,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 0.25, ease: EditorialEase },
        0.5
      );

      // Slide 2 Exit (70% - 75%)
      storyTl.to(slide2Ref.current, { opacity: 0, y: -100, filter: "blur(20px)", duration: 0.2, ease: "power2.in" }, 0.75);


      // SLIDE 3: CONTEXT (Real World) (80% - 100%)
      storyTl.fromTo(slide3Ref.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.25, ease: EditorialEase },
        0.8
      );
      
      // Slide 3 Exit / Transition (95% - 100%)
      storyTl.to(slide3Ref.current, { opacity: 0, scale: 1.1, filter: "blur(20px)", duration: 0.1 }, 0.95);


      // 4. Continuous Scanner Pulse
      gsap.to(scannerRef.current, {
        height: "100%",
        duration: 3,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });

      // FINAL REFRESH: Ensure all triggers are calibrated
      ScrollTrigger.refresh();

    }, containerRef);

    return () => ctx.revert();
  }, [stageHeight]);
  
  const TRACK_LENGTH = 3500;

  const containerStyle = typeof stageHeight === 'number' 
    ? { height: `${TRACK_LENGTH}px`, width: '1600px' } 
    : { width: '1600px' };
    
  const wrapperStyle = typeof stageHeight === 'number'
    ? { 
        height: `${stageHeight + 2}px`, 
        width: '1600px', 
        position: 'absolute' as const, 
        top: -1, 
        left: 0,
      }
    : { width: '1600px' };

  return (
    <section 
      ref={containerRef} 
      className="relative bg-transparent text-white overflow-visible"
      style={containerStyle}
    >
      {/* Sticky Stage Wrapper - Manually Pinned */}
      <div 
        ref={stickyWrapperRef} 
        className="relative overflow-hidden md:block will-change-transform"
        style={wrapperStyle}
      >
        {/* Note: Background Image removed, handled by WebGL Layer */}
        {/* Cinematic Gradient Overlays removed - moved to ScalingEngine for persistence */}

        {/* --- STORY LAYERS --- */}

        {/* SLIDE 0: INTRO (Original Title) */}
        <div ref={slideIntroRef} className="absolute inset-0 z-10 flex flex-col justify-center pl-[144px] pointer-events-none">
            <h1 className="font-display text-[200px] leading-[0.8] tracking-tighter uppercase kinetic-serif mix-blend-difference will-change-transform"
                style={{ letterSpacing: dynamicTracking }}
            >
            <div className="overflow-hidden h-[180px]">
                <span className="line inline-block">Vision</span>
            </div>
            <div className="overflow-hidden h-[200px] -mt-2 ml-48">
                <span className="line inline-block italic text-[#C5A880]">Refined</span>
            </div>
            </h1>
        </div>

        {/* SLIDE 1: IN-LENS (Augmented Reality) */}
        <div ref={slide1Ref} className="absolute inset-0 z-20 flex items-center justify-start pl-[144px] pointer-events-none">
            <div className="relative w-full max-w-[1200px] grid grid-cols-12 gap-8 items-center">
                
                {/* Text Side */}
                <div className="slide-text col-span-7">
                    <h2 className="font-display text-[120px] leading-[0.9] uppercase mix-blend-difference mb-8">
                        <span className="word inline-block">The</span> <span className="word inline-block italic text-[#C5A880]">New</span><br/>
                        <span className="word inline-block">Language</span><br/>
                        <span className="word inline-block">Of</span> <span className="word inline-block">Vision</span>
                    </h2>
                </div>

                {/* Card Side */}
                <div className="slide-card col-span-5 relative">
                     <div className="w-[360px] bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-sm">
                        <div className="flex items-center gap-4 mb-6 text-[#C5A880]">
                            <LucideAperture size={28} />
                            <span className="font-mono text-[10px] tracking-[0.3em] uppercase">System_Active</span>
                        </div>
                        <div className="h-[200px] w-full bg-black/40 rounded-sm mb-6 relative overflow-hidden border border-white/5">
                             {/* Mock UI Interface inside card */}
                             <div className="absolute top-4 right-4 flex gap-1">
                                <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
                                <span className="font-mono text-[8px] uppercase text-white/50">REC</span>
                             </div>
                             <div className="absolute bottom-4 left-4">
                                <span className="font-display text-2xl text-white">09:41</span>
                                <span className="block font-mono text-[8px] text-white/50 tracking-widest">AM • WEATHER CLEAR</span>
                             </div>
                        </div>
                        <h3 className="font-display text-2xl mb-2">In-Lens Display</h3>
                        <p className="font-sans text-sm text-white/60 leading-relaxed">
                            Notifications, navigation, and music controls appear only when you need them.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* SLIDE 2: NEURAL (Connection) */}
        <div ref={slide2Ref} className="absolute inset-0 z-20 flex items-center justify-end pr-[144px] pointer-events-none">
             <div className="relative w-full max-w-[1200px] grid grid-cols-12 gap-8 items-center">
                 
                 {/* Card Side (Left now) */}
                 <div className="slide-card col-span-5 relative flex justify-end">
                     <div className="w-[360px] bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-sm">
                        <div className="flex items-center gap-4 mb-6 text-[#C5A880]">
                            <LucideWaves size={28} />
                            <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Neural_Link</span>
                        </div>
                        <div className="space-y-4 mb-6">
                             <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                                <span className="font-sans text-white/80">Signal Strength</span>
                                <span className="font-mono text-[#C5A880]">98%</span>
                             </div>
                             <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                                <span className="font-sans text-white/80">Latency</span>
                                <span className="font-mono text-[#C5A880]">&lt; 2ms</span>
                             </div>
                             <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                                <span className="font-sans text-white/80">Gesture</span>
                                <span className="font-mono text-[#C5A880]">Enabled</span>
                             </div>
                        </div>
                        <h3 className="font-display text-2xl mb-2">Effortless Control</h3>
                        <p className="font-sans text-sm text-white/60 leading-relaxed">
                            Navigate your digital world with subtle gestures. The neural band translates intention.
                        </p>
                    </div>
                 </div>

                 {/* Text Side */}
                 <div className="slide-text col-span-7 text-right">
                    <h2 className="font-display text-[120px] leading-[0.9] uppercase mix-blend-difference mb-8">
                        <span className="word inline-block">Stay</span> <span className="word inline-block">Present</span><br/>
                        <span className="word inline-block italic text-[#C5A880]">Stay</span><br/>
                        <span className="word inline-block">Connected</span>
                    </h2>
                </div>
            </div>
        </div>

        {/* SLIDE 3: CONTEXT (Real World) */}
        <div ref={slide3Ref} className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
             <div className="relative flex flex-col items-center text-center">
                 <div className="slide-card mb-12">
                     <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-[#C5A880]">
                         <LucideScan size={18} />
                         <span className="font-mono text-[10px] tracking-[0.2em]">LOOK AND ASK</span>
                     </div>
                 </div>
                 
                 <div className="slide-text">
                    <h2 className="font-display text-[140px] leading-[0.85] uppercase mix-blend-difference">
                        <span className="word inline-block">For</span> <span className="word inline-block">The</span> <span className="word inline-block">Ones</span><br/>
                        <span className="word inline-block italic text-[#C5A880] pr-6">Who</span>
                        <span className="word inline-block">Look</span><br/>
                        <span className="word inline-block">Forward</span>
                    </h2>
                 </div>

                 <div className="slide-card mt-12 max-w-md">
                     <p className="font-sans text-lg text-white/70 leading-relaxed">
                        Multimodal AI understands what you're looking at. Ask questions, translate text, or find information instantly.
                     </p>
                 </div>
            </div>
        </div>


        {/* 4. Golden Ratio HUD Layer (Persistent) */}
        <div ref={hudRef} className="absolute inset-0 pointer-events-none z-30">
            {/* Volume Label */}
            <div className="hud-item absolute top-[160px] left-[144px] flex items-center gap-6 will-change-transform">
                <div className="w-12 h-[2px] bg-white/20"></div>
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40">Volume No. 01</span>
            </div>

            {/* Technical Scanner HUD */}
            <div className="hud-item absolute top-[400px] right-[80px] -translate-y-1/2 flex flex-col items-center gap-8">
                <div className="w-[1px] h-[320px] bg-white/5 relative">
                    <div ref={scannerRef} className="absolute top-0 left-0 w-full bg-[#C5A880] h-0 shadow-[0_0_20px_#C5A880]"></div>
                </div>
                <span className="font-mono text-[9px] vertical-text tracking-[0.6em] uppercase text-white/20">Optical_Engine_Active</span>
            </div>
        </div>

        {/* 5. Immersive Interactions (Persistent CTA) */}
        <div className="absolute bottom-[80px] right-[144px] z-40">
            <Link href="/collection" className="group relative flex items-center gap-8 px-14 py-6 overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl transition-all hover:border-[#C5A880] pointer-events-auto">
                <span className="font-sans text-[12px] font-bold tracking-[0.5em] uppercase transition-colors group-hover:text-[#C5A880]">Explore Archive</span>
                <div className="w-2.5 h-2.5 rounded-full bg-[#C5A880] group-hover:scale-[1.8] transition-transform shadow-[0_0_15px_#C5A880]"></div>
            </Link>
        </div>
      </div>

      <style jsx>{`
        .vertical-text {
            writing-mode: vertical-rl;
            text-orientation: mixed;
        }
      `}</style>
    </section>
  );
}