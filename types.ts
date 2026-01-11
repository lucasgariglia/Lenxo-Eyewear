export interface NavItem {
  label: string;
  href: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  colors: string[];
  specs?: {
    material: string;
    fit: string;
    lens: string;
  };
  details: string[];
  accentColor?: string; // For the bento grid styling
  textColor?: string;   // For the bento grid styling
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  image: string;
}