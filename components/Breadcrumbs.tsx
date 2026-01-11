import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  
  // STRICTLY Hide on home page and about page (immersive dark mode pages)
  // Using .includes ensures we catch trailing slashes or sub-paths if any
  if (path === '/' || path.includes('/about')) return null;

  const pathnames = location.pathname.split('/').filter((x) => x);

  // Map internal route names to user-friendly labels and destinations
  const getBreadcrumbInfo = (segment: string, index: number, arr: string[]) => {
    // If the segment is 'product', we want to label it 'Collection' and link it to /collection
    // because /product is not a valid route on its own.
    if (segment === 'product') {
        return {
            label: 'Collection',
            to: '/collection'
        };
    }
    
    // Default behavior
    const label = segment.replace('-', ' ');
    const to = `/${arr.slice(0, index + 1).join('/')}`;
    return { label, to };
  };

  return (
    <div className="w-full bg-[#FAFAFA] pt-36 pb-4 px-6 xl:px-[4vw]">
       <div className="container mx-auto max-w-[1800px] flex items-center text-xs font-bold uppercase tracking-widest text-zinc-400">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          
          {pathnames.map((value, index) => {
            const { label, to } = getBreadcrumbInfo(value, index, pathnames);
            const isLast = index === pathnames.length - 1;
            
            return (
              <React.Fragment key={to}>
                <ChevronRight size={12} className="mx-2" />
                {isLast ? (
                  <span className="text-black">{label}</span>
                ) : (
                  <Link to={to} className="hover:text-black transition-colors">
                    {label}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
       </div>
    </div>
  );
};