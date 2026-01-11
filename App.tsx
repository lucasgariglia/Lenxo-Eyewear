import React from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { CraftedDaily } from './components/CraftedDaily';
import { CollectionBento } from './components/CollectionBento';
import { CareBanner } from './components/CareBanner';
import { ClarityEditorial } from './components/ClarityEditorial';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';

const App: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] selection:bg-black selection:text-white">
      <CustomCursor />
      <Navigation />
      
      <main>
        <Hero />
        <CraftedDaily />
        <CollectionBento />
        <CareBanner />
        <ClarityEditorial />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;