import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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

type ExcursionKey = 'merEmeraude' | 'troisBaies' | 'montagneAmbre' | 'tsingyRouges' | 'ankarana' | 'nosyIranja' | 'lokobe' | 'routeCacao';

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
    id: '1',
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
    id: '2',
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
    id: '3',
    key: 'montagneAmbre',
    images: [montagneAmbreImg, lokobeImg, heroImage],
    location: 'Diego-Suarez',
    region: 'Nord Madagascar',
    includedFr: ['Transport en 4x4', 'Guide naturaliste', 'Droits d\'entrée au parc', 'Pique-nique', 'Eau minérale'],
    includedEn: ['4x4 transport', 'Naturalist guide', 'Park entrance fees', 'Picnic', 'Mineral water'],
    includedMg: ['Fitaterana 4x4', 'Mpitarika naturalista', 'Saran-dalana parc', 'Pique-nique', 'Rano mineraly'],
    programFr: [
      { time: '06:30', activity: 'Départ de Diego-Suarez' },
      { time: '08:00', activity: 'Arrivée au Parc National' },
      { time: '08:30', activity: 'Randonnée vers les cascades' },
      { time: '11:00', activity: 'Observation des lémuriens et caméléons' },
      { time: '12:30', activity: 'Pique-nique près du lac' },
      { time: '14:00', activity: 'Visite du Lac Vert' },
      { time: '16:00', activity: 'Retour à Diego-Suarez' },
    ],
    programEn: [
      { time: '06:30', activity: 'Departure from Diego-Suarez' },
      { time: '08:00', activity: 'Arrival at the National Park' },
      { time: '08:30', activity: 'Hike to the waterfalls' },
      { time: '11:00', activity: 'Observation of lemurs and chameleons' },
      { time: '12:30', activity: 'Picnic by the lake' },
      { time: '14:00', activity: 'Visit to the Green Lake' },
      { time: '16:00', activity: 'Return to Diego-Suarez' },
    ],
    programMg: [
      { time: '06:30', activity: 'Fiaingana avy any Diego-Suarez' },
      { time: '08:00', activity: 'Fahatongavana ao amin\'ny Parc Nasionaly' },
      { time: '08:30', activity: 'Fitsangatsanganana mankany amin\'ny riandrano' },
      { time: '11:00', activity: 'Fijerena gidro sy tana' },
      { time: '12:30', activity: 'Pique-nique akaikin\'ny farihy' },
      { time: '14:00', activity: 'Fitsidihana ny Farihy Maitso' },
      { time: '16:00', activity: 'Fiverenana any Diego-Suarez' },
    ],
    maxParticipants: 8,
  },
  {
    id: '4',
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
      { time: '10:00', activity: 'Visite guidée des formations' },
      { time: '12:00', activity: 'Temps libre pour photos' },
      { time: '13:00', activity: 'Déjeuner (non inclus)' },
      { time: '15:00', activity: 'Retour à Diego-Suarez' },
    ],
    programEn: [
      { time: '07:00', activity: 'Departure from Diego-Suarez' },
      { time: '09:30', activity: 'Arrival at the Red Tsingy' },
      { time: '10:00', activity: 'Guided tour of the formations' },
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
    id: '5',
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
    id: '6',
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
      { time: '11:30', activity: 'Traversée de la langue de sable' },
      { time: '12:30', activity: 'Déjeuner sur la plage' },
      { time: '14:00', activity: 'Snorkeling et baignade' },
      { time: '16:00', activity: 'Retour à Nosy Be' },
    ],
    programEn: [
      { time: '08:00', activity: 'Departure from Nosy Be by boat' },
      { time: '09:30', activity: 'Arrival at Nosy Iranja' },
      { time: '10:00', activity: 'Discovery of turtle island' },
      { time: '11:30', activity: 'Crossing the sandbank' },
      { time: '12:30', activity: 'Beach lunch' },
      { time: '14:00', activity: 'Snorkeling and swimming' },
      { time: '16:00', activity: 'Return to Nosy Be' },
    ],
    programMg: [
      { time: '08:00', activity: 'Fiaingana avy Nosy Be amin\'ny sambo' },
      { time: '09:30', activity: 'Fahatongavana ao Nosy Iranja' },
      { time: '10:00', activity: 'Fahitana ny nosy sokatra' },
      { time: '11:30', activity: 'Fiampitana ny fasika' },
      { time: '12:30', activity: 'Sakafo atoandro eny amoron-dranomasina' },
      { time: '14:00', activity: 'Snorkeling sy filomanosana' },
      { time: '16:00', activity: 'Fiverenana any Nosy Be' },
    ],
    maxParticipants: 10,
  },
  {
    id: '7',
    key: 'lokobe',
    images: [lokobeImg, nosyIranjaImg, heroImage],
    location: 'Nosy Be',
    region: 'Nord-Ouest Madagascar',
    includedFr: ['Transport en pirogue', 'Guide naturaliste', 'Droits d\'entrée', 'Déjeuner traditionnel'],
    includedEn: ['Canoe transport', 'Naturalist guide', 'Entrance fees', 'Traditional lunch'],
    includedMg: ['Fitaterana lakana', 'Mpitarika naturalista', 'Saran-dalana', 'Sakafo atoandro nentim-paharazana'],
    programFr: [
      { time: '07:30', activity: 'Départ en pirogue' },
      { time: '08:30', activity: 'Arrivée à Lokobe' },
      { time: '09:00', activity: 'Randonnée en forêt primaire' },
      { time: '11:00', activity: 'Observation des lémuriens noirs' },
      { time: '12:30', activity: 'Déjeuner traditionnel' },
      { time: '14:00', activity: 'Visite des plantes médicinales' },
      { time: '15:30', activity: 'Retour à Nosy Be' },
    ],
    programEn: [
      { time: '07:30', activity: 'Departure by canoe' },
      { time: '08:30', activity: 'Arrival at Lokobe' },
      { time: '09:00', activity: 'Hike in primary forest' },
      { time: '11:00', activity: 'Black lemur observation' },
      { time: '12:30', activity: 'Traditional lunch' },
      { time: '14:00', activity: 'Visit to medicinal plants' },
      { time: '15:30', activity: 'Return to Nosy Be' },
    ],
    programMg: [
      { time: '07:30', activity: 'Fiaingana amin\'ny lakana' },
      { time: '08:30', activity: 'Fahatongavana ao Lokobe' },
      { time: '09:00', activity: 'Fitsangatsanganana ao anaty ala voalohany' },
      { time: '11:00', activity: 'Fijerena gidro mainty' },
      { time: '12:30', activity: 'Sakafo atoandro nentim-paharazana' },
      { time: '14:00', activity: 'Fitsidihana ny zavamaniry fanafody' },
      { time: '15:30', activity: 'Fiverenana any Nosy Be' },
    ],
    maxParticipants: 8,
  },
  {
    id: '8',
    key: 'routeCacao',
    images: [routeCacaoImg, montagneAmbreImg, heroImage],
    location: 'Ambanja',
    region: 'Nord Madagascar',
    includedFr: ['Transport en 4x4', 'Guide francophone', 'Visite plantation', 'Dégustation cacao', 'Déjeuner'],
    includedEn: ['4x4 transport', 'French-speaking guide', 'Plantation visit', 'Cocoa tasting', 'Lunch'],
    includedMg: ['Fitaterana 4x4', 'Mpitarika miteny frantsay', 'Fitsidihana plantation', 'Fanandramana kakao', 'Sakafo atoandro'],
    programFr: [
      { time: '06:00', activity: 'Départ vers Ambanja' },
      { time: '09:00', activity: 'Arrivée à la plantation de cacao' },
      { time: '09:30', activity: 'Découverte du processus de fabrication' },
      { time: '11:30', activity: 'Dégustation de chocolat artisanal' },
      { time: '12:30', activity: 'Déjeuner dans la plantation' },
      { time: '14:00', activity: 'Visite des cultures d\'ylang-ylang' },
      { time: '16:00', activity: 'Retour' },
    ],
    programEn: [
      { time: '06:00', activity: 'Departure to Ambanja' },
      { time: '09:00', activity: 'Arrival at the cocoa plantation' },
      { time: '09:30', activity: 'Discovery of the manufacturing process' },
      { time: '11:30', activity: 'Artisanal chocolate tasting' },
      { time: '12:30', activity: 'Lunch at the plantation' },
      { time: '14:00', activity: 'Visit to ylang-ylang crops' },
      { time: '16:00', activity: 'Return' },
    ],
    programMg: [
      { time: '06:00', activity: 'Fiaingana mankany Ambanja' },
      { time: '09:00', activity: 'Fahatongavana ao amin\'ny plantation kakao' },
      { time: '09:30', activity: 'Fahitana ny fomba fanamboarana' },
      { time: '11:30', activity: 'Fanandramana chocolat artisanaly' },
      { time: '12:30', activity: 'Sakafo atoandro ao amin\'ny plantation' },
      { time: '14:00', activity: 'Fitsidihana ny fambolena ylang-ylang' },
      { time: '16:00', activity: 'Fiverenana' },
    ],
    maxParticipants: 12,
  },
];

