import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function NaturalScrollSection() {
    return (
      <div className="w-full min-h-full bg-background text-foreground relative">
        <section className="relative py-32 px-6 md:px-12 border-t border-white/10">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                    <div className="max-w-2xl">
                        <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
                            Beyond the <span className="italic text-primary">Visible</span> Spectrum.
                        </h2>
                        <p className="text-gray-400 text-lg font-light">
                            Lenxo Obsidian uses advanced LiDAR scanning and real-time AI processing to overlay useful data onto your daily life, without cluttering your view.
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <a className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2 font-mono text-sm uppercase tracking-widest" href="#">
                            View All Specs
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1: Spatial Navigation */}
                    <div className="group relative rounded-2xl overflow-hidden h-[500px] border border-white/10">
                        <Image 
                            src="/pictures/feature-nav.jpg" 
                            alt="Navigation" 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                        
                        {/* HUD Overlay */}
                        <div className="absolute top-6 left-6 right-6 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded border border-primary/40 text-primary text-xs font-mono">
                                NAV_MODE
                            </div>
                            <div className="bg-primary text-black px-2 py-1 rounded text-xs font-bold font-mono">
                                7 MIN
                            </div>
                        </div>

                        {/* Content */}
                        <div className="absolute bottom-8 left-8 right-8">
                            <h3 className="font-display text-2xl text-white mb-2">Spatial Navigation</h3>
                            <p className="text-gray-300 text-sm font-light">Turn-by-turn directions projected directly onto the street.</p>
                        </div>
                    </div>

                    {/* Card 2: Live Translation */}
                    <div className="group relative rounded-2xl overflow-hidden h-[500px] border border-white/10 md:-mt-12">
                        <Image 
                            src="/pictures/feature-trans.jpg" 
                            alt="Translation" 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-50 group-hover:brightness-75"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>

                        {/* HUD Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-lg max-w-[80%] transform transition-transform group-hover:-translate-y-4 text-center">
                                <p className="font-display text-lg text-white">"Jardín de Mariposas"</p>
                                <div className="h-px w-full bg-primary/30 my-2"></div>
                                <p className="font-sans text-primary">Butterfly Garden</p>
                                <p className="text-[10px] text-gray-400 mt-1 font-mono uppercase">Live Translation</p>
                            </div>
                        </div>

                        <div className="absolute bottom-8 left-8 right-8">
                            <h3 className="font-display text-2xl text-white mb-2">Live Translation</h3>
                            <p className="text-gray-300 text-sm font-light">Instantly understand text and speech in 40+ languages.</p>
                        </div>
                    </div>

                    {/* Card 3: Biometric Sync */}
                    <div className="group relative rounded-2xl overflow-hidden h-[500px] border border-white/10">
                        <Image 
                            src="/pictures/feature-sync.jpg" 
                            alt="Biometrics" 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>

                        {/* HUD Overlay */}
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 space-y-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                            <div className="flex items-center justify-end gap-3">
                                <span className="text-white font-mono text-xl">142</span>
                                <span className="text-[10px] text-gray-400 uppercase tracking-wider block text-right">Heart<br/>Rate</span>
                                <div className="w-1 h-8 bg-red-500 rounded-full"></div>
                            </div>
                            <div className="flex items-center justify-end gap-3">
                                <span className="text-white font-mono text-xl">5:30</span>
                                <span className="text-[10px] text-gray-400 uppercase tracking-wider block text-right">Pace<br/>/KM</span>
                                <div className="w-1 h-6 bg-primary rounded-full"></div>
                            </div>
                        </div>

                        <div className="absolute bottom-8 left-8 right-8">
                            <h3 className="font-display text-2xl text-white mb-2">Biometric Sync</h3>
                            <p className="text-gray-300 text-sm font-light">Monitor your vitals with clinical grade precision sensors.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Marquee Banner */}
        <div className="w-full bg-primary text-black py-3 overflow-hidden border-y border-black/10">
            <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
                {/* Repeat content for smooth loop */}
                {[...Array(20)].map((_, i) => (
                     <span key={i} className="font-mono text-sm uppercase font-bold tracking-widest flex items-center gap-12 px-6">
                        <span className="w-2 h-2 bg-black rounded-full"></span> PRE-ORDER NOW
                    </span>
                ))}
            </div>
        </div>
        
        {/* Footer Stub */}
        <footer className="bg-background py-20 px-6 border-t border-white/10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                    <h3 className="font-display text-3xl font-bold text-white mb-2">Lenxo</h3>
                    <p className="text-gray-500 text-sm">Designed in California. Assembled in Japan.</p>
                </div>
            </div>
        </footer>
      </div>
    );
}
