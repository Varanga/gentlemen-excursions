import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import { Link, useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState<Region>('all');

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const filters: { key: Region; label: string }[] = [
    { key: 'all', label: 'Toutes les expéditions' },
    { key: 'diego', label: 'Diego-Suarez' },
    { key: 'nosybe', label: 'Nosy Be' },
    { key: 'circuits', label: t.sections.toursTitle },
  ];

  const filteredExcursions = activeFilter === 'all' 
    ? excursions 
    : excursions.filter(e => e.region === activeFilter);

  return (
    <Layout>
      {/* Hero - Style 66°Nord */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-navy">
        <div className="absolute inset-0 z-0">
          <img 
            src={merEmeraudeImg} 
            alt="Expeditions" 
            className="w-full h-full object-cover opacity-50"
            style={{ animation: 'kenburns 20s ease-in-out infinite alternate' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/20 to-navy/80" />
        </div>
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-azure text-sm font-medium tracking-[0.3em] uppercase mb-6"
          >
            {t.sections.forYou}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-6"
          >
            {t.nav.expeditions}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            {t.sections.featuredSubtitle}
          </motion.p>
        </div>
      </section>

      {/* Sticky Filter Bar - Minimaliste 66°Nord */}
      <section className="sticky top-0 z-40 bg-white border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-center gap-8 py-5 overflow-x-auto">
            {filters.map(filter => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`relative text-sm font-medium tracking-wide whitespace-nowrap transition-colors ${
                  activeFilter === filter.key
                    ? 'text-navy'
                    : 'text-muted-foreground hover:text-navy'
                }`}
              >
                {filter.label}
                {activeFilter === filter.key && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute -bottom-5 left-0 right-0 h-0.5 bg-azure"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Expeditions Grid - Portrait Cards 66°Nord Style */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          >
            <AnimatePresence mode="popLayout">
              {filteredExcursions.map((excursion, index) => {
                const data = t.excursions[excursion.titleKey];
                return (
                  <motion.div
                    key={excursion.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                  >
                    <Link 
                      to={`/expeditions/${excursion.id}`}
                      className="block group"
                    >
                      {/* Portrait Image Container */}
                      <div className="relative aspect-[3/4] overflow-hidden mb-6">
                        <img 
                          src={excursion.image} 
                          alt={data.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        {/* Subtle overlay on hover */}
                        <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-500" />
                        
                        {/* Exclusive badge */}
                        {'exclusive' in data && data.exclusive && (
                          <div className="absolute top-4 left-4 bg-azure text-navy text-xs font-medium tracking-wider uppercase px-3 py-1.5">
                            {data.exclusive}
                          </div>
                        )}
                      </div>
                      
                      {/* Content - Minimal Typography */}
                      <div className="space-y-3">
                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-azure text-xs font-medium tracking-widest uppercase">
                          <MapPin className="w-3 h-3" />
                          {excursion.location}
                        </div>
                        
                        {/* Title */}
                        <h3 className="font-serif text-2xl lg:text-3xl font-medium text-navy group-hover:text-azure transition-colors">
                          {data.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                          {data.description}
                        </p>
                        
                        {/* Meta - Minimal uppercase */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground tracking-wider uppercase pt-2">
                          <span>{data.duration}</span>
                          <span className="w-1 h-1 rounded-full bg-border" />
                          <span>{data.difficulty}</span>
                        </div>
                        
                        {/* Price & CTA */}
                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                          <div className="flex items-baseline gap-1">
                            <span className="text-xs text-muted-foreground tracking-wider uppercase">{t.common.from}</span>
                            <span className="font-serif text-2xl text-navy">{data.price}</span>
                            <span className="text-sm text-muted-foreground">€</span>
                          </div>
                          <span className="flex items-center gap-2 text-sm font-medium text-navy group-hover:text-azure transition-colors">
                            {t.common.discover}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
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

      {/* Ken Burns animation */}
      <style>{`
        @keyframes kenburns {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
      `}</style>
    </Layout>
  );
}
