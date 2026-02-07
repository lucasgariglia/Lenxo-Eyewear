"use client";

import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import gsap from 'gsap';

// Editorial Mapping for technical segments
const SEGMENT_MAP: Record<string, { label: string; href?: string }> = {
  'product': { label: 'The Series', href: '/collection' },
  'collection': { label: 'The Series' },
  'about': { label: 'Manifesto' },
  'contact': { label: 'Boutique' },
  'checkout': { label: 'Secured Protocol' },
  'cart': { label: 'Manifest' }
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const containerRef = useRef<HTMLNavElement>(null);
  
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(containerRef.current.querySelectorAll('li'), 
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.5 }
    );
  }, [pathname]);

  if (pathname === '/') return null;

  const pathSegments = pathname.split('/').filter(segment => segment !== '');
  
  // Build logical breadcrumbs
  let crumbs: { label: string; href: string; isLast: boolean }[] = [];

  pathSegments.forEach((segment, index) => {
    const isLast = index === pathSegments.length - 1;
    const mapping = SEGMENT_MAP[segment];
    
    // Logic: If segment is a product ID (slug), try to format it nicely
    let label = mapping ? mapping.label : segment.replace(/-/g, ' ');
    let href = mapping?.href || `/${pathSegments.slice(0, index + 1).join('/')}`;

    // Injection Logic: If we are on a Product page, make sure the parent is linked to Collection
    if (segment === 'product' && isLast === false) {
        // Handled by mapping to /collection
    }

    crumbs.push({ label, href, isLast });
  });

  // Global Injection: Always allow return to Collection from Checkout/Cart if not already there
  if ((pathname.includes('checkout') || pathname.includes('cart')) && !crumbs.find(c => c.href === '/collection')) {
      crumbs.unshift({ label: 'The Series', href: '/collection', isLast: false });
  }

  return (
    <nav 
        ref={containerRef}
        aria-label="Breadcrumb" 
        className="fixed bottom-12 left-12 z-[10015] mix-blend-difference hidden lg:flex items-end gap-6"
    >
      {/* HUD Accent Line */}
      <div className="w-[1px] h-12 bg-gradient-to-t from-white/40 to-transparent" />

      <ol className="flex items-center space-x-3 pb-1">
        <li>
          <Link 
            href="/" 
            className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/40 hover:text-[#C5A880] transition-colors py-2"
          >
            Home
          </Link>
        </li>
        
        {crumbs.map((crumb, index) => (
          <li key={index} className="flex items-center space-x-3">
            <div className="w-1 h-1 rounded-full bg-white/20" />
            {crumb.isLast ? (
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white font-bold cursor-default py-2">
                {crumb.label}
              </span>
            ) : (
              <Link 
                href={crumb.href}
                className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/40 hover:text-[#C5A880] transition-colors py-2"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
