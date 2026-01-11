export interface NavItem {
  label: string;
  href: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  accentColor?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  image: string;
}