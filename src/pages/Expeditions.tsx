import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CircleDot, MapPin, Filter } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';

// Import images
import merEmeraudeImg from '@/assets/excursions/mer-emeraude.jpg';
import troisBaiesImg from '@/assets/excursions/trois-baies.jpg';
import montagneAmbreImg from '@/assets/excursions/montagne-ambre.jpg';
import tsingyRougesImg from '@/assets/excursions/tsingy-rouges.jpg';
import ankarana from '@/assets/excursions/ankarana.jpg';
import nosyIranjaImg from '@/assets/excursions/nosy-iranja.jpg';
import lokobeImg from '@/assets/excursions/lokobe.jpg';
import routeCacaoImg from '@/assets/excursions/route-cacao.jpg';

type Region = 'all' | 'diego' | 'nosybe' | 'circuits';

interface Excursion {
  id: string;
  image: string;
  titleKey: keyof typeof import('@/i18n/translations').translations.fr.excursions;
  region: Region;
  location: string;
}

const excursions: Excursion[] = [
  { id: '1', image: merEmeraudeImg, titleKey: 'merEmeraude', region: 'diego', location: 'Diego-Suarez' },
  { id: '2', image: troisBaiesImg, titleKey: 'troisBaies', region: 'diego', location: 'Diego-Suarez' },
  { id: '3', image: montagneAmbreImg, titleKey: 'montagneAmbre', region: 'diego', location: 'Diego-Suarez' },
  { id: '4', image: tsingyRougesImg, titleKey: 'tsingyRouges', region: 'diego', location: 'Diego-Suarez' },
  { id: '5', image: ankarana, titleKey: 'ankarana', region: 'diego', location: 'Diego-Suarez' },
  { id: '6', image: nosyIranjaImg, titleKey: 'nosyIranja', region: 'nosybe', location: 'Nosy Be' },
  { id: '7', image: lokobeImg, titleKey: 'lokobe', region: 'nosybe', location: 'Nosy Be' },
  { id: '8', image: routeCacaoImg, titleKey: 'routeCacao', region: 'circuits', location: 'Nord Madagascar' },
];

export default function Expeditions() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<Region>('all');

  const filters: { key: Region; label: string }[] = [
    { key: 'all', label: 'Tous' },
    { key: 'diego', label: 'Diego-Suarez' },
    { key: 'nosybe', label: 'Nosy Be' },
    { key: 'circuits', label: t.sections.toursTitle },
  ];

  const filteredExcursions = activeFilter === 'all' 
    ? excursions 
    : excursions.filter(e => e.region === activeFilter);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-navy">
        <div className="absolute inset-0 z-0">
          <img src={merEmeraudeImg} alt="Expeditions" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 to-navy/90" />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-title mb-4"
          >
            {t.nav.expeditions}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            {t.sections.featuredSubtitle}
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-sand border-b border-border sticky top-20 lg:top-24 z-30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-navy shrink-0" />
            {filters.map(filter => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full transition-colors ${
                  activeFilter === filter.key
                    ? 'bg-navy text-white'
                    : 'bg-white text-navy hover:bg-navy/10'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Expeditions Grid */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredExcursions.map((excursion, index) => {
                const data = t.excursions[excursion.titleKey];
                return (
                  <motion.div
                    key={excursion.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link 
                      to={`/expeditions/${excursion.id}`}
                      className="block bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all group"
                    >
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={excursion.image} 
                          alt={data.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {'exclusive' in data && data.exclusive && (
                          <div className="absolute top-3 left-3 bg-azure text-navy text-xs font-medium px-3 py-1 rounded-full">
                            {data.exclusive}
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-center gap-1.5 text-azure-dark text-sm mb-2">
                          <MapPin className="w-3.5 h-3.5" />
                          {excursion.location}
                        </div>
                        <h3 className="font-serif text-xl font-medium text-navy mb-2">
                          {data.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {data.description}
                        </p>
                        
                        {/* Meta */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {data.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <CircleDot className="w-3.5 h-3.5" />
                            {data.difficulty}
                          </span>
                        </div>
                        
                        {/* Price */}
                        <div className="border-t border-border pt-4 flex items-baseline justify-between">
                          <span className="text-xs text-muted-foreground">{t.common.from}</span>
                          <p className="text-2xl font-serif text-azure-dark">
                            {data.price} €
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
