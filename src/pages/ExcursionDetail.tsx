import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, CircleDot, MapPin, Clock, Users, ChevronLeft, ChevronRight, 
  X, Check, XCircle, Star, MessageCircle, ChevronDown
} from 'lucide-react';
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
import heroImage from '@/assets/hero-madagascar.jpg';

type ExcursionKey = 'merEmeraude' | 'troisBaies' | 'montagneAmbre' | 'tsingyRouges' | 'ankarana' | 'nosyHara' | 'lacSacre' | 'montagneFrancais' | 'nosyIranja' | 'nosyTanikely' | 'lokobe';

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
}

const excursionsData: ExcursionData[] = [
  {
    id: 'mer-emeraude',
    key: 'merEmeraude',
    images: [merEmeraudeImg, heroImage, troisBaiesImg],
    location: 'Diego-Suarez',
    region: 'Nord Madagascar',
    includedFr: ['Transport en 4x4 climatisé', 'Guide francophone certifié', 'Déjeuner gastronomique sur la plage', 'Équipement snorkeling premium', 'Boissons fraîches illimitées', 'Assurance voyage'],
    includedEn: ['Air-conditioned 4x4 transport', 'Certified French-speaking guide', 'Gourmet beach lunch', 'Premium snorkeling equipment', 'Unlimited refreshments', 'Travel insurance'],
    includedMg: ['Fitaterana 4x4 misy climatisation', 'Mpitarika miteny frantsay voamarina', 'Sakafo atoandro matsiro eny amoron-dranomasina', 'Fitaovana snorkeling ambony', 'Zava-pisotro mangatsiaka tsy voafetra', 'Fiantohana dia'],
    notIncludedFr: ['Pourboires', 'Dépenses personnelles', 'Boissons alcoolisées'],
    notIncludedEn: ['Tips', 'Personal expenses', 'Alcoholic beverages'],
    notIncludedMg: ['Pourboires', 'Fandaniana manokana', 'Zava-pisotro misy alikaola'],
    programFr: [
      { time: '07:00', activity: 'Départ de Diego-Suarez en 4x4 climatisé' },
      { time: '08:30', activity: 'Arrivée à Ramena, embarquement en boutre traditionnel' },
      { time: '10:00', activity: 'Découverte de la Mer d\'Émeraude, baignade' },
      { time: '12:30', activity: 'Déjeuner de fruits de mer sur un banc de sable' },
      { time: '14:00', activity: 'Session snorkeling dans les eaux cristallines' },
      { time: '16:00', activity: 'Retour vers Ramena au coucher du soleil' },
      { time: '17:30', activity: 'Arrivée à Diego-Suarez' },
    ],
    programEn: [
      { time: '07:00', activity: 'Departure from Diego-Suarez in air-conditioned 4x4' },
      { time: '08:30', activity: 'Arrival in Ramena, boarding traditional dhow' },
      { time: '10:00', activity: 'Discovery of the Emerald Sea, swimming' },
      { time: '12:30', activity: 'Seafood lunch on a sandbank' },
      { time: '14:00', activity: 'Snorkeling session in crystal-clear waters' },
      { time: '16:00', activity: 'Return to Ramena at sunset' },
      { time: '17:30', activity: 'Arrival in Diego-Suarez' },
    ],
    programMg: [
      { time: '07:00', activity: 'Fiaingana avy any Diego-Suarez' },
      { time: '08:30', activity: 'Fahatongavana ao Ramena, fiakaran-tsambo' },
      { time: '10:00', activity: 'Fahitana ny Ranomasina Safira' },
      { time: '12:30', activity: 'Sakafo atoandro hazan-dranomasina' },
      { time: '14:00', activity: 'Filomanosana sy snorkeling' },
      { time: '16:00', activity: 'Fiverenana any Ramena' },
      { time: '17:30', activity: 'Fahatongavana any Diego-Suarez' },
    ],
    maxParticipants: 12,
  },
  {
    id: 'trois-baies',
    key: 'troisBaies',
    images: [troisBaiesImg, merEmeraudeImg, heroImage],
    location: 'Diego-Suarez',
    region: 'Nord Madagascar',
    includedFr: ['Transport en 4x4', 'Guide local expert', 'Déjeuner traditionnel', 'Entrées aux sites', 'Eau minérale'],
    includedEn: ['4x4 transport', 'Expert local guide', 'Traditional lunch', 'Site entrance fees', 'Mineral water'],
    includedMg: ['Fitaterana 4x4', 'Mpitarika eo an-toerana', 'Sakafo atoandro nentim-paharazana', 'Saran-dalana', 'Rano mineraly'],
    notIncludedFr: ['Pourboires', 'Boissons supplémentaires'],
    notIncludedEn: ['Tips', 'Additional beverages'],
    notIncludedMg: ['Pourboires', 'Zava-pisotro fanampiny'],
    programFr: [
      { time: '08:00', activity: 'Départ de Diego-Suarez' },
      { time: '09:00', activity: 'Visite de la Baie des Dunes' },
      { time: '11:00', activity: 'Découverte de la Baie des Pigeons' },
      { time: '12:30', activity: 'Déjeuner dans un village de pêcheurs' },
      { time: '14:30', activity: 'Baie des Sakalava et baignade' },
      { time: '17:00', activity: 'Retour à Diego-Suarez' },
    ],
    programEn: [
      { time: '08:00', activity: 'Departure from Diego-Suarez' },
      { time: '09:00', activity: 'Visit to the Bay of Dunes' },
      { time: '11:00', activity: 'Discovery of Pigeon Bay' },
      { time: '12:30', activity: 'Lunch in a fishing village' },
      { time: '14:30', activity: 'Sakalava Bay and swimming' },
      { time: '17:00', activity: 'Return to Diego-Suarez' },
    ],
    programMg: [
      { time: '08:00', activity: 'Fiaingana avy any Diego-Suarez' },
      { time: '09:00', activity: 'Fitsidihana ny Helodranon\'ny Fasika' },
      { time: '11:00', activity: 'Fahitana ny Helodranon\'ny Voromailala' },
      { time: '12:30', activity: 'Sakafo atoandro ao amin\'ny tanànan\'ny mpanjono' },
      { time: '14:30', activity: 'Helodrano Sakalava sy filomanosana' },
      { time: '17:00', activity: 'Fiverenana any Diego-Suarez' },
    ],
    maxParticipants: 10,
  },
  {
    id: 'montagne-ambre',
    key: 'montagneAmbre',
    images: [montagneAmbreImg, lokobeImg, heroImage],
    location: 'Diego-Suarez',
    region: 'Nord Madagascar',
    includedFr: ['Transport en 4x4', 'Guide naturaliste certifié', 'Droits d\'entrée au parc', 'Pique-nique gourmet', 'Eau minérale'],
    includedEn: ['4x4 transport', 'Certified naturalist guide', 'Park entrance fees', 'Gourmet picnic', 'Mineral water'],
    includedMg: ['Fitaterana 4x4', 'Mpitarika naturalista', 'Saran-dalana parc', 'Pique-nique matsiro', 'Rano mineraly'],
    notIncludedFr: ['Pourboires', 'Équipement photo'],
    notIncludedEn: ['Tips', 'Photography equipment'],
    notIncludedMg: ['Pourboires', 'Fitaovana sary'],
    programFr: [
      { time: '06:30', activity: 'Départ de Diego-Suarez' },
      { time: '08:00', activity: 'Arrivée au Parc National de la Montagne d\'Ambre' },
      { time: '08:30', activity: 'Randonnée vers les cascades' },
      { time: '11:00', activity: 'Observation des lémuriens et caméléons' },
      { time: '12:30', activity: 'Pique-nique près du lac' },
      { time: '14:00', activity: 'Visite du Lac Vert' },
      { time: '16:00', activity: 'Retour à Diego-Suarez' },
    ],
    programEn: [
      { time: '06:30', activity: 'Departure from Diego-Suarez' },
      { time: '08:00', activity: 'Arrival at Amber Mountain National Park' },
      { time: '08:30', activity: 'Hike to the waterfalls' },
      { time: '11:00', activity: 'Observation of lemurs and chameleons' },
      { time: '12:30', activity: 'Picnic by the lake' },
      { time: '14:00', activity: 'Visit to the Green Lake' },
      { time: '16:00', activity: 'Return to Diego-Suarez' },
    ],
    programMg: [
      { time: '06:30', activity: 'Fiaingana avy any Diego-Suarez' },
      { time: '08:00', activity: 'Fahatongavana ao amin\'ny Parc Nasionalin\'ny Ambohitra' },
      { time: '08:30', activity: 'Fitsangatsanganana mankany amin\'ny riandrano' },
      { time: '11:00', activity: 'Fijerena gidro sy tana' },
      { time: '12:30', activity: 'Pique-nique akaikin\'ny farihy' },
      { time: '14:00', activity: 'Fitsidihana ny Farihy Maitso' },
      { time: '16:00', activity: 'Fiverenana any Diego-Suarez' },
    ],
    maxParticipants: 8,
  },
  {
    id: 'tsingy-rouges',
    key: 'tsingyRouges',
    images: [tsingyRougesImg, montagneAmbreImg, heroImage],
    location: 'Diego-Suarez',
    region: 'Nord Madagascar',
    includedFr: ['Transport en 4x4', 'Guide local', 'Droits d\'entrée', 'Eau minérale'],
    includedEn: ['4x4 transport', 'Local guide', 'Entrance fees', 'Mineral water'],
    includedMg: ['Fitaterana 4x4', 'Mpitarika eo an-toerana', 'Saran-dalana', 'Rano mineraly'],
    notIncludedFr: ['Déjeuner', 'Pourboires'],
    notIncludedEn: ['Lunch', 'Tips'],
    notIncludedMg: ['Sakafo atoandro', 'Pourboires'],
    programFr: [
      { time: '07:00', activity: 'Départ de Diego-Suarez' },
      { time: '09:30', activity: 'Arrivée aux Tsingy Rouges' },
      { time: '10:00', activity: 'Visite guidée des formations géologiques' },
      { time: '12:00', activity: 'Temps libre pour photos' },
      { time: '13:00', activity: 'Pause déjeuner (non inclus)' },
      { time: '15:00', activity: 'Retour à Diego-Suarez' },
    ],
    programEn: [
      { time: '07:00', activity: 'Departure from Diego-Suarez' },
      { time: '09:30', activity: 'Arrival at the Red Tsingy' },
      { time: '10:00', activity: 'Guided tour of the geological formations' },
      { time: '12:00', activity: 'Free time for photos' },
      { time: '13:00', activity: 'Lunch break (not included)' },
      { time: '15:00', activity: 'Return to Diego-Suarez' },
    ],
    programMg: [
      { time: '07:00', activity: 'Fiaingana avy any Diego-Suarez' },
      { time: '09:30', activity: 'Fahatongavana ao amin\'ny Tsingy Mena' },
      { time: '10:00', activity: 'Fitsidihana miaraka amin\'ny mpitarika' },
      { time: '12:00', activity: 'Fotoana malalaka ho an\'ny sary' },
      { time: '13:00', activity: 'Sakafo atoandro (tsy tafiditra)' },
      { time: '15:00', activity: 'Fiverenana any Diego-Suarez' },
    ],
    maxParticipants: 15,
  },
  {
    id: 'ankarana',
    key: 'ankarana',
    images: [ankarana, tsingyRougesImg, heroImage],
    location: 'Diego-Suarez',
    region: 'Nord Madagascar',
    includedFr: ['Transport en 4x4', 'Guide naturaliste', 'Droits d\'entrée', 'Hébergement en lodge', 'Repas complets', 'Équipement spéléo'],
    includedEn: ['4x4 transport', 'Naturalist guide', 'Entrance fees', 'Lodge accommodation', 'Full board meals', 'Caving equipment'],
    includedMg: ['Fitaterana 4x4', 'Mpitarika naturalista', 'Saran-dalana', 'Trano fandraisam-bahiny', 'Sakafo feno', 'Fitaovana spéléo'],
    notIncludedFr: ['Boissons alcoolisées', 'Pourboires'],
    notIncludedEn: ['Alcoholic beverages', 'Tips'],
    notIncludedMg: ['Zava-pisotro misy alikaola', 'Pourboires'],
    programFr: [
      { time: 'Jour 1 - 07:00', activity: 'Départ de Diego vers Ankarana' },
      { time: 'Jour 1 - 12:00', activity: 'Installation au lodge' },
      { time: 'Jour 1 - 14:00', activity: 'Randonnée aux Petits Tsingy' },
      { time: 'Jour 2 - 06:00', activity: 'Visite des Grands Tsingy' },
      { time: 'Jour 2 - 11:00', activity: 'Exploration des grottes' },
      { time: 'Jour 2 - 15:00', activity: 'Retour à Diego-Suarez' },
    ],
    programEn: [
      { time: 'Day 1 - 07:00', activity: 'Departure from Diego to Ankarana' },
      { time: 'Day 1 - 12:00', activity: 'Check-in at the lodge' },
      { time: 'Day 1 - 14:00', activity: 'Hike to the Small Tsingy' },
      { time: 'Day 2 - 06:00', activity: 'Visit to the Grand Tsingy' },
      { time: 'Day 2 - 11:00', activity: 'Cave exploration' },
      { time: 'Day 2 - 15:00', activity: 'Return to Diego-Suarez' },
    ],
    programMg: [
      { time: 'Andro 1 - 07:00', activity: 'Fiaingana avy Diego mankany Ankarana' },
      { time: 'Andro 1 - 12:00', activity: 'Fipetrahan\'ao amin\'ny lodge' },
      { time: 'Andro 1 - 14:00', activity: 'Fitsangatsanganana any amin\'ny Tsingy Kely' },
      { time: 'Andro 2 - 06:00', activity: 'Fitsidihana ny Tsingy Lehibe' },
      { time: 'Andro 2 - 11:00', activity: 'Fikarohana ny zohy' },
      { time: 'Andro 2 - 15:00', activity: 'Fiverenana any Diego-Suarez' },
    ],
    maxParticipants: 6,
  },
  {
    id: 'nosy-hara',
    key: 'nosyHara',
    images: [merEmeraudeImg, nosyIranjaImg, heroImage],
    location: 'Diego-Suarez',
    region: 'Nord Madagascar',
    includedFr: ['Transport en bateau rapide', 'Guide expérimenté', 'Bivouac de luxe', 'Repas gastronomiques', 'Équipement snorkeling', 'Kayaks'],
    includedEn: ['Speed boat transport', 'Experienced guide', 'Luxury bivouac', 'Gourmet meals', 'Snorkeling equipment', 'Kayaks'],
    includedMg: ['Fitaterana sambo haingana', 'Mpitarika manan-traikefa', 'Bivouac de luxe', 'Sakafo matsiro', 'Fitaovana snorkeling', 'Kayak'],
    notIncludedFr: ['Boissons alcoolisées', 'Assurance voyage', 'Pourboires'],
    notIncludedEn: ['Alcoholic beverages', 'Travel insurance', 'Tips'],
    notIncludedMg: ['Zava-pisotro misy alikaola', 'Fiantohana dia', 'Pourboires'],
    programFr: [
      { time: 'Jour 1 - 06:00', activity: 'Départ en bateau rapide' },
      { time: 'Jour 1 - 09:00', activity: 'Arrivée à Nosy Hara, installation du camp' },
      { time: 'Jour 1 - 11:00', activity: 'Exploration des Tsingy marins' },
      { time: 'Jour 1 - 19:00', activity: 'Dîner gastronomique sous les étoiles' },
      { time: 'Jour 2 - 07:00', activity: 'Kayak autour des îlots' },
      { time: 'Jour 2 - 12:00', activity: 'Snorkeling dans les eaux cristallines' },
      { time: 'Jour 2 - 15:00', activity: 'Retour vers Diego-Suarez' },
    ],
    programEn: [
      { time: 'Day 1 - 06:00', activity: 'Departure by speed boat' },
      { time: 'Day 1 - 09:00', activity: 'Arrival at Nosy Hara, camp setup' },
      { time: 'Day 1 - 11:00', activity: 'Exploration of marine Tsingy' },
      { time: 'Day 1 - 19:00', activity: 'Gourmet dinner under the stars' },
      { time: 'Day 2 - 07:00', activity: 'Kayaking around the islets' },
      { time: 'Day 2 - 12:00', activity: 'Snorkeling in crystal-clear waters' },
      { time: 'Day 2 - 15:00', activity: 'Return to Diego-Suarez' },
    ],
    programMg: [
      { time: 'Andro 1 - 06:00', activity: 'Fiaingana amin\'ny sambo haingana' },
      { time: 'Andro 1 - 09:00', activity: 'Fahatongavana ao Nosy Hara, fananganana toby' },
      { time: 'Andro 1 - 11:00', activity: 'Fikarohana ny Tsingy an-dranomasina' },
      { time: 'Andro 1 - 19:00', activity: 'Sakafo hariva matsiro ambany kintana' },
      { time: 'Andro 2 - 07:00', activity: 'Kayak manodidina ny nosy kely' },
      { time: 'Andro 2 - 12:00', activity: 'Snorkeling anaty rano kristaly' },
      { time: 'Andro 2 - 15:00', activity: 'Fiverenana any Diego-Suarez' },
    ],
    maxParticipants: 8,
  },
  {
    id: 'lac-sacre',
    key: 'lacSacre',
    images: [lokobeImg, montagneAmbreImg, heroImage],
    location: 'Anivorano',
    region: 'Nord Madagascar',
    includedFr: ['Transport en 4x4', 'Guide local', 'Offrandes traditionnelles', 'Eau minérale'],
    includedEn: ['4x4 transport', 'Local guide', 'Traditional offerings', 'Mineral water'],
    includedMg: ['Fitaterana 4x4', 'Mpitarika eo an-toerana', 'Fanatitra nentim-paharazana', 'Rano mineraly'],
    notIncludedFr: ['Pourboires', 'Dépenses personnelles'],
    notIncludedEn: ['Tips', 'Personal expenses'],
    notIncludedMg: ['Pourboires', 'Fandaniana manokana'],
    programFr: [
      { time: '08:00', activity: 'Départ de Diego-Suarez' },
      { time: '09:00', activity: 'Arrivée à Anivorano' },
      { time: '09:30', activity: 'Rencontre avec le gardien du lac' },
      { time: '10:00', activity: 'Cérémonie traditionnelle d\'offrandes' },
      { time: '10:30', activity: 'Observation des crocodiles sacrés' },
      { time: '11:30', activity: 'Histoire et légendes du lac' },
      { time: '12:30', activity: 'Retour à Diego-Suarez' },
    ],
    programEn: [
      { time: '08:00', activity: 'Departure from Diego-Suarez' },
      { time: '09:00', activity: 'Arrival in Anivorano' },
      { time: '09:30', activity: 'Meeting with the lake guardian' },
      { time: '10:00', activity: 'Traditional offering ceremony' },
      { time: '10:30', activity: 'Observation of sacred crocodiles' },
      { time: '11:30', activity: 'History and legends of the lake' },
      { time: '12:30', activity: 'Return to Diego-Suarez' },
    ],
    programMg: [
      { time: '08:00', activity: 'Fiaingana avy any Diego-Suarez' },
      { time: '09:00', activity: 'Fahatongavana ao Anivorano' },
      { time: '09:30', activity: 'Fihaonana amin\'ny mpiambina ny farihy' },
      { time: '10:00', activity: 'Fombafomba fanatitra nentim-paharazana' },
      { time: '10:30', activity: 'Fijerena ny voay masina' },
      { time: '11:30', activity: 'Tantara sy angano momba ny farihy' },
      { time: '12:30', activity: 'Fiverenana any Diego-Suarez' },
    ],
    maxParticipants: 15,
  },
  {
    id: 'montagne-francais',
    key: 'montagneFrancais',
    images: [troisBaiesImg, tsingyRougesImg, heroImage],
    location: 'Diego-Suarez',
    region: 'Nord Madagascar',
    includedFr: ['Transport en 4x4', 'Guide local', 'Eau minérale', 'En-cas énergétique'],
    includedEn: ['4x4 transport', 'Local guide', 'Mineral water', 'Energy snacks'],
    includedMg: ['Fitaterana 4x4', 'Mpitarika eo an-toerana', 'Rano mineraly', 'Sakafo maivana'],
    notIncludedFr: ['Pourboires', 'Équipement de randonnée'],
    notIncludedEn: ['Tips', 'Hiking equipment'],
    notIncludedMg: ['Pourboires', 'Fitaovana fitsangatsanganana'],
    programFr: [
      { time: '06:00', activity: 'Départ de Diego-Suarez' },
      { time: '06:30', activity: 'Arrivée au pied de la montagne' },
      { time: '07:00', activity: 'Début de l\'ascension' },
      { time: '08:30', activity: 'Observation des baobabs endémiques' },
      { time: '09:30', activity: 'Sommet et vue panoramique sur la baie' },
      { time: '10:30', activity: 'Descente par un autre sentier' },
      { time: '12:00', activity: 'Retour à Diego-Suarez' },
    ],
    programEn: [
      { time: '06:00', activity: 'Departure from Diego-Suarez' },
      { time: '06:30', activity: 'Arrival at the foot of the mountain' },
      { time: '07:00', activity: 'Start of the ascent' },
      { time: '08:30', activity: 'Observation of endemic baobabs' },
      { time: '09:30', activity: 'Summit and panoramic view of the bay' },
      { time: '10:30', activity: 'Descent via another trail' },
      { time: '12:00', activity: 'Return to Diego-Suarez' },
    ],
    programMg: [
      { time: '06:00', activity: 'Fiaingana avy any Diego-Suarez' },
      { time: '06:30', activity: 'Fahatongavana eo am-pototry ny tendrombohitra' },
      { time: '07:00', activity: 'Fanombohana ny fiakarana' },
      { time: '08:30', activity: 'Fijerena ny baobab tsy fahita' },
      { time: '09:30', activity: 'Tampon-tendrombohitra sy fahitana ny helodrano manontolo' },
      { time: '10:30', activity: 'Fidinana amin\'ny lalana hafa' },
      { time: '12:00', activity: 'Fiverenana any Diego-Suarez' },
    ],
    maxParticipants: 12,
  },
  {
    id: 'nosy-iranja',
    key: 'nosyIranja',
    images: [nosyIranjaImg, merEmeraudeImg, heroImage],
    location: 'Nosy Be',
    region: 'Nord-Ouest Madagascar',
    includedFr: ['Transport bateau rapide', 'Guide', 'Déjeuner de fruits de mer', 'Équipement snorkeling'],
    includedEn: ['Speed boat transport', 'Guide', 'Seafood lunch', 'Snorkeling equipment'],
    includedMg: ['Fitaterana sambo haingana', 'Mpitarika', 'Sakafo atoandro hazan-dranomasina', 'Fitaovana snorkeling'],
    notIncludedFr: ['Pourboires', 'Boissons alcoolisées'],
    notIncludedEn: ['Tips', 'Alcoholic beverages'],
    notIncludedMg: ['Pourboires', 'Zava-pisotro misy alikaola'],
    programFr: [
      { time: '08:00', activity: 'Départ de Nosy Be en bateau rapide' },
      { time: '09:30', activity: 'Arrivée à Nosy Iranja Be' },
      { time: '10:00', activity: 'Traversée du banc de sable vers Nosy Iranja Kely' },
      { time: '11:00', activity: 'Snorkeling et baignade' },
      { time: '12:30', activity: 'Déjeuner de fruits de mer sur la plage' },
      { time: '14:30', activity: 'Exploration de l\'île aux tortues' },
      { time: '16:00', activity: 'Retour vers Nosy Be' },
    ],
    programEn: [
      { time: '08:00', activity: 'Departure from Nosy Be by speed boat' },
      { time: '09:30', activity: 'Arrival at Nosy Iranja Be' },
      { time: '10:00', activity: 'Walking across the sandbank to Nosy Iranja Kely' },
      { time: '11:00', activity: 'Snorkeling and swimming' },
      { time: '12:30', activity: 'Seafood lunch on the beach' },
      { time: '14:30', activity: 'Exploration of the turtle island' },
      { time: '16:00', activity: 'Return to Nosy Be' },
    ],
    programMg: [
      { time: '08:00', activity: 'Fiaingana avy Nosy Be amin\'ny sambo haingana' },
      { time: '09:30', activity: 'Fahatongavana ao Nosy Iranja Be' },
      { time: '10:00', activity: 'Fiampitana ny fasika mankany Nosy Iranja Kely' },
      { time: '11:00', activity: 'Snorkeling sy filomanosana' },
      { time: '12:30', activity: 'Sakafo atoandro hazan-dranomasina' },
      { time: '14:30', activity: 'Fikarohana ny nosin\'ny sokatra' },
      { time: '16:00', activity: 'Fiverenana any Nosy Be' },
    ],
    maxParticipants: 12,
  },
  {
    id: 'nosy-tanikely',
    key: 'nosyTanikely',
    images: [merEmeraudeImg, nosyIranjaImg, heroImage],
    location: 'Nosy Be',
    region: 'Nord-Ouest Madagascar',
    includedFr: ['Transport bateau', 'Guide', 'Droits d\'entrée réserve', 'Équipement snorkeling', 'Déjeuner'],
    includedEn: ['Boat transport', 'Guide', 'Reserve entrance fees', 'Snorkeling equipment', 'Lunch'],
    includedMg: ['Fitaterana sambo', 'Mpitarika', 'Saran-dalana tahiry', 'Fitaovana snorkeling', 'Sakafo atoandro'],
    notIncludedFr: ['Pourboires', 'Photos sous-marines'],
    notIncludedEn: ['Tips', 'Underwater photos'],
    notIncludedMg: ['Pourboires', 'Sary ambany rano'],
    programFr: [
      { time: '08:30', activity: 'Départ de Nosy Be' },
      { time: '09:00', activity: 'Arrivée à Nosy Tanikely' },
      { time: '09:30', activity: 'Snorkeling dans la réserve marine' },
      { time: '11:30', activity: 'Visite du phare et vue panoramique' },
      { time: '12:30', activity: 'Déjeuner sur la plage' },
      { time: '14:00', activity: 'Départ vers Nosy Komba' },
      { time: '14:30', activity: 'Rencontre avec les lémuriens Macaco' },
      { time: '16:30', activity: 'Retour à Nosy Be' },
    ],
    programEn: [
      { time: '08:30', activity: 'Departure from Nosy Be' },
      { time: '09:00', activity: 'Arrival at Nosy Tanikely' },
      { time: '09:30', activity: 'Snorkeling in the marine reserve' },
      { time: '11:30', activity: 'Lighthouse visit and panoramic view' },
      { time: '12:30', activity: 'Beach lunch' },
      { time: '14:00', activity: 'Departure to Nosy Komba' },
      { time: '14:30', activity: 'Meeting with Macaco lemurs' },
      { time: '16:30', activity: 'Return to Nosy Be' },
    ],
    programMg: [
      { time: '08:30', activity: 'Fiaingana avy Nosy Be' },
      { time: '09:00', activity: 'Fahatongavana ao Nosy Tanikely' },
      { time: '09:30', activity: 'Snorkeling ao amin\'ny tahiry an-dranomasina' },
      { time: '11:30', activity: 'Fitsidihana ny fanilo sy fahitana panorama' },
      { time: '12:30', activity: 'Sakafo atoandro eny amoron-dranomasina' },
      { time: '14:00', activity: 'Fiaingana mankany Nosy Komba' },
      { time: '14:30', activity: 'Fihaonana amin\'ny gidro Macaco' },
      { time: '16:30', activity: 'Fiverenana any Nosy Be' },
    ],
    maxParticipants: 15,
  },
  {
    id: 'lokobe',
    key: 'lokobe',
    images: [lokobeImg, montagneAmbreImg, heroImage],
    location: 'Nosy Be',
    region: 'Nord-Ouest Madagascar',
    includedFr: ['Transport pirogue traditionnelle', 'Guide naturaliste', 'Droits d\'entrée', 'Déjeuner local'],
    includedEn: ['Traditional canoe transport', 'Naturalist guide', 'Entrance fees', 'Local lunch'],
    includedMg: ['Fitaterana lakana nentim-paharazana', 'Mpitarika naturalista', 'Saran-dalana', 'Sakafo atoandro eo an-toerana'],
    notIncludedFr: ['Pourboires', 'Jumelles'],
    notIncludedEn: ['Tips', 'Binoculars'],
    notIncludedMg: ['Pourboires', 'Jumelles'],
    programFr: [
      { time: '08:00', activity: 'Départ en pirogue traditionnelle' },
      { time: '09:00', activity: 'Entrée dans la réserve de Lokobe' },
      { time: '09:30', activity: 'Randonnée dans la forêt primaire' },
      { time: '11:00', activity: 'Observation des lémuriens et caméléons' },
      { time: '12:30', activity: 'Déjeuner traditionnel au village' },
      { time: '14:30', activity: 'Visite d\'une distillerie d\'ylang-ylang' },
      { time: '16:00', activity: 'Retour en pirogue' },
    ],
    programEn: [
      { time: '08:00', activity: 'Departure by traditional canoe' },
      { time: '09:00', activity: 'Entry into Lokobe Reserve' },
      { time: '09:30', activity: 'Hike through the primary forest' },
      { time: '11:00', activity: 'Observation of lemurs and chameleons' },
      { time: '12:30', activity: 'Traditional lunch in the village' },
      { time: '14:30', activity: 'Visit to a ylang-ylang distillery' },
      { time: '16:00', activity: 'Return by canoe' },
    ],
    programMg: [
      { time: '08:00', activity: 'Fiaingana amin\'ny lakana nentim-paharazana' },
      { time: '09:00', activity: 'Fidirana ao amin\'ny Tahirin\'i Lokobe' },
      { time: '09:30', activity: 'Fitsangatsanganana ao anaty ala voalohany' },
      { time: '11:00', activity: 'Fijerena gidro sy tana' },
      { time: '12:30', activity: 'Sakafo atoandro nentim-paharazana ao amin\'ny tanàna' },
      { time: '14:30', activity: 'Fitsidihana orinasa ylang-ylang' },
      { time: '16:00', activity: 'Fiverenana amin\'ny lakana' },
    ],
    maxParticipants: 10,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Bonjour, je souhaite réserver l'excursion "${data.title}".
    
Nom: ${formData.name}
Email: ${formData.email}
Téléphone: ${formData.phone}
Date souhaitée: ${formData.date}
Nombre de participants: ${formData.participants}
Message: ${formData.message}`;
    
    const whatsappUrl = `https://wa.me/261320000000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
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

        {/* Image Counter */}
        <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-gold/30">
          <span className="text-gold font-medium">{String(currentImageIndex + 1).padStart(2, '0')}</span>
          <span className="text-zinc-400"> / {String(excursion.images.length).padStart(2, '0')}</span>
        </div>

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
                <h2 className="font-serif text-3xl text-white mb-6">L'Expérience</h2>
                <p className="text-zinc-400 leading-relaxed text-lg">
                  {data.description}
                </p>
              </motion.div>

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
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Prix</p>
                  <p className="font-medium text-white">{data.price}€</p>
                </div>
              </motion.div>

              {/* Program Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-serif text-3xl text-white mb-8">Programme</h2>
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
                        <span className="text-gold font-medium text-sm">{item.time}</span>
                        <p className="text-white mt-1">{item.activity}</p>
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
                <h2 className="font-serif text-3xl text-white mb-8">Détails du Prix</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Included */}
                  <div className="bg-[#0A0A0A] border border-gold/20 rounded-xl p-8">
                    <h3 className="text-gold font-medium uppercase tracking-wider text-sm mb-6 flex items-center gap-2">
                      <Check className="w-5 h-5" />
                      Inclus dans le prix
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
                  </div>

                  {/* Not Included */}
                  <div className="bg-[#0A0A0A] border border-zinc-800 rounded-xl p-8">
                    <h3 className="text-zinc-400 font-medium uppercase tracking-wider text-sm mb-6 flex items-center gap-2">
                      <XCircle className="w-5 h-5" />
                      Non inclus
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
                      <MessageCircle className="w-5 h-5" />
                      Réserver via WhatsApp
                    </button>
                  </form>

                  <p className="text-xs text-zinc-500 text-center mt-6">
                    ✨ Réponse garantie sous 24h
                  </p>
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
