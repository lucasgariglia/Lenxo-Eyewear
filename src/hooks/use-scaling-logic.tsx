"use client";

import { useState, useLayoutEffect, useEffect, RefObject } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const DESKTOP_BREAKPOINT = 769;
const CANVAS_WIDTH = 1600;

export function useScalingLogic(
  wrapperRef: RefObject<HTMLDivElement | null>, 
  contentRef: RefObject<HTMLDivElement | null>
) {
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  // 1. Window Resize Listener
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    // Initial set
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 2. Scaling & Pivot Logic
  useLayoutEffect(() => {
    if (windowSize.width === 0) return;

    // A. Mobile Pivot: Kill the Engine
    if (windowSize.width < DESKTOP_BREAKPOINT) {
        if (wrapperRef.current) {
            wrapperRef.current.style.height = 'auto';
            wrapperRef.current.style.overflow = 'visible';
        }
        if (contentRef.current) {
            contentRef.current.style.transform = 'none';
            contentRef.current.style.width = '100%';
            contentRef.current.style.height = 'auto';
            contentRef.current.style.position = 'static';
        }
        ScrollTrigger.refresh();
        return;
    }
    
    // B. Desktop Engine: Absolute Scaling
    const syncHeight = () => {
        if (contentRef?.current && wrapperRef?.current) {
            const scale = windowSize.width / CANVAS_WIDTH;
            const contentHeight = contentRef.current.offsetHeight;
            
            // Set Wrapper Height to Scaled Content Height
            wrapperRef.current.style.height = `${contentHeight * scale}px`;
            
            // Apply Transform to Content
            contentRef.current.style.transform = `scale(${scale})`;
            contentRef.current.style.transformOrigin = 'top left';
            contentRef.current.style.width = `${CANVAS_WIDTH}px`;
            contentRef.current.style.position = 'absolute';

            // CRITICAL: Refresh ScrollTrigger after height change
            ScrollTrigger.refresh();
        }
    };

    syncHeight();
    
    const observer = new ResizeObserver(syncHeight);
    if (contentRef?.current) observer.observe(contentRef.current);
    
    return () => observer.disconnect();
  }, [windowSize.width, wrapperRef, contentRef]);

  const isMobile = windowSize.width > 0 && windowSize.width < DESKTOP_BREAKPOINT;
  const scale = isMobile ? 1 : windowSize.width / CANVAS_WIDTH;
  
  // Provide a safe fallback for stageHeight if window is not yet available
  const safeWindowHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
  const stageHeight = isMobile ? 'auto' : Math.ceil(safeWindowHeight / scale);

  return { isMobile, scale, stageHeight, windowSize };
}
