import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, Search } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { tours, getToursByRegion, Region } from '@/lib/data';

// Use first tour image for hero
import merEmeraudeImg from '@/assets/excursions/mer-emeraude.jpg';
type FilterKey = 'all' | Region;
export default function Expeditions() {
  const {
    t,
    language
  } = useLanguage();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get filters from URL
  const urlRegion = searchParams.get('region') as FilterKey | null;
  const urlLocation = searchParams.get('location');
  const urlTheme = searchParams.get('theme');
  const urlDuration = searchParams.get('duration');
  const [activeFilter, setActiveFilter] = useState<FilterKey>(urlRegion || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  // Set region based on location param from Hero search
  useEffect(() => {
    if (urlLocation) {
      if (urlLocation === 'Diego-Suarez' || urlLocation === 'Anivorano') {
        setActiveFilter('diego');
      } else if (urlLocation === 'Nosy Be') {
        setActiveFilter('nosybe');
      }
    }
  }, [urlLocation]);
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Sync URL with filter changes
  const handleFilterChange = (filter: FilterKey) => {
    setActiveFilter(filter);
    const params = new URLSearchParams(searchParams);
    if (filter === 'all') {
      params.delete('region');
    } else {
      params.set('region', filter);
    }
    if (searchQuery) {
      params.set('q', searchQuery);
    } else {
      params.delete('q');
    }
    setSearchParams(params);
  };
  const filters: {
    key: FilterKey;
    label: string;
    labelEn: string;
  }[] = [{
    key: 'all',
    label: 'Toutes les expéditions',
    labelEn: 'All expeditions'
  }, {
    key: 'diego',
    label: 'Diego-Suarez',
    labelEn: 'Diego-Suarez'
  }, {
    key: 'nosybe',
    label: 'Nosy Be',
    labelEn: 'Nosy Be'
  }, {
    key: 'circuits',
    label: t.sections.toursTitle,
    labelEn: 'Tours'
  }];

  // Filter by region and search query
  const filteredExcursions = useMemo(() => {
    let results = activeFilter === 'all' ? tours : getToursByRegion(activeFilter as Region);

    // Filter by search query if present
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(tour => {
        const data = t.excursions[tour.titleKey];
        return data.title.toLowerCase().includes(query) || data.description.toLowerCase().includes(query) || tour.location.toLowerCase().includes(query);
      });
    }
    return results;
  }, [activeFilter, searchQuery, t.excursions]);
  const noResultsText = language === 'en' ? 'No expedition matches your criteria.' : language === 'mg' ? 'Tsy misy fitsangatsanganana mifanaraka amin\'ny fepetra napetrakao.' : 'Aucune expédition ne correspond à vos critères.';
  return <Layout>
      {/* Hero - Style Black & Gold */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-navy">
        <div className="absolute inset-0 z-0">
          <img src={merEmeraudeImg} alt="Expeditions" className="w-full h-full object-cover opacity-40" style={{
          animation: 'kenburns 20s ease-in-out infinite alternate'
        }} />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/30 to-navy/90" />
        </div>
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <motion.span initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="inline-block text-gold text-sm font-medium tracking-[0.3em] uppercase mb-6">
            {t.sections.forYou}
          </motion.span>
          <motion.h1 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.1
        }} className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-6">
            {t.nav.expeditions}
          </motion.h1>
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }} className="text-lg md:text-xl text-zinc max-w-2xl mx-auto leading-relaxed">
            {t.sections.featuredSubtitle}
          </motion.p>
        </div>
      </section>

      {/* Sticky Filter Bar - Black & Gold Style */}
      <section className="sticky top-0 z-40 bg-navy border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between gap-4 py-4">
            {/* Search Input */}
            
            
            {/* Filter Tabs */}
            <div className="flex items-center gap-6 overflow-x-auto">
              {filters.map(filter => <button key={filter.key} onClick={() => handleFilterChange(filter.key)} className={`relative text-sm font-medium tracking-wide whitespace-nowrap transition-colors ${activeFilter === filter.key ? 'text-gold' : 'text-zinc hover:text-white'}`}>
                  {language === 'en' ? filter.labelEn : filter.label}
                  {activeFilter === filter.key && <motion.div layoutId="activeFilter" className="absolute -bottom-4 left-0 right-0 h-0.5 bg-gold" transition={{
                type: 'spring',
                bounce: 0.2,
                duration: 0.6
              }} />}
                </button>)}
            </div>
          </div>
        </div>
      </section>

      {/* Expeditions Grid - Portrait Cards Black & Gold Style */}
      <section className="py-24 lg:py-32 bg-navy">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* No Results Message */}
          {filteredExcursions.length === 0 ? <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
                <Search className="w-8 h-8 text-gold" />
              </div>
              <p className="text-gold text-xl font-serif mb-4">{noResultsText}</p>
              <button onClick={() => {
            setSearchQuery('');
            handleFilterChange('all');
          }} className="text-zinc hover:text-white transition-colors text-sm">
                {language === 'en' ? 'Clear filters' : 'Effacer les filtres'}
              </button>
            </motion.div> : <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <AnimatePresence mode="popLayout">
              {filteredExcursions.map((excursion, index) => {
              const data = t.excursions[excursion.titleKey];
              return <motion.div key={excursion.id} layout initial={{
                opacity: 0,
                y: 30
              }} animate={{
                opacity: 1,
                y: 0
              }} exit={{
                opacity: 0,
                scale: 0.95
              }} transition={{
                duration: 0.4,
                delay: index * 0.08
              }}>
                    <Link to={`/expeditions/${excursion.slug}`} className="block group">
                      {/* Portrait Image Container */}
                      <div className="relative aspect-[3/4] overflow-hidden mb-6 border border-border hover:border-gold/40 transition-colors">
                        <img src={excursion.image} alt={data.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                        {/* Subtle overlay on hover */}
                        <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 transition-colors duration-500" />
                        
                        {/* Exclusive badge */}
                        {'exclusive' in data && data.exclusive && <div className="absolute top-4 left-4 bg-gold text-navy text-xs font-medium tracking-wider uppercase px-3 py-1.5">
                            {data.exclusive}
                          </div>}
                      </div>
                      
                      {/* Content - Minimal Typography */}
                      <div className="space-y-3">
                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-gold text-xs font-medium tracking-widest uppercase">
                          <MapPin className="w-3 h-3" />
                          {excursion.location}
                        </div>
                        
                        {/* Title */}
                        <h3 className="font-serif text-2xl lg:text-3xl font-medium text-white group-hover:text-gold transition-colors">
                          {data.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-zinc text-sm leading-relaxed line-clamp-2">
                          {data.description}
                        </p>
                        
                        {/* Meta - Minimal uppercase */}
                        <div className="flex items-center gap-4 text-xs text-zinc tracking-wider uppercase pt-2">
                          <span>{data.duration}</span>
                          <span className="w-1 h-1 rounded-full bg-gold/30" />
                          <span>{data.difficulty}</span>
                        </div>
                        
                        {/* Price & CTA */}
                        <div className="flex items-center justify-between pt-4 border-t border-gold/20">
                          <div className="flex items-baseline gap-1">
                            <span className="text-xs text-zinc tracking-wider uppercase">{t.common.from}</span>
                            <span className="font-serif text-2xl text-gold">{data.price}</span>
                            <span className="text-sm text-zinc">€</span>
                          </div>
                          <span className="flex items-center gap-2 text-sm font-medium text-white group-hover:text-gold transition-colors">
                            {t.common.discover}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>;
            })}
            </AnimatePresence>
          </motion.div>}
        </div>
      </section>

      {/* Ken Burns animation */}
      <style>{`
        @keyframes kenburns {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
      `}</style>
    </Layout>;
}