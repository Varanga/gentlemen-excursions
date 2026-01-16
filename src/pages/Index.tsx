import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import { useLanguage } from '@/i18n/LanguageContext';
import { getFeaturedTours } from '@/lib/data';
import { SEO, generateOrganizationSchema } from '@/lib/seo';
import AboutPreview from '@/components/home/AboutPreview';
import ServicesPreview from '@/components/home/ServicesPreview';
import GalleryPreview from '@/components/home/GalleryPreview';
import BlogPreview from '@/components/home/BlogPreview';

export default function Index() {
  const { t, language } = useLanguage();
  
  // Get featured excursions from centralized data
  const featuredExcursions = getFeaturedTours();

  const altText = (excursion: typeof featuredExcursions[0]) => {
    return language === 'en' ? excursion.altEn : language === 'mg' ? excursion.altMg : excursion.altFr;
  };

  // SEO content per language
  const seoContent = {
    fr: {
      title: 'Excursions de Luxe au Nord de Madagascar',
      description: 'Gentlemen Excursions : voyages haut de gamme à Diego-Suarez et Nosy Be. Mer d\'Émeraude, Tsingy, randonnées et kitesurf. Expériences authentiques.',
    },
    en: {
      title: 'Luxury Excursions in Northern Madagascar',
      description: 'Gentlemen Excursions: premium tours in Diego-Suarez and Nosy Be. Emerald Sea, Tsingy, hiking and kitesurfing. Authentic experiences.',
    },
    mg: {
      title: 'Fitsangatsanganana Ambony any Avaratra Madagasikara',
      description: 'Gentlemen Excursions: dia ambony any Diego-Suarez sy Nosy Be. Ranomasina Safira, Tsingy, fitsangatsanganana ary kitesurf.',
    },
  };

  const organizationSchema = generateOrganizationSchema();

  return (
    <Layout>
      <SEO
        title={seoContent[language].title}
        description={seoContent[language].description}
        canonical="/"
        language={language}
        keywords={[
          'Excursion Nord Madagascar',
          'Voyage luxe Diego-Suarez',
          'Guide touristique Nosy Be',
          'Mer d\'Émeraude',
          'Tsingy Ankarana',
          'Kitesurf Madagascar',
        ]}
        structuredData={organizationSchema}
      />
      
      <Hero />
      
      {/* Featured Expeditions */}
      <section className="py-24 lg:py-32 bg-[#050505]">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16"
          >
            <div>
              <p className="text-gold text-sm tracking-[0.2em] uppercase font-medium mb-4">Nos Expéditions</p>
              <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-white">Voyages d'Exception</h2>
            </div>
            <Link to="/expeditions" className="inline-flex items-center gap-2 text-gold font-medium hover:text-gold/80 transition-colors group">
              Voir tous nos voyages
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredExcursions.map((excursion, index) => {
              const data = t.excursions[excursion.titleKey];
              return (
                <motion.div
                  key={excursion.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/expeditions/${excursion.slug}`} className="group block">
                    <div className="relative aspect-[3/4] overflow-hidden mb-5 border border-zinc-800 hover:border-gold/30 transition-colors">
                      <img 
                        src={excursion.image} 
                        alt={altText(excursion)} 
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">{excursion.location}</p>
                    <h3 className="font-serif text-xl text-white group-hover:text-gold transition-colors mb-2">
                      {data.title}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-zinc-500">
                      <Clock className="w-3 h-3" />
                      {data.duration}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <AboutPreview />

      {/* Services Preview Section */}
      <ServicesPreview />

      {/* Gallery Preview Section */}
      <GalleryPreview />

      {/* Blog Preview Section */}
      <BlogPreview />

      {/* CTA Section */}
      <section className="relative py-24 lg:py-32 bg-[#050505] border-t border-gold/20">
        {/* Golden separator line at top */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
            <p className="text-gold text-sm tracking-[0.2em] uppercase font-medium mb-4">Prêt pour l'aventure ?</p>
            <h2 className="font-serif text-4xl lg:text-5xl mb-8 text-white">Créons Ensemble Votre Voyage Idéal</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="px-10 py-4 bg-gold text-black text-sm font-medium tracking-widest uppercase hover:bg-gold/90 transition-colors">
                Nous Contacter
              </Link>
              <Link to="/expeditions" className="px-10 py-4 border border-gold/50 text-gold text-sm font-medium tracking-widest uppercase hover:bg-gold hover:text-black transition-colors">
                Voir les Expéditions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
