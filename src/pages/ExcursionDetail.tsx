import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, CircleDot, MapPin, Clock, Users, ChevronLeft, ChevronRight, 
  X, Check, Star, MessageCircle, ArrowLeft
} from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';

// Import images
import merEmeraudeImg from '@/assets/excursions/mer-emeraude.jpg';
import troisBaiesImg from '@/assets/excursions/trois-baies.jpg';
import montagneAmbreImg from '@/assets/excursions/montagne-ambre.jpg';
import tsingyRougesImg from '@/assets/excursions/tsingy-rouges.jpg';
import ankarana from '@/assets/excursions/ankarana.jpg';
import nosyIranjaImg from '@/assets/excursions/nosy-iranja.jpg';
import lokobeImg from '@/assets/excursions/lokobe.jpg';
import routeCacaoImg from '@/assets/excursions/route-cacao.jpg';
import heroImage from '@/assets/hero-madagascar.jpg';

type ExcursionKey = 'merEmeraude' | 'troisBaies' | 'montagneAmbre' | 'tsingyRouges' | 'ankarana' | 'nosyHara' | 'lacSacre' | 'montagneFrancais' | 'nosyIranja' | 'nosyTanikely' | 'lokobe' | 'routeCacao' | 'grandNord';

interface ExcursionData {
  id: string;
  key: ExcursionKey;
  images: string[];
  location: string;
  region: string;
  includedFr: string[];
  includedEn: string[];
  includedMg: string[];
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
    includedFr: ['Transport en 4x4', 'Guide francophone', 'Déjeuner sur la plage', 'Équipement snorkeling', 'Boissons fraîches'],
    includedEn: ['4x4 transport', 'French-speaking guide', 'Beach lunch', 'Snorkeling equipment', 'Refreshments'],
    includedMg: ['Fitaterana 4x4', 'Mpitarika miteny frantsay', 'Sakafo atoandro eny amoron-dranomasina', 'Fitaovana snorkeling', 'Zava-pisotro mangatsiaka'],
    programFr: [
      { time: '07:00', activity: 'Départ de Diego-Suarez' },
      { time: '08:30', activity: 'Arrivée à Ramena, embarquement en boutre' },
      { time: '10:00', activity: 'Découverte de la Mer d\'Émeraude' },
      { time: '12:30', activity: 'Déjeuner de fruits de mer sur un banc de sable' },
      { time: '14:00', activity: 'Baignade et snorkeling' },
      { time: '16:00', activity: 'Retour vers Ramena' },
      { time: '17:30', activity: 'Arrivée à Diego-Suarez' },
    ],
    programEn: [
      { time: '07:00', activity: 'Departure from Diego-Suarez' },
      { time: '08:30', activity: 'Arrival in Ramena, boarding the dhow' },
      { time: '10:00', activity: 'Discovery of the Emerald Sea' },
      { time: '12:30', activity: 'Seafood lunch on a sandbank' },
      { time: '14:00', activity: 'Swimming and snorkeling' },
      { time: '16:00', activity: 'Return to Ramena' },
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
    includedFr: ['Transport en 4x4', 'Guide local', 'Déjeuner traditionnel', 'Entrées aux sites'],
    includedEn: ['4x4 transport', 'Local guide', 'Traditional lunch', 'Site entrance fees'],
    includedMg: ['Fitaterana 4x4', 'Mpitarika eo an-toerana', 'Sakafo atoandro nentim-paharazana', 'Saran-dalana'],
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
    includedFr: ['Transport en 4x4', 'Guide naturaliste', 'Droits d\'entrée au parc', 'Pique-nique', 'Eau minérale'],
    includedEn: ['4x4 transport', 'Naturalist guide', 'Park entrance fees', 'Picnic', 'Mineral water'],
    includedMg: ['Fitaterana 4x4', 'Mpitarika naturalista', 'Saran-dalana parc', 'Pique-nique', 'Rano mineraly'],
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
    programFr: [
      { time: '07:00', activity: 'Départ de Diego-Suarez' },
      { time: '09:30', activity: 'Arrivée aux Tsingy Rouges' },
      { time: '10:00', activity: 'Visite guidée des formations géologiques' },
      { time: '12:00', activity: 'Temps libre pour photos' },
      { time: '13:00', activity: 'Déjeuner (non inclus)' },
      { time: '15:00', activity: 'Retour à Diego-Suarez' },
    ],
    programEn: [
      { time: '07:00', activity: 'Departure from Diego-Suarez' },
      { time: '09:30', activity: 'Arrival at the Red Tsingy' },
      { time: '10:00', activity: 'Guided tour of the geological formations' },
      { time: '12:00', activity: 'Free time for photos' },
      { time: '13:00', activity: 'Lunch (not included)' },
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
    programFr: [
      { time: '08:00', activity: 'Départ de Nosy Be en bateau' },
      { time: '09:30', activity: 'Arrivée à Nosy Iranja' },
      { time: '10:00', activity: 'Découverte de l\'île aux tortues' },
      { time: '11:30', activity: 'Traversée de la langue de sable (marée basse)' },
      { time: '12:30', activity: 'Déjeuner sur la plage' },
      { time: '14:00', activity: 'Snorkeling et baignade' },
      { time: '16:00', activity: 'Retour à Nosy Be' },
    ],
    programEn: [
      { time: '08:00', activity: 'Departure from Nosy Be by boat' },
      { time: '09:30', activity: 'Arrival at Nosy Iranja' },
      { time: '10:00', activity: 'Discovery of turtle island' },
      { time: '11:30', activity: 'Crossing the sandbank (low tide)' },
      { time: '12:30', activity: 'Beach lunch' },
      { time: '14:00', activity: 'Snorkeling and swimming' },
      { time: '16:00', activity: 'Return to Nosy Be' },
    ],
    programMg: [
      { time: '08:00', activity: 'Fiaingana avy Nosy Be amin\'ny sambo' },
      { time: '09:30', activity: 'Fahatongavana ao Nosy Iranja' },
      { time: '10:00', activity: 'Fahitana ny nosy sokatra' },
      { time: '11:30', activity: 'Fiampitana ny fasika (iva ny ranomasina)' },
      { time: '12:30', activity: 'Sakafo atoandro eny amoron-dranomasina' },
      { time: '14:00', activity: 'Snorkeling sy filomanosana' },
      { time: '16:00', activity: 'Fiverenana any Nosy Be' },
    ],
    maxParticipants: 10,
  },
  {
    id: 'nosy-tanikely',
    key: 'nosyTanikely',
    images: [merEmeraudeImg, nosyIranjaImg, lokobeImg],
    location: 'Nosy Be',
    region: 'Nord-Ouest Madagascar',
    includedFr: ['Transport bateau', 'Guide', 'Droits d\'entrée réserve', 'Équipement snorkeling', 'Déjeuner'],
    includedEn: ['Boat transport', 'Guide', 'Reserve entrance fees', 'Snorkeling equipment', 'Lunch'],
    includedMg: ['Fitaterana sambo', 'Mpitarika', 'Saran-dalana tahiry', 'Fitaovana snorkeling', 'Sakafo atoandro'],
    programFr: [
      { time: '08:30', activity: 'Départ de Nosy Be' },
      { time: '09:00', activity: 'Arrivée à Nosy Tanikely' },
      { time: '09:30', activity: 'Snorkeling dans la réserve marine' },
      { time: '11:30', activity: 'Visite du phare et observation des tortues' },
      { time: '12:30', activity: 'Déjeuner sur la plage' },
      { time: '14:00', activity: 'Navigation vers Nosy Komba' },
      { time: '14:30', activity: 'Rencontre avec les lémuriens Macaco' },
      { time: '16:30', activity: 'Retour à Nosy Be' },
    ],
    programEn: [
      { time: '08:30', activity: 'Departure from Nosy Be' },
      { time: '09:00', activity: 'Arrival at Nosy Tanikely' },
      { time: '09:30', activity: 'Snorkeling in the marine reserve' },
      { time: '11:30', activity: 'Lighthouse visit and turtle observation' },
      { time: '12:30', activity: 'Beach lunch' },
      { time: '14:00', activity: 'Sailing to Nosy Komba' },
      { time: '14:30', activity: 'Meeting with Macaco lemurs' },
      { time: '16:30', activity: 'Return to Nosy Be' },
    ],
    programMg: [
      { time: '08:30', activity: 'Fiaingana avy Nosy Be' },
      { time: '09:00', activity: 'Fahatongavana ao Nosy Tanikely' },
      { time: '09:30', activity: 'Snorkeling ao amin\'ny tahiry an-dranomasina' },
      { time: '11:30', activity: 'Fitsidihana ny fanazavana sy fijerena sokatra' },
      { time: '12:30', activity: 'Sakafo atoandro eny amoron-dranomasina' },
      { time: '14:00', activity: 'Fandehanan-tsambo mankany Nosy Komba' },
      { time: '14:30', activity: 'Fihaonana amin\'ny gidro Macaco' },
      { time: '16:30', activity: 'Fiverenana any Nosy Be' },
    ],
    maxParticipants: 12,
  },
  {
    id: 'lokobe',
    key: 'lokobe',
    images: [lokobeImg, nosyIranjaImg, heroImage],
    location: 'Nosy Be',
    region: 'Nord-Ouest Madagascar',
    includedFr: ['Transport en pirogue traditionnelle', 'Guide naturaliste', 'Droits d\'entrée', 'Déjeuner traditionnel'],
    includedEn: ['Traditional canoe transport', 'Naturalist guide', 'Entrance fees', 'Traditional lunch'],
    includedMg: ['Fitaterana lakana nentim-paharazana', 'Mpitarika naturalista', 'Saran-dalana', 'Sakafo atoandro nentim-paharazana'],
    programFr: [
      { time: '07:30', activity: 'Départ en pirogue traditionnelle' },
      { time: '08:30', activity: 'Arrivée à l\'entrée de la réserve de Lokobe' },
      { time: '09:00', activity: 'Randonnée dans la forêt primaire' },
      { time: '11:00', activity: 'Observation des lémuriens noirs et caméléons' },
      { time: '12:30', activity: 'Déjeuner traditionnel dans un village' },
      { time: '14:00', activity: 'Visite des plantes médicinales et ylang-ylang' },
      { time: '15:30', activity: 'Retour en pirogue à Nosy Be' },
    ],
    programEn: [
      { time: '07:30', activity: 'Departure by traditional canoe' },
      { time: '08:30', activity: 'Arrival at Lokobe reserve entrance' },
      { time: '09:00', activity: 'Hike in the primary forest' },
      { time: '11:00', activity: 'Observation of black lemurs and chameleons' },
      { time: '12:30', activity: 'Traditional lunch in a village' },
      { time: '14:00', activity: 'Visit to medicinal plants and ylang-ylang' },
      { time: '15:30', activity: 'Return by canoe to Nosy Be' },
    ],
    programMg: [
      { time: '07:30', activity: 'Fiaingana amin\'ny lakana nentim-paharazana' },
      { time: '08:30', activity: 'Fahatongavana eo amin\'ny fidirana ao Lokobe' },
      { time: '09:00', activity: 'Fitsangatsanganana ao anaty ala voalohany' },
      { time: '11:00', activity: 'Fijerena gidro mainty sy tana' },
      { time: '12:30', activity: 'Sakafo atoandro nentim-paharazana ao amin\'ny tanàna' },
      { time: '14:00', activity: 'Fitsidihana ny zavamaniry fanafody sy ylang-ylang' },
      { time: '15:30', activity: 'Fiverenana amin\'ny lakana any Nosy Be' },
    ],
    maxParticipants: 8,
  },
  {
    id: 'route-cacao',
    key: 'routeCacao',
    images: [routeCacaoImg, montagneAmbreImg, heroImage],
    location: 'Ambanja',
    region: 'Nord Madagascar',
    includedFr: ['Transport en 4x4', 'Guide francophone', 'Visite plantation', 'Dégustation cacao et chocolat', 'Déjeuner'],
    includedEn: ['4x4 transport', 'French-speaking guide', 'Plantation visit', 'Cocoa and chocolate tasting', 'Lunch'],
    includedMg: ['Fitaterana 4x4', 'Mpitarika miteny frantsay', 'Fitsidihana plantation', 'Fanandramana kakao sy chocolat', 'Sakafo atoandro'],
    programFr: [
      { time: '06:00', activity: 'Départ vers Ambanja' },
      { time: '09:00', activity: 'Arrivée à la plantation de cacao Millot' },
      { time: '09:30', activity: 'Découverte du processus de fabrication du chocolat' },
      { time: '11:30', activity: 'Dégustation de chocolat artisanal' },
      { time: '12:30', activity: 'Déjeuner dans la plantation' },
      { time: '14:00', activity: 'Visite des cultures d\'ylang-ylang et poivre' },
      { time: '16:00', activity: 'Retour' },
    ],
    programEn: [
      { time: '06:00', activity: 'Departure to Ambanja' },
      { time: '09:00', activity: 'Arrival at Millot cocoa plantation' },
      { time: '09:30', activity: 'Discovery of the chocolate manufacturing process' },
      { time: '11:30', activity: 'Artisanal chocolate tasting' },
      { time: '12:30', activity: 'Lunch at the plantation' },
      { time: '14:00', activity: 'Visit to ylang-ylang and pepper crops' },
      { time: '16:00', activity: 'Return' },
    ],
    programMg: [
      { time: '06:00', activity: 'Fiaingana mankany Ambanja' },
      { time: '09:00', activity: 'Fahatongavana ao amin\'ny plantation kakao Millot' },
      { time: '09:30', activity: 'Fahitana ny fomba fanamboarana chocolat' },
      { time: '11:30', activity: 'Fanandramana chocolat artisanaly' },
      { time: '12:30', activity: 'Sakafo atoandro ao amin\'ny plantation' },
      { time: '14:00', activity: 'Fitsidihana ny fambolena ylang-ylang sy dipoavatra' },
      { time: '16:00', activity: 'Fiverenana' },
    ],
    maxParticipants: 12,
  },
  {
    id: 'grand-nord',
    key: 'grandNord',
    images: [montagneAmbreImg, ankarana, merEmeraudeImg, tsingyRougesImg],
    location: 'Nord Madagascar',
    region: 'Nord Madagascar',
    includedFr: ['Transport en 4x4 climatisé', 'Guide francophone expert', 'Hébergements en lodges', 'Pension complète', 'Toutes les entrées', 'Équipements'],
    includedEn: ['Air-conditioned 4x4 transport', 'Expert French-speaking guide', 'Lodge accommodations', 'Full board', 'All entrance fees', 'Equipment'],
    includedMg: ['Fitaterana 4x4 misy climatisation', 'Mpitarika frantsay manan-traikefa', 'Toeram-ponenana lodges', 'Sakafo feno', 'Saran-dalana rehetra', 'Fitaovana'],
    programFr: [
      { time: 'Jour 1', activity: 'Diego-Suarez - Mer d\'Émeraude' },
      { time: 'Jour 2', activity: 'Montagne d\'Ambre - Forêt tropicale' },
      { time: 'Jour 3', activity: 'Tsingy Rouges - Lac Sacré' },
      { time: 'Jour 4', activity: 'Ankarana - Tsingy et grottes' },
      { time: 'Jour 5', activity: 'Route du Cacao - Ambanja' },
      { time: 'Jour 6', activity: 'Nosy Be - Lokobe' },
      { time: 'Jour 7', activity: 'Nosy Iranja - Retour' },
    ],
    programEn: [
      { time: 'Day 1', activity: 'Diego-Suarez - Emerald Sea' },
      { time: 'Day 2', activity: 'Amber Mountain - Tropical forest' },
      { time: 'Day 3', activity: 'Red Tsingy - Sacred Lake' },
      { time: 'Day 4', activity: 'Ankarana - Tsingy and caves' },
      { time: 'Day 5', activity: 'Cocoa Route - Ambanja' },
      { time: 'Day 6', activity: 'Nosy Be - Lokobe' },
      { time: 'Day 7', activity: 'Nosy Iranja - Return' },
    ],
    programMg: [
      { time: 'Andro 1', activity: 'Diego-Suarez - Ranomasina Safira' },
      { time: 'Andro 2', activity: 'Ambohitra - Ala tropikaly' },
      { time: 'Andro 3', activity: 'Tsingy Mena - Farihy Masina' },
      { time: 'Andro 4', activity: 'Ankarana - Tsingy sy zohy' },
      { time: 'Andro 5', activity: 'Lalana Kakao - Ambanja' },
      { time: 'Andro 6', activity: 'Nosy Be - Lokobe' },
      { time: 'Andro 7', activity: 'Nosy Iranja - Fiverenana' },
    ],
    maxParticipants: 6,
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

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const excursion = excursionsData.find(e => e.id === id);

  if (!excursion) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-serif text-navy mb-4">Excursion non trouvée</h1>
            <Link to="/expeditions" className="text-azure hover:underline">
              Retour aux expéditions
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const data = t.excursions[excursion.key];
  const included = language === 'en' ? excursion.includedEn : language === 'mg' ? excursion.includedMg : excursion.includedFr;
  const program = language === 'en' ? excursion.programEn : language === 'mg' ? excursion.programMg : excursion.programFr;

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
      {/* Back Button */}
      <div className="bg-white border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <Link 
            to="/expeditions" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-navy transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Retour aux expéditions</span>
          </Link>
        </div>
      </div>

      {/* Hero Gallery */}
      <section className="relative h-[60vh] min-h-[500px] bg-navy overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-navy/30" />
        
        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Thumbnails */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {excursion.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-azure text-sm font-medium tracking-widest uppercase mb-4">
              <MapPin className="w-4 h-4" />
              {excursion.location}
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-medium mb-2">
              {data.title}
            </h1>
            {'titleMg' in data && data.titleMg && (
              <p className="text-white/60 text-lg italic">{data.titleMg}</p>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <div>
                <h2 className="font-serif text-2xl text-navy mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {data.description}
                </p>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-muted/30 rounded-lg">
                  <Clock className="w-6 h-6 text-azure mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Durée</p>
                  <p className="font-medium text-navy">{data.duration}</p>
                </div>
                <div className="text-center p-6 bg-muted/30 rounded-lg">
                  <CircleDot className="w-6 h-6 text-azure mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Niveau</p>
                  <p className="font-medium text-navy">{data.difficulty}</p>
                </div>
                <div className="text-center p-6 bg-muted/30 rounded-lg">
                  <Users className="w-6 h-6 text-azure mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Groupe</p>
                  <p className="font-medium text-navy">Max {excursion.maxParticipants}</p>
                </div>
                <div className="text-center p-6 bg-muted/30 rounded-lg">
                  <Star className="w-6 h-6 text-azure mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Prix</p>
                  <p className="font-medium text-navy">{data.price}€</p>
                </div>
              </div>

              {/* Program */}
              <div>
                <h2 className="font-serif text-2xl text-navy mb-6">Programme</h2>
                <div className="space-y-4">
                  {program.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4 items-start"
                    >
                      <div className="flex-shrink-0 w-20 text-azure font-medium text-sm">
                        {item.time}
                      </div>
                      <div className="flex-1 pb-4 border-b border-border/50 last:border-0">
                        <p className="text-navy">{item.activity}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Included */}
              <div>
                <h2 className="font-serif text-2xl text-navy mb-6">Inclus dans le prix</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {included.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-azure flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Booking Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-muted/30 rounded-xl p-8">
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">{t.common.from}</p>
                  <p className="font-serif text-4xl text-navy">{data.price}€</p>
                  <p className="text-sm text-muted-foreground">{t.common.perPerson}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder={t.contact.form.name}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-azure/50"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder={t.contact.form.email}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-azure/50"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder={t.contact.form.phone}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-azure/50"
                    />
                  </div>
                  <div>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-azure/50"
                    />
                  </div>
                  <div>
                    <select
                      value={formData.participants}
                      onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-azure/50"
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
                      className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-azure/50 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-azure text-navy font-medium py-4 rounded-lg hover:bg-azure/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Réserver via WhatsApp
                  </button>
                </form>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Réponse garantie sous 24h
                </p>
              </div>
            </div>
          </div>
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
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
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
