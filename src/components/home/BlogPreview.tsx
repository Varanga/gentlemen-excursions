import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { blogArticles } from '@/lib/blogData';

export default function BlogPreview() {
  const { language } = useLanguage();

  const labels = {
    fr: { section: 'L\'Expertise', title: 'Légendes Malgaches', cta: 'Tous les articles', readMore: 'Lire la suite' },
    en: { section: 'Expertise', title: 'Malagasy Legends', cta: 'All articles', readMore: 'Read more' },
    mg: { section: 'Ny Fahaizana', title: 'Angano Malagasy', cta: 'Lahatsoratra rehetra', readMore: 'Tohizo ny famakiana' },
  };

  const t = labels[language];

  // Get latest 2 articles
  const latestArticles = blogArticles.slice(0, 2);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : language === 'mg' ? 'mg-MG' : 'fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <section className="relative py-24 lg:py-32 bg-[#0A0A0A]">
      {/* Golden separator line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16"
        >
          <div>
            <span className="text-gold text-sm tracking-[0.3em] uppercase font-medium">
              {t.section}
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl text-white mt-4">
              {t.title}
            </h2>
          </div>
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-3 text-gold font-medium hover:gap-5 transition-all group"
          >
            {t.cta}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {latestArticles.map((article, index) => {
            const title = article.title[language] || article.title.fr;
            const excerpt = article.excerpt[language] || article.excerpt.fr;
            const category = article.category[language] || article.category.fr;
            
            return (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group"
              >
                <Link to={`/blog/${article.slug}`} className="block">
                  {/* Image */}
                  <div className="relative h-[300px] lg:h-[350px] overflow-hidden mb-6">
                    <img 
                      src={article.image}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="text-gold text-xs tracking-[0.2em] uppercase font-medium bg-black/60 backdrop-blur-sm px-4 py-2">
                        {category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex items-center gap-2 text-zinc-500 text-sm mb-4">
                    <Calendar className="w-4 h-4 text-gold" />
                    <span className="uppercase tracking-wider">{formatDate(article.date)}</span>
                  </div>
                  
                  <h3 className="font-serif text-2xl lg:text-3xl text-white mb-4 group-hover:text-gold transition-colors leading-tight">
                    {title}
                  </h3>
                  
                  <p className="text-zinc-400 leading-relaxed line-clamp-2 mb-6">
                    {excerpt}
                  </p>
                  
                  <span className="inline-flex items-center gap-2 text-gold font-medium group-hover:gap-4 transition-all">
                    {t.readMore}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
