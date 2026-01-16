import { useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Share2 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import FloatingBackButton from '@/components/FloatingBackButton';
import { getArticleBySlug, blogArticles } from '@/lib/blogData';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const article = slug ? getArticleBySlug(slug) : undefined;

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

  // Get related articles (exclude current)
  const relatedArticles = blogArticles.filter(a => a.slug !== slug).slice(0, 2);

  if (!article) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-[#050505]">
          <div className="text-center">
            <h1 className="text-4xl font-serif text-white mb-4">
              {language === 'en' ? 'Article not found' : language === 'mg' ? 'Tsy hita ny lahatsoratra' : 'Article non trouvé'}
            </h1>
            <p className="text-zinc-400 mb-8">
              {language === 'en' ? 'The article you are looking for does not exist.' : language === 'mg' ? 'Ny lahatsoratra tadiavina dia tsy misy.' : 'L\'article que vous recherchez n\'existe pas.'}
            </p>
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors"
            >
              {language === 'en' ? 'Back to blog' : language === 'mg' ? 'Miverina any amin\'ny blog' : 'Retour au blog'}
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Floating Back Button - Premium Sticky */}
      <FloatingBackButton 
        to="/blog" 
        label={language === 'en' ? 'Blog' : language === 'mg' ? 'Blog' : 'Blog'}
      />

      {/* Hero Image */}
      <section className="relative h-[50vh] min-h-[400px] bg-[#050505] overflow-hidden pt-[100px]">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          src={article.image}
          alt={getLocalizedText(article.title)}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient de lisibilité pour le header */}
        <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/50 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-28 left-1/2 -translate-x-1/2 z-20">
          <span className="bg-gold text-black text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-wider">
            {getLocalizedText(article.category)}
          </span>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 lg:py-20 bg-[#050505]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-6 leading-tight">
              {getLocalizedText(article.title)}
            </h1>
            
            {/* Meta Info */}
            <div className="flex items-center justify-center gap-6 text-zinc-400 text-sm">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-gold" />
                {article.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gold" />
                {formatDate(article.date)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold" />
                {article.readTime}
              </span>
            </div>
          </motion.header>

          {/* Article Body */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg prose-invert max-w-none"
          >
            {/* Render markdown content */}
            <div className="text-zinc-300 leading-relaxed space-y-6">
              {getLocalizedText(article.content).split('\n\n').map((paragraph, index) => {
                // Check if it's a heading
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="font-serif text-2xl text-white font-bold mt-12 mb-6 border-l-4 border-gold pl-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="font-serif text-xl text-white font-semibold mt-8 mb-4">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                // Check if it's a list
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                  return (
                    <ul key={index} className="space-y-2 my-6">
                      {items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0" />
                          <span>{item.replace('- ', '')}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                // Check if it's italic (CTA)
                if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
                  return (
                    <p key={index} className="text-gold italic text-lg mt-8 p-6 border border-gold/30 rounded-xl bg-gold/5">
                      {paragraph.replace(/\*/g, '')}
                    </p>
                  );
                }
                // Regular paragraph
                return (
                  <p key={index} className="text-zinc-300 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </motion.article>

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 border-t border-gold/20"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <p className="text-zinc-400 text-sm flex items-center gap-2">
                <Share2 className="w-4 h-4 text-gold" />
                {language === 'en' ? 'Share this article' : language === 'mg' ? 'Zarao ity lahatsoratra ity' : 'Partager cet article'}
              </p>
              <div className="flex items-center gap-3">
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-zinc-400 hover:text-gold hover:border-gold transition-colors text-xs font-bold"
                >
                  FB
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(getLocalizedText(article.title))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-zinc-400 hover:text-gold hover:border-gold transition-colors text-xs font-bold"
                >
                  X
                </a>
                <a 
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(getLocalizedText(article.title))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-zinc-400 hover:text-gold hover:border-gold transition-colors text-xs font-bold"
                >
                  IN
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 lg:py-20 bg-[#0A0A0A]">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <h2 className="font-serif text-2xl lg:text-3xl text-white font-bold mb-10 text-center">
              {language === 'en' ? 'Related Articles' : language === 'mg' ? 'Lahatsoratra Mifandraika' : 'Articles Similaires'}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedArticles.map((relatedArticle, index) => (
                <motion.article
                  key={relatedArticle.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={`/blog/${relatedArticle.slug}`} className="block">
                    <div className="relative h-56 overflow-hidden rounded-xl mb-4">
                      <img 
                        src={relatedArticle.image}
                        alt={getLocalizedText(relatedArticle.title)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-gold/90 text-black text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
                          {getLocalizedText(relatedArticle.category)}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors line-clamp-2">
                      {getLocalizedText(relatedArticle.title)}
                    </h3>
                    <p className="text-zinc-400 text-sm line-clamp-2">
                      {getLocalizedText(relatedArticle.excerpt)}
                    </p>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-[#050505] border-t border-gold/20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gold uppercase tracking-[0.2em] text-sm font-medium mb-4">
              {language === 'en' ? 'Ready for adventure?' : language === 'mg' ? 'Vonona hikaroka?' : 'Prêt pour l\'aventure ?'}
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-6">
              {language === 'en' ? 'Discover our expeditions' : language === 'mg' ? 'Fantaro ny fitsangatsangananay' : 'Découvrez nos expéditions'}
            </h2>
            <Link 
              to="/expeditions"
              className="inline-flex items-center justify-center px-10 py-4 bg-gold text-black text-sm font-semibold tracking-widest uppercase hover:bg-gold/90 transition-colors"
            >
              {language === 'en' ? 'View all expeditions' : language === 'mg' ? 'Jereo ny fitsangatsanganana rehetra' : 'Voir toutes les expéditions'}
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
