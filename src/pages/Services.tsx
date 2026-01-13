import { motion } from 'framer-motion';
import { Leaf, Shirt, Wind, Truck, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';

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
    color: 'from-amber-900/80 to-amber-700/60',
  },
  {
    key: 'teeshirts' as const,
    icon: Shirt,
    image: lokobeImg,
    color: 'from-slate-900/80 to-slate-700/60',
  },
  {
    key: 'kitesurf' as const,
    icon: Wind,
    image: merEmeraudeImg,
    color: 'from-cyan-900/80 to-cyan-700/60',
  },
  {
    key: 'logistics' as const,
    icon: Truck,
    image: montagneAmbreImg,
    color: 'from-emerald-900/80 to-emerald-700/60',
  },
];

export default function Services() {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-navy">
        <div className="absolute inset-0 z-0">
          <img src={routeCacaoImg} alt="Services" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 to-navy/90" />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-title mb-4"
          >
            {t.services.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            {t.services.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const data = t.services[service.key];
              const Icon = service.icon;
              
              return (
                <motion.div
                  key={service.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative h-80 lg:h-96 rounded-xl overflow-hidden">
                    {/* Background Image */}
                    <img 
                      src={service.image}
                      alt={data.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color}`} />
                    
                    {/* Content */}
                    <div className="relative z-10 h-full p-8 flex flex-col justify-between text-white">
                      <div>
                        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
                          <Icon className="w-7 h-7" />
                        </div>
                        <span className="text-white/70 text-sm font-medium tracking-wider uppercase">
                          {data.subtitle}
                        </span>
                        <h3 className="font-serif text-3xl lg:text-4xl font-medium mt-2 mb-4">
                          {data.title}
                        </h3>
                        <p className="text-white/80 max-w-md">
                          {data.description}
                        </p>
                      </div>
                      
                      {/* CTA */}
                      <Link 
                        to="/contact"
                        className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-azure transition-colors group/link"
                      >
                        {t.common.learnMore}
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy text-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title mb-6">{t.contact.subtitle}</h2>
            <Link 
              to="/contact"
              className="inline-flex items-center justify-center px-10 py-4 text-sm font-medium tracking-wider uppercase bg-azure text-navy hover:bg-white transition-colors"
            >
              {t.nav.contact}
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
