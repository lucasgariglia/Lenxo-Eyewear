"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { ShoppingBag, Search, Globe, Menu, Volume2, VolumeX, X, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSoundFX } from '@/hooks/use-sound-fx';
import Link from 'next/link';
import { useShop } from '@/context/shop-context';
import { useIsMobile } from '@/hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  
  const [isDocked, setIsDocked] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { playHover, playClick } = useSoundFX();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const isMobile = useIsMobile();
  
  // Mobile UI States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { openCart, cartCount } = useShop();

  // --- SCROLL LISTENER (Mobile Only) ---
  useEffect(() => {
    if (!isMobile) return;
    
    const handleScroll = () => {
        setHasScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // --- GSAP CONTEXT FOR SCROLL ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -20,
        duration: 1.5,
        ease: "power4.out"
      });

      ScrollTrigger.create({
        start: "top -100",
        onToggle: self => setIsDocked(self.isActive),
      });

      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        }
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  // --- MOBILE MENU ANIMATION ---
  useEffect(() => {
    if (!isMobile || !menuOverlayRef.current) return;

    if (isMenuOpen) {
      // OPEN ANIMATION
      gsap.set(menuOverlayRef.current, { visibility: 'visible', opacity: 1 });
      gsap.to(menuOverlayRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.8,
        ease: "power4.inOut"
      });

      gsap.fromTo('.mobile-menu-item', 
        { y: 100, opacity: 0, skewY: 5 },
        { y: 0, opacity: 1, skewY: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );

      gsap.fromTo('.mobile-menu-footer',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.5 }
      );

      document.body.style.overflow = 'hidden';
    } else {
      // CLOSE ANIMATION
      gsap.to(menuOverlayRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 0.6,
        ease: "power4.inOut",
        onComplete: () => {
          gsap.set(menuOverlayRef.current, { visibility: 'hidden' });
        }
      });

      gsap.to('.mobile-menu-item', {
        y: 50,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.in"
      });

      document.body.style.overflow = '';
    }
  }, [isMenuOpen, isMobile]);

  const handleInteraction = (type: 'hover' | 'click') => {
      if (!soundEnabled) return;
      if (type === 'hover') playHover();
      if (type === 'click') playClick();
  };

  return (
    <>
      <nav 
        ref={navRef} 
        className={`relative w-full z-[100100] transition-all duration-700 ease-expo 
          ${isDocked && !isMenuOpen ? 'border-b border-white/10' : ''} 
          ${isMobile ? 'h-[80px]' : 'h-[140px]'} p-0 pointer-events-none`} 
        style={{ 
          backgroundColor: 'transparent',
          height: isDocked ? (isMobile ? '80px' : '100px') : undefined
        }}
      >
        {/* --- MOBILE HEADER BAR (< 769px) --- */}
        {isMobile && (
            <div 
                className="flex justify-between items-center w-full h-full px-6 pointer-events-auto relative z-[10030] text-white"
            >
                <Link 
                    href="/" 
                    className="font-display text-2xl font-bold tracking-tighter uppercase relative z-50 hover:opacity-70 transition-opacity"
                    onClick={() => {
                      handleInteraction('click');
                      setIsMenuOpen(false);
                    }}
                >
                    Lenxo
                </Link>
                
                <div className="flex items-center gap-6 relative z-50">
                    <div 
                      onClick={() => {
                        handleInteraction('click');
                        setIsSearchOpen(!isSearchOpen);
                        if (isMenuOpen) setIsMenuOpen(false);
                      }}
                      className="cursor-pointer hover:opacity-70 transition-opacity"
                    >
                        <Search className={`w-5 h-5 transition-transform ${isSearchOpen ? 'scale-110 text-[#C5A880]' : ''}`} />
                    </div>
                    <div 
                        className="relative cursor-pointer hover:opacity-70 transition-opacity"
                        onClick={() => {
                            handleInteraction('click');
                            openCart();
                            setIsMenuOpen(false);
                        }}
                    >
                        <ShoppingBag className="w-5 h-5" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-black bg-white text-black">
                                {cartCount}
                            </span>
                        )}
                    </div>
                    <button 
                      onClick={() => {
                        handleInteraction('click');
                        setIsMenuOpen(!isMenuOpen);
                        setIsSearchOpen(false);
                      }}
                      className="cursor-pointer w-8 h-8 flex items-center justify-center group"
                      aria-label="Toggle Menu"
                    >
                        <div className="relative w-6 h-4">
                            <span className={`absolute left-0 top-0 w-full h-[1.5px] bg-white transition-all duration-300 ease-out ${isMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : ''}`} />
                            <span className={`absolute left-0 bottom-0 w-full h-[1.5px] bg-white transition-all duration-300 ease-out ${isMenuOpen ? 'bottom-1/2 translate-y-1/2 -rotate-45' : ''}`} />
                        </div>
                    </button>
                </div>
            </div>
        )}

        {/* --- DESKTOP NAVIGATION (>= 769px) --- */}
        {!isMobile && (
          <div className="flex justify-between items-center w-full h-full pointer-events-auto">
              {/* 1. Logo */}
              <Link 
                  href="/" 
                  className="absolute left-12 font-display text-4xl font-bold tracking-tighter uppercase transition-all duration-700 text-white magnetic-trigger mix-blend-difference"
                  data-label="HOME"
                  onMouseEnter={() => handleInteraction('hover')}
                  onClick={() => {
                      handleInteraction('click');
                      if (typeof window !== 'undefined') {
                          window.scrollTo(0, 0);
                      }
                  }}
                  style={{ 
                      top: isDocked ? '32px' : '48px',
                  }}
              >
                  Lenxo
              </Link>

              {/* 2. Collective Label */}
              {!isDocked && (
                  <span 
                      className="flex absolute left-48 top-[60px] font-mono text-[9px] tracking-[0.4em] uppercase border-l border-white/20 pl-6 items-center gap-3 transition-opacity duration-500 text-white mix-blend-difference"
                  >
                      Collective
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                  </span>
              )}

              {/* 3. Navigation Links */}
              <div className="flex absolute left-1/2 -translate-x-1/2 items-center px-8 py-3 rounded-full border border-white/20 gap-10 transition-all duration-700 bg-transparent mix-blend-difference"
                  style={{ 
                      top: isDocked ? '26px' : '44px'
                  }}
              >
                                  <Link 
                                      href="/series" 
                                      className="font-sans text-[10px] font-bold tracking-[0.3em] uppercase transition-all hover:opacity-50 text-white magnetic-trigger"
                                      data-label="SERIES"
                                      onMouseEnter={() => handleInteraction('hover')}
                                      onClick={() => handleInteraction('click')}
                                  >
                                      The Series
                                  </Link>                  <Link 
                      href="/about" 
                      className="font-sans text-[10px] font-bold tracking-[0.3em] uppercase transition-all hover:opacity-50 text-white magnetic-trigger"
                      data-label="CRAFT"
                      onMouseEnter={() => handleInteraction('hover')}
                      onClick={() => handleInteraction('click')}
                  >
                      Craft
                  </Link>
                  <Link 
                      href="/about" 
                      className="font-sans text-[10px] font-bold tracking-[0.3em] uppercase transition-all hover:opacity-50 text-white magnetic-trigger"
                      data-label="HERITAGE"
                      onMouseEnter={() => handleInteraction('hover')}
                      onClick={() => handleInteraction('click')}
                  >
                      Heritage
                  </Link>
                  <Link 
                      href="/collection" 
                      className="font-sans text-[10px] font-bold tracking-[0.3em] uppercase transition-all hover:opacity-50 text-white magnetic-trigger"
                      data-label="ARCHIVE"
                      onMouseEnter={() => handleInteraction('hover')}
                      onClick={() => handleInteraction('click')}
                  >
                      Archive
                  </Link>
              </div>

              {/* 4. Interaction Hub */}
              <div className="flex items-center gap-10 text-white absolute right-12 mix-blend-difference"
                  style={{ 
                      top: isDocked ? '48px' : '68px'
                  }}
              >
                  {/* Sound Toggle */}
                  <button 
                      onClick={() => setSoundEnabled(!soundEnabled)} 
                      className="hover:opacity-50 transition-opacity magnetic-trigger"
                      data-label={soundEnabled ? "MUTE" : "UNMUTE"}
                  >
                      {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-white/50" />}
                  </button>

                  {!isDocked && (
                      <div className="flex items-center gap-2">
                          <Globe className="w-3.5 h-3.5" />
                          <span className="font-mono text-[9px] tracking-[0.2em] uppercase">EN / USD</span>
                      </div>
                  )}
                  <Link href="/collection">
                      <Search 
                          className="w-4 h-4 cursor-pointer magnetic-trigger" 
                          data-label="SEARCH"
                          onMouseEnter={() => handleInteraction('hover')}
                      />
                  </Link>
                  <div 
                      className="relative magnetic-trigger cursor-pointer" 
                      data-label="CART"
                      onMouseEnter={() => handleInteraction('hover')}
                      onClick={() => {
                          handleInteraction('click');
                          openCart();
                      }}
                  >
                      <ShoppingBag className="w-4 h-4" />
                      {cartCount > 0 && (
                          <span className="absolute -top-1.5 -right-1.5 text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-black bg-white text-black animate-in zoom-in">
                              {cartCount}
                          </span>
                      )}
                  </div>
              </div>
          </div>
        )}

        {/* Progress Hairline */}
        <div 
          ref={progressRef}
          className="absolute bottom-0 left-0 w-full h-[1.5px] origin-left scale-x-0 transition-all duration-700 bg-white"
          style={{ opacity: isDocked ? 1 : 0 }}
        ></div>
      </nav>

      {/* --- MOBILE OVERLAYS (PORTALED-LIKE) --- */}
      {isMobile && (
        <>
          {/* SEARCH OVERLAY */}
          <div 
            className={`fixed inset-0 bg-black/95 backdrop-blur-3xl z-[100000] transition-all duration-500 flex flex-col ${isSearchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            style={{ visibility: isSearchOpen ? 'visible' : 'hidden' }}
          >
              <div className="flex flex-col px-8 pt-32 h-full text-white">
                  <div className="flex items-center gap-6 border-b border-white/40 pb-6 mb-12">
                      <Search className="w-8 h-8 text-[#C5A880]" />
                      <input 
                        autoFocus={isSearchOpen}
                        type="text" 
                        placeholder="Search the Archive..." 
                        className="bg-transparent border-none outline-none text-white font-display text-4xl uppercase w-full placeholder:text-white/30"
                      />
                  </div>
                  <button 
                    onClick={() => setIsSearchOpen(false)} 
                    className="self-center mt-auto mb-16 w-24 h-24 rounded-full border border-white/20 flex items-center justify-center font-mono text-xs uppercase text-[#C5A880] tracking-widest hover:bg-white/10 transition-colors"
                  >
                    Close
                  </button>
              </div>
          </div>

          {/* MENU OVERLAY (Cinematic Curtain) */}
          <div 
            ref={menuOverlayRef}
            className="fixed inset-0 z-[99999] bg-[#080808] pointer-events-auto flex flex-col overflow-hidden"
            style={{ 
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                WebkitClipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                visibility: 'hidden' // GSAP will toggle this
            }}
          >
              <div className="absolute inset-0 bg-gradient-to-b from-[#111] to-[#050505] pointer-events-none" />
              <div className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
                   style={{ 
                       backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
                   }} 
              />
              
              <div className="relative z-10 flex flex-col justify-between h-full pt-32 pb-12 px-8" ref={menuRef}>
                  <div className="flex flex-col gap-2">
                      {[
                        { label: 'The Series', href: '/series', sub: '01' },
                        { label: 'Craft', href: '/about', sub: '02' },
                        { label: 'Heritage', href: '/about', sub: '03' },
                        { label: 'Archive', href: '/collection', sub: '04' },
                        { label: 'Contact', href: '/contact', sub: '05' }
                      ].map((item, i) => (
                        <div key={i} className="group overflow-hidden">
                             <Link 
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="mobile-menu-item block font-display text-[13vw] leading-[0.9] uppercase text-[#F0F0F0] hover:text-[#C5A880] transition-colors tracking-tighter"
                             >
                                <span className="text-xs font-mono text-white/30 align-top mr-4 inline-block translate-y-4 tracking-widest">{item.sub}</span>
                                {item.label}
                             </Link>
                        </div>
                      ))}
                  </div>

                  <div className="mobile-menu-footer flex justify-between items-end border-t border-white/10 pt-8">
                      <div className="flex flex-col gap-4">
                        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#C5A880]">Studio Info</span>
                        <div className="font-sans text-xs text-white/50 leading-relaxed uppercase">
                            <p>Tokyo / Paris / New York</p>
                            <p>est. 2024</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-6">
                          <button 
                            onClick={() => {
                                handleInteraction('click');
                                setIsMenuOpen(false);
                            }}
                            className="mobile-menu-footer font-mono text-[10px] uppercase tracking-[0.4em] text-[#C5A880] mb-2"
                          >
                             [ Close Menu ]
                          </button>
                          
                          <button 
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                          >
                            {soundEnabled ? 'Mute' : 'Unmute'}
                            {soundEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
                          </button>
                          
                          <Link href="/cart" className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/60 hover:text-white transition-colors">
                             My Cart ({cartCount}) <ArrowRight className="w-3 h-3" />
                          </Link>
                      </div>
                  </div>
              </div>
          </div>
        </>
      )}
    </>
  );
}
