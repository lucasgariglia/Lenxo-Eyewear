"use client";

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  
  const [label, setLabel] = useState("FOCUS_ACTIVE");
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Mouse Movement Logic
    const onMouseMove = (e: MouseEvent) => {
      // 1. Center Dot (Instant Follow)
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });

      // 2. Outer Ring (Lag Follow)
      if (!isHovering) {
        gsap.to(ringRef.current, {
            x: e.clientX,
            y: e.clientY,
            width: 48,
            height: 48,
            duration: 0.6,
            ease: "power3.out"
        });
      }
    };

    // Magnetic Hover Logic
    const onMouseEnter = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('magnetic-trigger')) {
            setIsHovering(true);
            const rect = target.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Snap Ring to Target
            gsap.to(ringRef.current, {
                x: centerX,
                y: centerY,
                width: rect.width + 20, // Padding
                height: rect.height + 20,
                duration: 0.4,
                ease: "elastic.out(1, 0.5)"
            });

            // Update Label
            const newLabel = target.getAttribute('data-label') || "OPEN";
            setLabel(newLabel);
        }
    };

    const onMouseLeave = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('magnetic-trigger')) {
            setIsHovering(false);
            setLabel("FOCUS_ACTIVE");
        }
    };

    window.addEventListener('mousemove', onMouseMove);
    
    // Attach listeners to all magnetic triggers dynamically
    // In a real app, we might use a MutationObserver or a context to manage this better
    const triggers = document.querySelectorAll('.magnetic-trigger');
    triggers.forEach(el => {
        el.addEventListener('mouseenter', onMouseEnter as any);
        el.addEventListener('mouseleave', onMouseLeave as any);
    });

    // Observer for dynamic content
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                 const newTriggers = document.querySelectorAll('.magnetic-trigger');
                 newTriggers.forEach(el => {
                    // Simple check to avoid double binding (imperfect but functional for prototype)
                    el.removeEventListener('mouseenter', onMouseEnter as any);
                    el.removeEventListener('mouseleave', onMouseLeave as any);
                    el.addEventListener('mouseenter', onMouseEnter as any);
                    el.addEventListener('mouseleave', onMouseLeave as any);
                 });
            }
        });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
        window.removeEventListener('mousemove', onMouseMove);
        triggers.forEach(el => {
            el.removeEventListener('mouseenter', onMouseEnter as any);
            el.removeEventListener('mouseleave', onMouseLeave as any);
        });
        observer.disconnect();
    };
  }, [isHovering]);

  return (
    <>
        {/* Center Dot (Always moves) */}
        <div 
            ref={cursorRef}
            className="fixed top-0 left-0 w-1 h-1 bg-[#C5A880] rounded-full pointer-events-none z-[10001] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
        />
        
        {/* Magnetic Ring (Snaps) */}
        <div 
            ref={ringRef}
            className={`fixed top-0 left-0 border border-[#C5A880]/40 rounded-full pointer-events-none z-[10000] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${isHovering ? 'bg-[#C5A880]/5' : ''}`}
            style={{ width: 48, height: 48 }}
        >
            <div ref={labelRef} className={`absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[6px] tracking-widest text-[#C5A880] opacity-40 uppercase whitespace-nowrap transition-all duration-300 ${isHovering ? 'translate-y-2 opacity-100 font-bold' : ''}`}>
                {label}
            </div>
        </div>
    </>
  );
}
