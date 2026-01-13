import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import heroImage from '@/assets/hero-madagascar.jpg';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Madagascar landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-navy/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="hero-title mb-6">
            {t.hero.title}
          </h1>
          <p className="hero-subtitle mb-10 max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#destinations" className="btn-hero">
              <span>{t.hero.cta}</span>
            </a>
            <Link to="/contact" className="btn-outline-light">
              <span>{t.hero.ctaSecondary}</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-5xl px-6 z-20"
      >
        <div className="search-bar p-4 lg:p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {t.search.destination}
              </label>
              <input
                type="text"
                placeholder={t.search.destinationPlaceholder}
                className="w-full text-navy bg-transparent border-b border-border focus:border-azure-dark focus:outline-none py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {t.search.theme}
              </label>
              <input
                type="text"
                placeholder={t.search.themePlaceholder}
                className="w-full text-navy bg-transparent border-b border-border focus:border-azure-dark focus:outline-none py-2 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {t.search.activities}
              </label>
              <input
                type="text"
                placeholder={t.search.activitiesPlaceholder}
                className="w-full text-navy bg-transparent border-b border-border focus:border-azure-dark focus:outline-none py-2 text-sm"
              />
            </div>
            <div className="flex items-end">
              <button className="w-full bg-navy text-white py-3 px-6 text-sm font-medium uppercase tracking-wider hover:bg-navy-light transition-colors">
                {t.search.search}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-white/70 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
