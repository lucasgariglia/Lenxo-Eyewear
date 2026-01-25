import Image from "next/image";
import { ArrowRight, ShoppingBag, Menu, Search, Plus } from 'lucide-react';

export default function MobileLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-black overflow-x-hidden">
      {/* 1. Mobile Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-black/5">
        <a className="font-display font-bold text-xl tracking-tight text-black" href="#">
            LENXO
        </a>
        <div className="flex items-center gap-5">
            <Search className="w-5 h-5 text-black" />
            <ShoppingBag className="w-5 h-5 text-black" />
            <Menu className="w-5 h-5 text-black" />
        </div>
      </nav>
      
      {/* 2. Hero Section (Matches Desktop Hero) */}
      <section className="h-[90vh] flex flex-col items-center justify-end text-center relative overflow-hidden px-6 pb-24 pt-20">
        <div className="absolute inset-0 z-0">
             <Image 
                src="/pictures/hero-glasses.jpg" 
                alt="Absolute Vision" 
                fill 
                className="object-cover opacity-90" 
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center w-full">
            <div className="flex items-center gap-3 mb-6 opacity-80">
                <span className="w-8 h-[0.5px] bg-white/60"></span>
                <span className="font-mono text-[10px] text-white uppercase tracking-[0.3em]">
                    Volume No. 01
                </span>
                <span className="w-8 h-[0.5px] bg-white/60"></span>
            </div>
            
            <h1 className="font-display text-6xl leading-[0.85] text-white mb-6 uppercase tracking-tight drop-shadow-2xl">
                Vision <br/> 
                <span className="italic text-[#C5A880]">Refined</span>
            </h1>
            
            <p className="font-sans text-xs text-white/90 max-w-[280px] leading-relaxed mb-8 tracking-widest uppercase drop-shadow-md">
                Architecting the future of optics through absolute geometric purity.
            </p>

            <button className="bg-white text-black px-8 py-4 rounded-full w-full max-w-xs font-bold text-[10px] tracking-[0.2em] uppercase flex items-center justify-center gap-3 shadow-2xl">
                Explore Archive
                <ArrowRight className="w-4 h-4" />
            </button>
        </div>
      </section>

      {/* 3. Editorial Spread 1: Philosophy */}
      <section className="py-24 px-6 bg-[#FAFAFA]">
         <div className="mb-12 relative">
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#C5A880] mb-4 block">
                Coordinate System
            </span>
            <h2 className="font-display text-5xl text-black mb-6 uppercase leading-[0.9]">
                The New <br/> 
                <span className="italic text-gray-400">Language</span> <br/>
                Of Vision
            </h2>
            <div className="w-12 h-[1px] bg-black mb-6"></div>
         </div>

         <div className="space-y-16">
            {/* Image 1: Refractive Surface */}
            <div className="relative aspect-[4/5] w-full">
                <Image 
                    src="/pictures/hero-minimal.jpg" 
                    alt="Refractive Surface" 
                    fill 
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-2">
                    <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-black">
                        Refractive Surface
                    </span>
                </div>
            </div>

            {/* Content Block */}
            <div className="pl-4 border-l border-black/10">
                <h3 className="font-display text-2xl uppercase mb-4">Lightness as a <br/> Philosophy</h3>
                <p className="font-sans text-sm text-gray-500 leading-relaxed tracking-wide">
                    Our frames weigh less than a standard envelope. By removing the unnecessary, we expose the essential beauty of your features.
                </p>
                <button className="mt-8 font-mono text-[10px] tracking-[0.3em] uppercase border-b border-black pb-1">
                    Explore Craft
                </button>
            </div>
         </div>
      </section>

      {/* 4. Editorial Spread 2: Materiality (Synthesis) */}
      <section className="py-24 px-6 bg-white border-t border-black/5">
        <div className="flex justify-between items-end mb-12">
            <div>
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/40 mb-2 block">
                    Series 02
                </span>
                <h2 className="font-display text-4xl uppercase leading-none">
                    Synthesis of <br/> Glass & Steel
                </h2>
            </div>
        </div>

        <div className="flex flex-col gap-8">
            {/* The Archon */}
            <div className="relative aspect-square bg-gray-100 group">
                <Image src="/pictures/col-modern.jpg" alt="The Archon" fill className="object-cover" />
                <div className="absolute top-4 right-4">
                     <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center bg-black/20 backdrop-blur">
                        <Plus className="w-4 h-4 text-white" />
                     </div>
                </div>
                <div className="absolute bottom-6 left-6 text-white">
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase block mb-1 text-[#C5A880]">Item 01</span>
                    <h3 className="font-display text-3xl uppercase">The Archon</h3>
                </div>
            </div>

            {/* Bio-Titanium Specs */}
            <div className="bg-[#0E2A47] p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/40 block mb-6">
                    Technical Specs
                </span>
                <h4 className="font-display text-2xl mb-4 uppercase">Bio-Titanium <br/> Construction</h4>
                <p className="font-sans text-[11px] text-white/60 leading-relaxed uppercase tracking-[0.15em] mb-6">
                    Unparalleled strength-to-weight ratio. <br/>
                    Hypoallergenic coating. <br/>
                    Laser-etched serial numbers.
                </p>
                <div className="relative aspect-video w-full overflow-hidden opacity-80">
                    <Image src="/pictures/collection-1.jpg" alt="Detail" fill className="object-cover" />
                </div>
            </div>
        </div>
      </section>

      {/* 5. Editorial Spread 3: Statement */}
      <section className="relative h-[80vh] flex items-center justify-center text-center px-6">
        <Image 
            src="/pictures/hero-final-vision.jpg" 
            alt="Statement" 
            fill 
            className="object-cover grayscale contrast-125" 
        />
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
        
        <div className="relative z-10">
            <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-[#C5A880] mb-6 block">
                The Final Word
            </span>
            <h2 className="font-display text-5xl leading-none text-white uppercase mb-8">
                See the World <br/>
                <span className="italic font-serif">Without Obstruction</span>
            </h2>
            <div className="flex flex-col gap-4 items-center">
                 <button className="bg-white text-black px-8 py-3 rounded-full font-bold text-[10px] tracking-[0.2em] uppercase w-full max-w-[200px]">
                    Full Series
                </button>
                <button className="text-white border-b border-white/30 pb-1 font-mono text-[9px] tracking-[0.3em] uppercase">
                    Find a Boutique
                </button>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-black text-white">
        <div className="border-t border-white/10 pt-12">
            <h3 className="font-display text-3xl font-bold mb-6 tracking-tight">LENXO</h3>
            <div className="grid grid-cols-2 gap-8 mb-12">
                <div className="flex flex-col gap-4">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#C5A880]">Collection</span>
                    <a href="#" className="text-xs text-white/70 hover:text-white">Optical</a>
                    <a href="#" className="text-xs text-white/70 hover:text-white">Sun</a>
                    <a href="#" className="text-xs text-white/70 hover:text-white">Limited</a>
                </div>
                <div className="flex flex-col gap-4">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#C5A880]">Maison</span>
                    <a href="#" className="text-xs text-white/70 hover:text-white">About</a>
                    <a href="#" className="text-xs text-white/70 hover:text-white">Journal</a>
                    <a href="#" className="text-xs text-white/70 hover:text-white">Stores</a>
                </div>
            </div>
            <p className="text-white/30 text-[10px] font-mono tracking-widest">© 2026 LENXO COLLECTIVE</p>
        </div>
      </footer>
    </div>
  );
}