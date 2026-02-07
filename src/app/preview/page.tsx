
import React from 'react';

export default function PreviewPage() {
  const styles = `
    .stage-container {
        width: 100%;
        max-width: 1600px;
        aspect-ratio: 16/9;
        position: relative;
        overflow: hidden;
        background: #050505;
        box-shadow: 0 0 100px rgba(19, 91, 236, 0.1);
        margin: auto;
    }

    .cinematic-bg {
        background: radial-gradient(circle at 50% 50%, #1a1a1a 0%, #050505 100%);
        position: absolute;
        inset: 0;
        z-index: 0;
    }
    
    .refraction-overlay {
        position: absolute;
        inset: 0;
        background: 
            linear-gradient(125deg, transparent 40%, rgba(19, 91, 236, 0.08) 45%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 40%);
        mix-blend-mode: overlay;
        z-index: 1;
        pointer-events: none;
    }

    .glass-panel {
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .blend-difference {
        mix-blend-mode: difference;
    }

    .grid-line-x {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 1px;
        background: rgba(255, 255, 255, 0.08);
        left: 38.2%;
        z-index: 2;
    }
    
    .grid-line-y {
        position: absolute;
        left: 0;
        right: 0;
        height: 1px;
        background: rgba(255, 255, 255, 0.08);
        top: 61.8%;
        z-index: 2;
    }

    .chromatic-text {
        position: relative;
        color: white;
        transition: all 0.3s ease;
    }
    
    .chromatic-text::before,
    .chromatic-text::after {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: all 0.3s ease;
        pointer-events: none;
    }
    
    .group:hover .chromatic-text::before {
        opacity: 0.7;
        transform: translate(-3px, 0);
        color: #ff0000;
        mix-blend-mode: screen;
    }
    
    .group:hover .chromatic-text::after {
        opacity: 0.7;
        transform: translate(3px, 0);
        color: #00ffff;
        mix-blend-mode: screen;
    }

    .cta-shine {
        position: absolute;
        top: 0;
        left: -100%;
        width: 50%;
        height: 100%;
        background: linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent);
        transform: skewX(-25deg);
        transition: 0.5s;
    }
    
    .group:hover .cta-shine {
        left: 150%;
        transition: 0.7s;
    }
  `;

  return (
    <div className="bg-black w-full min-h-screen flex items-center justify-center p-4">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <main className="stage-container group/stage">
        <div className="cinematic-bg">
        <img alt="Abstract light refraction through prismatic glass dark background" className="w-full h-full object-cover opacity-60 mix-blend-screen" data-alt="Cinematic light refraction through dark glass" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQjPAbu5XOl-yluhjVM_PH3m1bcHTvNzwiPmrcoab3wRvKPG_KBRQNK1EEtwprv39SGWrBNKsiCGqpUDUtiKoYPzTZRyMWUwE4hwW9snXao5eqmAnC-ByZ7t1Mqn_pAlDQ3X-WxmN3oYLpzT0b_3WEQQo6O0HbWxSKwoRi-uTkFJ7n3QH0K69GY-EpnYACAgkD159503AlJA3fEhfjtzaRpJtHIJR3yIqKU8Kt3-vP9IxKKqSiuLWBxM6ZoDVhF7ybUyX9ewvlMw"/>
        </div>
        <div className="refraction-overlay"></div>
        <div className="grid-line-x"></div>
        <div className="grid-line-y"></div>
        <div className="absolute inset-0 z-[1] pointer-events-none opacity-30">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full blur-[1px]"></div>
            <div className="absolute top-3/4 left-2/3 w-1 h-1 bg-white rounded-full blur-[1px]"></div>
            <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 bg-primary rounded-full blur-[0px]"></div>
        </div>
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-12 md:p-16">
            <header className="flex justify-between items-start">
            <div className="flex flex-col gap-1 blend-difference">
                <h2 className="font-serif text-4xl tracking-tighter font-bold text-white">V — A</h2>
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-semibold">Visionnaire // Est. 2024</span>
            </div>
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-3 text-xs tracking-[0.2em] font-medium text-white/80 blend-difference cursor-pointer hover:text-white transition-colors">
                    <span>SOUND OFF</span>
                    <div className="relative w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">volume_off</span>
                    </div>
                </div>
                <button className="relative w-12 h-12 flex flex-col items-center justify-center gap-1.5 group cursor-pointer">
                    <span className="w-8 h-[1px] bg-white group-hover:w-6 transition-all duration-300"></span>
                    <span className="w-8 h-[1px] bg-white group-hover:w-8 transition-all duration-300"></span>
                    <span className="w-8 h-[1px] bg-white group-hover:w-4 transition-all duration-300"></span>
                </button>
            </div>
            </header>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
                <div className="relative group cursor-default pointer-events-auto">
                    <h1 className="font-serif text-[12vw] leading-[0.85] text-white mix-blend-overlay opacity-90 chromatic-text select-none" data-text="VISIONNAIRE">
                        VISIONNAIRE
                    </h1>
                    <div className="absolute -bottom-8 left-0 w-full text-center">
                        <p className="text-xs md:text-sm tracking-[0.4em] text-primary/80 uppercase font-medium mt-4">
                            Optical Precision <span className="text-white/40 mx-2">//</span> S.24 Collection
                        </p>
                    </div>
                </div>
            </div>
            <div className="absolute top-[63%] left-[39%] z-0 pointer-events-none">
                <div className="flex flex-col gap-1 text-[9px] text-white/40 font-mono tracking-widest leading-relaxed">
                    <p>REFRACTION INDEX: 1.67</p>
                    <p>LENS CURVATURE: 4.25</p>
                    <p>COATING: ANTI-REFLECTIVE</p>
                </div>
            </div>
            <footer className="flex justify-between items-end w-full">
                <div className="flex items-end gap-4 blend-difference">
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-xs font-mono text-white/60 rotate-180" style={{writingMode: 'vertical-rl'}}>SCROLL</span>
                        <div className="h-24 w-[1px] bg-white/20 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1/3 bg-primary animate-pulse"></div>
                        </div>
                        <span className="text-sm font-serif italic text-white">01</span>
                    </div>
                    <div className="hidden md:block pb-1 pl-4">
                        <p className="text-[10px] max-w-[140px] text-white/50 uppercase leading-relaxed tracking-wider">
                            Engineered for those who see beyond the horizon.
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex flex-col text-right text-[10px] text-white/40 tracking-widest uppercase gap-1 mr-4">
                        <span>New Arrivals</span>
                        <span>Limited Edition</span>
                    </div>
                    <button className="group relative overflow-hidden glass-panel rounded-full h-16 px-10 flex items-center gap-4 transition-all duration-500 hover:bg-white/10 hover:border-white/30 hover:scale-[1.02] active:scale-[0.98]">
                        <div className="cta-shine"></div>
                        <span className="relative z-10 text-sm font-bold tracking-[0.15em] text-white uppercase group-hover:text-primary transition-colors">The Collection</span>
                        <span className="relative z-10 material-symbols-outlined text-white group-hover:translate-x-1 group-hover:text-primary transition-transform duration-300 text-[20px]">arrow_forward</span>
                    </button>
                </div>
            </footer>
            <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-6 items-end pointer-events-none opacity-30">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                <div className="w-1 h-1 rounded-full bg-white/50"></div>
                <div className="w-1 h-1 rounded-full bg-white/30"></div>
                <div className="w-0.5 h-0.5 rounded-full bg-white/20"></div>
            </div>
        </div>
      </main>
    </div>
  );
}
