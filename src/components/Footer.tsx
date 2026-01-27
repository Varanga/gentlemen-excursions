import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage, type Language } from '@/i18n/LanguageContext';

export default function Footer() {
  const { t, language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string }[] = [
    { code: 'fr', label: 'FR' },
    { code: 'en', label: 'EN' },
    { code: 'mg', label: 'MG' },
  ];

  return (
    <footer className="bg-[#050505] relative">
      {/* Golden top border - 80% width, centered */}
      <div className="flex justify-center">
        <div className="w-[80%] h-[0.5px] bg-gradient-to-r from-transparent via-gold to-transparent" />
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16"
        >
          {/* Column 1 - Identity */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="font-serif text-2xl font-medium text-white tracking-wide">
                GENTLEMEN EXCURSIONS
              </h2>
              <p className="text-zinc-400 text-sm mt-4 leading-relaxed">
                {language === 'fr' && "L'art de l'aventure exclusive dans le Nord de Madagascar."}
                {language === 'en' && "The art of exclusive adventure in Northern Madagascar."}
                {language === 'mg' && "Ny kanto amin'ny fikarohana manokana any avaratr'i Madagasikara."}
              </p>
            </div>

            {/* GPS Coordinates */}
            <div className="flex items-center gap-2 text-gold text-sm font-mono tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>12.2777° S, 49.2913° E</span>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              <a 
                href="https://web.facebook.com/profile.php?id=100064142230041" 
                className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-300 group"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-gold group-hover:text-[#050505]" />
              </a>
              <a 
                href="https://www.instagram.com/fabienbarthezgentleman?igsh=eGF0MGl0ajdmNXJu" 
                className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-gold group-hover:text-[#050505]" />
              </a>
              <a 
                href="https://youtube.com/@gentlemenexcursion?si=Oy-cTgJb5w_76kg0 " 
                className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-300 group"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4 text-gold group-hover:text-[#050505]" />
              </a>
            </div>
          </motion.div>

          {/* Column 2 - Exploration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6"
          >
            <h3 className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
              EXPLORATION
            </h3>
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/expeditions" 
                  className="text-zinc-400 hover:text-gold transition-colors text-sm inline-block relative group"
                >
                  {t.nav.expeditions}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
              <li>
                <Link 
                  to="/services" 
                  className="text-zinc-400 hover:text-gold transition-colors text-sm inline-block relative group"
                >
                  {t.nav.services}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
              <li>
                <Link 
                  to="/gallery" 
                  className="text-zinc-400 hover:text-gold transition-colors text-sm inline-block relative group"
                >
                  {t.nav.gallery}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="text-zinc-400 hover:text-gold transition-colors text-sm inline-block relative group"
                >
                  {t.nav.blog}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Column 3 - Concierge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
              CONTACT
            </h3>
            <ul className="space-y-4">
              {/* Email - formal first */}
              <li>
                <a 
                  href="mailto:gentlemenexcursions@gmail.com"
                  className="flex items-center gap-2 text-zinc-400 hover:text-gold transition-colors text-sm group"
                >
                  <Mail className="w-4 h-4 text-gold" />
                  <span className="relative">
                    gentlemenexcursions@gmail.com
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                  </span>
                </a>
              </li>
              {/* WhatsApp - direct */}
              <li>
                <a 
                  href="https://wa.me/261326850423?text=Bonjour%20Gentlemen%20Excursions%2C%20je%20souhaite%20organiser%20une%20exp%C3%A9dition..." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-zinc-400 hover:text-gold transition-colors text-sm group"
                >
                  <MessageCircle className="w-4 h-4 text-gold" />
                  <span className="relative">
                    +261 32 68 504 23 <span className="text-zinc-600">(WhatsApp)</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                  </span>
                </a>
              </li>
              {/* Phone - calls only */}
              <li>
                <a 
                  href="tel:+261382122147"
                  className="flex items-center gap-2 text-zinc-400 hover:text-gold transition-colors text-sm group"
                >
                  <Phone className="w-4 h-4 text-gold" />
                  <span className="relative">
                    +261 38 21 221 47 <span className="text-zinc-600">({t.common.calls})</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                  </span>
                </a>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-zinc-400 hover:text-gold transition-colors text-sm inline-block relative group"
                >
                  {t.nav.about}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            </ul>

            {/* Language Selector - Discrete */}
            <div className="pt-4">
              <div className="flex items-center gap-1 text-xs">
                {languages.map((lang, index) => (
                  <span key={lang.code} className="flex items-center">
                    <button
                      onClick={() => setLanguage(lang.code)}
                      className={`transition-colors duration-200 px-1 ${
                        language === lang.code 
                          ? 'text-gold font-medium' 
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {lang.label}
                    </button>
                    {index < languages.length - 1 && (
                      <span className="text-zinc-600 mx-1">|</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar - Copyright */}
      <div className="container mx-auto px-6 lg:px-12 pb-8">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <p className="text-zinc-500 text-xs italic max-w-md">
            {t.common.availableDaily}
          </p>
          <p className="text-zinc-600 text-xs">
            © {new Date().getFullYear()} Gentlemen Excursions. {t.footer.rights}.
          </p>
        </div>
      </div>
    </footer>
  );
}
