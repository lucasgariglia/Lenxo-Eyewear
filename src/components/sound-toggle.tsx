"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function SoundToggle() {
  const [isMuted, setIsMuted] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize AudioContext on first user interaction
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };
    window.addEventListener('click', initAudio, { once: true });
    return () => window.removeEventListener('click', initAudio);
  }, []);

  const playClick = () => {
    if (isMuted || !audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  };

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
        // Play sound on interactive elements
        const target = e.target as HTMLElement;
        const isInteractive = 
            target.tagName === "BUTTON" || 
            target.tagName === "A" || 
            target.closest("button") || 
            target.closest("a");

        if (isInteractive) {
            playClick();
        }
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, [isMuted]);

  const toggleSound = () => {
    setIsMuted(!isMuted);
  };

  return (
    <button
      onClick={(e) => {
          e.stopPropagation(); // Prevent double trigger
          toggleSound();
          if (isMuted) playClick(); // Play feedback when turning ON
      }}
      className="fixed top-8 right-8 z-[60] flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-black/20 backdrop-blur-md text-white hover:bg-white/10 transition-all duration-300"
      aria-label={isMuted ? "Unmute" : "Mute"}
      data-cursor="SOUND"
    >
      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
    </button>
  );
}
