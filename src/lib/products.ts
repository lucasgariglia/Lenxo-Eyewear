export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  description: string;
  specs: {
    material: string;
    weight: string;
    origin: string;
    dimensions: string; // e.g. "52 [] 18 // 145"
  };
  images: {
    hero: string;
    gallery: string[];
  };
  inStock: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "801",
    slug: "archon-801",
    name: "The Archon",
    subtitle: "Obsidian Series",
    price: 450,
    description: "Architectural purity. A silhouette defined by absolute geometric restraint. Milled from a single block of Japanese Bio-Titanium.",
    specs: {
      material: "Bio-Titanium Grade 5",
      weight: "12g",
      origin: "Fukui, Japan",
      dimensions: "52 [] 18 // 145"
    },
    images: {
      hero: "/pictures/col-modern.jpg",
      gallery: ["/pictures/collection-1.jpg", "/pictures/hero-minimal.jpg", "/pictures/hero-stitch.jpg"]
    },
    inStock: true
  },
  {
    id: "802",
    slug: "stitch-802",
    name: "The Stitch",
    subtitle: "Technical Weave",
    price: 495,
    description: "A study in tension. Features our patented 'Stitch' hinge mechanism, visible only when the temple is folded.",
    specs: {
      material: "Acetate & Beta-Titanium",
      weight: "18g",
      origin: "Sabae, Japan",
      dimensions: "49 [] 21 // 142"
    },
    images: {
      hero: "/pictures/hero-stitch.jpg",
      gallery: ["/pictures/collection-2.jpg", "/pictures/collection-3.jpg"]
    },
    inStock: true
  },
  {
    id: "803",
    slug: "vision-803",
    name: "The Vision",
    subtitle: "Augmented Series",
    price: 650,
    description: "The bridge between analog and digital. Equipped with passive HUD-ready waveguide lenses.",
    specs: {
      material: "Carbon Fiber Composite",
      weight: "14g",
      origin: "Fukui, Japan",
      dimensions: "54 [] 19 // 148"
    },
    images: {
      hero: "/pictures/hero-final-vision.jpg",
      gallery: ["/pictures/feature-nav.jpg", "/pictures/hero-glasses.jpg"]
    },
    inStock: true
  },
  {
    id: "804",
    slug: "refined-804",
    name: "The Refined",
    subtitle: "Heritage Collection",
    price: 420,
    description: "Timeless aesthetics calibrated for the modern face. A thinner profile with enhanced structural integrity.",
    specs: {
      material: "Mazzucchelli Acetate",
      weight: "22g",
      origin: "Sabae, Japan",
      dimensions: "48 [] 22 // 145"
    },
    images: {
      hero: "/pictures/editorial-portrait.jpg",
      gallery: ["/pictures/col-lifestyle.jpg", "/pictures/col-yellow.jpg"]
    },
    inStock: true
  }
];
