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

export const Home: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleQuickView = (productId: string) => {
    setSelectedProductId(productId);
  };

  const selectedProduct = selectedProductId ? PRODUCTS.find(p => p.id === selectedProductId) || null : null;

  return (
    <main>
      <QuickViewModal 
        product={selectedProduct} 
        isOpen={!!selectedProductId} 
        onClose={() => setSelectedProductId(null)} 
      />
      
      <VideoModal 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)} 
      />

      <Hero onPlayVideo={() => setIsVideoOpen(true)} />
      <CraftedDaily 
        onQuickView={handleQuickView} 
        onPlayVideo={() => setIsVideoOpen(true)}
      />
      <CollectionBento />
      <CareBanner />
      <ClarityEditorial />
    </main>
  );
};