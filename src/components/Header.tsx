import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Language } from '@/i18n/translations';

const languages: {
  code: Language;
  label: string;
}[] = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'mg', label: 'MG' }
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  
  // Scroll progress for reading indicator
  const { scrollYProgress } = useScroll();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '/expeditions', label: t.nav.expeditions },
    { href: '/services', label: t.nav.services },
    { href: '/gallery', label: 'Galerie' },
    { href: '/about', label: t.nav.about },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: t.nav.contact }
  ];

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  // Mobile menu animation variants
  const menuOverlayVariants = {
    hidden: { 
      clipPath: 'inset(0 0 100% 0)',
      transition: { duration: 0.6, ease: "easeInOut" as const }
    },
    visible: { 
      clipPath: 'inset(0 0 0% 0)',
      transition: { duration: 0.6, ease: "easeInOut" as const }
    }
  };

  const menuLinkVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      skewX: 5
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      skewX: 0,
      transition: {
        duration: 0.5,
        delay: 0.3 + i * 0.1,
        ease: "easeOut" as const
      }
    }),
    exit: {
      opacity: 0,
      x: 50,
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gold z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.header
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={`fixed top-[2px] left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? 'bg-[#050505]/95 backdrop-blur-md shadow-[0_4px_30px_rgba(212,175,55,0.1)]'
            : 'bg-gradient-to-b from-[#050505]/60 to-transparent'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div 
            className={`flex items-center justify-between transition-all duration-500 ${
              isScrolled ? 'h-16 lg:h-18' : 'h-20 lg:h-24'
            }`}
            layout
          >
            {/* Left: Empty spacer on mobile for symmetry, Menu on desktop */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 w-20 md:w-auto">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="group flex items-center gap-2 text-white hover:text-gold transition-colors duration-300 md:flex hidden"
              >
                <div className="relative w-6 h-5 flex flex-col justify-between">
                  <motion.span 
                    className="w-full h-[1.5px] bg-current origin-left"
                    animate={isMobileMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span 
                    className="w-4 h-[1.5px] bg-current"
                    animate={isMobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span 
                    className="w-full h-[1.5px] bg-current origin-left"
                    animate={isMobileMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span className="hidden sm:block text-xs font-medium tracking-[0.2em] uppercase text-gold">
                  Menu
                </span>
              </button>
            </motion.div>

            {/* Center: Logo */}
            <motion.div variants={itemVariants} className="absolute left-1/2 -translate-x-1/2">
              <Link to="/" className="group flex flex-col items-center">
                <motion.span 
                  className={`font-serif font-medium tracking-wide text-white group-hover:text-gold transition-all duration-500 ${
                    isScrolled ? 'text-lg md:text-xl lg:text-2xl' : 'text-xl md:text-2xl lg:text-3xl'
                  }`}
                  layout
                >
                  <span className="text-gold mr-1">+</span>
                  <span className="italic">Gentlemen</span>
                </motion.span>
                <motion.span 
                  className={`text-gold uppercase tracking-[0.2em] md:tracking-[0.3em] transition-all duration-500 ${
                    isScrolled ? 'text-[7px] md:text-[8px]' : 'text-[8px] md:text-[10px]'
                  }`}
                  layout
                >
                  Excursions
                </motion.span>
              </Link>
            </motion.div>

            {/* Right: Menu Button on Mobile, Language + Reserve on Desktop */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 lg:gap-6">
              {/* Language Switcher - Desktop only */}
              <div className="hidden md:flex items-center">
                {languages.map((lang, index) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`relative text-xs font-medium px-2 py-1 transition-colors duration-300 ${
                      language === lang.code
                        ? 'text-gold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {lang.label}
                    {index < languages.length - 1 && (
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-600">|</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Reserve Button - Desktop only */}
              <Link
                to="/contact"
                className="hidden md:block group relative px-4 py-2 lg:px-6 lg:py-2.5 border border-gold/60 hover:border-gold text-white hover:text-gold transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 text-xs lg:text-sm font-medium tracking-wider uppercase">
                  Réserver
                </span>
                <motion.div
                  className="absolute inset-0 bg-gold/10"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>

              {/* Mobile Menu Button - Right side on mobile */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="group flex items-center gap-2 text-white hover:text-gold transition-colors duration-300 md:hidden"
              >
                <div className="relative w-6 h-5 flex flex-col justify-between">
                  <motion.span 
                    className="w-full h-[1.5px] bg-current origin-right"
                    animate={isMobileMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span 
                    className="w-4 h-[1.5px] bg-current ml-auto"
                    animate={isMobileMenuOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span 
                    className="w-full h-[1.5px] bg-current origin-right"
                    animate={isMobileMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom border on scroll */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ 
            opacity: isScrolled ? 1 : 0, 
            scaleX: isScrolled ? 1 : 0 
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.header>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuOverlayVariants}
            className="fixed inset-0 z-40 bg-[#050505] flex items-center justify-center"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-2 text-white hover:text-gold transition-colors z-50"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation Links */}
            <nav className="flex flex-col items-center gap-6 lg:gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={menuLinkVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Link
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group relative block text-center"
                  >
                    <span className="text-3xl lg:text-5xl font-serif text-white group-hover:text-gold transition-colors duration-300">
                      {link.label}
                    </span>
                    {/* Animated underline */}
                    <motion.span
                      className="absolute -bottom-2 left-1/2 h-[1px] bg-gold"
                      initial={{ width: 0, x: '-50%' }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Language Switcher */}
              <motion.div
                custom={navLinks.length}
                variants={menuLinkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex items-center gap-4 mt-8 pt-8 border-t border-gold/20"
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`text-lg font-medium px-4 py-2 transition-colors duration-300 ${
                      language === lang.code
                        ? 'text-gold border border-gold'
                        : 'text-zinc-400 hover:text-white border border-transparent'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </motion.div>

              {/* Reserve CTA in Menu */}
              <motion.div
                custom={navLinks.length + 1}
                variants={menuLinkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mt-4"
              >
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-block px-8 py-3 bg-gold text-[#050505] font-medium tracking-wider uppercase hover:bg-gold/90 transition-colors"
                >
                  Réserver une expédition
                </Link>
              </motion.div>
            </nav>

            {/* Decorative Elements */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
              <p className="text-zinc-500 text-sm tracking-wider">Diego-Suarez, Madagascar</p>
              <p className="text-gold text-xs mt-2 tracking-[0.3em] uppercase">Expériences d'exception</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
