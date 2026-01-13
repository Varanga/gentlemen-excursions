import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface ExcursionCardProps {
  image: string;
  title: string;
  titleMg?: string;
  description: string;
  tag?: string;
  index?: number;
}

export default function ExcursionCard({
  image,
  title,
  titleMg,
  description,
  tag,
  index = 0,
}: ExcursionCardProps) {
  const { t, language } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="excursion-card group cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={image}
          alt={title}
          className="excursion-card-image"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        
        {/* Tag */}
        {tag && (
          <div className="absolute top-4 left-4 bg-azure text-navy text-xs font-medium px-3 py-1 uppercase tracking-wider">
            {tag}
          </div>
        )}
        
        {/* Discover Button */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="bg-white text-navy p-3 rounded-full">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 lg:p-6">
        <div className="mb-2">
          <h3 className="font-serif text-xl lg:text-2xl font-medium text-navy">
            {title}
          </h3>
          {titleMg && language !== 'mg' && (
            <p className="text-sm text-azure-dark italic mt-1">{titleMg}</p>
          )}
        </div>
        <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
          {description}
        </p>
        
        {/* CTA */}
        <div className="mt-4 pt-4 border-t border-border">
          <span className="text-sm font-medium text-navy group-hover:text-azure-dark transition-colors inline-flex items-center gap-2">
            {t.common.discover}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
