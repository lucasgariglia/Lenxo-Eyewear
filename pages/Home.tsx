import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { CraftedDaily } from '../components/CraftedDaily';
import { CollectionBento } from '../components/CollectionBento';
import { CareBanner } from '../components/CareBanner';
import { ClarityEditorial } from '../components/ClarityEditorial';
import { QuickViewModal } from '../components/QuickViewModal';
import { VideoModal } from '../components/VideoModal';
import { PRODUCTS } from '../data';
import { Product } from '../types';

// VIDEO CONFIGURATION
// These point to the files you uploaded to your "public/videos" folder
const VIDEO_SOURCES = {
  HERO: "/videos/hero.mp4",
  PROCESS: "/videos/handcrafted.mp4"
};

export const Home: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  const handleQuickView = (productId: string) => {
    setSelectedProductId(productId);
  };

  const selectedProduct = selectedProductId ? PRODUCTS.find(p => p.id === selectedProductId) || null : null;

  const openVideo = (src: string) => {
    setVideoSrc(src);
  };

  const closeVideo = () => {
    setVideoSrc(null);
  };

  return (
    <main>
      <QuickViewModal 
        product={selectedProduct} 
        isOpen={!!selectedProductId} 
        onClose={() => setSelectedProductId(null)} 
      />
      
      <VideoModal 
        isOpen={!!videoSrc} 
        onClose={closeVideo} 
        videoSrc={videoSrc}
      />

      <Hero onPlayVideo={() => openVideo(VIDEO_SOURCES.HERO)} />
      <CraftedDaily 
        onQuickView={handleQuickView} 
        onPlayVideo={() => openVideo(VIDEO_SOURCES.PROCESS)}
      />
      <CollectionBento />
      <CareBanner />
      <ClarityEditorial />
    </main>
  );
};