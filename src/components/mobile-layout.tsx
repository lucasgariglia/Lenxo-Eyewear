import { Aperture, ScanLine, HeartPulse, BrainCircuit } from 'lucide-react';

export default function MobileLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground p-6 pt-24">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-4 bg-background/80 backdrop-blur-sm border-b border-primary/20">
        <div className="flex items-center gap-3">
          <Aperture className="text-primary w-8 h-8" />
          <span className="font-headline text-2xl text-accent">
            Absolute Vision
          </span>
        </div>
      </header>
      
      {/* Hero Content */}
      <section className="flex-grow flex flex-col items-center justify-center text-center -mt-16">
        <h1 className="font-headline text-6xl leading-tight text-accent">
          Vision Augmented
        </h1>
        <p className="font-body text-primary text-md mt-4 tracking-widest">
          THE LENXO ENGINE
        </p>
      </section>

      {/* Info Section */}
      <section className="py-12 border-t border-primary/20">
        <h2 className="font-headline text-4xl text-primary mb-8 text-center">Natural Scroll</h2>
        <div className="space-y-6 text-base font-body text-accent/80 text-left max-w-xl mx-auto">
          <p>
            On larger screens, this experience is powered by the Lenxo Absolute Scaling Engine, a GSAP-driven canvas that maintains perfect proportions.
          </p>
          <p>
            This mobile view presents a streamlined, accessible version of the content, optimized for vertical scrolling and touch interaction. The core principles of clarity and elegance are preserved.
          </p>
        </div>
      </section>

      {/* HUD Section */}
      <section className="py-12 border-t border-primary/20 text-primary font-code text-sm">
        <h3 className="text-lg text-center mb-6 tracking-widest">SYSTEM STATUS</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 max-w-sm mx-auto">
          <div className="flex items-center gap-3">
            <ScanLine className="w-5 h-5" />
            <p>ONLINE</p>
          </div>
          <p>ID: AV-LX-M-001</p>
          <div className="flex items-center gap-3">
            <HeartPulse className="w-5 h-5"/>
            <p>72 BPM</p>
          </div>
          <div className="flex items-center gap-3">
            <BrainCircuit className="w-5 h-5"/>
            <p>SYNC: 98%</p>
          </div>
        </div>
      </section>
    </div>
  );
}
