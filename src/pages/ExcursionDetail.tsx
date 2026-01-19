import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, CircleDot, MapPin, Clock, Users, ChevronLeft, ChevronRight, 
  X, Check, XCircle, Star, Mail, ChevronDown, Lightbulb, Award
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import FloatingBackButton from '@/components/FloatingBackButton';
import { tours, getTourBySlug } from '@/lib/data';
import { SEO, generateTourSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { getExcursionFAQs } from '@/lib/faqData';

// Import images
import merEmeraudeImg from '@/assets/excursions/mer-emeraude.jpg';
import troisBaiesImg from '@/assets/excursions/trois-baies.jpg';
import montagneAmbreImg from '@/assets/excursions/montagne-ambre.jpg';
import tsingyRougesImg from '@/assets/excursions/tsingy-rouges.jpg';
import ankarana from '@/assets/excursions/ankarana.jpg';
import nosyIranjaImg from '@/assets/excursions/nosy-iranja.jpg';
import lokobeImg from '@/assets/excursions/lokobe.jpg';
import nosySakatiaImg from '@/assets/excursions/nosy-sakatia.jpg';
import heroImage from '@/assets/hero-madagascar.jpg';

type ExcursionKey = 'merEmeraude' | 'troisBaies' | 'montagneAmbre' | 'tsingyRouges' | 'ankarana' | 'nosyHara' | 'lacSacre' | 'montagneFrancais' | 'nosyIranja' | 'nosyTanikely' | 'lokobe' | 'nosySakatia';

interface ExcursionData {
  id: string;
  key: ExcursionKey;
  images: string[];
  location: string;
  region: string;
  includedFr: string[];
  includedEn: string[];
  includedMg: string[];
  notIncludedFr: string[];
  notIncludedEn: string[];
  notIncludedMg: string[];
  programFr: { time: string; activity: string }[];
  programEn: { time: string; activity: string }[];
  programMg: { time: string; activity: string }[];
  maxParticipants: number;
  guideTipFr?: string;
  guideTipEn?: string;
  guideTipMg?: string;
}

const excursionsData: ExcursionData[] = [
  {
    id: 'mer-emeraude',
    key: 'merEmeraude',
    images: [merEmeraudeImg, heroImage, troisBaiesImg],
    location: 'Diego-Suarez',
    region: 'Nord Madagascar',
    includedFr: ['Transport en 4x4 climatisé', 'Guide francophone certifié', 'Déjeuner gastronomique sur la plage', 'Équipement snorkeling premium', 'Boissons fraîches illimitées', 'Taxes de parcs'],
    includedEn: ['Air-conditioned 4x4 transport', 'Certified French-speaking guide', 'Gourmet beach lunch', 'Premium snorkeling equipment', 'Unlimited refreshments', 'Park fees'],
    includedMg: ['Fitaterana 4x4 misy climatisation', 'Mpitarika miteny frantsay voamarina', 'Sakafo atoandro matsiro eny amoron-dranomasina', 'Fitaovana snorkeling ambony', 'Zava-pisotro mangatsiaka tsy voafetra', 'Hetra parc'],
    notIncludedFr: ['Pourboires', 'Dépenses personnelles', 'Boissons alcoolisées'],
    notIncludedEn: ['Tips', 'Personal expenses', 'Alcoholic beverages'],
    notIncludedMg: ['Pourboires', 'Fandaniana manokana', 'Zava-pisotro misy alikaola'],
    programFr: [
      { time: 'Départ', activity: 'Prise en charge à votre hôtel en 4x4 climatisé, direction Ramena' },
      { time: 'Matinée', activity: 'Embarquement en boutre traditionnel vers la Mer d\'Émeraude' },
      { time: 'Mi-journée', activity: 'Découverte des eaux turquoise, baignade sur un banc de sable immaculé' },
      { time: 'Midi', activity: 'Festin de fruits de mer frais préparé par notre équipe sur une île déserte' },
      { time: 'Après-midi', activity: 'Session snorkeling dans les eaux cristallines, observation des poissons tropicaux' },
      { time: 'Coucher du soleil', activity: 'Navigation paisible vers Ramena avec vue sur le soleil couchant' },
      { time: 'Retour', activity: 'Transfert confortable jusqu\'à votre hébergement' },
    ],
    programEn: [
      { time: 'Departure', activity: 'Pick-up from your hotel in air-conditioned 4x4, heading to Ramena' },
      { time: 'Morning', activity: 'Boarding a traditional dhow towards the Emerald Sea' },
      { time: 'Mid-morning', activity: 'Discovery of turquoise waters, swimming on an immaculate sandbank' },
      { time: 'Noon', activity: 'Fresh seafood feast prepared by our team on a desert island' },
      { time: 'Afternoon', activity: 'Snorkeling session in crystal-clear waters, tropical fish observation' },
      { time: 'Sunset', activity: 'Peaceful navigation back to Ramena with sunset views' },
      { time: 'Return', activity: 'Comfortable transfer to your accommodation' },
    ],
    programMg: [
      { time: 'Fiaingana', activity: 'Fanaovana anao ao amin\'ny hotelinao amin\'ny 4x4 misy climatisation' },
      { time: 'Maraina', activity: 'Fiakaran-tsambo nentim-paharazana mankany amin\'ny Ranomasina Safira' },
      { time: 'Antenantenan\'ny maraina', activity: 'Fahitana rano manga, filomanosana eny ambony fasika fotsy' },
      { time: 'Atoandro', activity: 'Sakafo hazan-dranomasina vaovao nomanin\'ny ekipanay' },
      { time: 'Tolakandro', activity: 'Snorkeling anaty rano kristaly, fijerena trondro tropikaly' },
      { time: 'Filentehan\'ny masoandro', activity: 'Fiverenana mankany Ramena miaraka amin\'ny fijerena ny masoandro' },
      { time: 'Fiverenana', activity: 'Fitaterana mankany amin\'ny toerana hipetrakao' },
    ],
    maxParticipants: 12,
    guideTipFr: 'Partez tôt le matin pour profiter de la lumière parfaite et des eaux calmes avant l\'arrivée des autres visiteurs.',
    guideTipEn: 'Leave early in the morning to enjoy perfect light and calm waters before other visitors arrive.',
    guideTipMg: 'Miala maraina be mba hisitraka ny hazavana tsara sy ny rano tony.',
  },
  {
    id: 'trois-baies',
    key: 'troisBaies',
    images: [troisBaiesImg, merEmeraudeImg, heroImage],
    location: 'Diego-Suarez',
    region: 'Nord Madagascar',
    includedFr: ['Transport en 4x4 privé', 'Guide local expert', 'Déjeuner traditionnel', 'Entrées aux sites', 'Rafraîchissements', 'Taxes de parcs'],
    includedEn: ['Private 4x4 transport', 'Expert local guide', 'Traditional lunch', 'Site entrance fees', 'Refreshments', 'Park fees'],
    includedMg: ['Fitaterana 4x4 manokana', 'Mpitarika eo an-toerana', 'Sakafo atoandro nentim-paharazana', 'Saran-dalana', 'Zava-pisotro', 'Hetra parc'],
    notIncludedFr: ['Pourboires', 'Boissons supplémentaires'],
    notIncludedEn: ['Tips', 'Additional beverages'],
    notIncludedMg: ['Pourboires', 'Zava-pisotro fanampiny'],
    programFr: [
      { time: 'Départ', activity: 'Prise en charge à votre hôtel en 4x4 confortable' },
      { time: 'Première escale', activity: 'Découverte de la Baie des Dunes et ses plages sauvages' },
      { time: 'Matinée', activity: 'Exploration de la Baie des Pigeons, baignade dans les eaux paisibles' },
      { time: 'Midi', activity: 'Déjeuner authentique chez une famille de pêcheurs' },
      { time: 'Après-midi', activity: 'Baie des Sakalava : snorkeling et farniente sur le sable doré' },
      { time: 'Fin de journée', activity: 'Retour panoramique vers Diego-Suarez' },
    ],
    programEn: [
      { time: 'Departure', activity: 'Pick-up from your hotel in comfortable 4x4' },
      { time: 'First stop', activity: 'Discovery of the Bay of Dunes and its wild beaches' },
      { time: 'Morning', activity: 'Exploration of Pigeon Bay, swimming in peaceful waters' },
      { time: 'Noon', activity: 'Authentic lunch with a fisherman\'s family' },
      { time: 'Afternoon', activity: 'Sakalava Bay: snorkeling and relaxation on golden sand' },
      { time: 'End of day', activity: 'Panoramic return to Diego-Suarez' },
    ],
    programMg: [
      { time: 'Fiaingana', activity: 'Fanaovana anao ao amin\'ny hotelinao amin\'ny 4x4' },
      { time: 'Fijanonana voalohany', activity: 'Fahitana ny Helodranon\'ny Fasika sy ny moron-dranomasina' },
      { time: 'Maraina', activity: 'Fikarohana ny Helodranon\'ny Voromailala' },
      { time: 'Atoandro', activity: 'Sakafo atoandro ao amin\'ny fianakavian\'ny mpanjono' },
      { time: 'Tolakandro', activity: 'Helodrano Sakalava: snorkeling sy fitsaharana' },
      { time: 'Fiafaran\'ny andro', activity: 'Fiverenana any Diego-Suarez' },
    ],
    maxParticipants: 10,
    guideTipFr: 'Apportez vos chaussures d\'eau pour explorer confortablement les rochers des trois baies.',
    guideTipEn: 'Bring your water shoes to comfortably explore the rocks of the three bays.',
    guideTipMg: 'Mitondra kiraro rano mba hikaroka ny vato amin\'ny helodrano telo.',
  },
  {
    id: 'montagne-ambre',
    key: 'montagneAmbre',
    images: [montagneAmbreImg, lokobeImg, heroImage],
    location: 'Diego-Suarez',
    region: 'Nord Madagascar',
    includedFr: ['Transport en 4x4 privé', 'Guide naturaliste certifié', 'Droits d\'entrée au parc', 'Pique-nique gourmet', 'Rafraîchissements', 'Taxes de parcs'],
    includedEn: ['Private 4x4 transport', 'Certified naturalist guide', 'Park entrance fees', 'Gourmet picnic', 'Refreshments', 'Park fees'],
    includedMg: ['Fitaterana 4x4 manokana', 'Mpitarika naturalista', 'Saran-dalana parc', 'Pique-nique matsiro', 'Zava-pisotro', 'Hetra parc'],
    notIncludedFr: ['Pourboires', 'Équipement photo'],
    notIncludedEn: ['Tips', 'Photography equipment'],
    notIncludedMg: ['Pourboires', 'Fitaovana sary'],
    programFr: [
      { time: 'Aube', activity: 'Départ matinal pour profiter de la fraîcheur de la forêt' },
      { time: 'Arrivée', activity: 'Entrée dans le Parc National de la Montagne d\'Ambre' },
      { time: 'Matinée', activity: 'Randonnée à travers la forêt primaire vers les cascades majestueuses' },
      { time: 'Exploration', activity: 'Observation des lémuriens, caméléons et orchidées endémiques' },
      { time: 'Midi', activity: 'Pique-nique gourmet au bord du Lac Vert' },
      { time: 'Après-midi', activity: 'Visite du Lac Sacré et de ses formations volcaniques' },
      { time: 'Retour', activity: 'Descente tranquille vers Diego-Suarez' },
    ],
    programEn: [
      { time: 'Dawn', activity: 'Early departure to enjoy the cool forest air' },
      { time: 'Arrival', activity: 'Entry into Amber Mountain National Park' },
      { time: 'Morning', activity: 'Hike through primary forest to majestic waterfalls' },
      { time: 'Exploration', activity: 'Observation of lemurs, chameleons and endemic orchids' },
      { time: 'Noon', activity: 'Gourmet picnic by the Green Lake' },
      { time: 'Afternoon', activity: 'Visit to the Sacred Lake and volcanic formations' },
      { time: 'Return', activity: 'Peaceful descent to Diego-Suarez' },
    ],
    programMg: [
      { time: 'Vao maraina', activity: 'Fiaingana maraina mba hisitraka ny hatsiaka' },
      { time: 'Fahatongavana', activity: 'Fidirana ao amin\'ny Parc Nasionalin\'ny Ambohitra' },
      { time: 'Maraina', activity: 'Fitsangatsanganana ao anaty ala mankany amin\'ny riandrano' },
      { time: 'Fikarohana', activity: 'Fijerena gidro, tana ary orkide tsy fahita' },
      { time: 'Atoandro', activity: 'Pique-nique akaikin\'ny Farihy Maitso' },
      { time: 'Tolakandro', activity: 'Fitsidihana ny Farihy Masina' },
      { time: 'Fiverenana', activity: 'Fidinana mankany Diego-Suarez' },
    ],
    maxParticipants: 8,
    guideTipFr: 'La brume matinale offre les meilleures conditions pour observer les caméléons encore endormis sur les branches.',
    guideTipEn: 'Morning mist offers the best conditions to spot chameleons still sleeping on branches.',
    guideTipMg: 'Ny zavona maraina no fotoana tsara indrindra hijerena ny tana mbola matory.',
  },
  {
    id: 'tsingy-rouges',
    key: 'tsingyRouges',
    images: [tsingyRougesImg, montagneAmbreImg, heroImage],
    location: 'Diego-Suarez',
    region: 'Nord Madagascar',
    includedFr: ['Transport en 4x4 privé', 'Guide local expert', 'Droits d\'entrée', 'Rafraîchissements', 'Taxes de parcs'],
    includedEn: ['Private 4x4 transport', 'Expert local guide', 'Entrance fees', 'Refreshments', 'Park fees'],
    includedMg: ['Fitaterana 4x4 manokana', 'Mpitarika eo an-toerana', 'Saran-dalana', 'Zava-pisotro', 'Hetra parc'],
    notIncludedFr: ['Déjeuner', 'Pourboires'],
    notIncludedEn: ['Lunch', 'Tips'],
    notIncludedMg: ['Sakafo atoandro', 'Pourboires'],
    programFr: [
      { time: 'Départ', activity: 'Route panoramique à travers la campagne malgache' },
      { time: 'Arrivée', activity: 'Découverte des spectaculaires formations de latérite rouge' },
      { time: 'Exploration', activity: 'Visite guidée des Tsingy Rouges, cathédrales de terre sculptées par l\'érosion' },
      { time: 'Contemplation', activity: 'Temps libre pour photos et admiration du paysage lunaire' },
      { time: 'Option déjeuner', activity: 'Pause dans un restaurant local (non inclus)' },
      { time: 'Retour', activity: 'Retour vers Diego-Suarez' },
    ],
    programEn: [
      { time: 'Departure', activity: 'Scenic drive through the Malagasy countryside' },
      { time: 'Arrival', activity: 'Discovery of the spectacular red laterite formations' },
      { time: 'Exploration', activity: 'Guided tour of the Red Tsingy, earth cathedrals sculpted by erosion' },
      { time: 'Contemplation', activity: 'Free time for photos and admiration of the lunar landscape' },
      { time: 'Lunch option', activity: 'Break at a local restaurant (not included)' },
      { time: 'Return', activity: 'Return to Diego-Suarez' },
    ],
    programMg: [
      { time: 'Fiaingana', activity: 'Lalana mahafinaritra mamakivaky ny tanàna Malagasy' },
      { time: 'Fahatongavana', activity: 'Fahitana ny fananganana mena mahagaga' },
      { time: 'Fikarohana', activity: 'Fitsidihana ny Tsingy Mena nosoratana erosion' },
      { time: 'Fijerena', activity: 'Fotoana malalaka ho an\'ny sary' },
      { time: 'Safidy sakafo', activity: 'Fijanonana ao amin\'ny restaurant eo an-toerana' },
      { time: 'Fiverenana', activity: 'Fiverenana any Diego-Suarez' },
    ],
    maxParticipants: 15,
    guideTipFr: 'Les couleurs des Tsingy sont les plus vibrantes en fin d\'après-midi, quand le soleil est bas.',
    guideTipEn: 'The Tsingy colors are most vibrant in late afternoon when the sun is low.',
    guideTipMg: 'Ny lokon\'ny Tsingy dia marevaka indrindra amin\'ny tolakandro.',
  },
  {
    id: 'ankarana',
    key: 'ankarana',
    images: [ankarana, tsingyRougesImg, heroImage],
    location: 'Diego-Suarez',
    region: 'Nord Madagascar',
    includedFr: ['Transport en 4x4 privé', 'Guide naturaliste', 'Droits d\'entrée', 'Hébergement en lodge', 'Repas complets', 'Équipement spéléo', 'Taxes de parcs'],
    includedEn: ['Private 4x4 transport', 'Naturalist guide', 'Entrance fees', 'Lodge accommodation', 'Full board meals', 'Caving equipment', 'Park fees'],
    includedMg: ['Fitaterana 4x4 manokana', 'Mpitarika naturalista', 'Saran-dalana', 'Trano fandraisam-bahiny', 'Sakafo feno', 'Fitaovana spéléo', 'Hetra parc'],
    notIncludedFr: ['Boissons alcoolisées', 'Pourboires'],
    notIncludedEn: ['Alcoholic beverages', 'Tips'],
    notIncludedMg: ['Zava-pisotro misy alikaola', 'Pourboires'],
    programFr: [
      { time: 'Jour 1 - Matin', activity: 'Départ de Diego vers le Massif de l\'Ankarana' },
      { time: 'Jour 1 - Midi', activity: 'Installation au lodge et déjeuner panoramique' },
      { time: 'Jour 1 - Après-midi', activity: 'Randonnée vers les Petits Tsingy, observation des lémuriens' },
      { time: 'Jour 1 - Soir', activity: 'Dîner au lodge, ciel étoilé' },
      { time: 'Jour 2 - Aube', activity: 'Exploration des Grands Tsingy au lever du soleil' },
      { time: 'Jour 2 - Matinée', activity: 'Descente dans les grottes calcaires, rivières souterraines' },
      { time: 'Jour 2 - Après-midi', activity: 'Retour à Diego-Suarez' },
    ],
    programEn: [
      { time: 'Day 1 - Morning', activity: 'Departure from Diego to the Ankarana Massif' },
      { time: 'Day 1 - Noon', activity: 'Check-in at the lodge and panoramic lunch' },
      { time: 'Day 1 - Afternoon', activity: 'Hike to the Small Tsingy, lemur observation' },
      { time: 'Day 1 - Evening', activity: 'Dinner at the lodge, stargazing' },
      { time: 'Day 2 - Dawn', activity: 'Exploration of the Grand Tsingy at sunrise' },
      { time: 'Day 2 - Morning', activity: 'Descent into limestone caves, underground rivers' },
      { time: 'Day 2 - Afternoon', activity: 'Return to Diego-Suarez' },
    ],
    programMg: [
      { time: 'Andro 1 - Maraina', activity: 'Fiaingana avy Diego mankany Ankarana' },
      { time: 'Andro 1 - Atoandro', activity: 'Fipetrahan\'ao amin\'ny lodge' },
      { time: 'Andro 1 - Tolakandro', activity: 'Fitsangatsanganana any amin\'ny Tsingy Kely' },
      { time: 'Andro 1 - Hariva', activity: 'Sakafo hariva ao amin\'ny lodge' },
      { time: 'Andro 2 - Vao maraina', activity: 'Fikarohana ny Tsingy Lehibe' },
      { time: 'Andro 2 - Maraina', activity: 'Fidinana ao anaty zohy' },
      { time: 'Andro 2 - Tolakandro', activity: 'Fiverenana any Diego-Suarez' },
    ],
    maxParticipants: 6,
    guideTipFr: 'Prévoyez des vêtements légers mais couvrants pour protéger du soleil sur les Tsingy calcaires.',
    guideTipEn: 'Pack light but covering clothes to protect from the sun on the limestone Tsingy.',
    guideTipMg: 'Mitondra akanjo maivana fa manarona mba hiarovana amin\'ny masoandro.',
  },
  {
    id: 'nosy-hara',
    key: 'nosyHara',
    images: [merEmeraudeImg, nosyIranjaImg, heroImage],
    location: 'Diego-Suarez',
    region: 'Nord Madagascar',
    includedFr: ['Transport en bateau rapide', 'Guide expérimenté', 'Bivouac de luxe', 'Repas gastronomiques', 'Équipement snorkeling', 'Kayaks', 'Taxes de parcs'],
    includedEn: ['Speed boat transport', 'Experienced guide', 'Luxury bivouac', 'Gourmet meals', 'Snorkeling equipment', 'Kayaks', 'Park fees'],
    includedMg: ['Fitaterana sambo haingana', 'Mpitarika manan-traikefa', 'Bivouac de luxe', 'Sakafo matsiro', 'Fitaovana snorkeling', 'Kayak', 'Hetra parc'],
    notIncludedFr: ['Boissons alcoolisées', 'Assurance voyage', 'Pourboires'],
    notIncludedEn: ['Alcoholic beverages', 'Travel insurance', 'Tips'],
    notIncludedMg: ['Zava-pisotro misy alikaola', 'Fiantohana dia', 'Pourboires'],
    programFr: [
      { time: 'Jour 1 - Aube', activity: 'Départ en bateau rapide vers l\'archipel' },
      { time: 'Jour 1 - Matinée', activity: 'Arrivée à Nosy Hara, installation du camp de luxe' },
      { time: 'Jour 1 - Après-midi', activity: 'Exploration des Tsingy marins et baignade' },
      { time: 'Jour 1 - Soir', activity: 'Dîner gastronomique sous les étoiles, nuit en bivouac' },
      { time: 'Jour 2 - Matinée', activity: 'Kayak autour des îlots calcaires' },
      { time: 'Jour 2 - Midi', activity: 'Snorkeling dans les eaux cristallines, déjeuner sur l\'île' },
      { time: 'Jour 2 - Après-midi', activity: 'Navigation paisible vers Diego-Suarez' },
    ],
    programEn: [
      { time: 'Day 1 - Dawn', activity: 'Departure by speed boat to the archipelago' },
      { time: 'Day 1 - Morning', activity: 'Arrival at Nosy Hara, luxury camp setup' },
      { time: 'Day 1 - Afternoon', activity: 'Exploration of marine Tsingy and swimming' },
      { time: 'Day 1 - Evening', activity: 'Gourmet dinner under the stars, overnight in bivouac' },
      { time: 'Day 2 - Morning', activity: 'Kayaking around limestone islets' },
      { time: 'Day 2 - Noon', activity: 'Snorkeling in crystal-clear waters, island lunch' },
      { time: 'Day 2 - Afternoon', activity: 'Peaceful navigation to Diego-Suarez' },
    ],
    programMg: [
      { time: 'Andro 1 - Vao maraina', activity: 'Fiaingana amin\'ny sambo haingana' },
      { time: 'Andro 1 - Maraina', activity: 'Fahatongavana ao Nosy Hara, fananganana toby' },
      { time: 'Andro 1 - Tolakandro', activity: 'Fikarohana ny Tsingy an-dranomasina' },
      { time: 'Andro 1 - Hariva', activity: 'Sakafo hariva matsiro ambany kintana' },
      { time: 'Andro 2 - Maraina', activity: 'Kayak manodidina ny nosy kely' },
      { time: 'Andro 2 - Atoandro', activity: 'Snorkeling anaty rano kristaly' },
      { time: 'Andro 2 - Tolakandro', activity: 'Fiverenana any Diego-Suarez' },
    ],
    maxParticipants: 8,
    guideTipFr: 'L\'archipel est un sanctuaire de biodiversité - préparez-vous à observer des espèces marines rares.',
    guideTipEn: 'The archipelago is a biodiversity sanctuary - prepare to observe rare marine species.',
    guideTipMg: 'Ny nosy dia toerana masina ho an\'ny zava-manan\'aina - miomana hijerena karazana harena an-dranomasina.',
  },
  {
    id: 'lac-sacre',
    key: 'lacSacre',
    images: [lokobeImg, montagneAmbreImg, heroImage],
    location: 'Anivorano',
    region: 'Nord Madagascar',
    includedFr: ['Transport en 4x4 privé', 'Guide local expert', 'Offrandes traditionnelles', 'Rafraîchissements', 'Taxes de parcs'],
    includedEn: ['Private 4x4 transport', 'Expert local guide', 'Traditional offerings', 'Refreshments', 'Park fees'],
    includedMg: ['Fitaterana 4x4 manokana', 'Mpitarika eo an-toerana', 'Fanatitra nentim-paharazana', 'Zava-pisotro', 'Hetra parc'],
    notIncludedFr: ['Pourboires', 'Dépenses personnelles'],
    notIncludedEn: ['Tips', 'Personal expenses'],
    notIncludedMg: ['Pourboires', 'Fandaniana manokana'],
    programFr: [
      { time: 'Départ', activity: 'Route vers Anivorano à travers les villages traditionnels' },
      { time: 'Arrivée', activity: 'Accueil par le gardien sacré du lac' },
      { time: 'Cérémonie', activity: 'Participation à la cérémonie traditionnelle d\'offrandes' },
      { time: 'Découverte', activity: 'Observation des crocodiles sacrés dans leur habitat naturel' },
      { time: 'Légendes', activity: 'Récits des légendes ancestrales par le gardien' },
      { time: 'Retour', activity: 'Retour vers Diego-Suarez' },
    ],
    programEn: [
      { time: 'Departure', activity: 'Road to Anivorano through traditional villages' },
      { time: 'Arrival', activity: 'Welcome by the sacred lake guardian' },
      { time: 'Ceremony', activity: 'Participation in traditional offering ceremony' },
      { time: 'Discovery', activity: 'Observation of sacred crocodiles in their natural habitat' },
      { time: 'Legends', activity: 'Ancestral legends told by the guardian' },
      { time: 'Return', activity: 'Return to Diego-Suarez' },
    ],
    programMg: [
      { time: 'Fiaingana', activity: 'Lalana mankany Anivorano mamakivaky ny tanàna' },
      { time: 'Fahatongavana', activity: 'Fandraisana avy amin\'ny mpiambina ny farihy' },
      { time: 'Fombafomba', activity: 'Fandraisana anjara amin\'ny fanatitra nentim-paharazana' },
      { time: 'Fahitana', activity: 'Fijerena ny voay masina ao amin\'ny toerana misy azy' },
      { time: 'Angano', activity: 'Tantara sy angano nataon\'ny mpiambina' },
      { time: 'Fiverenana', activity: 'Fiverenana any Diego-Suarez' },
    ],
    maxParticipants: 15,
    guideTipFr: 'Respectez les traditions locales : les crocodiles sont sacrés et ne doivent jamais être dérangés.',
    guideTipEn: 'Respect local traditions: the crocodiles are sacred and should never be disturbed.',
    guideTipMg: 'Hajao ny fomba eto an-toerana: masina ny voay ary tsy tokony hanakorontanana.',
  },
  {
    id: 'montagne-francais',
    key: 'montagneFrancais',
    images: [troisBaiesImg, tsingyRougesImg, heroImage],
    location: 'Diego-Suarez',
    region: 'Nord Madagascar',
    includedFr: ['Transport en 4x4 privé', 'Guide local expert', 'Rafraîchissements', 'En-cas énergétique', 'Taxes de parcs'],
    includedEn: ['Private 4x4 transport', 'Expert local guide', 'Refreshments', 'Energy snacks', 'Park fees'],
    includedMg: ['Fitaterana 4x4 manokana', 'Mpitarika eo an-toerana', 'Zava-pisotro', 'Sakafo maivana', 'Hetra parc'],
    notIncludedFr: ['Pourboires', 'Équipement de randonnée'],
    notIncludedEn: ['Tips', 'Hiking equipment'],
    notIncludedMg: ['Pourboires', 'Fitaovana fitsangatsanganana'],
    programFr: [
      { time: 'Aube', activity: 'Départ très tôt pour profiter de la fraîcheur matinale' },
      { time: 'Arrivée', activity: 'Début de l\'ascension au pied de la montagne' },
      { time: 'Montée', activity: 'Randonnée à travers la forêt de baobabs endémiques' },
      { time: 'Sommet', activity: 'Vue panoramique époustouflante sur la baie de Diego' },
      { time: 'Contemplation', activity: 'Temps libre pour photos et admiration du paysage' },
      { time: 'Descente', activity: 'Retour par un sentier différent' },
      { time: 'Fin de matinée', activity: 'Retour à Diego-Suarez' },
    ],
    programEn: [
      { time: 'Dawn', activity: 'Very early departure to enjoy morning freshness' },
      { time: 'Arrival', activity: 'Start of the ascent at the foot of the mountain' },
      { time: 'Climb', activity: 'Hike through endemic baobab forest' },
      { time: 'Summit', activity: 'Breathtaking panoramic view of Diego Bay' },
      { time: 'Contemplation', activity: 'Free time for photos and landscape admiration' },
      { time: 'Descent', activity: 'Return via a different trail' },
      { time: 'Late morning', activity: 'Return to Diego-Suarez' },
    ],
    programMg: [
      { time: 'Vao maraina', activity: 'Fiaingana maraina be mba hisitraka ny hatsiaka' },
      { time: 'Fahatongavana', activity: 'Fanombohana ny fiakarana' },
      { time: 'Fiakarana', activity: 'Fitsangatsanganana ao anaty ala baobab' },
      { time: 'Tampon-tendrombohitra', activity: 'Fahitana panoramika mahafinaritra' },
      { time: 'Fijerena', activity: 'Fotoana malalaka ho an\'ny sary' },
      { time: 'Fidinana', activity: 'Fiverenana amin\'ny lalana hafa' },
      { time: 'Fiafaran\'ny maraina', activity: 'Fiverenana any Diego-Suarez' },
    ],
    maxParticipants: 12,
    guideTipFr: 'Le lever du soleil depuis le sommet est un spectacle inoubliable - préférez un départ à l\'aube.',
    guideTipEn: 'Sunrise from the summit is an unforgettable sight - prefer a dawn departure.',
    guideTipMg: 'Ny fiposahan\'ny masoandro avy eny an-tampon\'ny tendrombohitra dia mahatalanjona.',
  },
  {
    id: 'nosy-iranja',
    key: 'nosyIranja',
    images: [nosyIranjaImg, merEmeraudeImg, heroImage],
    location: 'Nosy Be',
    region: 'Nord-Ouest Madagascar',
    includedFr: ['Transport bateau rapide', 'Guide expert', 'Déjeuner de fruits de mer', 'Équipement snorkeling', 'Rafraîchissements', 'Taxes de parcs'],
    includedEn: ['Speed boat transport', 'Expert guide', 'Seafood lunch', 'Snorkeling equipment', 'Refreshments', 'Park fees'],
    includedMg: ['Fitaterana sambo haingana', 'Mpitarika', 'Sakafo atoandro hazan-dranomasina', 'Fitaovana snorkeling', 'Zava-pisotro', 'Hetra parc'],
    notIncludedFr: ['Pourboires', 'Boissons alcoolisées'],
    notIncludedEn: ['Tips', 'Alcoholic beverages'],
    notIncludedMg: ['Pourboires', 'Zava-pisotro misy alikaola'],
    programFr: [
      { time: 'Départ', activity: 'Embarquement en bateau rapide depuis Nosy Be' },
      { time: 'Navigation', activity: 'Croisière sur les eaux turquoise de l\'océan Indien' },
      { time: 'Arrivée', activity: 'Découverte de Nosy Iranja Be et son village de pêcheurs' },
      { time: 'Marée basse', activity: 'Traversée du banc de sable blanc vers Nosy Iranja Kely' },
      { time: 'Baignade', activity: 'Snorkeling et baignade dans les eaux cristallines' },
      { time: 'Midi', activity: 'Festin de fruits de mer frais les pieds dans le sable' },
      { time: 'Après-midi', activity: 'Exploration de l\'île aux tortues, observation de la ponte' },
      { time: 'Retour', activity: 'Navigation paisible vers Nosy Be' },
    ],
    programEn: [
      { time: 'Departure', activity: 'Boarding speed boat from Nosy Be' },
      { time: 'Navigation', activity: 'Cruise on turquoise waters of the Indian Ocean' },
      { time: 'Arrival', activity: 'Discovery of Nosy Iranja Be and its fishing village' },
      { time: 'Low tide', activity: 'Walking across the white sandbank to Nosy Iranja Kely' },
      { time: 'Swimming', activity: 'Snorkeling and swimming in crystal-clear waters' },
      { time: 'Noon', activity: 'Fresh seafood feast with feet in the sand' },
      { time: 'Afternoon', activity: 'Exploration of turtle island, nesting observation' },
      { time: 'Return', activity: 'Peaceful navigation to Nosy Be' },
    ],
    programMg: [
      { time: 'Fiaingana', activity: 'Fiakaran-tsambo haingana avy Nosy Be' },
      { time: 'Fitetezana', activity: 'Fitetezana eny ambony rano manga' },
      { time: 'Fahatongavana', activity: 'Fahitana Nosy Iranja Be sy ny tanànan\'ny mpanjono' },
      { time: 'Rano ambany', activity: 'Fiampitana ny fasika mankany Nosy Iranja Kely' },
      { time: 'Filomanosana', activity: 'Snorkeling sy filomanosana' },
      { time: 'Atoandro', activity: 'Sakafo hazan-dranomasina vaovao' },
      { time: 'Tolakandro', activity: 'Fikarohana ny nosin\'ny sokatra' },
      { time: 'Fiverenana', activity: 'Fiverenana any Nosy Be' },
    ],
    maxParticipants: 12,
    guideTipFr: 'Vérifiez les horaires de marée : le banc de sable n\'est accessible qu\'à marée basse.',
    guideTipEn: 'Check tide schedules: the sandbank is only accessible at low tide.',
    guideTipMg: 'Jereo ny ora riaka: ny fasika dia azo idirana amin\'ny rano ambany ihany.',
  },
  {
    id: 'nosy-tanikely',
    key: 'nosyTanikely',
    images: [merEmeraudeImg, nosyIranjaImg, heroImage],
    location: 'Nosy Be',
    region: 'Nord-Ouest Madagascar',
    includedFr: ['Transport bateau', 'Guide expert', 'Droits d\'entrée réserve', 'Équipement snorkeling', 'Déjeuner', 'Rafraîchissements', 'Taxes de parcs'],
    includedEn: ['Boat transport', 'Expert guide', 'Reserve entrance fees', 'Snorkeling equipment', 'Lunch', 'Refreshments', 'Park fees'],
    includedMg: ['Fitaterana sambo', 'Mpitarika', 'Saran-dalana tahiry', 'Fitaovana snorkeling', 'Sakafo atoandro', 'Zava-pisotro', 'Hetra parc'],
    notIncludedFr: ['Pourboires', 'Photos sous-marines'],
    notIncludedEn: ['Tips', 'Underwater photos'],
    notIncludedMg: ['Pourboires', 'Sary ambany rano'],
    programFr: [
      { time: 'Départ', activity: 'Embarquement depuis Nosy Be' },
      { time: 'Arrivée', activity: 'Accueil à la réserve marine de Nosy Tanikely' },
      { time: 'Matinée', activity: 'Snorkeling exceptionnel : tortues, poissons tropicaux, coraux' },
      { time: 'Exploration', activity: 'Visite du phare historique et vue panoramique sur l\'archipel' },
      { time: 'Midi', activity: 'Déjeuner savoureux sur la plage de sable blanc' },
      { time: 'Après-midi', activity: 'Navigation vers Nosy Komba, l\'île aux lémuriens' },
      { time: 'Découverte', activity: 'Rencontre avec les lémuriens Macaco et artisanat local' },
      { time: 'Retour', activity: 'Retour vers Nosy Be' },
    ],
    programEn: [
      { time: 'Departure', activity: 'Boarding from Nosy Be' },
      { time: 'Arrival', activity: 'Welcome to Nosy Tanikely marine reserve' },
      { time: 'Morning', activity: 'Exceptional snorkeling: turtles, tropical fish, corals' },
      { time: 'Exploration', activity: 'Visit to the historic lighthouse and archipelago panoramic view' },
      { time: 'Noon', activity: 'Delicious lunch on white sand beach' },
      { time: 'Afternoon', activity: 'Navigation to Nosy Komba, the lemur island' },
      { time: 'Discovery', activity: 'Meeting with Macaco lemurs and local crafts' },
      { time: 'Return', activity: 'Return to Nosy Be' },
    ],
    programMg: [
      { time: 'Fiaingana', activity: 'Fiakaran-tsambo avy Nosy Be' },
      { time: 'Fahatongavana', activity: 'Fandraisana ao amin\'ny tahiry Nosy Tanikely' },
      { time: 'Maraina', activity: 'Snorkeling: sokatra, trondro tropikaly, koraly' },
      { time: 'Fikarohana', activity: 'Fitsidihana ny fanilo sy fahitana panorama' },
      { time: 'Atoandro', activity: 'Sakafo matsiro eny amoron-dranomasina' },
      { time: 'Tolakandro', activity: 'Fitetezana mankany Nosy Komba' },
      { time: 'Fahitana', activity: 'Fihaonana amin\'ny gidro Macaco' },
      { time: 'Fiverenana', activity: 'Fiverenana any Nosy Be' },
    ],
    maxParticipants: 15,
    guideTipFr: 'Nosy Tanikely est une réserve protégée : ne touchez pas les coraux et ne nourrissez pas les poissons.',
    guideTipEn: 'Nosy Tanikely is a protected reserve: do not touch corals or feed the fish.',
    guideTipMg: 'Nosy Tanikely dia toerana voaaro: aza kasihina ny koraly na manome sakafo ny trondro.',
  },
  {
    id: 'lokobe',
    key: 'lokobe',
    images: [lokobeImg, montagneAmbreImg, heroImage],
    location: 'Nosy Be',
    region: 'Nord-Ouest Madagascar',
    includedFr: ['Transport pirogue privée', 'Guide naturaliste certifié', 'Droits d\'entrée', 'Déjeuner royal au village', 'Rafraîchissements', 'Taxes de parcs'],
    includedEn: ['Private canoe transport', 'Certified naturalist guide', 'Entrance fees', 'Royal village lunch', 'Refreshments', 'Park fees'],
    includedMg: ['Fitaterana lakana manokana', 'Mpitarika naturalista', 'Saran-dalana', 'Sakafo atoandro mpanjaka ao an-tanàna', 'Zava-pisotro', 'Hetra parc'],
    notIncludedFr: ['Pourboires', 'Jumelles'],
    notIncludedEn: ['Tips', 'Binoculars'],
    notIncludedMg: ['Pourboires', 'Jumelles'],
    programFr: [
      { time: 'Départ', activity: 'Traversée en pirogue traditionnelle à travers les mangroves' },
      { time: 'Entrée', activity: 'Accueil à l\'entrée de la Réserve de Lokobe' },
      { time: 'Immersion', activity: 'Randonnée dans la forêt primaire, dernier vestige de Nosy Be' },
      { time: 'Observation', activity: 'Recherche des lémuriens noirs, caméléons panthères et Uroplatus' },
      { time: 'Midi', activity: 'Déjeuner traditionnel royal dans un village de pêcheurs' },
      { time: 'Découverte', activity: 'Visite d\'une distillerie artisanale d\'ylang-ylang' },
      { time: 'Retour', activity: 'Navigation paisible vers votre hôtel' },
    ],
    programEn: [
      { time: 'Departure', activity: 'Traditional canoe crossing through the mangroves' },
      { time: 'Entry', activity: 'Welcome at Lokobe Reserve entrance' },
      { time: 'Immersion', activity: 'Hike in primary forest, last remnant of Nosy Be' },
      { time: 'Observation', activity: 'Search for black lemurs, panther chameleons and Uroplatus' },
      { time: 'Noon', activity: 'Royal traditional lunch in a fishing village' },
      { time: 'Discovery', activity: 'Visit to an artisanal ylang-ylang distillery' },
      { time: 'Return', activity: 'Peaceful navigation to your hotel' },
    ],
    programMg: [
      { time: 'Fiaingana', activity: 'Fiampitana amin\'ny lakana nentim-paharazana' },
      { time: 'Fidirana', activity: 'Fandraisana ao amin\'ny fidirana ny Tahiry Lokobe' },
      { time: 'Fidiram-po', activity: 'Fitsangatsanganana ao anaty ala voalohany' },
      { time: 'Fijerena', activity: 'Fitadiavana gidro mainty, tana panthera sy Uroplatus' },
      { time: 'Atoandro', activity: 'Sakafo nentim-paharazana ao amin\'ny tanànan\'ny mpanjono' },
      { time: 'Fahitana', activity: 'Fitsidihana orinasa ylang-ylang' },
      { time: 'Fiverenana', activity: 'Fiverenana amin\'ny sambo' },
    ],
    maxParticipants: 10,
    guideTipFr: 'Le transfert privatisé en pirogue et le déjeuner royal vous distinguent des circuits collectifs.',
    guideTipEn: 'The private canoe transfer and royal lunch set you apart from group tours.',
    guideTipMg: 'Ny fitaterana manokana amin\'ny lakana sy ny sakafo mpanjaka no manavaka anao.',
  },
  {
    id: 'nosy-sakatia',
    key: 'nosySakatia',
    images: [nosySakatiaImg, nosyIranjaImg, heroImage],
    location: 'Nosy Be',
    region: 'Nord-Ouest Madagascar',
    includedFr: ['Transport pirogue traditionnelle', 'Guide expert local', 'Déjeuner traditionnel sur la plage', 'Équipement snorkeling', 'Rafraîchissements', 'Taxes de parcs'],
    includedEn: ['Traditional canoe transport', 'Expert local guide', 'Traditional beach lunch', 'Snorkeling equipment', 'Refreshments', 'Park fees'],
    includedMg: ['Fitaterana lakana nentim-paharazana', 'Mpitarika eo an-toerana', 'Sakafo atoandro nentim-paharazana', 'Fitaovana snorkeling', 'Zava-pisotro', 'Hetra parc'],
    notIncludedFr: ['Pourboires', 'Photos sous-marines'],
    notIncludedEn: ['Tips', 'Underwater photos'],
    notIncludedMg: ['Pourboires', 'Sary ambany rano'],
    programFr: [
      { time: 'Départ', activity: 'Traversée en pirogue traditionnelle vers l\'île aux Orchidées' },
      { time: 'Arrivée', activity: 'Accueil sur les plages préservées de Nosy Sakatia' },
      { time: 'Exploration', activity: 'Sentiers botaniques : vanille, poivre, ylang-ylang, orchidées sauvages' },
      { time: 'Rencontre', activity: 'Snorkeling guidé avec les tortues vertes géantes dans leur habitat' },
      { time: 'Midi', activity: 'Déjeuner traditionnel les pieds dans le sable sur une plage privée' },
      { time: 'Détente', activity: 'Temps libre : baignade dans les eaux cristallines, farniente' },
      { time: 'Retour', activity: 'Navigation douce vers votre hôtel en fin d\'après-midi' },
    ],
    programEn: [
      { time: 'Departure', activity: 'Traditional canoe crossing to Orchid Island' },
      { time: 'Arrival', activity: 'Welcome on the preserved beaches of Nosy Sakatia' },
      { time: 'Exploration', activity: 'Botanical trails: vanilla, pepper, ylang-ylang, wild orchids' },
      { time: 'Encounter', activity: 'Guided snorkeling with giant green sea turtles in their habitat' },
      { time: 'Noon', activity: 'Traditional lunch with feet in the sand on a private beach' },
      { time: 'Relaxation', activity: 'Free time: swimming in crystal-clear waters, relaxation' },
      { time: 'Return', activity: 'Gentle navigation to your hotel in late afternoon' },
    ],
    programMg: [
      { time: 'Fiaingana', activity: 'Fiampitana amin\'ny lakana mankany amin\'ny Nosy Orkide' },
      { time: 'Fahatongavana', activity: 'Fandraisana eny amin\'ny moron-dranomasina voatahiry' },
      { time: 'Fikarohana', activity: 'Lalana botanika: vanila, dipoavatra, ylang-ylang, orkide' },
      { time: 'Fihaonana', activity: 'Snorkeling miaraka amin\'ny sokatra maitso goavana' },
      { time: 'Atoandro', activity: 'Sakafo atoandro nentim-paharazana eny amoron-dranomasina' },
      { time: 'Fialan-tsasatra', activity: 'Fotoana malalaka: filomanosana, fitsaharana' },
      { time: 'Fiverenana', activity: 'Fiverenana amin\'ny tolakandro' },
    ],
    maxParticipants: 10,
    guideTipFr: 'Nous vous conseillons de partir tôt le matin pour profiter de la plage avant l\'arrivée des autres visiteurs et avoir la meilleure visibilité pour observer les tortues.',
    guideTipEn: 'We recommend leaving early in the morning to enjoy the beach before other visitors arrive and have the best visibility to observe turtles.',
    guideTipMg: 'Manoro anao izahay mba hiala maraina be mba hisitraka ny moron-dranomasina sy hahita tsara ny sokatra.',
  },
];

export default function ExcursionDetail() {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const location = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    participants: '2',
    message: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const excursion = excursionsData.find(e => e.id === id);

  if (!excursion) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-[#050505]">
          <div className="text-center">
            <h1 className="text-4xl font-serif text-white mb-4">Excursion non trouvée</h1>
            <Link to="/expeditions" className="text-gold hover:text-gold/80 transition-colors">
              Retour aux expéditions
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const data = t.excursions[excursion.key];
  const included = language === 'en' ? excursion.includedEn : language === 'mg' ? excursion.includedMg : excursion.includedFr;
  const notIncluded = language === 'en' ? excursion.notIncludedEn : language === 'mg' ? excursion.notIncludedMg : excursion.notIncludedFr;
  const program = language === 'en' ? excursion.programEn : language === 'mg' ? excursion.programMg : excursion.programFr;
  const guideTip = language === 'en' ? excursion.guideTipEn : language === 'mg' ? excursion.guideTipMg : excursion.guideTipFr;

  // FAQ data for SEO
  const faqs = getExcursionFAQs(excursion.key, language);
  
  // Structured data for SEO
  const tourSchema = generateTourSchema({
    name: data.title,
    description: data.description,
    image: excursion.images[0],
    duration: data.duration,
    price: data.price,
    location: excursion.location,
    region: excursion.region,
    slug: excursion.id,
    included,
    difficulty: data.difficulty,
    maxParticipants: excursion.maxParticipants,
  });

  const faqSchema = generateFAQSchema(faqs);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Accueil', url: '/' },
    { name: 'Expéditions', url: '/expeditions' },
    { name: data.title, url: `/expeditions/${excursion.id}` },
  ]);

  const combinedSchema = [tourSchema, faqSchema, breadcrumbSchema];

  // SEO meta descriptions by language
  const seoDescriptions = {
    fr: `${data.title} à ${excursion.location} - ${data.description.slice(0, 120)}`,
    en: `${data.title} in ${excursion.location} - ${data.description.slice(0, 120)}`,
    mg: `${data.title} ao ${excursion.location} - ${data.description.slice(0, 120)}`,
  };

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % excursion.images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + excursion.images.length) % excursion.images.length);

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = encodeURIComponent(`Nouvelle demande de réservation : ${data.title}`);
    const body = encodeURIComponent(`Bonjour Gentlemen Excursions,

Je souhaite réserver l'excursion "${data.title}".

═══════════════════════════════
📋 DÉTAILS DE LA RÉSERVATION
═══════════════════════════════

👤 Nom: ${formData.name}
📧 Email: ${formData.email}
📞 Téléphone: ${formData.phone || 'Non renseigné'}
📅 Date souhaitée: ${formData.date}
👥 Nombre de participants: ${formData.participants}

💬 Message:
${formData.message || 'Aucun message additionnel'}

═══════════════════════════════

Merci de me recontacter pour confirmer la disponibilité.

Cordialement`);
    
    const mailtoUrl = `mailto:gentlemenexcursions@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
    
    toast({
      title: language === 'en' ? "Request sent!" : language === 'mg' ? "Fangatahana nalefa!" : "Demande envoyée !",
      description: language === 'en' 
        ? "Thank you, your request has been sent. A Gentleman will respond within 24 hours." 
        : language === 'mg'
        ? "Misaotra, ny fangatahana dia nalefa. Hamaly anao ao anatin'ny 24 ora ny Gentleman."
        : "Merci, votre demande a été transmise. Un Gentleman vous répondra par email sous 24h.",
    });
  };

  return (
    <Layout>
      {/* SEO Meta Tags */}
      <SEO
        title={`${data.title} | Excursion ${excursion.location}`}
        description={seoDescriptions[language]}
        canonical={`/expeditions/${excursion.id}`}
        image={excursion.images[0]}
        language={language}
        keywords={[
          data.title,
          excursion.location,
          'Excursion Madagascar',
          'Voyage luxe Diego-Suarez',
          'Guide touristique Nosy Be',
        ]}
        structuredData={combinedSchema}
      />

      {/* Floating Back Button - Premium Sticky */}
      <FloatingBackButton 
        to="/expeditions" 
        label={language === 'en' ? 'Expeditions' : language === 'mg' ? 'Fitsangatsanganana' : 'Expéditions'}
      />

      {/* Hero Gallery - Magazine Style */}
      <section className="relative h-[70vh] min-h-[600px] bg-[#050505] overflow-hidden pt-[100px]">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={excursion.images[currentImageIndex]}
            alt={data.title}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 w-full h-full object-cover cursor-pointer"
            onClick={() => setShowLightbox(true)}
          />
        </AnimatePresence>
        {/* Gradient de lisibilité pour le header */}
        <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/30 to-transparent" />
        
        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/40 backdrop-blur-sm border border-gold/30 flex items-center justify-center hover:bg-gold hover:border-gold group transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-white group-hover:text-black" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/40 backdrop-blur-sm border border-gold/30 flex items-center justify-center hover:bg-gold hover:border-gold group transition-all"
        >
          <ChevronRight className="w-6 h-6 text-white group-hover:text-black" />
        </button>


        {/* Thumbnails */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {excursion.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-1 rounded-full transition-all ${
                index === currentImageIndex ? 'bg-gold w-12' : 'bg-white/30 w-8 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 text-gold text-sm font-medium tracking-[0.2em] uppercase mb-4">
                <MapPin className="w-4 h-4" />
                {excursion.location} — {excursion.region}
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-white font-bold mb-3">
                {data.title}
              </h1>
              {'titleMg' in data && data.titleMg && (
                <p className="text-white/50 text-xl italic font-serif">{data.titleMg}</p>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 lg:py-28 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-16">
              
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-serif text-3xl text-white mb-6">{t.common.theExperience}</h2>
                <p className="text-zinc-400 leading-relaxed text-lg">
                  {data.description}
                </p>
              </motion.div>

              {/* Guide's Tip - Premium Insight Box */}
              {guideTip && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/30 rounded-2xl p-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-gold font-medium text-sm uppercase tracking-wider mb-3">
                        {language === 'en' ? 'Guide\'s Tip' : language === 'mg' ? 'Torohevitry ny Mpitarika' : 'Le Conseil de Gentlemen Excursions'}
                      </h3>
                      <p className="text-white/90 leading-relaxed italic">
                        "{guideTip}"
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick Info Cards */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <div className="bg-[#0A0A0A] border border-gold/20 rounded-xl p-6 text-center">
                  <Clock className="w-6 h-6 text-gold mx-auto mb-3" />
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Durée</p>
                  <p className="font-medium text-white">{data.duration}</p>
                </div>
                <div className="bg-[#0A0A0A] border border-gold/20 rounded-xl p-6 text-center">
                  <CircleDot className="w-6 h-6 text-gold mx-auto mb-3" />
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Niveau</p>
                  <p className="font-medium text-white">{data.difficulty}</p>
                </div>
                <div className="bg-[#0A0A0A] border border-gold/20 rounded-xl p-6 text-center">
                  <Users className="w-6 h-6 text-gold mx-auto mb-3" />
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Groupe</p>
                  <p className="font-medium text-white">Max {excursion.maxParticipants}</p>
                </div>
                <div className="bg-[#0A0A0A] border border-gold/20 rounded-xl p-6 text-center">
                  <Star className="w-6 h-6 text-gold mx-auto mb-3" />
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{t.common.from}</p>
                  <p className="font-medium text-white">{data.price}€</p>
                </div>
              </motion.div>

              {/* Program Timeline - Without Hours */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-serif text-3xl text-white mb-8">{t.common.program}</h2>
                <div className="space-y-0">
                  {program.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-6 group"
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-gold" />
                        {index < program.length - 1 && (
                          <div className="w-px h-full bg-gold/20 group-hover:bg-gold/40 transition-colors" />
                        )}
                      </div>
                      <div className="pb-8 flex-1">
                        <span className="text-gold font-medium text-sm uppercase tracking-wider">{item.time}</span>
                        <p className="text-white mt-2">{item.activity}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Included / Not Included Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-serif text-3xl text-white mb-8">{t.common.priceDetails}</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Included */}
                  <div className="bg-[#0A0A0A] border border-gold/20 rounded-xl p-8">
                    <h3 className="text-gold font-medium uppercase tracking-wider text-sm mb-6 flex items-center gap-2">
                      <Check className="w-5 h-5" />
                      {t.common.includedInPrice}
                    </h3>
                    <ul className="space-y-4">
                      {included.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5 text-gold" />
                          </div>
                          <span className="text-zinc-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* Local Guide Certification Notice */}
                    <div className="mt-6 pt-6 border-t border-gold/10">
                      <div className="flex items-start gap-3">
                        <Award className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          {t.common.localExpertise}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Not Included */}
                  <div className="bg-[#0A0A0A] border border-zinc-800 rounded-xl p-8">
                    <h3 className="text-zinc-400 font-medium uppercase tracking-wider text-sm mb-6 flex items-center gap-2">
                      <XCircle className="w-5 h-5" />
                      {t.common.notIncluded}
                    </h3>
                    <ul className="space-y-4">
                      {notIncluded.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 mt-0.5">
                            <X className="w-3.5 h-3.5 text-zinc-500" />
                          </div>
                          <span className="text-zinc-500">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar - Booking Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-[#0A0A0A] border border-gold/30 rounded-2xl p-8"
                >
                  {/* Price Display */}
                  <div className="text-center mb-8 pb-8 border-b border-gold/20">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">{t.common.from}</p>
                    <p className="font-serif text-5xl text-white">{data.price}<span className="text-2xl">€</span></p>
                    <p className="text-zinc-400 text-sm mt-1">{t.common.perPerson}</p>
                    {data.priceAr && (
                      <p className="text-gold/80 text-sm mt-2">{data.priceAr}</p>
                    )}
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <input
                        type="text"
                        placeholder={t.contact.form.name}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full px-4 py-4 bg-transparent border border-zinc-700 rounded-lg focus:outline-none focus:border-gold text-white placeholder:text-zinc-500 transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder={t.contact.form.email}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full px-4 py-4 bg-transparent border border-zinc-700 rounded-lg focus:outline-none focus:border-gold text-white placeholder:text-zinc-500 transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder={t.contact.form.phone}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-4 bg-transparent border border-zinc-700 rounded-lg focus:outline-none focus:border-gold text-white placeholder:text-zinc-500 transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                        className="w-full px-4 py-4 bg-transparent border border-zinc-700 rounded-lg focus:outline-none focus:border-gold text-white transition-colors"
                      />
                    </div>
                    <div>
                      <select
                        value={formData.participants}
                        onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                        className="w-full px-4 py-4 bg-[#0A0A0A] border border-zinc-700 rounded-lg focus:outline-none focus:border-gold text-white transition-colors"
                      >
                        {[...Array(excursion.maxParticipants)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} {i === 0 ? 'participant' : 'participants'}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <textarea
                        placeholder={t.contact.form.message}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-4 bg-transparent border border-zinc-700 rounded-lg focus:outline-none focus:border-gold text-white placeholder:text-zinc-500 resize-none transition-colors"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gold text-black font-semibold py-4 rounded-lg hover:bg-gold/90 transition-colors flex items-center justify-center gap-2"
                    >
                      <Mail className="w-5 h-5" />
                      {t.common.requestQuote}
                    </button>
                  </form>

                  <div className="mt-6 pt-6 border-t border-gold/20">
                    <div className="flex items-center gap-3 justify-center">
                      <Award className="w-5 h-5 text-gold" />
                      <p className="text-xs text-zinc-400">
                        {t.common.localGuidesCertified}
                      </p>
                    </div>
                    <p className="text-xs text-zinc-500 text-center mt-4">
                      ✨ {t.common.responseGuaranteed}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - SEO Optimized */}
      <section className="bg-[#050505] py-20 border-t border-gold/20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-gold text-sm tracking-[0.3em] uppercase font-medium">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-serif text-white mt-3">
              {language === 'en' ? 'Frequently Asked Questions' : language === 'mg' ? 'Fanontaniana Matetika' : 'Questions Fréquentes'}
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.details
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-zinc-900/50 border border-gold/20 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-zinc-900/80 transition-colors">
                  <h3 className="text-lg font-medium text-white pr-4">{faq.question}</h3>
                  <ChevronDown className="w-5 h-5 text-gold flex-shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 pt-2">
                  <p className="text-zinc-400 leading-relaxed">{faq.answer}</p>
                </div>
              </motion.details>
            ))}
          </div>

          {/* Related Expedition CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <p className="text-zinc-400 mb-6">
              {language === 'en' 
                ? 'Discover more adventures in Northern Madagascar' 
                : language === 'mg' 
                ? 'Tadiavo ny aventure bebe kokoa any Avaratra Madagasikara' 
                : 'Découvrez d\'autres aventures au Nord de Madagascar'}
            </p>
            <Link
              to="/expeditions"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 rounded-lg font-medium"
            >
              {language === 'en' ? 'View All Expeditions' : language === 'mg' ? 'Jereo ny Fitsangatsanganana rehetra' : 'Voir toutes les expéditions'}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setShowLightbox(false)}
          >
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute top-6 right-6 w-14 h-14 rounded-full bg-white/10 border border-gold/30 flex items-center justify-center hover:bg-gold hover:border-gold group transition-all"
            >
              <X className="w-6 h-6 text-white group-hover:text-black" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 border border-gold/30 flex items-center justify-center hover:bg-gold hover:border-gold group transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:text-black" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 border border-gold/30 flex items-center justify-center hover:bg-gold hover:border-gold group transition-all"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:text-black" />
            </button>
            <img
              src={excursion.images[currentImageIndex]}
              alt={data.title}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
