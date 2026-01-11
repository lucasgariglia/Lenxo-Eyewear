import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { CartDrawer } from './components/CartDrawer';
import { Breadcrumbs } from './components/Breadcrumbs';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { Checkout } from './pages/Checkout';
import { Collection } from './pages/Collection';
import { About } from './pages/About';

// ScrollToTop component ensures we start at the top when navigating to new pages
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] selection:bg-black selection:text-white relative">
      <CustomCursor />
      <ScrollToTop />
      <Navigation />
      <CartDrawer />
      <Breadcrumbs />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/success" element={
          <div className="h-screen flex items-center justify-center bg-black text-white">
            <div className="text-center">
              <h1 className="text-6xl font-bold mb-4">Welcome to the Future.</h1>
              <p className="text-zinc-400">Your vision has been upgraded. Check your email.</p>
              <a href="/" className="inline-block mt-8 text-sm uppercase tracking-widest border-b border-white pb-1">Return Home</a>
            </div>
          </div>
        } />
      </Routes>
      
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <CartProvider>
         <AppContent />
      </CartProvider>
    </HashRouter>
  );
};

export default App;