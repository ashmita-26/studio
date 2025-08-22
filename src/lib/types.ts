import type { LucideIcon } from 'lucide-react';

export interface Plant {
  id: string;
  name: string;
  type: 'Indoor Plant' | 'Outdoor Plant' | 'Flowering Plant' | 'Tree' | 'Shrub';
  price: number;
  description: string;
  imageUrl: string;
  dataAiHint: string;
  environment: 'indoor' | 'outdoor';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: LucideIcon;
  description: string;
  plants: Plant[];
}
