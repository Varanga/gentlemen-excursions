import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white">
      {/* Main Footer */}
      <div className="border-t border-border">
        <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Agency Column */}
            <div>
              <h3 className="font-serif text-xl font-medium text-navy mb-6">
                {t.footer.agency}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-azure-dark transition-colors text-sm">
                    {t.footer.ourCommitments}
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-azure-dark transition-colors text-sm">
                    {t.footer.loyaltyProgram}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Travel Ideas Column */}
            <div>
              <h3 className="font-serif text-xl font-medium text-navy mb-6">
                {t.footer.travelIdeas}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/expeditions" className="text-muted-foreground hover:text-azure-dark transition-colors text-sm">
                    Diego-Suarez
                  </Link>
                </li>
                <li>
                  <Link to="/expeditions" className="text-muted-foreground hover:text-azure-dark transition-colors text-sm">
                    Nosy Be
                  </Link>
                </li>
                <li>
                  <Link to="/expeditions" className="text-muted-foreground hover:text-azure-dark transition-colors text-sm">
                    {t.excursions.merEmeraude.title}
                  </Link>
                </li>
                <li>
                  <Link to="/expeditions" className="text-muted-foreground hover:text-azure-dark transition-colors text-sm">
                    {t.excursions.nosyIranja.title}
                  </Link>
                </li>
                <li>
                  <Link to="/expeditions" className="text-muted-foreground hover:text-azure-dark transition-colors text-sm">
                    {t.excursions.ankarana.title}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="font-serif text-xl font-medium text-navy mb-6">
                {t.footer.contact}
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/contact" className="text-azure-dark hover:text-navy transition-colors text-sm font-medium">
                    {t.contact.requestQuote}
                  </Link>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Phone className="w-4 h-4 text-azure-dark" />
                  {t.contact.info.phone}
                </li>
                <li className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Mail className="w-4 h-4 text-azure-dark" />
                  {t.contact.info.email}
                </li>
              </ul>
            </div>

            {/* Company Info */}
            <div>
              <div className="bg-sand rounded-lg p-6">
                <h2 className="font-serif text-xl font-medium text-navy mb-2">
                  GENTLEMEN EXCURSIONS
                </h2>
                <div className="flex items-start gap-2 text-muted-foreground text-sm mb-4">
                  <MapPin className="w-4 h-4 text-azure-dark shrink-0 mt-0.5" />
                  <span>{t.contact.info.address}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {t.footer.tagline}
                </p>
                
                {/* Social Links */}
                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-medium text-navy mb-3">{t.footer.followUs}</p>
                  <div className="flex gap-3">
                    <a
                      href="#"
                      className="w-9 h-9 rounded-full bg-navy flex items-center justify-center hover:bg-azure-dark transition-colors"
                    >
                      <Facebook className="w-4 h-4 text-white" />
                    </a>
                    <a
                      href="#"
                      className="w-9 h-9 rounded-full bg-navy flex items-center justify-center hover:bg-azure-dark transition-colors"
                    >
                      <Instagram className="w-4 h-4 text-white" />
                    </a>
                    <a
                      href="#"
                      className="w-9 h-9 rounded-full bg-navy flex items-center justify-center hover:bg-azure-dark transition-colors"
                    >
                      <Youtube className="w-4 h-4 text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-border py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <span className="text-azure-dark text-sm font-medium tracking-[0.2em] uppercase block mb-1">
                {t.footer.newsletter.subscribe}
              </span>
              <h3 className="font-serif text-3xl font-medium text-navy">
                {t.footer.newsletter.title}
              </h3>
            </div>
            <form className="flex w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input 
                  type="email"
                  placeholder={t.footer.newsletter.placeholder}
                  className="w-full pl-12 pr-4 py-4 border border-border focus:outline-none focus:border-azure-dark"
                />
              </div>
              <button 
                type="submit"
                className="bg-navy text-white px-8 py-4 font-medium hover:bg-navy-light transition-colors whitespace-nowrap"
              >
                {t.footer.newsletter.button}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-navy text-white">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Gentlemen Excursions. {t.footer.rights}.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-white/60 hover:text-azure transition-colors">
                {t.footer.legal}
              </a>
              <a href="#" className="text-white/60 hover:text-azure transition-colors">
                {t.footer.privacy}
              </a>
              <a href="#" className="text-white/60 hover:text-azure transition-colors">
                {t.footer.cookies}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
