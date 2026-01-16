import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import { SEO } from '@/lib/seo';
import { Link } from 'react-router-dom';
import { blogArticles } from '@/lib/blogData';

export default function Blog() {
  const { t, language } = useLanguage();

  const getLocalizedText = (textObj: { fr: string; en: string; mg: string }) => {
    return textObj[language] || textObj.fr;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : language === 'mg' ? 'mg-MG' : 'fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const featuredArticle = blogArticles[0];
  const otherArticles = blogArticles.slice(1);

  // SEO content per language
  const seoContent = {
    fr: {
      title: 'Blog | Légendes Malgaches & Conseils Voyage',
      description: 'Découvrez les légendes de Madagascar, conseils kitesurf Diego-Suarez, vanille SAVA et secrets du Nord. Articles par des experts locaux.',
    },
    en: {
      title: 'Blog | Malagasy Legends & Travel Tips',
      description: 'Discover Madagascar legends, Diego-Suarez kitesurfing tips, SAVA vanilla and Northern secrets. Articles by local experts.',
    },
    mg: {
      title: 'Blog | Angano Malagasy & Torohevitra Dia',
      description: 'Fantaro ny angano Malagasy, torohevitra kitesurf Diego-Suarez, vanila SAVA ary tsiambaratelon\'ny Avaratra.',
    },
  };

  return (
    <Layout>
      <SEO
        title={seoContent[language].title}
        description={seoContent[language].description}
        canonical="/blog"
        language={language}
        keywords={['Blog Madagascar', 'Légendes malgaches', 'Kitesurf Diego-Suarez', 'Vanille Madagascar SAVA']}
      />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-[#050505] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={featuredArticle.image} 
            alt="Blog" 
            className="w-full h-full object-cover opacity-30" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-[#050505]" />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold uppercase tracking-[0.3em] text-sm font-medium mb-4"
          >
            {t.sections.news}
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            {t.blog.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-300 text-lg max-w-2xl mx-auto"
          >
            {t.blog.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 lg:py-20 bg-[#050505]">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <Link to={`/blog/${featuredArticle.slug}`} className="block">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Image */}
                <div className="relative h-[400px] lg:h-[500px] overflow-hidden rounded-xl">
                  <img 
                    src={featuredArticle.image}
                    alt={getLocalizedText(featuredArticle.title)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-6 left-6">
                    <span className="bg-gold text-black text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-wider">
                      {getLocalizedText(featuredArticle.category)}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="lg:pl-8">
                  <div className="flex items-center gap-6 text-zinc-400 text-sm mb-6">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gold" />
                      {formatDate(featuredArticle.date)}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gold" />
                      {featuredArticle.readTime}
                    </span>
                  </div>
                  
                  <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-6 group-hover:text-gold transition-colors">
                    {getLocalizedText(featuredArticle.title)}
                  </h2>
                  
                  <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                    {getLocalizedText(featuredArticle.excerpt)}
                  </p>
                  
                  <div className="inline-flex items-center gap-3 text-gold font-medium group-hover:gap-5 transition-all">
                    {t.blog.readMore}
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-16 lg:py-20 bg-[#0A0A0A]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link to={`/blog/${article.slug}`} className="block">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden rounded-xl mb-6">
                    <img 
                      src={article.image}
                      alt={getLocalizedText(article.title)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gold/90 text-black text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
                        {getLocalizedText(article.category)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex items-center gap-4 text-zinc-500 text-xs mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(article.date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                  </div>
                  
                  <h3 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors line-clamp-2">
                    {getLocalizedText(article.title)}
                  </h3>
                  
                  <p className="text-zinc-400 text-sm line-clamp-3 mb-4">
                    {getLocalizedText(article.excerpt)}
                  </p>
                  
                  <div className="inline-flex items-center gap-2 text-gold text-sm font-medium">
                    {t.blog.readMore}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-[#050505] border-t border-gold/20">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gold uppercase tracking-[0.2em] text-sm font-medium mb-4">
              Newsletter
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4">
              {t.footer.newsletter.title}
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto mb-8">
              Recevez nos derniers articles et inspirations directement dans votre boîte mail.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email"
                placeholder={t.footer.newsletter.placeholder}
                className="flex-1 px-6 py-4 bg-[#0A0A0A] border border-gold/30 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-gold transition-colors"
              />
              <button 
                type="submit"
                className="bg-gold text-black px-8 py-4 font-semibold rounded-lg hover:bg-gold/90 transition-colors whitespace-nowrap"
              >
                {t.footer.newsletter.button}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
