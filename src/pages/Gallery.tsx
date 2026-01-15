import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import { useLocation } from 'react-router-dom';

// Import images
import heroImage from '@/assets/hero-madagascar.jpg';
import merEmeraudeImg from '@/assets/excursions/mer-emeraude.jpg';
import troisBaiesImg from '@/assets/excursions/trois-baies.jpg';
import montagneAmbreImg from '@/assets/excursions/montagne-ambre.jpg';
import tsingyRougesImg from '@/assets/excursions/tsingy-rouges.jpg';
import ankarana from '@/assets/excursions/ankarana.jpg';
import nosyIranjaImg from '@/assets/excursions/nosy-iranja.jpg';
import lokobeImg from '@/assets/excursions/lokobe.jpg';
import routeCacaoImg from '@/assets/excursions/route-cacao.jpg';

const images = [
  { src: heroImage, alt: 'Madagascar landscape', category: 'Paysages' },
  { src: merEmeraudeImg, alt: 'Mer d\'Émeraude', category: 'Diego-Suarez' },
  { src: troisBaiesImg, alt: 'Les 3 Baies', category: 'Diego-Suarez' },
  { src: montagneAmbreImg, alt: 'Montagne d\'Ambre', category: 'Diego-Suarez' },
  { src: tsingyRougesImg, alt: 'Tsingy Rouges', category: 'Diego-Suarez' },
  { src: ankarana, alt: 'Ankarana', category: 'Diego-Suarez' },
  { src: nosyIranjaImg, alt: 'Nosy Iranja', category: 'Nosy Be' },
  { src: lokobeImg, alt: 'Lokobe', category: 'Nosy Be' },
  { src: routeCacaoImg, alt: 'Route du Cacao', category: 'Circuits' },
];

// Define masonry pattern - varying heights
const getImageHeight = (index: number) => {
  const pattern = [420, 320, 380, 280, 360, 300, 400, 340, 350];
  return pattern[index % pattern.length];
};

export default function Gallery() {
  const { t } = useLanguage();
  const location = useLocation();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  
  const goNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };
  
  const goPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  return (
    <Layout>
      {/* Hero - Black & Gold Style */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-navy">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Gallery" 
            className="w-full h-full object-cover opacity-40"
            style={{ animation: 'kenburns 20s ease-in-out infinite alternate' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/30 to-navy/90" />
        </div>
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-gold text-sm font-medium tracking-[0.3em] uppercase mb-6"
          >
            Inspiration
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-6"
          >
            {t.gallery.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-zinc max-w-2xl mx-auto leading-relaxed"
          >
            {t.gallery.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Masonry Gallery - Black & Gold Modern Style */}
      <section className="bg-navy py-8">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-1 px-1">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="break-inside-avoid mb-1"
            >
              <button
                onClick={() => openLightbox(index)}
                className="relative group w-full overflow-hidden block border border-border hover:border-gold/40 transition-colors"
              >
                <img 
                  src={image.src}
                  alt={image.alt}
                  style={{ height: getImageHeight(index) }}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Minimal hover overlay */}
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/60 transition-colors duration-500 flex items-end justify-start">
                  <div className="p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white font-serif text-xl">{image.alt}</p>
                    <p className="text-gold text-sm tracking-wider uppercase mt-1">{image.category}</p>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox - Black & Gold Style */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy/98 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button 
              onClick={closeLightbox}
              className="absolute top-8 right-8 text-zinc hover:text-gold transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            {/* Navigation */}
            <button 
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center text-zinc hover:text-gold transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center text-zinc hover:text-gold transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            
            {/* Image */}
            <motion.img
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              src={images[selectedIndex].src}
              alt={images[selectedIndex].alt}
              className="max-w-[85vw] max-h-[80vh] object-contain border border-gold/20"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Caption - Gold Accent */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white">
              <p className="font-serif text-2xl mb-2">{images[selectedIndex].alt}</p>
              <p className="text-gold text-sm tracking-widest uppercase">
                {selectedIndex + 1} / {images.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
