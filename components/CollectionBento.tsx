import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CollectionItemProps {
  name: string;
  image: string;
  color: string;
  textColor?: string;
  isLarge?: boolean;
}

const CollectionItem: React.FC<CollectionItemProps> = ({ name, image, color, textColor = "text-zinc-900", isLarge = false }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className={`relative rounded-3xl overflow-hidden group cursor-pointer ${isLarge ? 'md:row-span-2 aspect-[4/5] md:aspect-auto' : 'aspect-square'}`}
    style={{ backgroundColor: color }}
  >
    {/* Full bleed image container */}
    <div className="absolute inset-0">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
      />
    </div>
    {/* Gradient for text readability on images */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
    
    <div className="absolute bottom-0 left-0 w-full p-8 flex justify-between items-end z-10">
      <h3 className={`text-2xl font-medium tracking-tight ${textColor === 'text-zinc-900' ? 'text-white' : textColor} drop-shadow-md`}>{name}</h3>
      <div className={`w-10 h-10 rounded-full border border-white/40 text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300 backdrop-blur-sm`}>
        <ArrowRight size={16} />
      </div>
    </div>
  </motion.div>
);

export const CollectionBento: React.FC = () => {
  return (
    <section className="py-24 xl:py-[8vw] px-6 xl:px-[4vw] bg-[#FAFAFA]">
      <div className="container mx-auto max-w-[1600px]">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-5xl xl:text-[4vw] leading-[0.9] font-bold tracking-tighter mb-6">
              OUR<br/>COLLECTIONS
            </h2>
            <p className="text-zinc-500 max-w-md">
              Carefully crafted frames and lenses designed for comfort, clarity, and style.
            </p>
          </div>
          <button className="bg-black text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-zinc-800 transition-colors self-start md:self-end">
            <span className="text-xs font-bold uppercase tracking-widest">Explore Collection</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-[1.5vw]">
          {/* Item 1 */}
          <div className="flex flex-col gap-6 xl:gap-[1.5vw]">
             <CollectionItem 
                name="Obsidian" 
                color="#F4F4F5" 
                image="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=800&auto=format&fit=crop"
                textColor="text-white"
              />
              <div className="hidden md:block p-8">
                <p className="text-xs font-bold tracking-widest uppercase text-zinc-400 mb-2">Material</p>
                <p className="text-zinc-800">Acetate & Titanium</p>
              </div>
          </div>

          {/* Item 2 - Large */}
          <CollectionItem 
            name="Crystal" 
            color="#EAB308" 
            image="https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop"
            textColor="text-white"
            isLarge
          />

          {/* Item 3 */}
          <div className="flex flex-col gap-6 xl:gap-[1.5vw]">
            <CollectionItem 
              name="Luminous" 
              color="#FFFFFF" 
              image="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop"
              textColor="text-white"
            />
             <div className="hidden md:block p-8 text-right">
                <p className="text-xs font-bold tracking-widest uppercase text-zinc-400 mb-2">Lenses</p>
                <p className="text-zinc-800">Blue-light blocking</p>
              </div>
          </div>
        </div>

      </div>
    </section>
  );
};