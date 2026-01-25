"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState<string>("");
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power4.out",
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for pointer elements
      const isPointer = 
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("a") ||
        target.closest("button");

      // Check for data-cursor attribute
      const cursorData = target.getAttribute("data-cursor") || target.closest("[data-cursor]")?.getAttribute("data-cursor");

      if (cursorData) {
        setCursorText(cursorData);
        setIsHovering(true);
        gsap.to(cursor, { scale: 0, duration: 0.3 });
        gsap.to(follower, { scale: 4, backgroundColor: "#C5A880", mixBlendMode: "normal", opacity: 0.9, duration: 0.3 });
      } else if (isPointer) {
        setCursorText("");
        setIsHovering(true);
        gsap.to(cursor, { scale: 0, duration: 0.3 });
        gsap.to(follower, { scale: 1.5, backgroundColor: "transparent", borderColor: "#C5A880", borderWidth: "2px", mixBlendMode: "difference", duration: 0.3 });
      } else {
        setCursorText("");
        setIsHovering(false);
        gsap.to(cursor, { scale: 1, duration: 0.3 });
        gsap.to(follower, { scale: 1, backgroundColor: "transparent", borderColor: "white", borderWidth: "1px", mixBlendMode: "difference", duration: 0.3 });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-white rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center mix-blend-difference"
      >
        <span className="text-[3px] font-bold text-black uppercase tracking-widest leading-none">
          {cursorText}
        </span>
      </div>
    </>
  );
}