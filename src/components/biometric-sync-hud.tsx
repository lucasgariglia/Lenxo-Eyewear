"use client";

import React, { useState, useEffect } from "react";
import { ScanLine, HeartPulse, BrainCircuit, Activity } from "lucide-react";

export default function BiometricSyncHUD() {
  const [time, setTime] = useState("");
  const [heartRate, setHeartRate] = useState(72);
  const [temp, setTemp] = useState(98.6);

  useEffect(() => {
    // Clock Tick
    const timeInterval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false }) + ":" + now.getMilliseconds().toString().padStart(3, '0'));
    }, 50);

    // Biorhythm Simulation
    const bioInterval = setInterval(() => {
      setHeartRate(prev => 70 + Math.floor(Math.random() * 5));
      setTemp(prev => 98.4 + Math.random() * 0.4);
    }, 2000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(bioInterval);
    };
  }, []);

  return (
    <div className="pointer-events-none z-30">
      {/* Top Left HUD */}
      <div className="absolute top-12 left-12 text-primary/80 font-code text-xs tracking-widest leading-loose">
        <div className="flex items-center gap-3 mb-2">
          <ScanLine className="w-5 h-5 animate-pulse text-accent" />
          <p className="text-accent font-bold">STATUS: ONLINE</p>
        </div>
        <div className="pl-8 space-y-1">
            <p>SYS_ID: AV-LX-001</p>
            <p>MODE: ABSOLUTE_SCALING</p>
            <p>LOC: 34.0522° N, 118.2437° W</p>
            <p>T-INDEX: {time}</p>
        </div>
      </div>

      {/* Bottom Right HUD */}
      <div className="absolute bottom-12 right-12 text-primary/80 font-code text-xs tracking-widest text-right leading-loose">
        <p className="text-accent font-bold mb-2">BIOMETRIC SYNC</p>
        
        <div className="flex items-center justify-end gap-4">
            <p>{temp.toFixed(1)}° F</p>
            <div className="w-24 h-1 bg-primary/20 overflow-hidden rounded-full">
                <div 
                    className="h-full bg-accent transition-all duration-1000 ease-in-out" 
                    style={{ width: `${((temp - 98) / 2) * 100}%` }}
                />
            </div>
            <Activity className="w-4 h-4" />
        </div>

        <div className="flex items-center justify-end gap-4 mt-1">
            <p>{heartRate} BPM</p>
            <HeartPulse className="w-4 h-4 animate-bounce duration-[2000ms]" />
        </div>

        <div className="flex items-center justify-end gap-4 mt-1">
            <p>SYNC: 99.9%</p>
            <BrainCircuit className="w-4 h-4 text-accent" />
        </div>
      </div>

       {/* Corner Brackets */}
       <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-primary/30"></div>
       <div className="absolute top-8 right-8 w-8 h-8 border-t border-r border-primary/30"></div>
       <div className="absolute bottom-8 left-8 w-8 h-8 border-b border-l border-primary/30"></div>
       <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-primary/30"></div>
    </div>
  );
}
