export type PropertyType = 'rent' | 'sale';
export type PropertyCategory = 'home' | 'land' | 'commercial' | 'other';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  type: PropertyType;
  category: PropertyCategory;
  location: string;
  image: string;
  bedrooms?: number;
  bathrooms?: number;
  area: number; // in sqft or sqm
  features: string[];
  createdAt: string;
}

export interface SearchFilters {
  query?: string;
  type?: PropertyType | 'all';
  category?: PropertyCategory | 'all';
  minPrice?: number;
  maxPrice?: number;
}