import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import { useLocation } from 'react-router-dom';

// Import images
import merEmeraudeImg from '@/assets/excursions/mer-emeraude.jpg';
import merEmeraudeImg1 from '@/assets/excursions/mer-emeraude1.jpg';
import merEmeraudeImg2 from '@/assets/excursions/mer-emeraude2.png';
import merEmeraudeImg3 from '@/assets/gallery/mer-emeraude3.jpg';
import merEmeraudeImg4 from '@/assets/gallery/mer-emeraude4.jpg';
import merEmeraudeImg5 from '@/assets/gallery/mer-emeraude5.jpg';
import merEmeraudeImg6 from '@/assets/gallery/mer-emeraude6.jpg';
import merEmeraudeImg7 from '@/assets/gallery/mer-emeraude7.jpeg';
import merEmeraudeImg8 from '@/assets/gallery/mer-emeraude8.jpg';
import merEmeraudeImg9 from '@/assets/gallery/mer-emeraude9.jpg';
import merEmeraudeImg10 from '@/assets/gallery/mer-emeraude10.jpg';
import merEmeraudeImg11 from '@/assets/gallery/mer-emeraude11.jpg';
import merEmeraudeImg12 from '@/assets/gallery/mer-emeraude12.jpg';


import troisBaiesImg from '@/assets/excursions/trois-baies.jpg';
import troisBaiesImg1 from '@/assets/excursions/trois-baies1.jpg';
import troisBaiesImg2 from '@/assets/excursions/trois-baies2.jpg';
import troisBaiesImg3 from '@/assets/gallery/trois-baies3.jpg';
import troisBaiesImg4 from '@/assets/gallery/trois-baies4.jpg';
import troisBaiesImg5 from '@/assets/gallery/trois-baies5.jpg';
import troisBaiesImg6 from '@/assets/gallery/trois-baies6.jpg';
import troisBaiesImg7 from '@/assets/gallery/trois-baies7.jpg';
import troisBaiesImg8 from '@/assets/gallery/trois-baies8.jpg';
import troisBaiesImg9 from '@/assets/gallery/trois-baies9.jpg';
import troisBaiesImg10 from '@/assets/gallery/trois-baies10.jpg';
import troisBaiesImg11 from '@/assets/gallery/trois-baies11.jpg';
import troisBaiesImg12 from '@/assets/gallery/trois-baies12.jpg';
import troisBaiesImg13 from '@/assets/gallery/trois-baies13.jpg';
import troisBaiesImg14 from '@/assets/gallery/trois-baies14.jpg';
import troisBaiesImg15 from '@/assets/gallery/trois-baies15.jpg';
import troisBaiesImg16 from '@/assets/gallery/trois-baies16.jpg';
import troisBaiesImg17 from '@/assets/gallery/trois-baies17.jpg';
import troisBaiesImg18 from '@/assets/gallery/trois-baies18.jpg';
import troisBaiesImg19 from '@/assets/gallery/trois-baies19.jpg';
import troisBaiesImg20 from '@/assets/gallery/trois-baies20.jpg';
import troisBaiesImg21 from '@/assets/gallery/trois-baies21.jpg';
import troisBaiesImg22 from '@/assets/gallery/trois-baies22.jpg';
import troisBaiesImg23 from '@/assets/gallery/trois-baies23.jpg';
import troisBaiesImg24 from '@/assets/gallery/trois-baies24.jpg';
import troisBaiesImg25 from '@/assets/gallery/trois-baies25.jpg';
import troisBaiesImg26 from '@/assets/gallery/trois-baies26.jpg';
import troisBaiesImg27 from '@/assets/gallery/trois-baies27.jpg';


import montfraImg from '@/assets/excursions/franc.jpg';
import montfraImg1 from '@/assets/excursions/franc1.jpg';
import montfraImg2 from '@/assets/excursions/franc2.jpg';
import montfraImg3 from '@/assets/gallery/franc3.jpg';


import montagneAmbreImg from '@/assets/excursions/montagne-ambre.jpg';
import montagneAmbreImg1 from '@/assets/excursions/montagne-ambre1.jpg';
import montagneAmbreImg2 from '@/assets/excursions/montagne-ambre2.jpg';
import montagneAmbreImg3 from '@/assets/gallery/montagne-ambre3.jpg';
import montagneAmbreImg4 from '@/assets/gallery/montagne-ambre4.jpg';
import montagneAmbreImg5 from '@/assets/gallery/montagne-ambre5.jpg';


