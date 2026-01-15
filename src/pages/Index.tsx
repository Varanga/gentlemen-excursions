import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import { useLanguage } from '@/i18n/LanguageContext';
import { getFeaturedTours } from '@/lib/data';

export default function Index() {
  const { t } = useLanguage();
  
  // Get featured excursions from centralized data
  const featuredExcursions = getFeaturedTours();

  return (
    <Layout>
      <Hero />
      
      {/* Featured Expeditions */}
      <section className="py-24 lg:py-32 bg-navy">
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
            <Link to="/expeditions" className="inline-flex items-center gap-2 text-gold font-medium hover:text-gold-light transition-colors group">
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
                    <div className="relative aspect-[3/4] overflow-hidden mb-5 border border-border hover:border-gold/30 transition-colors">
                      <img src={excursion.image} alt={data.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors" />
                    </div>
                    <p className="text-xs text-zinc uppercase tracking-wider mb-2">{excursion.location}</p>
                    <h3 className="font-serif text-xl text-white group-hover:text-gold transition-colors mb-2">
                      {data.title}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-zinc">
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

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-card border-t border-gold/20">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
            <p className="text-gold text-sm tracking-[0.2em] uppercase font-medium mb-4">Prêt pour l'aventure ?</p>
            <h2 className="font-serif text-4xl lg:text-5xl mb-8 text-white">Créons Ensemble Votre Voyage Idéal</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="px-10 py-4 bg-gold text-navy text-sm font-medium tracking-widest uppercase hover:bg-gold-dark transition-colors">
                Nous Contacter
              </Link>
              <Link to="/expeditions" className="px-10 py-4 border border-gold/50 text-gold text-sm font-medium tracking-widest uppercase hover:bg-gold hover:text-navy transition-colors">
                Voir les Expéditions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
