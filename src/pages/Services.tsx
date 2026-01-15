import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Shirt, Wind, Truck, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import { Link, useLocation } from 'react-router-dom';

// Import images
import routeCacaoImg from '@/assets/excursions/route-cacao.jpg';
import merEmeraudeImg from '@/assets/excursions/mer-emeraude.jpg';
import lokobeImg from '@/assets/excursions/lokobe.jpg';
import montagneAmbreImg from '@/assets/excursions/montagne-ambre.jpg';

const services = [
  {
    key: 'vanilla' as const,
    icon: Leaf,
    image: routeCacaoImg,
  },
  {
    key: 'teeshirts' as const,
    icon: Shirt,
    image: lokobeImg,
  },
  {
    key: 'kitesurf' as const,
    icon: Wind,
    image: merEmeraudeImg,
  },
  {
    key: 'logistics' as const,
    icon: Truck,
    image: montagneAmbreImg,
  },
];

export default function Services() {
  const { t } = useLanguage();
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Layout>
      {/* Hero - Black & Gold Style */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-navy">
        <div className="absolute inset-0 z-0">
          <img 
            src={routeCacaoImg} 
            alt="Services" 
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
            Style de vie
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-6"
          >
            {t.services.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-zinc max-w-2xl mx-auto leading-relaxed"
          >
            {t.services.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Split-Screen Services - Black & Gold Style */}
      <section className="bg-navy">
        {services.map((service, index) => {
          const data = t.services[service.key];
          const Icon = service.icon;
          const isReversed = index % 2 === 1;
          
          return (
            <motion.div
              key={service.key}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} min-h-[80vh] border-b border-gold/10`}
            >
              {/* Image Side */}
              <div className="relative lg:w-1/2 h-[50vh] lg:h-auto overflow-hidden">
                <img 
                  src={service.image}
                  alt={data.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-navy/20" />
              </div>
              
              {/* Content Side */}
              <div className="lg:w-1/2 flex items-center justify-center p-12 lg:p-20 xl:p-32 bg-card">
                <div className="max-w-lg">
                  {/* Icon */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mb-8"
                  >
                    <Icon className="w-7 h-7 text-gold" />
                  </motion.div>
                  
                  {/* Subtitle */}
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="inline-block text-gold text-sm font-medium tracking-[0.2em] uppercase mb-4"
                  >
                    {data.subtitle}
                  </motion.span>
                  
                  {/* Title */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="font-serif text-4xl lg:text-5xl xl:text-6xl font-medium text-white mb-6 leading-tight"
                  >
                    {data.title}
                  </motion.h2>
                  
                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-zinc text-lg leading-relaxed mb-10"
                  >
                    {data.description}
                  </motion.p>
                  
                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                  >
                    <Link 
                      to="/contact"
                      className="inline-flex items-center gap-3 text-sm font-medium tracking-wider uppercase text-gold hover:text-gold-light transition-colors group"
                    >
                      {t.common.learnMore}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* CTA Section - Black & Gold */}
      <section className="py-32 bg-card border-t border-gold/20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-gold text-sm font-medium tracking-[0.3em] uppercase mb-6">
              Contact
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-medium mb-8 leading-tight text-white">
              {t.contact.subtitle}
            </h2>
            <Link 
              to="/contact"
              className="inline-flex items-center justify-center px-12 py-5 text-sm font-medium tracking-[0.2em] uppercase bg-gold text-navy hover:bg-gold-dark transition-colors"
            >
              {t.nav.contact}
            </Link>
          </motion.div>
        </div>
      </section>

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