import tsingyRougesImg from '@/assets/excursions/tsingy-rouges.jpg';
import tsingyRougesImg1 from '@/assets/excursions/tsingy-rouges1.jpg';
import tsingyRougesImg2 from '@/assets/excursions/tsingy-rouges2.jpg';
import tsingyRougesImg3 from '@/assets/gallery/tsingy-rouges3.jpg';
import tsingyRougesImg4 from '@/assets/gallery/tsingy-rouges4.jpg';
import tsingyRougesImg5 from '@/assets/gallery/tsingy-rouges5.jpg';



import ankarana from '@/assets/excursions/ankarana.jpg';
import ankarana1 from '@/assets/excursions/ankarana1.jpg';
import ankarana2 from '@/assets/excursions/ankarana2.jpg';
import ankarana3 from '@/assets/gallery/ankarana3.jpg';


import nosyIranjaImg from '@/assets/excursions/nosy-iranja.jpg';
import nosyIranjaImg1 from '@/assets/excursions/nosy-iranja1.jpg';
import nosyIranjaImg2 from '@/assets/excursions/nosy-iranja2.jpg';


import lokobeImg from '@/assets/excursions/lokobe.jpg';
import lokobeImg1 from '@/assets/excursions/lokobe1.jpg';
import lokobeImg2 from '@/assets/excursions/lokobe2.jpg';


import nosySakatiaImg from '@/assets/excursions/nosy-sakatia.jpg';
import nosySakatiaImg1 from '@/assets/excursions/nosy-sakatia1.jpg';
import nosySakatiaImg2 from '@/assets/excursions/nosy-sakatia2.jpg';


import haraImg from '@/assets/excursions/hara.jpg';
import haraImg1 from '@/assets/excursions/hara1.jpg';
import haraImg2 from '@/assets/excursions/hara2.jpg';


import anivorano from '@/assets/excursions/lac.jpeg';
import anivorano1 from '@/assets/excursions/lac1.jpg';
import anivorano2 from'@/assets/excursions/lac2.jpg';
import anivorano3 from '@/assets/gallery/lac3.jpg';
import anivorano4 from '@/assets/gallery/lac4.jpg';
import anivorano5 from'@/assets/gallery/lac5.jpg';


import kombaImg from '@/assets/excursions/komba.jpg';
import kombaImg1 from '@/assets/excursions/komba1.jpg';
import kombaImg2 from '@/assets/excursions/komba2.jpg';


import pecheImg from '@/assets/gallery/peche-ramena.jpg';
import pecheImg1 from '@/assets/gallery/peche-ramena1.jpg';
import pecheImg2 from '@/assets/gallery/peche-ramena2.jpg';
import pecheImg3 from '@/assets/gallery/peche-ramena3.jpg';
import pecheImg4 from '@/assets/gallery/peche-ramena4.jpg';
import pecheImg5 from '@/assets/gallery/peche-ramena5.jpg';


import teesImg from '@/assets/gallery/teeshirt.jpg';
import teesImg1 from '@/assets/gallery/teeshirt1.jpg';
import teesImg2 from '@/assets/gallery/teeshirt2.jpg';
import teesImg3 from '@/assets/gallery/teeshirt3.jpg';
import teesImg4 from '@/assets/gallery/teeshirt4.jpg';
import teesImg5 from '@/assets/gallery/teeshirt5.jpg';

