import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { Link } from 'react-router-dom';

// Import images for blog posts
import merEmeraudeImg from '@/assets/excursions/mer-emeraude.jpg';
import ankarana from '@/assets/excursions/ankarana.jpg';
import lokobeImg from '@/assets/excursions/lokobe.jpg';

const blogPosts = [
  {
    id: 1,
    image: merEmeraudeImg,
    date: '15/01/2026',
    category: 'Conseils d\'expert',
    titleFr: 'Top conseils pour préparer votre voyage à Madagascar',
    titleEn: 'Top tips for preparing your trip to Madagascar',
    titleMg: 'Torohevitra tsara indrindra amin\'ny fanomanana ny dianao any Madagasikara',
    featured: true,
  },
  {
    id: 2,
    image: ankarana,
    date: '08/01/2026',
    category: 'Culture',
    titleFr: 'Légendes des Tsingy : entre histoire et mystère',
    titleEn: 'Legends of the Tsingy: between history and mystery',
    titleMg: 'Angano momba ny Tsingy: eo anelanelan\'ny tantara sy ny mistery',
    featured: false,
  },
  {
    id: 3,
    image: lokobeImg,
    date: '02/01/2026',
    category: 'Faune & Flore',
    titleFr: 'Les lémuriens de Lokobe : rencontres privilégiées',
    titleEn: 'The lemurs of Lokobe: privileged encounters',
    titleMg: 'Ny gidro ao Lokobe: fihaonana manokana',
    featured: false,
  },
];

export default function NewsSection() {
  const { t, language } = useLanguage();

  const getTitle = (post: typeof blogPosts[0]) => {
    switch (language) {
      case 'en': return post.titleEn;
      case 'mg': return post.titleMg;
      default: return post.titleFr;
    }
  };

  const featuredPost = blogPosts.find(p => p.featured);
  const sidePosts = blogPosts.filter(p => !p.featured);

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-azure-dark text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
            {t.sections.news}
          </span>
          <h2 className="section-title text-navy mb-4">
            {t.sections.blogTitle}
          </h2>
          
          {/* All News Link */}
          <div className="flex justify-end">
            <Link 
              to="/blog" 
              className="text-sm text-muted-foreground hover:text-navy transition-colors flex items-center gap-2"
            >
              <span className="w-8 h-px bg-muted-foreground"></span>
              {t.sections.allNews}
            </Link>
          </div>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Post */}
          {featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Link to="/blog" className="group block">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Image */}
                  <div className="md:w-1/2 aspect-[4/3] md:aspect-square overflow-hidden rounded-lg">
                    <img 
                      src={featuredPost.image}
                      alt={getTitle(featuredPost)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="md:w-1/2 flex flex-col justify-center">
                    <span className="text-azure-dark text-sm mb-2">
                      {featuredPost.date}
                    </span>
                    <h3 className="font-serif text-2xl lg:text-3xl font-medium text-navy mb-3 group-hover:text-azure-dark transition-colors">
                      {getTitle(featuredPost)}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      <span className="font-medium">{t.blog.category} :</span> {featuredPost.category}
                    </p>
                    <span className="text-azure-dark text-sm font-medium hover:underline">
                      {t.blog.readMore} →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
          
          {/* Side Posts */}
          <div className="space-y-6">
            {sidePosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to="/blog" className="group block">
                  <div className="relative rounded-lg overflow-hidden aspect-[16/9]">
                    <img 
                      src={post.image}
                      alt={getTitle(post)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <span className="text-azure text-xs mb-1 block">
                        {post.date}
                      </span>
                      <h3 className="font-serif text-lg font-medium leading-snug">
                        {getTitle(post)}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