export default function ExcursionDetail() {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
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

  const excursion = excursionsData.find(e => e.id === id);

  if (!excursion) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-serif text-navy mb-4">Excursion non trouvée</h1>
            <Link to="/expeditions" className="text-azure-dark hover:underline">
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
    const message = `Demande de réservation - ${data.title}
Nom: ${formData.name}
Email: ${formData.email}
Téléphone: ${formData.phone}
Date souhaitée: ${formData.date}
Participants: ${formData.participants}
Message: ${formData.message}`;
    
    const whatsappUrl = `https://wa.me/261320000000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Layout>
      {/* Back Button */}
      <div className="bg-sand py-4">
        <div className="container mx-auto px-6 lg:px-12">
          <Link 
            to="/expeditions" 
            className="inline-flex items-center gap-2 text-navy hover:text-azure-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === 'en' ? 'Back to expeditions' : language === 'mg' ? 'Hiverina any amin\'ny fitsangatsanganana' : 'Retour aux expéditions'}
          </Link>
        </div>
      </div>

      {/* Gallery */}
      <section className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
          {/* Main Image */}
          <div 
            className="relative h-[50vh] lg:h-[70vh] cursor-pointer group"
            onClick={() => setShowLightbox(true)}
          >
            <img 
              src={excursion.images[currentImageIndex]}
              alt={data.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/40 transition-colors flex items-center justify-center">
              <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                {language === 'en' ? 'View gallery' : language === 'mg' ? 'Hijery galeria' : 'Voir la galerie'}
              </span>
            </div>
            
            {/* Navigation */}
            <button 
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-navy" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-navy" />
            </button>
            
            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {excursion.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Thumbnails */}
          <div className="hidden lg:grid grid-cols-2 gap-1">
            {excursion.images.slice(1, 3).map((img, index) => (
              <div 
                key={index}
                className="relative h-[35vh] cursor-pointer group"
                onClick={() => { setCurrentImageIndex(index + 1); setShowLightbox(true); }}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-20 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 text-azure-dark text-sm mb-3">
                  <MapPin className="w-4 h-4" />
                  {excursion.location} • {excursion.region}
                </div>
                <h1 className="font-serif text-4xl lg:text-5xl font-medium text-navy mb-4">
                  {data.title}
                </h1>
                {'titleMg' in data && data.titleMg && language !== 'mg' && (
                  <p className="text-azure-dark text-lg italic">{data.titleMg}</p>
                )}
                <p className="text-lg text-muted-foreground mt-4">
                  {data.description}
                </p>
                
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-azure-dark" />
                    <span className="text-navy font-medium">{data.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CircleDot className="w-5 h-5 text-azure-dark" />
                    <span className="text-navy font-medium">{data.difficulty}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-azure-dark" />
                    <span className="text-navy font-medium">Max {excursion.maxParticipants} pers.</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-azure text-azure" />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">(4.9)</span>
                  </div>
                </div>
              </div>

              {/* Program */}
              <div>
                <h2 className="font-serif text-2xl font-medium text-navy mb-6">
                  {language === 'en' ? 'Program' : language === 'mg' ? 'Programa' : 'Programme'}
                </h2>
                <div className="space-y-4">
                  {program.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-azure/20 flex items-center justify-center">
                          <Clock className="w-4 h-4 text-azure-dark" />
                        </div>
                        {index < program.length - 1 && (
                          <div className="w-px h-full bg-azure/30 my-2" />
                        )}
                      </div>
                      <div className="pb-4">
                        <p className="text-azure-dark font-medium text-sm">{item.time}</p>
                        <p className="text-navy">{item.activity}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Included */}
              <div>
                <h2 className="font-serif text-2xl font-medium text-navy mb-6">
                  {language === 'en' ? 'Included' : language === 'mg' ? 'Tafiditra' : 'Inclus'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {included.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-green-600" />
                      </div>
                      <span className="text-navy">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Booking Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-white rounded-xl shadow-lg p-6 lg:p-8 border border-border">
                {/* Price */}
                <div className="text-center mb-6 pb-6 border-b border-border">
                  <p className="text-sm text-muted-foreground">{t.common.from}</p>
                  <p className="text-4xl font-serif text-navy">
                    {data.price} €
                  </p>
                  <p className="text-sm text-muted-foreground">{t.common.perPerson}</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">
                      {t.contact.form.name}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-azure-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">
                      {t.contact.form.email}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-azure-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">
                      {t.contact.form.phone}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-azure-dark"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-azure-dark"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1">
                        {language === 'en' ? 'Travelers' : language === 'mg' ? 'Mpandeha' : 'Voyageurs'}
                      </label>
                      <select
                        value={formData.participants}
                        onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-azure-dark"
                      >
                        {Array.from({ length: excursion.maxParticipants }, (_, i) => i + 1).map((num) => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">
                      {t.contact.form.message}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-azure-dark resize-none"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-navy text-white py-4 font-medium hover:bg-navy-light transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {t.common.bookNow}
                  </button>
                </form>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  {language === 'en' 
                    ? 'Free cancellation up to 48h before departure' 
                    : language === 'mg'
                    ? 'Fahafahana manafoana maimaim-poana hatramin\'ny 48 ora mialoha'
                    : 'Annulation gratuite jusqu\'à 48h avant le départ'}
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
            className="fixed inset-0 z-50 bg-navy/95 flex items-center justify-center"
            onClick={() => setShowLightbox(false)}
          >
            <button 
              onClick={() => setShowLightbox(false)}
              className="absolute top-6 right-6 text-white hover:text-azure transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            <button 
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
            
            <motion.img
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={excursion.images[currentImageIndex]}
              alt={data.title}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-white">
              <p className="font-serif text-xl">{data.title}</p>
              <p className="text-azure text-sm mt-1">{currentImageIndex + 1} / {excursion.images.length}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
