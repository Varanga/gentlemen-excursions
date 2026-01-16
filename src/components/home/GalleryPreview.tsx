import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';

// Import images
import merEmeraudeImg from '@/assets/excursions/mer-emeraude.jpg';
import tsingyRougesImg from '@/assets/excursions/tsingy-rouges.jpg';
import nosyIranjaImg from '@/assets/excursions/nosy-iranja.jpg';
import lokobeImg from '@/assets/excursions/lokobe.jpg';
import montagneAmbreImg from '@/assets/excursions/montagne-ambre.jpg';

const galleryImages = [
  { src: merEmeraudeImg, alt: 'Mer d\'Émeraude turquoise Diego-Suarez', span: 'col-span-2 row-span-2' },
  { src: tsingyRougesImg, alt: 'Tsingy Rouges formations géologiques', span: 'col-span-1 row-span-1' },
  { src: nosyIranjaImg, alt: 'Nosy Iranja banc de sable blanc', span: 'col-span-1 row-span-1' },
  { src: lokobeImg, alt: 'Forêt primaire Lokobe Nosy Be', span: 'col-span-1 row-span-2' },
  { src: montagneAmbreImg, alt: 'Montagne d\'Ambre forêt tropicale', span: 'col-span-1 row-span-1' },
];

export default function GalleryPreview() {
  const { language } = useLanguage();

  const labels = {
    fr: { section: 'Inspiration', title: 'Galerie', cta: 'Voir la galerie complète' },
    en: { section: 'Inspiration', title: 'Gallery', cta: 'View full gallery' },
    mg: { section: 'Aingam-panahy', title: 'Galerie', cta: 'Jereo ny galerie feno' },
  };

  const t = labels[language];

  return (
    <section className="relative py-24 lg:py-32 bg-[#050505]">
      {/* Golden separator line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm tracking-[0.3em] uppercase font-medium">
            {t.section}
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl text-white mt-4">
            {t.title}
          </h2>
        </motion.div>

        {/* Bento Grid Gallery */}
        <div className="relative">
          <div className="grid grid-cols-3 grid-rows-3 gap-2 lg:gap-3 h-[600px] lg:h-[700px]">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${image.span} overflow-hidden group relative`}
              >
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors duration-500" />
                <div className="absolute inset-0 border border-transparent group-hover:border-gold/40 transition-colors duration-500" />
              </motion.div>
            ))}
          </div>

          {/* Centered CTA Overlay Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <Link 
              to="/gallery"
              className="pointer-events-auto px-8 py-4 bg-black/80 backdrop-blur-sm border-2 border-gold text-gold font-medium hover:bg-gold hover:text-black transition-all duration-300"
            >
              {t.cta}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
