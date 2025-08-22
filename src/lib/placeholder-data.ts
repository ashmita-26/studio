import { Leaf, Sprout, Trees, Flower } from 'lucide-react';
import type { Category } from './types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Indoor Plants',
    slug: 'indoor-plants',
    icon: Sprout,
    description: 'Thrives in indoor environments, perfect for homes and offices.',
    plants: [
      { id: 'p1', name: 'Snake Plant', type: 'Indoor Plant', price: 25.00, description: 'Known for its air-purifying qualities and low maintenance.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'snake plant', environment: 'indoor' },
      { id: 'p2', name: 'Monstera Deliciosa', type: 'Indoor Plant', price: 45.00, description: 'Iconic for its large, split leaves. A true statement plant.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'monstera plant', environment: 'indoor' },
      { id: 'p3', name: 'ZZ Plant', type: 'Indoor Plant', price: 30.00, description: 'Extremely drought-tolerant and can handle low light.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'zz plant', environment: 'indoor' },
    ]
  },
  {
    id: '2',
    name: 'Outdoor Plants',
    slug: 'outdoor-plants',
    icon: Leaf,
    description: 'Hardy plants that flourish in gardens, patios, and balconies.',
    plants: [
      { id: 'p4', name: 'Boxwood Shrub', type: 'Outdoor Plant', price: 55.00, description: 'A classic choice for hedges and topiaries.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'boxwood shrub', environment: 'outdoor' },
      { id: 'p5', name: 'Japanese Maple', type: 'Outdoor Plant', price: 150.00, description: 'Famous for its stunning foliage color that changes with the seasons.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'japanese maple', environment: 'outdoor' },
    ]
  },
  {
    id: '3',
    name: 'Flowering Plants',
    slug: 'flowering-plants',
    icon: Flower,
    description: 'Brings vibrant colors and delightful fragrances to any space.',
    plants: [
      { id: 'p6', name: 'Orchid', type: 'Flowering Plant', price: 35.00, description: 'Elegant and exotic, with long-lasting blooms.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'orchid flower', environment: 'indoor' },
      { id: 'p7', name: 'Rose Bush', type: 'Flowering Plant', price: 60.00, description: 'Timeless beauty with fragrant flowers.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'rose bush', environment: 'outdoor' },
      { id: 'p8', name: 'Peace Lily', type: 'Flowering Plant', price: 28.00, description: 'Features elegant white spathes and glossy green leaves.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'peace lily', environment: 'indoor' },
    ]
  },
  {
    id: '4',
    name: 'Trees & Shrubs',
    slug: 'trees-shrubs',
    icon: Trees,
    description: 'The foundational elements for creating structure and shade in your landscape.',
    plants: [
      { id: 'p9', name: 'Fiddle Leaf Fig Tree', type: 'Tree', price: 120.00, description: 'A popular indoor tree with large, violin-shaped leaves.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'fiddle leaf fig', environment: 'indoor' },
      { id: 'p10', name: 'Magnolia Tree', type: 'Tree', price: 200.00, description: 'Produces large, fragrant white blossoms in the spring.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'magnolia tree', environment: 'outdoor' },
      { id: 'p11', name: 'Hydrangea Shrub', type: 'Shrub', price: 75.00, description: 'Known for its large, beautiful clusters of flowers.', imageUrl: 'https://placehold.co/600x400.png', dataAiHint: 'hydrangea shrub', environment: 'outdoor' },
    ]
  },
];

export const allPlants = categories.flatMap(category => category.plants.map(plant => ({...plant, categorySlug: category.slug})));
