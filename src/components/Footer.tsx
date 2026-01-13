import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-navy text-white">
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h2 className="font-serif text-2xl font-medium mb-4">
              GENTLEMEN EXCURSIONS
            </h2>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              {t.footer.tagline}
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-azure transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-azure transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-lg mb-6">{t.footer.quickLinks}</h3>
            <ul className="space-y-3">
              <li>
                <a href="/#destinations" className="text-white/70 hover:text-azure transition-colors text-sm">
                  {t.nav.destinations}
                </a>
              </li>
              <li>
                <a href="/#experiences" className="text-white/70 hover:text-azure transition-colors text-sm">
                  {t.nav.experiences}
                </a>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-azure transition-colors text-sm">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-azure transition-colors text-sm">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="font-medium text-lg mb-6">{t.nav.destinations}</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/70 hover:text-azure transition-colors text-sm">
                  Diego-Suarez
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-azure transition-colors text-sm">
                  Nosy Be
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-azure transition-colors text-sm">
                  {t.excursions.merEmeraude.title}
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-azure transition-colors text-sm">
                  {t.excursions.nosyIranja.title}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-medium text-lg mb-6">{t.footer.contact}</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-azure shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">{t.contact.info.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-azure shrink-0" />
                <span className="text-white/70 text-sm">{t.contact.info.phone}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-azure shrink-0" />
                <span className="text-white/70 text-sm">{t.contact.info.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Gentlemen Excursions. {t.footer.rights}.
          </p>
        </div>
      </div>
    </footer>
  );
}
