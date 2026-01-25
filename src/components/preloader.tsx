"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const pathName = usePathname();
  const [isComplete, setIsComplete] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setIsComplete(true),
      });

      // Prevent scrolling during load
      document.body.style.overflow = "hidden";

      tl.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power4.out",
        delay: 0.2,
      })
      .to(textRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: "power4.in",
        delay: 0.5,
      })
      .to(containerRef.current, {
        height: 0,
        duration: 1.2,
        ease: "expo.inOut",
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, [pathName]); // Re-run on route change if desired, or remove dependency for only initial load

  useEffect(() => {
    if (isComplete) {
      document.body.style.overflow = "";
    }
  }, [isComplete]);

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#000000] text-[#C5A880]"
    >
      <h1
        ref={textRef}
        className="font-serif text-6xl md:text-9xl opacity-0 translate-y-10 tracking-widest"
      >
        LENXO
      </h1>
    </div>
  );
}
