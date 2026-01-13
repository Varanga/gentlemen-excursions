import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, CircleDot } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Link } from 'react-router-dom';

// Import excursion images
import merEmeraudeImg from '@/assets/excursions/mer-emeraude.jpg';
import troisBaiesImg from '@/assets/excursions/trois-baies.jpg';
import montagneAmbreImg from '@/assets/excursions/montagne-ambre.jpg';
import nosyIranjaImg from '@/assets/excursions/nosy-iranja.jpg';

interface Excursion {
  image: string;
  titleKey: 'merEmeraude' | 'troisBaies' | 'montagneAmbre' | 'nosyIranja';
  location: string;
}

const excursions: Excursion[] = [
  { image: merEmeraudeImg, titleKey: 'merEmeraude', location: 'Diego-Suarez' },
  { image: troisBaiesImg, titleKey: 'troisBaies', location: 'Diego-Suarez' },
  { image: montagneAmbreImg, titleKey: 'montagneAmbre', location: 'Diego-Suarez' },
  { image: nosyIranjaImg, titleKey: 'nosyIranja', location: 'Nosy Be' },
];

export default function SelectionCarousel() {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(0);
  const [activeTab, setActiveTab] = useState<'inspirations' | 'departures'>('inspirations');
  
  const itemsPerPage = 3;
  const totalPages = Math.ceil(excursions.length / itemsPerPage);
  
  const visibleExcursions = excursions.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="py-24 lg:py-32 bg-background relative">
      {/* Left Navigation Panel */}
      <div className="absolute left-0 top-0 bottom-0 w-16 lg:w-24 bg-azure flex flex-col items-center justify-center gap-6 z-10">
        <button 
          onClick={nextPage}
          className="w-12 h-12 rounded-full border-2 border-navy/30 flex items-center justify-center hover:bg-navy/10 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-navy" />
        </button>
        <button 
          onClick={prevPage}
          className="w-12 h-12 rounded-full border-2 border-navy/30 flex items-center justify-center hover:bg-navy/10 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-navy" />
        </button>
        
        {/* Page Indicator */}
        <div className="mt-8">
          <span className="text-4xl lg:text-5xl font-serif font-medium text-navy">
            {String(currentPage + 1).padStart(2, '0')}
          </span>
          <span className="text-lg text-navy/40 ml-1">
            {String(totalPages).padStart(2, '0')}
          </span>
        </div>
      </div>
      
      <div className="container mx-auto px-6 lg:px-12 pl-24 lg:pl-36">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-azure-dark text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
            {t.sections.forYou}
          </span>
          <h2 className="section-title text-navy mb-8">
            {t.sections.ourSelection}
          </h2>
          
          {/* Tabs */}
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={() => setActiveTab('inspirations')}
              className={`text-base font-medium pb-2 border-b-2 transition-colors ${
                activeTab === 'inspirations' 
                  ? 'text-navy border-azure-dark' 
                  : 'text-muted-foreground border-transparent hover:text-navy'
              }`}
            >
              {t.sections.inspirations}
            </button>
            <span className="text-muted-foreground">•</span>
            <button
              onClick={() => setActiveTab('departures')}
              className={`text-base font-medium pb-2 border-b-2 transition-colors ${
                activeTab === 'departures' 
                  ? 'text-navy border-azure-dark' 
                  : 'text-muted-foreground border-transparent hover:text-navy'
              }`}
            >
              {t.sections.confirmedDepartures}
            </button>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="wait">
            {visibleExcursions.map((excursion, index) => {
              const excursionData = t.excursions[excursion.titleKey];
              return (
                <motion.div
                  key={`${currentPage}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link 
                    to="/expeditions" 
                    className="block bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={excursion.image} 
                        alt={excursionData.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-serif text-xl font-medium text-navy mb-1">
                        {excursionData.title}
                      </h3>
                      <p className="text-azure-dark text-sm mb-3">
                        {excursion.location}
                      </p>
                      
                      {/* Meta */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {excursionData.duration}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <CircleDot className="w-4 h-4" />
                          {excursionData.difficulty}
                        </span>
                      </div>
                      
                      {/* Price */}
                      <div className="border-t border-border pt-4">
                        <span className="text-sm text-muted-foreground">{t.common.from}</span>
                        <p className="text-2xl font-serif text-azure-dark">
                          {excursionData.price} €
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
