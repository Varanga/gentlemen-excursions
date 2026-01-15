// Centralized tours/expeditions data
import merEmeraudeImg from '@/assets/excursions/mer-emeraude.jpg';
import troisBaiesImg from '@/assets/excursions/trois-baies.jpg';
import montagneAmbreImg from '@/assets/excursions/montagne-ambre.jpg';
import tsingyRougesImg from '@/assets/excursions/tsingy-rouges.jpg';
import ankarana from '@/assets/excursions/ankarana.jpg';
import nosyIranjaImg from '@/assets/excursions/nosy-iranja.jpg';
import lokobeImg from '@/assets/excursions/lokobe.jpg';
import heroImage from '@/assets/hero-madagascar.jpg';

export type Region = 'diego' | 'nosybe' | 'circuits';

export type ExcursionKey = 
  | 'merEmeraude' 
  | 'troisBaies' 
  | 'montagneAmbre' 
  | 'tsingyRouges' 
  | 'ankarana' 
  | 'nosyHara' 
  | 'lacSacre' 
  | 'montagneFrancais' 
  | 'nosyIranja' 
  | 'nosyTanikely' 
  | 'lokobe';

export interface Tour {
  id: string;
  slug: string;
  image: string;
  titleKey: ExcursionKey;
  region: Region;
  location: string;
  featured?: boolean;
}

// Complete catalog of 13 expeditions
export const tours: Tour[] = [
  // Diego-Suarez Region
  { 
    id: 'mer-emeraude', 
    slug: 'mer-emeraude',
    image: merEmeraudeImg, 
    titleKey: 'merEmeraude', 
    region: 'diego', 
    location: 'Diego-Suarez',
    featured: true,
  },
  { 
    id: 'trois-baies', 
    slug: 'trois-baies',
    image: troisBaiesImg, 
    titleKey: 'troisBaies', 
    region: 'diego', 
    location: 'Diego-Suarez',
  },
  { 
    id: 'montagne-ambre', 
    slug: 'montagne-ambre',
    image: montagneAmbreImg, 
    titleKey: 'montagneAmbre', 
    region: 'diego', 
    location: 'Diego-Suarez',
    featured: true,
  },
  { 
    id: 'tsingy-rouges', 
    slug: 'tsingy-rouges',
    image: tsingyRougesImg, 
    titleKey: 'tsingyRouges', 
    region: 'diego', 
    location: 'Diego-Suarez',
    featured: true,
  },
  { 
    id: 'ankarana', 
    slug: 'ankarana',
    image: ankarana, 
    titleKey: 'ankarana', 
    region: 'diego', 
    location: 'Diego-Suarez',
  },
  { 
    id: 'nosy-hara', 
    slug: 'nosy-hara',
    image: merEmeraudeImg, // TODO: Replace with specific image
    titleKey: 'nosyHara', 
    region: 'diego', 
    location: 'Diego-Suarez',
  },
  { 
    id: 'lac-sacre', 
    slug: 'lac-sacre',
    image: lokobeImg, // TODO: Replace with specific image
    titleKey: 'lacSacre', 
    region: 'diego', 
    location: 'Anivorano',
  },
  { 
    id: 'montagne-francais', 
    slug: 'montagne-francais',
    image: troisBaiesImg, // TODO: Replace with specific image
    titleKey: 'montagneFrancais', 
    region: 'diego', 
    location: 'Diego-Suarez',
  },
  // Nosy Be Region
  { 
    id: 'nosy-iranja', 
    slug: 'nosy-iranja',
    image: nosyIranjaImg, 
    titleKey: 'nosyIranja', 
    region: 'nosybe', 
    location: 'Nosy Be',
    featured: true,
  },
  { 
    id: 'nosy-tanikely', 
    slug: 'nosy-tanikely',
    image: merEmeraudeImg, // TODO: Replace with specific image
    titleKey: 'nosyTanikely', 
    region: 'nosybe', 
    location: 'Nosy Be',
  },
  { 
    id: 'lokobe', 
    slug: 'lokobe',
    image: lokobeImg, 
    titleKey: 'lokobe', 
    region: 'nosybe', 
    location: 'Nosy Be',
  },
];

// Helper functions
export const getFeaturedTours = () => tours.filter(tour => tour.featured);
export const getToursByRegion = (region: Region) => tours.filter(tour => tour.region === region);
export const getTourBySlug = (slug: string) => tours.find(tour => tour.slug === slug);
export const getTourById = (id: string) => tours.find(tour => tour.id === id);

// Hero image for fallback
export const heroBackgroundImage = heroImage;
