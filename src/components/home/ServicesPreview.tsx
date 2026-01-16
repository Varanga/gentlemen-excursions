import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, Shirt, Wind, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const services = [
  {
    icon: Leaf,
    titleFr: 'Vanille de Madagascar',
    titleEn: 'Madagascar Vanilla',
    titleMg: 'Vanila Malagasy',
    descFr: 'L\'or noir de la SAVA, sélectionnée à la main par nos producteurs partenaires.',
    descEn: 'The black gold of SAVA, hand-selected by our partner producers.',
    descMg: 'Ny volamena mainty avy any SAVA, voafantina amin\'ny tanana.',
    link: '/services#vanilla',
  },
  {
    icon: Shirt,
    titleFr: 'Collection Messieurs',
    titleEn: 'Gentlemen Collection',
    titleMg: 'Fitafiana Messieurs',
    descFr: 'Vêtements premium minimalistes, inspirés de l\'aventure malgache.',
    descEn: 'Minimalist premium apparel, inspired by Malagasy adventure.',
    descMg: 'Fitafiana ambony minimalista, avy amin\'ny aventure malagasy.',
    link: '/services#teeshirts',
  },
  {
    icon: Wind,
    titleFr: 'Kitesurf Hub',
    titleEn: 'Kitesurf Hub',
    titleMg: 'Kitesurf Hub',
    descFr: 'Cours et équipement pour les meilleurs spots de la Baie de Sakalava.',
    descEn: 'Lessons and equipment for the best spots in Sakalava Bay.',
    descMg: 'Fampianarana sy fitaovana ho an\'ny toerana tsara indrindra ao Sakalava.',
    link: '/services#kitesurf',
  },
];

export default function ServicesPreview() {
  const { language } = useLanguage();

  const labels = {
    fr: { section: 'L\'Expérience', title: 'Nos Services', cta: 'Tous nos services' },
    en: { section: 'The Experience', title: 'Our Services', cta: 'All our services' },
    mg: { section: 'Ny Traikefa', title: 'Ny Serivisy', cta: 'Ny serivisy rehetra' },
  };

  const t = labels[language];

  return (
    <section className="relative py-24 lg:py-32 bg-[#0A0A0A]">
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

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const title = language === 'en' ? service.titleEn : language === 'mg' ? service.titleMg : service.titleFr;
            const desc = language === 'en' ? service.descEn : language === 'mg' ? service.descMg : service.descFr;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Link 
                  to={service.link}
                  className="group block h-full p-8 bg-[#050505] border border-gold/20 hover:border-gold/50 transition-all duration-500"
                >
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-full border border-gold/40 flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-serif text-2xl text-white mb-4 group-hover:text-gold transition-colors">
                    {title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed mb-6">
                    {desc}
                  </p>
                  
                  {/* Arrow indicator */}
                  <div className="flex items-center gap-2 text-gold opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-2 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link 
            to="/services" 
            className="inline-flex items-center gap-3 text-gold font-medium hover:gap-5 transition-all group"
          >
            {t.cta}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
