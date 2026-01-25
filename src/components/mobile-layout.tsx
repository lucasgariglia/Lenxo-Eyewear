import Image from "next/image";
import { ArrowRight, ShoppingBag, Menu, PlayCircle, Search } from 'lucide-react';

export default function MobileLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-black">
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
      
      {/* 2. Mobile Hero */}
      <section className="h-[80vh] flex flex-col items-center justify-end text-center relative overflow-hidden px-6 pb-20 pt-20">
        <div className="absolute inset-0 z-0">
             <Image 
                src="/pictures/hero-glasses.jpg" 
                alt="Hero" 
                fill 
                className="object-cover" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center w-full">
            <span className="font-mono text-[10px] text-[#C5A880] uppercase tracking-[0.3em] mb-4">
                Est. 2026
            </span>
            <h1 className="font-display text-5xl leading-[0.9] text-white mb-6 uppercase">
                Vision <br/> Refined
            </h1>
            <button className="bg-white text-black px-8 py-4 rounded-full w-full font-medium text-sm flex items-center justify-center gap-2">
                Shop Collection
                <ArrowRight className="w-4 h-4" />
            </button>
        </div>
      </section>

      {/* 3. Mobile Collections */}
      <section className="py-20 px-6 bg-white">
         <div className="mb-12">
            <h2 className="font-display text-4xl text-black mb-4 uppercase leading-none">
                Designed <br/> For Life
            </h2>
            <p className="text-gray-500 text-sm font-light leading-relaxed">
                Lightweight frames, precise lenses. Eyewear that disappears.
            </p>
         </div>

         <div className="space-y-4">
             {/* Card 1 */}
            <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-gray-100">
                <Image src="/pictures/col-tortoise.jpg" alt="Tortoise" fill className="object-cover" />
                <div className="absolute bottom-6 left-6">
                    <h3 className="font-display text-2xl text-black bg-white/90 backdrop-blur px-3 py-1 inline-block">Tortoise</h3>
                </div>
            </div>

            {/* Card 2 */}
            <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-gray-100">
                <Image src="/pictures/col-yellow.jpg" alt="Luminous" fill className="object-cover" />
                <div className="absolute bottom-6 left-6">
                    <h3 className="font-display text-2xl text-black bg-white/90 backdrop-blur px-3 py-1 inline-block">Luminous</h3>
                </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-black text-white text-center">
        <h3 className="font-display text-2xl font-bold mb-4">LENXO</h3>
        <p className="text-white/50 text-xs">© 2026 Lenxo Inc.</p>
      </footer>
    </div>
  );
}