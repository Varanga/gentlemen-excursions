import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import { useLanguage } from '@/i18n/LanguageContext';

// Import images
import merEmeraudeImg from '@/assets/excursions/mer-emeraude.jpg';
import troisBaiesImg from '@/assets/excursions/trois-baies.jpg';
import montagneAmbreImg from '@/assets/excursions/montagne-ambre.jpg';
import tsingyRougesImg from '@/assets/excursions/tsingy-rouges.jpg';
import ankaranaImg from '@/assets/excursions/ankarana.jpg';
import nosyIranjaImg from '@/assets/excursions/nosy-iranja.jpg';
import lokobeImg from '@/assets/excursions/lokobe.jpg';
import routeCacaoImg from '@/assets/excursions/route-cacao.jpg';

const featuredExcursions = [
  { id: 'mer-emeraude', image: merEmeraudeImg, titleKey: 'merEmeraude', location: 'Diego-Suarez', duration: '1 jour' },
  { id: 'nosy-iranja', image: nosyIranjaImg, titleKey: 'nosyIranja', location: 'Nosy Be', duration: '1 jour' },
  { id: 'montagne-ambre', image: montagneAmbreImg, titleKey: 'montagneAmbre', location: 'Diego-Suarez', duration: '1 jour' },
  { id: 'tsingy-rouges', image: tsingyRougesImg, titleKey: 'tsingyRouges', location: 'Diego-Suarez', duration: '1 jour' },
];

export default function Index() {
  const { t } = useLanguage();

  return (
    <Layout>
      <Hero />
      
      {/* Featured Expeditions */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16"
          >
            <div>
              <p className="text-azure-dark text-sm tracking-[0.2em] uppercase font-medium mb-4">Nos Expéditions</p>
              <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-navy">Voyages d'Exception</h2>
            </div>
            <Link to="/expeditions" className="inline-flex items-center gap-2 text-navy font-medium hover:text-azure-dark transition-colors group">
              Voir tous nos voyages
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredExcursions.map((excursion, index) => (
              <motion.div
                key={excursion.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/expeditions/${excursion.id}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden mb-5">
                    <img src={excursion.image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{excursion.location}</p>
                  <h3 className="font-serif text-xl text-navy group-hover:text-azure-dark transition-colors mb-2">
                    {t.excursions[excursion.titleKey as keyof typeof t.excursions]?.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {excursion.duration}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-navy text-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
            <p className="text-azure text-sm tracking-[0.2em] uppercase font-medium mb-4">Prêt pour l'aventure ?</p>
            <h2 className="font-serif text-4xl lg:text-5xl mb-8">Créons Ensemble Votre Voyage Idéal</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="px-10 py-4 bg-white text-navy text-sm font-medium tracking-widest uppercase hover:bg-azure transition-colors">
                Nous Contacter
              </Link>
              <Link to="/expeditions" className="px-10 py-4 border border-white/50 text-white text-sm font-medium tracking-widest uppercase hover:bg-white/10 transition-colors">
                Voir les Expéditions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
