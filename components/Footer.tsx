import React from 'react';
import { ArrowRight, Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F4F4F5] pt-24 pb-12 px-6 xl:px-[4vw] border-t border-zinc-200">
      <div className="container mx-auto max-w-[1600px]">
        
        <div className="flex flex-col xl:flex-row justify-between items-start gap-12 mb-24">
          
          <div className="max-w-md">
            <h3 className="text-xl font-medium mb-6">Made for<br/>everyday vision.</h3>
            
            <div className="relative flex items-center">
              <input 
                type="email" 
                placeholder="Enter Email" 
                className="w-full bg-white px-6 py-4 rounded-full text-zinc-800 focus:outline-none focus:ring-2 focus:ring-black pr-16"
              />
              <button className="absolute right-2 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="flex gap-12 xl:gap-24 text-sm text-zinc-600">
            <div className="flex flex-col gap-4">
              <Link to="/" className="hover:text-black transition-colors">Home</Link>
              <Link to="/collection" className="hover:text-black transition-colors">Collection</Link>
              <Link to="/about" className="hover:text-black transition-colors">About</Link>
              <Link to="/checkout" className="hover:text-black transition-colors">Contact</Link>
            </div>
            
             <div className="flex flex-col gap-4">
               <span className="font-bold text-black mb-2 uppercase tracking-widest text-xs">Location</span>
               <p>+1 (212) 555-0123</p>
               <p>support@lenxo.com</p>
               <div className="flex gap-4 mt-2">
                 <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center hover:bg-zinc-300 cursor-pointer transition-colors"><Twitter size={14}/></div>
                 <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center hover:bg-zinc-300 cursor-pointer transition-colors"><Instagram size={14}/></div>
                 <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center hover:bg-zinc-300 cursor-pointer transition-colors"><Facebook size={14}/></div>
               </div>
            </div>
          </div>
        </div>

        {/* Increased leading and added padding-bottom to prevent clipping */}
        <div className="w-full flex justify-center overflow-hidden pb-[2vw]">
          <h1 className="text-[25vw] leading-[0.8] font-bold tracking-tighter text-zinc-900 select-none">
            Lenxo
          </h1>
        </div>
        
        <div className="mt-12 flex justify-between text-xs text-zinc-400 uppercase tracking-widest">
           <p>© {new Date().getFullYear()} Lenxo Inc.</p>
           <p>Privacy Policy</p>
        </div>

      </div>
    </footer>
  );
};