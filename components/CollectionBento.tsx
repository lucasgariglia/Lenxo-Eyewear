import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Link } from 'react-router-dom';

interface CollectionItemProps {
  id: string;
  name: string;
  image: string;
  color: string;
  textColor?: string;
  isLarge?: boolean;
  specs?: { material?: string; lens?: string };
}

const CollectionItem: React.FC<CollectionItemProps> = ({ id, name, image, color, textColor = "text-zinc-900", isLarge = false, specs }) => (
  <Link 
    to={`/product/${id}`}
    className={`block relative group cursor-pointer rounded-3xl overflow-hidden ${isLarge ? 'md:row-span-2 aspect-[4/5] md:aspect-auto' : 'aspect-square'}`}
    style={{ backgroundColor: color }}
  >
    <motion.div 
      className="w-full h-full relative"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.5 }}
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
  </Link>
);

export const CollectionBento: React.FC = () => {
  // We manually map specific products to the grid layout to maintain the specific design (Large Crystal item in center)
  const obsidian = PRODUCTS.find(p => p.id === 'obsidian');
  const crystal = PRODUCTS.find(p => p.id === 'crystal');
  const luminous = PRODUCTS.find(p => p.id === 'luminous');

  if (!obsidian || !crystal || !luminous) return null;

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
          <Link to="/collection" className="bg-black text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-zinc-800 transition-colors self-start md:self-end">
            <span className="text-xs font-bold uppercase tracking-widest">Explore Collection</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-[1.5vw]">
          {/* Item 1 - Obsidian */}
          <div className="flex flex-col gap-6 xl:gap-[1.5vw]">
             <CollectionItem 
                id={obsidian.id}
                name={obsidian.name} 
                color={obsidian.accentColor || '#F4F4F5'} 
                image={obsidian.image}
                textColor="text-white"
              />
              <div className="hidden md:block p-8">
                <p className="text-xs font-bold tracking-widest uppercase text-zinc-400 mb-2">Material</p>
                <p className="text-zinc-800">{obsidian.specs?.material}</p>
              </div>
          </div>

          {/* Item 2 - Crystal (Large) */}
          <CollectionItem 
            id={crystal.id}
            name={crystal.name} 
            color={crystal.accentColor || '#EAB308'} 
            image={crystal.image}
            textColor="text-white"
            isLarge
          />

          {/* Item 3 - Luminous */}
          <div className="flex flex-col gap-6 xl:gap-[1.5vw]">
            <CollectionItem 
              id={luminous.id}
              name={luminous.name} 
              color={luminous.accentColor || '#FFFFFF'} 
              image={luminous.image}
              textColor="text-white"
            />
             <div className="hidden md:block p-8 text-right">
                <p className="text-xs font-bold tracking-widest uppercase text-zinc-400 mb-2">Lenses</p>
                <p className="text-zinc-800">{luminous.specs?.lens}</p>
              </div>
          </div>
        </div>

      </div>
    </section>
  );
};