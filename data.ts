import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'obsidian',
    name: 'Obsidian',
    price: 289,
    description: 'Carved from Italian acetate with titanium hinges, Obsidian represents the pinnacle of dark minimalism.',
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=800&auto=format&fit=crop',
    category: 'Optical',
    colors: ['#000000', '#1F1F1F'],
    accentColor: '#F4F4F5',
    textColor: 'text-zinc-900',
    specs: {
      material: 'Italian Acetate & Titanium',
      fit: 'Medium',
      lens: 'Blue-light blocking available'
    },
    details: ['Hand-polished finish', '5-barrel hinges', 'Anti-scratch coating']
  },
  {
    id: 'crystal',
    name: 'Crystal',
    price: 249,
    description: 'Transparent aesthetics that reveal the inner workings of precision engineering.',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop',
    category: 'Sun',
    colors: ['#FFFFFF', '#E0E0E0'],
    accentColor: '#EAB308',
    textColor: 'text-white',
    specs: {
      material: 'Crystal Acetate',
      fit: 'Narrow',
      lens: 'UV400 Protection'
    },
    details: ['Lightweight construction', 'Wire core temples', 'Hydrophobic lens coating']
  },
  {
    id: 'luminous',
    name: 'Luminous',
    price: 329,
    description: 'A avant-garde silhouette designed for those who see the world differently.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop',
    category: 'Optical',
    colors: ['#D4D4D8', '#FFFFFF'],
    accentColor: '#FFFFFF',
    textColor: 'text-zinc-900',
    specs: {
      material: 'Bio-Nylon',
      fit: 'Wide',
      lens: 'Photochromic'
    },
    details: ['Sustainable materials', 'Flex hinges', 'Digital surface technology']
  },
  {
    id: 'eclipse',
    name: 'Eclipse',
    price: 299,
    description: 'Inspired by the shadow of the moon, Eclipse offers total privacy with 100% UV blackout lenses.',
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=800&auto=format&fit=crop',
    category: 'Sun',
    colors: ['#18181B', '#27272A'],
    accentColor: '#18181B',
    textColor: 'text-white',
    specs: {
      material: 'Matte Acetate',
      fit: 'Medium',
      lens: 'Polarized Blackout'
    },
    details: ['Matte finish', 'Hidden branding', 'Impact resistant']
  },
  {
    id: 'nebula',
    name: 'Nebula',
    price: 319,
    description: 'A retro-futuristic design featuring a distinct double-bridge and metallic accents.',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop',
    category: 'Sun',
    colors: ['#71717A', '#A1A1AA'],
    accentColor: '#E4E4E7',
    textColor: 'text-zinc-900',
    specs: {
      material: 'Stainless Steel',
      fit: 'Wide',
      lens: 'Gradient Grey'
    },
    details: ['Adjustable nose pads', 'Double bridge', 'Ultralight']
  },
  {
    id: 'horizon',
    name: 'Horizon',
    price: 269,
    description: 'Designed for the modern intellectual, Horizon blends classic tortoise patterns with modern geometry.',
    image: 'https://images.unsplash.com/photo-1563903530908-afdd155d057a?q=80&w=800&auto=format&fit=crop',
    category: 'Optical',
    colors: ['#52525B', '#3F3F46'],
    accentColor: '#D4D4D8',
    textColor: 'text-zinc-900',
    specs: {
      material: 'Tortoise Acetate',
      fit: 'Narrow',
      lens: 'Clear Demo'
    },
    details: ['Keyhole bridge', 'Riveted hinges', 'Hand-finished']
  }
];

export const getProductById = (id: string): Product | undefined => {
  return PRODUCTS.find(product => product.id === id);
};