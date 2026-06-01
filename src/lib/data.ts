// Centralized tours/expeditions data
import merEmeraudeImg from '@/assets/excursions/mer-emeraude.webp';
import troisBaiesImg from '@/assets/excursions/trois-baies.webp';
import montagneAmbreImg from '@/assets/excursions/montagne-ambre.webp';
import tsingyRougesImg from '@/assets/excursions/tsingy-rouges.webp';
import ankarana from '@/assets/excursions/ankarana.webp';
import nosyIranjaImg from '@/assets/excursions/nosy-iranja.webp';
import lokobeImg from '@/assets/excursions/lokobe.webp';
import nosySakatiaImg from '@/assets/excursions/nosy-sakatia.webp';
import montfraImg from '@/assets/excursions/franc.webp';
import anivorano from '@/assets/excursions/lac.webp';
import haraImg from '@/assets/excursions/hara.webp';
import kombaImg from '@/assets/excursions/komba.webp';

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
  | 'lokobe'
  | 'nosySakatia';

export interface Tour {
  id: string;
  slug: string;
  image: string;
  titleKey: ExcursionKey;
  region: Region;
  location: string;
  featured?: boolean;
  altFr: string;
  altEn: string;
  altMg: string;
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
    altFr: 'Bateau traditionnel sur la Mer d\'Émeraude Diego-Suarez Madagascar',
    altEn: 'Traditional boat on the Emerald Sea Diego-Suarez Madagascar',
    altMg: 'Sambo nentim-paharazana ao amin\'ny Ranomasina Safira Diego-Suarez',
  },
  { 
    id: 'trois-baies', 
    slug: 'trois-baies',
    image: troisBaiesImg, 
    titleKey: 'troisBaies', 
    region: 'diego', 
    location: 'Diego-Suarez',
    altFr: 'Vue panoramique des Trois Baies Diego-Suarez Nord Madagascar',
    altEn: 'Panoramic view of the Three Bays Diego-Suarez Northern Madagascar',
    altMg: 'Fijery panoramika ny Helodrano Telo Diego-Suarez',
  },
  { 
    id: 'montagne-ambre', 
    slug: 'montagne-ambre',
    image: montagneAmbreImg, 
    titleKey: 'montagneAmbre', 
    region: 'diego', 
    location: 'Diego-Suarez',
    featured: true,
    altFr: 'Forêt tropicale et cascades Montagne d\'Ambre Madagascar',
    altEn: 'Tropical rainforest and waterfalls Amber Mountain Madagascar',
    altMg: 'Ala tropikaly sy riandrano Ambohitra Ambra Madagasikara',
  },
  { 
    id: 'tsingy-rouges', 
    slug: 'tsingy-rouges',
    image: tsingyRougesImg, 
    titleKey: 'tsingyRouges', 
    region: 'diego', 
    location: 'Diego-Suarez',
    featured: true,
    altFr: 'Formations géologiques Tsingy Rouges Diego-Suarez Madagascar',
    altEn: 'Red Tsingy geological formations Diego-Suarez Madagascar',
    altMg: 'Fananganana jeolojika Tsingy Mena Diego-Suarez',
  },
  { 
    id: 'ankarana', 
    slug: 'ankarana',
    image: ankarana, 
    titleKey: 'ankarana', 
    region: 'diego', 
    location: 'Diego-Suarez',
    altFr: 'Tsingy calcaires Massif de l\'Ankarana Nord Madagascar',
    altEn: 'Limestone Tsingy Ankarana Massif Northern Madagascar',
    altMg: 'Tsingy vato sokay Ankarana Avaratra Madagasikara',
  },
  { 
    id: 'nosy-hara', 
    slug: 'nosy-hara',
    image:haraImg,
    titleKey: 'nosyHara', 
    region: 'diego', 
    location: 'Diego-Suarez',
    altFr: 'Archipel Nosy Hara îlots calcaires bivouac luxe Madagascar',
    altEn: 'Nosy Hara Archipelago limestone islets luxury bivouac Madagascar',
    altMg: 'Nosy Hara nosy kely vato sokay bivouac de luxe',
  },
  { 
    id: 'lac-sacre', 
    slug: 'lac-sacre',
    image: anivorano,
    titleKey: 'lacSacre', 
    region: 'diego', 
    location: 'Anivorano',
    altFr: 'Lac Sacré d\'Anivorano crocodiles sacrés légende malgache',
    altEn: 'Sacred Lake of Anivorano sacred crocodiles Malagasy legend',
    altMg: 'Farihy Masina Anivorano voay masina angano malagasy',
  },
  { 
    id: 'montagne-francais', 
    slug: 'montagne-francais',
    image: montfraImg,
    titleKey: 'montagneFrancais', 
    region: 'diego', 
    location: 'Diego-Suarez',
    altFr: 'Trekking Montagne des Français vue baie Diego-Suarez',
    altEn: 'French Mountain trekking Diego-Suarez bay view',
    altMg: 'Fitsangatsanganana Tendrombohitra Frantsay fijery helodrano',
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
    altFr: 'Nosy Iranja banc de sable blanc îles jumelles Madagascar',
    altEn: 'Nosy Iranja white sandbank twin islands Madagascar',
    altMg: 'Nosy Iranja fasika fotsy nosy kambana Madagasikara',
  },
  { 
    id: 'nosy-tanikely', 
    slug: 'nosy-tanikely',
    image: kombaImg,
    titleKey: 'nosyTanikely', 
    region: 'nosybe', 
    location: 'Nosy Be',
    altFr: 'Réserve marine Nosy Tanikely snorkeling tortues Nosy Be',
    altEn: 'Nosy Tanikely marine reserve snorkeling turtles Nosy Be',
    altMg: 'Zaridaina an-dranomasina Nosy Tanikely snorkeling sokatra',
  },
  { 
    id: 'lokobe', 
    slug: 'lokobe',
    image: lokobeImg, 
    titleKey: 'lokobe', 
    region: 'nosybe', 
    location: 'Nosy Be',
    altFr: 'Réserve naturelle Lokobe forêt primaire lémuriens Nosy Be',
    altEn: 'Lokobe Nature Reserve primary forest lemurs Nosy Be',
    altMg: 'Zaridaina voajanahary Lokobe ala voalohany gidro Nosy Be',
  },
  { 
    id: 'nosy-sakatia', 
    slug: 'nosy-sakatia',
    image: nosySakatiaImg, 
    titleKey: 'nosySakatia', 
    region: 'nosybe', 
    location: 'Nosy Be',
    featured: true,
    altFr: 'Snorkeling tortues vertes Nosy Sakatia île aux orchidées Madagascar',
    altEn: 'Green sea turtle snorkeling Nosy Sakatia orchid island Madagascar',
    altMg: 'Snorkeling sokatra maitso Nosy Sakatia nosy orkide Madagasikara',
  },
];

// Helper functions
export const getFeaturedTours = () => tours.filter(tour => tour.featured);
export const getToursByRegion = (region: Region) => tours.filter(tour => tour.region === region);
export const getTourBySlug = (slug: string) => tours.find(tour => tour.slug === slug);
export const getTourById = (id: string) => tours.find(tour => tour.id === id);

// Hero image for fallback
export const heroBackgroundImage = merEmeraudeImg;
