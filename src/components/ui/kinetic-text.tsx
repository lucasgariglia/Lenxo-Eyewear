"use client";

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface KineticTextProps {
  children: string;
  className?: string;
  as?: React.ElementType;
}

export default function KineticText({ children, className, as: Component = 'p' }: KineticTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate words from opacity 0.2 to 1 based on scroll
      gsap.fromTo(wordsRef.current, 
        { opacity: 0.2 },
        {
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 1,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Split text into words
  const words = children.split(' ');

  return (
    <Component ref={containerRef as any} className={cn("leading-relaxed", className)}>
      {words.map((word, i) => (
        <span 
            key={i} 
            ref={(el) => { if (el) wordsRef.current[i] = el }}
            className="inline-block mr-[0.2em] transition-colors duration-300"
        >
          {word}
        </span>
      ))}
    </Component>
  );
}
