import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';

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

export default function Gallery() {
  const { t } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

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

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-navy">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Gallery" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 to-navy/90" />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-title mb-4"
          >
            {t.gallery.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            {t.gallery.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="break-inside-avoid"
              >
                <button
                  onClick={() => openLightbox(index)}
                  className="relative group w-full overflow-hidden rounded-lg block"
                >
                  <img 
                    src={image.src}
                    alt={image.alt}
                    className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                      index % 3 === 0 ? 'h-64' : index % 3 === 1 ? 'h-80' : 'h-72'
                    }`}
                  />
                  <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-colors flex items-end">
                    <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                      <p className="text-white font-serif text-lg">{image.alt}</p>
                      <p className="text-azure text-sm">{image.category}</p>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button 
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white hover:text-azure transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            {/* Navigation */}
            <button 
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
            
            {/* Image */}
            <motion.img
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={images[selectedIndex].src}
              alt={images[selectedIndex].alt}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Caption */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-white">
              <p className="font-serif text-xl">{images[selectedIndex].alt}</p>
              <p className="text-azure text-sm mt-1">{selectedIndex + 1} / {images.length}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
