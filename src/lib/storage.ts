import { Property } from '../types';
import { INITIAL_PROPERTIES } from '../data';

const STORAGE_KEY = 'real_estate_listings';

export const getProperties = (): Property[] => {
  if (typeof window === 'undefined') return INITIAL_PROPERTIES;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROPERTIES));
    return INITIAL_PROPERTIES;
  }
  return JSON.parse(stored);
};

export const saveProperty = (property: Property) => {
  if (typeof window === 'undefined') return;
  const properties = getProperties();
  const updated = [property, ...properties];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const getPropertyById = (id: string): Property | undefined => {
  return getProperties().find(p => p.id === id);
};