const images = [
  

 
 { src: merEmeraudeImg, alt: 'Mer d\'Émeraude', category: 'Diego-Suarez' },
 { src: merEmeraudeImg1, alt: 'Mer d\'Émeraude', category: 'Diego-Suarez' },
 { src: merEmeraudeImg2, alt: 'Mer d\'Émeraude', category: 'Diego-Suarez' },
 { src: merEmeraudeImg3, alt: 'Mer d\'Émeraude', category: 'Diego-Suarez' },
 { src: merEmeraudeImg4, alt: 'Mer d\'Émeraude', category: 'Diego-Suarez' },
 { src: merEmeraudeImg5, alt: 'Mer d\'Émeraude', category: 'Diego-Suarez' },
 { src: merEmeraudeImg6, alt: 'Mer d\'Émeraude', category: 'Diego-Suarez' },
 { src: merEmeraudeImg7, alt: 'Mer d\'Émeraude', category: 'Diego-Suarez' },
 { src: merEmeraudeImg8, alt: 'Mer d\'Émeraude', category: 'Diego-Suarez' },
 { src: merEmeraudeImg9, alt: 'Mer d\'Émeraude', category: 'Diego-Suarez' },
 { src: merEmeraudeImg10, alt: 'Mer d\'Émeraude', category: 'Diego-Suarez' },
 { src: merEmeraudeImg11, alt: 'Mer d\'Émeraude', category: 'Diego-Suarez' },
 { src: merEmeraudeImg12, alt: 'Mer d\'Émeraude', category: 'Diego-Suarez' },
 
 { src: troisBaiesImg, alt: 'Les 3 Baies', category: 'Diego-Suarez' },
 { src: troisBaiesImg1, alt: 'Les 3 Baies', category: 'Diego-Suarez' },
 { src: troisBaiesImg2, alt: 'Les 3 Baies', category: 'Diego-Suarez' },
 { src: troisBaiesImg3, alt: 'Les 3 Baies', category: 'Diego-Suarez' },
 { src: troisBaiesImg4, alt: 'Les 3 Baies', category: 'Diego-Suarez' },
 { src: troisBaiesImg5, alt: 'Les 3 Baies', category: 'Diego-Suarez' },
 { src: troisBaiesImg6, alt: 'Les 3 Baies', category: 'Diego-Suarez' },
 { src: troisBaiesImg7, alt: 'Les 3 Baies', category: 'Diego-Suarez' },
 { src: troisBaiesImg8, alt: 'Les 3 Baies', category: 'Diego-Suarez' },
 { src: troisBaiesImg9, alt: 'Les 3 Baies', category: 'Diego-Suarez' },
 { src: troisBaiesImg10, alt: 'Les 3 Baies', category: 'Diego-Suarez' },
 { src: troisBaiesImg11, alt: 'Les 3 Baies', category: 'Diego-Suarez' },
 { src: troisBaiesImg12, alt: 'Les 3 Baies', category: 'Diego-Suarez' },
 { src: troisBaiesImg13, alt: 'Les 3 Baies', category: 'Diego-Suarez' },
 { src: troisBaiesImg14, alt: 'Les 3 Baies', category: 'Diego-Suarez' },
 { src: troisBaiesImg15, alt: 'Les 3 Baies', category: 'Diego-Suarez' },
 { src: troisBaiesImg16, alt: 'Les 3 Baies', category: 'Diego-Suarez' },
 { src: troisBaiesImg17, alt: 'Les 3 Baies', category: 'Diego-Suarez' },
 { src: troisBaiesImg18, alt: 'Les 3 Baies', category: 'Diego-Suarez' },
 { src: troisBaiesImg19, alt: 'Les 3 Baies', category: 'Diego-Suarez' },
 { src: troisBaiesImg20, alt: 'Les 3 Baies', category: 'Diego-Suarez' },
 { src: troisBaiesImg21, alt: 'Les 3 Baies', category: 'Diego-Suarez' },
{ src: troisBaiesImg22, alt: 'Les 3 Baies', category: 'Diego-Suarez' },
 { src: troisBaiesImg23, alt: 'Les 3 Baies', category: 'Diego-Suarez' },
 { src: troisBaiesImg24, alt: 'Les 3 Baies', category: 'Diego-Suarez' },
 { src: troisBaiesImg25, alt: 'Les 3 Baies', category: 'Diego-Suarez' },
 { src: troisBaiesImg26, alt: 'Les 3 Baies', category: 'Diego-Suarez' },
 { src: troisBaiesImg27, alt: 'Les 3 Baies', category: 'Diego-Suarez' },
 
 { src: montagneAmbreImg, alt: 'Montagne d\'Ambre', category: 'Diego-Suarez' },
 { src: montagneAmbreImg1, alt: 'Montagne d\'Ambre', category: 'Diego-Suarez' },
 { src: montagneAmbreImg2, alt: 'Montagne d\'Ambre', category: 'Diego-Suarez' },
 { src: montagneAmbreImg3, alt: 'Montagne d\'Ambre', category: 'Diego-Suarez' }, 
 
 { src: tsingyRougesImg, alt: 'Tsingy Rouges', category: 'Diego-Suarez' },
 { src: tsingyRougesImg1, alt: 'Tsingy Rouges', category: 'Diego-Suarez' },
 { src: tsingyRougesImg2, alt: 'Tsingy Rouges', category: 'Diego-Suarez' },
 { src: tsingyRougesImg3, alt: 'Tsingy Rouges', category: 'Diego-Suarez' },
 { src: tsingyRougesImg4, alt: 'Tsingy Rouges', category: 'Diego-Suarez' },
 { src: tsingyRougesImg5, alt: 'Tsingy Rouges', category: 'Diego-Suarez' },
  
 { src: montfraImg, alt: 'Montagne des Français', category: 'Diego-Suarez' },
 { src: montfraImg1, alt: 'Montagne des Français', category: 'Diego-Suarez' },
 { src: montfraImg2, alt: 'Montagne des Français', category: 'Diego-Suarez' },
 { src: montfraImg3, alt: 'Montagne des Français', category: 'Diego-Suarez' },
  
 { src: ankarana, alt: 'Ankarana', category: 'Diego-Suarez' },
 { src: ankarana1, alt: 'Ankarana', category: 'Diego-Suarez' },
 { src: ankarana2, alt: 'Ankarana', category: 'Diego-Suarez' },
 { src: ankarana3, alt: 'Ankarana', category: 'Diego-Suarez' }, 
  
 { src: nosyIranjaImg, alt: 'Nosy Iranja', category: 'Nosy Be' },
 { src: nosyIranjaImg1, alt: 'Nosy Iranja', category: 'Nosy Be' },
 { src: nosyIranjaImg2, alt: 'Nosy Iranja', category: 'Nosy Be' },
  
 { src: lokobeImg, alt: 'Lokobe', category: 'Nosy Be' },
 { src: lokobeImg1, alt: 'Lokobe', category: 'Nosy Be' },
 { src: lokobeImg2, alt: 'Lokobe', category: 'Nosy Be' },
 
 { src: nosySakatiaImg, alt: 'Lokobe', category: 'Nosy Be' },
 { src: nosySakatiaImg1, alt: 'Lokobe', category: 'Nosy Be' },
 { src: nosySakatiaImg2, alt: 'Lokobe', category: 'Nosy Be' },
 
 { src: kombaImg, alt: 'Lokobe', category: 'Nosy Be' },
 { src: kombaImg1, alt: 'Lokobe', category: 'Nosy Be' },
 { src: kombaImg2, alt: 'Lokobe', category: 'Nosy Be' },
 
 { src: haraImg, alt: 'Nosy Hara', category: 'Diego-Suarez' },
 { src: haraImg1, alt: 'Nosy Hara', category: 'Diego-Suarez' },
 { src: haraImg2, alt: 'Nosy Hara', category: 'Diego-Suarez' },
 
 { src: anivorano, alt: 'Lac sacré', category: 'Diego-Suarez' },
 { src: anivorano1, alt: 'Lac sacré', category: 'Diego-Suarez' },
 { src: anivorano2, alt: 'Lac sacré', category: 'Diego-Suarez' },
 { src: anivorano3, alt: 'Lac sacré', category: 'Diego-Suarez' },
 { src: anivorano4, alt: 'Lac sacré', category: 'Diego-Suarez' },
 { src: anivorano5, alt: 'Lac sacré', category: 'Diego-Suarez' },
 
 { src: pecheImg, alt: 'La Pêche Traditionnelle', category: 'Diego-Suarez' },
 { src: pecheImg1, alt: 'La Pêche Traditionnelle', category: 'Diego-Suarez' },
 { src: pecheImg2, alt: 'La Pêche Traditionnelle', category: 'Diego-Suarez' },
 { src: pecheImg3, alt: 'La Pêche Traditionnelle', category: 'Diego-Suarez' },
 { src: pecheImg4, alt: 'La Pêche Traditionnelle', category: 'Diego-Suarez' },
 { src: pecheImg5, alt: 'La Pêche Traditionnelle', category: 'Diego-Suarez' },
 
 { src: teesImg, alt: 'Tee-shirt Gentlemen Excursions', category: 'Diego-Suarez' },
 { src: teesImg1, alt: 'Tee-shirt Gentlemen Excursions', category: 'Diego-Suarez' },
 { src: teesImg2, alt: 'Tee-shirt Gentlemen Excursions', category: 'Diego-Suarez' },
 { src: teesImg3, alt: 'Tee-shirt Gentlemen Excursions', category: 'Diego-Suarez' },
 { src: teesImg4, alt: 'Tee-shirt Gentlemen Excursions', category: 'Diego-Suarez' },
 { src: teesImg5, alt: 'Tee-shirt Gentlemen Excursions', category: 'Diego-Suarez' }, 
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
            src={troisBaiesImg11} 
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
