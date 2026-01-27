import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import troisBaiesImg5 from '@/assets/gallery/trois-baies5.jpg';

export default function AboutPreview() {
  const { language } = useLanguage();

  const content = {
    fr: {
      label: 'Notre Histoire',
      title: 'L\'Esprit Gentlemen Excursions',
      description: 'Depuis Diego-Suarez, nous révélons les trésors cachés du Nord de Madagascar. Notre philosophie : l\'authenticité sans compromis, le luxe discret, et le respect profond des terres que nous parcourons.',
      cta: 'Découvrir notre histoire',
    },
    en: {
      label: 'Our Story',
      title: 'The Gentlemen Excursions Spirit',
      description: 'From Diego-Suarez, we unveil the hidden treasures of Northern Madagascar. Our philosophy: uncompromising authenticity, understated luxury, and deep respect for the lands we explore.',
      cta: 'Discover our story',
    },
    mg: {
      label: 'Ny Tantaranay',
      title: 'Ny Fanahin\'ny Gentlemen Excursions',
      description: 'Avy ao Diego-Suarez, manambara ny harenan\'i Madagasikara Avaratra izahay. Ny filozofianay: fahamarinan-toerana tsy misy fetra, rendrarendra tsotra, ary fanajana lalina ny tany izay diavinay.',
      cta: 'Fantaro ny tantaranay',
    },
  };

  const t = content[language];

  return (
    <section className="relative py-24 lg:py-32 bg-[#050505]">
      {/* Golden separator line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image with gold frame */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img 
                src={troisBaiesImg5} 
                alt="Paysage Nord Madagascar Diego-Suarez" 
                className="w-full h-full object-cover"
              />
              {/* Subtle gold frame effect */}
              <div className="absolute inset-0 border border-gold/30" />
              <div className="absolute -inset-3 border border-gold/20 -z-10" />
            </div>
            {/* Decorative gold corner accents */}
            <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-gold" />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-gold" />
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:pl-8"
          >
            <span className="text-gold text-sm tracking-[0.3em] uppercase font-medium">
              {t.label}
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl text-white mt-4 mb-8 leading-tight">
              {t.title}
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-10">
              {t.description}
            </p>
            <Link 
              to="/about" 
              className="inline-flex items-center gap-3 text-gold font-medium hover:gap-5 transition-all group"
            >
              {t.cta}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
