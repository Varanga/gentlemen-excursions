import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface FloatingBackButtonProps {
  to: string;
  label?: string;
}

export default function FloatingBackButton({ to, label }: FloatingBackButtonProps) {
  const { language } = useLanguage();
  const { scrollYProgress } = useScroll();
  
  // Fade out when approaching footer (last 10% of page)
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.85, 0.95], [0, 1, 1, 0]);
  const x = useTransform(scrollYProgress, [0, 0.1], [-50, 0]);

  const defaultLabel = language === 'en' 
    ? 'Back' 
    : language === 'mg' 
      ? 'Miverina' 
      : 'Retour';

  return (
    <motion.div
      style={{ opacity, x }}
      className="fixed left-4 lg:left-8 top-[20%] z-40 hidden md:block"
    >
      <Link 
        to={to}
        className="group flex items-center justify-center"
      >
        {/* Bouton flottant style pilule verticale */}
        <motion.div
          whileHover={{ x: -5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="relative flex items-center gap-3 px-4 py-3 bg-black/50 backdrop-blur-md border-l-2 border-gold rounded-r-full"
        >
          {/* Icône flèche dorée */}
          <ArrowLeft 
            className="w-5 h-5 text-gold transition-transform group-hover:-translate-x-1" 
            strokeWidth={1.5}
          />
          
          {/* Label qui apparaît au hover */}
          <span className="text-sm font-medium text-white/80 group-hover:text-gold transition-colors whitespace-nowrap">
            {label || defaultLabel}
          </span>
        </motion.div>
      </Link>
    </motion.div>
  );
}
