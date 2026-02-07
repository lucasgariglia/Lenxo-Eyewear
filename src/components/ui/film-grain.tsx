"use client";

import React from 'react';

const FilmGrain = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] mix-blend-overlay opacity-[0.07] overflow-hidden">
      <div className="absolute inset-[-200%] w-[400%] h-[400%] animate-grain bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>
      <style jsx global>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }
        .animate-grain {
          animation: grain 8s steps(10) infinite;
        }
      `}</style>
    </div>
  );
};

export default FilmGrain;
