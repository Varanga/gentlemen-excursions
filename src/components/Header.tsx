import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Language } from '@/i18n/translations';

const languages: { code: Language; label: string }[] = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'mg', label: 'MG' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

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

  const navLinks = [
    { href: '/expeditions', label: t.nav.expeditions, subtitle: 'Nos voyages' },
    { href: '/services', label: t.nav.services, subtitle: 'Premium' },
    { href: '/gallery', label: 'Galerie', subtitle: 'Photos' },
    { href: '/about', label: t.nav.about, subtitle: 'Notre histoire' },
    { href: '/blog', label: 'Blog', subtitle: 'Actualités' },
    { href: '/contact', label: t.nav.contact, subtitle: 'Nous joindre' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-navy border-b border-gold/30' 
          : 'bg-gradient-to-b from-navy/80 to-transparent'
      }`}
    >
      {/* Top bar - visible only on desktop */}
      <div className={`hidden lg:block border-b transition-colors duration-500 ${
        isScrolled ? 'border-gold/20' : 'border-white/10'
      }`}>
        <div className="container mx-auto px-8">
          <div className="flex items-center justify-end h-10 gap-6">
            <a 
              href="mailto:contact@gentlemen-excursions.com" 
              className="flex items-center gap-2 text-xs text-zinc hover:text-gold transition-colors"
            >
              <Mail className="w-3 h-3" />
              Newsletter
            </a>
            <a 
              href="/contact" 
              className="flex items-center gap-2 text-xs text-zinc hover:text-gold transition-colors"
            >
              <Phone className="w-3 h-3" />
              Contact
            </a>
            <a 
              href="tel:+261320000000"
              className="text-xs font-medium px-3 py-1 text-gold border border-gold/50 hover:bg-gold hover:text-navy rounded transition-colors"
            >
              +261 32 00 000 00
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-serif text-xl lg:text-2xl font-medium tracking-wide italic text-white hover:text-gold transition-colors duration-300">
              Gentlemen
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="group text-center"
              >
                <span className="block text-sm font-medium tracking-wide text-white group-hover:text-gold transition-colors duration-300">
                  {link.label}
                </span>
                <span className="block text-[10px] uppercase tracking-wider text-zinc group-hover:text-gold/70 transition-colors duration-300">
                  {link.subtitle}
                </span>
              </Link>
            ))}
          </nav>

          {/* Language Switcher & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {/* Language Switcher - Minimal */}
            <div className="flex items-center gap-1">
              {languages.map((lang, index) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`text-xs font-medium px-2 py-1 transition-colors duration-300 ${
                    language === lang.code
                      ? 'text-gold'
                      : 'text-zinc hover:text-white'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-gold transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-navy border-t border-gold/20"
          >
            <nav className="container mx-auto px-6 py-8 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block group"
                >
                  <span className="text-white text-lg font-medium group-hover:text-gold transition-colors">
                    {link.label}
                  </span>
                  <span className="block text-xs text-zinc uppercase tracking-wider mt-1">
                    {link.subtitle}
                  </span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
