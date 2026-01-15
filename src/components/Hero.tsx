import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Compass, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import heroImage from '@/assets/hero-madagascar.jpg';
import merEmeraudeImg from '@/assets/excursions/mer-emeraude.jpg';
import nosyIranjaImg from '@/assets/excursions/nosy-iranja.jpg';
import montagneAmbreImg from '@/assets/excursions/montagne-ambre.jpg';

const slides = [
  {
    image: heroImage,
    tagline: 'DÉCOUVREZ L\'ÎLE ROUGE',
    title: 'Madagascar',
    subtitle: 'Terre des Ancêtres',
  },
  {
    image: merEmeraudeImg,
    tagline: 'EAUX CRISTALLINES',
    title: 'Mer d\'Émeraude',
    subtitle: 'Un Paradis Préservé',
  },
  {
    image: nosyIranjaImg,
    tagline: 'ESCAPADE INSULAIRE',
    title: 'Nosy Iranja',
    subtitle: 'L\'Île aux Tortues',
  },
  {
    image: montagneAmbreImg,
    tagline: 'AVENTURE NATURE',
    title: 'Montagne d\'Ambre',
    subtitle: 'Forêt Primaire',
  },
];

export default function Hero() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % slides.length);
  const prevSlide = () => goToSlide((currentSlide - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-navy">
      {/* Slideshow Background with Ken Burns Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1.15 }}
          exit={{ opacity: 0 }}
          transition={{ 
            opacity: { duration: 1 },
            scale: { duration: 8, ease: "linear" }
          }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/30 to-navy/80" />
        </motion.div>
      </AnimatePresence>

      {/* Side Navigation Arrows with Preview Text */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 group flex items-center gap-4"
      >
        <div className="flex items-center gap-2 text-white/60 group-hover:text-gold transition-colors">
          <div className="w-2 h-2 rounded-full bg-white/40 group-hover:bg-gold transition-colors" />
          <div className="w-8 h-[1px] bg-white/40 group-hover:bg-gold transition-colors" />
        </div>
        <span className="hidden lg:block text-white/40 group-hover:text-gold font-serif text-2xl transition-colors truncate max-w-[150px]">
          {slides[(currentSlide - 1 + slides.length) % slides.length].title}
        </span>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 group flex items-center gap-4"
      >
        <span className="hidden lg:block text-white/40 group-hover:text-gold font-serif text-2xl transition-colors truncate max-w-[150px]">
          {slides[(currentSlide + 1) % slides.length].title}
        </span>
        <div className="flex items-center gap-2 text-white/60 group-hover:text-gold transition-colors">
          <div className="w-8 h-[1px] bg-white/40 group-hover:bg-gold transition-colors" />
          <div className="w-2 h-2 rounded-full bg-white/40 group-hover:bg-gold transition-colors" />
        </div>
      </button>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm md:text-base tracking-[0.3em] text-gold mb-6 font-medium"
            >
              {slides[currentSlide].tagline}
            </motion.p>

            {/* Main Title */}
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-4 leading-none text-white">
              {slides[currentSlide].title}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl lg:text-3xl font-light tracking-wide text-zinc mb-12">
              {slides[currentSlide].subtitle}
            </p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link 
                to="/expeditions" 
                className="inline-flex items-center justify-center px-10 py-4 border border-gold text-gold text-sm font-medium tracking-widest uppercase hover:bg-gold hover:text-navy transition-all duration-300"
              >
                En savoir +
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-40 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide 
                ? 'w-8 h-1 bg-gold' 
                : 'w-4 h-1 bg-white/40 hover:bg-gold/60'
            }`}
          />
        ))}
      </div>

      {/* Search Bar - Glassmorphism Dark with Gold Border */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-0 left-0 right-0 z-20"
      >
        <div className="bg-card/95 backdrop-blur-xl border-t border-gold/30">
          <div className="container mx-auto">
            <div className="flex items-stretch divide-x divide-border">
              {/* Destination */}
              <div className="flex-1 px-6 py-5 flex items-center gap-4 cursor-pointer hover:bg-secondary/50 transition-colors group">
                <MapPin className="w-5 h-5 text-zinc group-hover:text-gold transition-colors" />
                <div>
                  <p className="text-xs text-zinc uppercase tracking-wider font-medium mb-1">
                    Destination
                  </p>
                  <p className="text-white font-medium">
                    Diego-Suarez, Nosy Be...
                  </p>
                </div>
              </div>

              {/* Type de voyage */}
              <div className="flex-1 px-6 py-5 flex items-center gap-4 cursor-pointer hover:bg-secondary/50 transition-colors group hidden md:flex">
                <Compass className="w-5 h-5 text-zinc group-hover:text-gold transition-colors" />
                <div>
                  <p className="text-xs text-zinc uppercase tracking-wider font-medium mb-1">
                    Type de voyage
                  </p>
                  <p className="text-white font-medium">
                    Aventure, Nature, Plage...
                  </p>
                </div>
              </div>

              {/* Activités */}
              <div className="flex-1 px-6 py-5 flex items-center gap-4 cursor-pointer hover:bg-secondary/50 transition-colors group hidden lg:flex">
                <div className="w-5 h-5 flex items-center justify-center">
                  <span className="text-xl text-zinc group-hover:text-gold transition-colors">+</span>
                </div>
                <div>
                  <p className="text-xs text-zinc uppercase tracking-wider font-medium mb-1">
                    Activités
                  </p>
                  <p className="text-white font-medium">
                    Plongée, Randonnée...
                  </p>
                </div>
              </div>

              {/* Search Button */}
              <Link
                to="/expeditions"
                className="px-8 lg:px-12 flex items-center justify-center gap-3 bg-gold hover:bg-gold-dark transition-colors"
              >
                <Search className="w-5 h-5 text-navy" />
                <span className="text-navy font-medium tracking-wide hidden sm:inline">
                  Valider
                </span>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
