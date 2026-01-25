"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple fade in/up for now. 
    // A full curtain sweep requires a global overlay context or layout persistence which is complex in the template file alone without global state.
    // However, we can animate the entering content.
    
    gsap.fromTo(elementRef.current, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power4.out", delay: 0.2 }
    );
  }, [path]);

  return (
    <div ref={elementRef}>
      {children}
    </div>
  );
}
