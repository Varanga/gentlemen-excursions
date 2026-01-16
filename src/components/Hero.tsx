import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Compass, Clock, Search, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { tours } from '@/lib/data';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Hero() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Search filters state
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);

  // Get unique destinations from tours
  const destinations = [...new Set(tours.map(tour => tour.location))];
  
  // Themes
  const themes = [
    { key: 'aventure', label: language === 'en' ? 'Adventure' : 'Aventure' },
    { key: 'nature', label: 'Nature' },
    { key: 'plage', label: language === 'en' ? 'Beach' : 'Plage' },
    { key: 'culture', label: 'Culture' },
    { key: 'trek', label: 'Trek' },
  ];
  
  // Durations
  const durations = [
    { key: 'half-day', label: language === 'en' ? 'Half day' : 'Demi-journée' },
    { key: '1-day', label: language === 'en' ? '1 day' : '1 jour' },
    { key: '2-days', label: language === 'en' ? '2 days' : '2 jours' },
    { key: 'multi', label: language === 'en' ? '3+ days' : '3+ jours' },
  ];

  const slides = tours;
  const totalSlides = slides.length;

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % totalSlides);
  const prevSlide = () => goToSlide((currentSlide - 1 + totalSlides) % totalSlides);

  const currentTour = slides[currentSlide];
  const currentData = t.excursions[currentTour.titleKey];

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  // Handle search/explore click
  const handleExplore = () => {
    const params = new URLSearchParams();
    if (selectedDestination) params.set('location', selectedDestination);
    if (selectedTheme) params.set('theme', selectedTheme);
    if (selectedDuration) params.set('duration', selectedDuration);
    
    const queryString = params.toString();
    navigate(`/expeditions${queryString ? `?${queryString}` : ''}`);
    
    // Scroll to results after navigation
    setTimeout(() => {
      const resultsSection = document.querySelector('section.py-24');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-navy">
      {/* Slideshow Background with Ken Burns Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1.12 }}
          exit={{ opacity: 0 }}
          transition={{ 
            opacity: { duration: 1.5, ease: "easeInOut" },
            scale: { duration: 8, ease: "linear" }
          }}
          className="absolute inset-0 z-0"
        >
          <img
            src={currentTour.image}
            alt={currentData.title}
            className="w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(5,5,5,0.2) 0%, rgba(5,5,5,0.4) 50%, rgba(5,5,5,0.85) 100%)'
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Side Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 z-20 group flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity"
      >
        <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-all">
          <ChevronLeft className="w-5 h-5 text-white group-hover:text-gold transition-colors" />
        </div>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 z-20 group flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity"
      >
        <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-all">
          <ChevronRight className="w-5 h-5 text-white group-hover:text-gold transition-colors" />
        </div>
      </button>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            {/* Location Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <MapPin className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-sans font-medium tracking-[0.3em] uppercase">
                {currentTour.location}
              </span>
            </motion.div>

            {/* Main Title */}
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-4 leading-none text-white">
              {currentData.title}
            </h1>

            {/* Malagasy Name */}
            {'titleMg' in currentData && currentData.titleMg && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg md:text-xl font-serif italic text-zinc mb-6"
              >
                « {currentData.titleMg} »
              </motion.p>
            )}

            {/* Description */}
            <p className="text-base md:text-lg text-zinc max-w-2xl mx-auto mb-10 leading-relaxed">
              {currentData.description}
            </p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button 
                onClick={() => navigate(`/expeditions/${currentTour.slug}`)}
                className="inline-flex items-center justify-center px-10 py-4 bg-gold text-navy text-sm font-medium tracking-widest uppercase hover:bg-gold-dark transition-all duration-300"
                style={{ boxShadow: '0 0 30px -8px hsl(43 63% 53% / 0.4)' }}
              >
                {language === 'en' ? 'Discover the excursion' : 'Découvrir l\'excursion'}
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Counter */}
      <div className="absolute left-6 lg:left-10 bottom-40 z-20 flex items-center gap-3 text-sm font-medium">
        <span className="text-gold text-2xl font-serif">{formatNumber(currentSlide + 1)}</span>
        <span className="text-zinc">/</span>
        <span className="text-zinc">{formatNumber(totalSlides)}</span>
      </div>

      {/* Progress Indicators */}
      <div className="absolute right-6 lg:right-10 bottom-40 z-20 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-500 ${
              index === currentSlide 
                ? 'w-8 h-1 bg-gold' 
                : 'w-2 h-1 bg-white/30 hover:bg-gold/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Search Bar - Functional with Dropdowns */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-0 left-0 right-0 z-20"
      >
        <div 
          className="backdrop-blur-xl border-t border-gold/30"
          style={{ backgroundColor: 'rgba(10, 10, 10, 0.9)' }}
        >
          <div className="container mx-auto">
            <div className="flex items-stretch divide-x divide-gold/20">
              {/* Destination Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex-1 px-6 py-5 flex items-center gap-4 cursor-pointer hover:bg-white/5 transition-colors group">
                    <MapPin className="w-5 h-5 text-gold" />
                    <div className="flex-1">
                      <p className="text-xs text-zinc uppercase tracking-wider font-medium mb-1">
                        Destination
                      </p>
                      <p className="text-white font-medium">
                        {selectedDestination || (language === 'en' ? 'All destinations' : 'Toutes les destinations')}
                      </p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-zinc group-hover:text-gold transition-colors" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-navy border-gold/30 min-w-[200px]">
                  <DropdownMenuItem 
                    onClick={() => setSelectedDestination(null)}
                    className="text-white hover:bg-gold/10 hover:text-gold cursor-pointer"
                  >
                    {language === 'en' ? 'All destinations' : 'Toutes les destinations'}
                  </DropdownMenuItem>
                  {destinations.map(dest => (
                    <DropdownMenuItem 
                      key={dest}
                      onClick={() => setSelectedDestination(dest)}
                      className="text-white hover:bg-gold/10 hover:text-gold cursor-pointer"
                    >
                      {dest}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Theme Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex-1 px-6 py-5 flex items-center gap-4 cursor-pointer hover:bg-white/5 transition-colors group hidden md:flex">
                    <Compass className="w-5 h-5 text-gold" />
                    <div className="flex-1">
                      <p className="text-xs text-zinc uppercase tracking-wider font-medium mb-1">
                        {language === 'en' ? 'Themes' : 'Thématiques'}
                      </p>
                      <p className="text-white font-medium">
                        {selectedTheme 
                          ? themes.find(th => th.key === selectedTheme)?.label 
                          : (language === 'en' ? 'All themes' : 'Toutes les thématiques')}
                      </p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-zinc group-hover:text-gold transition-colors" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-navy border-gold/30 min-w-[200px]">
                  <DropdownMenuItem 
                    onClick={() => setSelectedTheme(null)}
                    className="text-white hover:bg-gold/10 hover:text-gold cursor-pointer"
                  >
                    {language === 'en' ? 'All themes' : 'Toutes les thématiques'}
                  </DropdownMenuItem>
                  {themes.map(theme => (
                    <DropdownMenuItem 
                      key={theme.key}
                      onClick={() => setSelectedTheme(theme.key)}
                      className="text-white hover:bg-gold/10 hover:text-gold cursor-pointer"
                    >
                      {theme.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Duration Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex-1 px-6 py-5 flex items-center gap-4 cursor-pointer hover:bg-white/5 transition-colors group hidden lg:flex">
                    <Clock className="w-5 h-5 text-gold" />
                    <div className="flex-1">
                      <p className="text-xs text-zinc uppercase tracking-wider font-medium mb-1">
                        {language === 'en' ? 'Duration' : 'Durée'}
                      </p>
                      <p className="text-white font-medium">
                        {selectedDuration 
                          ? durations.find(d => d.key === selectedDuration)?.label 
                          : (language === 'en' ? 'Any duration' : 'Toutes les durées')}
                      </p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-zinc group-hover:text-gold transition-colors" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-navy border-gold/30 min-w-[200px]">
                  <DropdownMenuItem 
                    onClick={() => setSelectedDuration(null)}
                    className="text-white hover:bg-gold/10 hover:text-gold cursor-pointer"
                  >
                    {language === 'en' ? 'Any duration' : 'Toutes les durées'}
                  </DropdownMenuItem>
                  {durations.map(duration => (
                    <DropdownMenuItem 
                      key={duration.key}
                      onClick={() => setSelectedDuration(duration.key)}
                      className="text-white hover:bg-gold/10 hover:text-gold cursor-pointer"
                    >
                      {duration.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Search Button */}
              <button
                onClick={handleExplore}
                className="px-8 lg:px-12 flex items-center justify-center gap-3 bg-gold hover:bg-gold-dark transition-colors"
              >
                <Search className="w-5 h-5 text-navy" />
                <span className="text-navy font-medium tracking-wide hidden sm:inline">
                  Explorer
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
