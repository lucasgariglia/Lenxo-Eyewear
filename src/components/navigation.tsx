import { Aperture } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="absolute top-8 left-1/2 -translate-x-1/2 z-40">
      <div className="flex items-center gap-4 px-6 py-3 bg-black/20 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
        <Aperture className="text-primary" />
        <span className="font-headline text-2xl text-accent tracking-wider">
          Absolute Vision
        </span>
      </div>
    </nav>
  );
}
