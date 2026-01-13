import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function NewsletterSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 lg:py-20 bg-background border-t border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          {/* Left Side - Title */}
          <div>
            <span className="text-azure-dark text-sm font-medium tracking-[0.3em] uppercase mb-2 block">
              {t.footer.newsletter.subscribe}
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-medium text-navy">
              {t.footer.newsletter.title}
            </h2>
          </div>
          
          {/* Right Side - Form */}
          <div className="w-full lg:w-auto">
            <form className="flex">
              <div className="relative flex-1 lg:w-80">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input 
                  type="email"
                  placeholder={t.footer.newsletter.placeholder}
                  className="w-full pl-12 pr-4 py-4 border border-border rounded-l-none lg:rounded-l-lg focus:outline-none focus:border-azure-dark"
                />
              </div>
              <button 
                type="submit"
                className="bg-navy text-white px-8 py-4 font-medium hover:bg-navy-light transition-colors"
              >
                {t.footer.newsletter.button}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
