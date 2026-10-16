import { CategoryInfo, CategorySlug } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: 'womens-western-wear',
    name: "Women's Western Wear",
    shortName: 'Women',
    tagline: 'Effortless chic silhouettes crafted for every moment',
    description: 'Explore signature western ensembles blending contemporary runway trends with all-day comfort. Featuring modern blazers, jumpsuits, evening wear, and curated styling staples.',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
    badge: 'Trending Collection'
  },
  {
    slug: 'dresses-co-ord-sets',
    name: 'Dresses & Co-ord Sets',
    shortName: 'Dresses & Sets',
    tagline: 'Head-to-toe statement looks made effortless',
    description: 'From breezy daytime sundresses to coordinated matching sets, bodycon silhouettes, and fluid satin midi dresses designed to turn heads.',
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1200&auto=format&fit=crop',
    badge: 'Best Sellers'
  },
  {
    slug: 'shirts-tops',
    name: 'Shirts & Tops',
    shortName: 'Shirts & Tops',
    tagline: 'Versatile blouses, crop tops, and crisp tailored shirts',
    description: 'Elevate your everyday wardrobe with satin wrap tops, crisp oversized poplin shirts, corset-inspired silhouettes, and romantic puff-sleeve blouses.',
    imageUrl: 'https://images.unsplash.com/photo-1534126511673-b6899657816a?q=80&w=1200&auto=format&fit=crop',
    badge: 'New Styles'
  },
  {
    slug: 'jeans-trousers',
    name: 'Jeans & Trousers',
    shortName: 'Bottoms',
    tagline: 'Flattering high-waist fits and tailored trousers',
    description: 'Wide-leg denims, pleated straight-leg trousers, cargo pants, and sleek cigarette cuts designed with stretch and supreme comfort.',
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop',
    badge: 'Popular Fits'
  },
  {
    slug: 't-shirts',
    name: 'T-shirts',
    shortName: 'T-Shirts',
    tagline: 'Premium combed cotton graphic & minimal tees',
    description: 'Ultra-soft, breathable everyday tees with aesthetic typography, drop-shoulder fits, and ribbed collars built for effortless casual styling.',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop',
    badge: 'Must-Haves'
  },
  {
    slug: 'jackets-winter-wear',
    name: 'Jackets & Winter Wear',
    shortName: 'Winter Wear',
    tagline: 'Cozy layers, cropped bombers, and structured blazers',
    description: 'Stay effortlessly stylish as the temperature drops. Discover structured blazers, vegan leather moto jackets, cropped corduroy jackets, and lightweight trench coats.',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1200&auto=format&fit=crop',
    badge: 'Season Special'
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    shortName: 'Accessories',
    tagline: 'The finishing touches that define your aesthetic',
    description: 'Sculpted metal earrings, minimalist vegan leather bags, statement belts, and sunglasses that tie your complete western aesthetic together.',
    imageUrl: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=1200&auto=format&fit=crop',
    badge: 'Accents'
  }
];

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return CATEGORIES.find(c => c.slug === slug);
}
