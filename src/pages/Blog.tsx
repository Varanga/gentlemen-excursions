import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';

// Import images
import merEmeraudeImg from '@/assets/excursions/mer-emeraude.jpg';
import ankarana from '@/assets/excursions/ankarana.jpg';
import lokobeImg from '@/assets/excursions/lokobe.jpg';
import tsingyRougesImg from '@/assets/excursions/tsingy-rouges.jpg';
import montagneAmbreImg from '@/assets/excursions/montagne-ambre.jpg';
import routeCacaoImg from '@/assets/excursions/route-cacao.jpg';

const blogPosts = [
  {
    id: 1,
    image: merEmeraudeImg,
    date: '15/01/2026',
    author: 'Équipe Gentlemen',
    categoryFr: 'Conseils d\'expert',
    categoryEn: 'Expert Tips',
    categoryMg: 'Torohevitra',
    titleFr: 'Top conseils pour préparer votre voyage à Madagascar',
    titleEn: 'Top tips for preparing your trip to Madagascar',
    titleMg: 'Torohevitra tsara indrindra amin\'ny fanomanana ny dianao',
    excerptFr: 'Découvrez nos recommandations essentielles pour un voyage réussi au cœur de la Grande Île.',
    excerptEn: 'Discover our essential recommendations for a successful trip to the heart of the Big Island.',
    excerptMg: 'Fantaro ny torohevitray ilaina ho an\'ny dia mahomby ao amin\'ny Nosy Lehibe.',
  },
  {
    id: 2,
    image: ankarana,
    date: '08/01/2026',
    author: 'Équipe Gentlemen',
    categoryFr: 'Culture',
    categoryEn: 'Culture',
    categoryMg: 'Kolontsaina',
    titleFr: 'Légendes des Tsingy : entre histoire et mystère',
    titleEn: 'Legends of the Tsingy: between history and mystery',
    titleMg: 'Angano momba ny Tsingy: tantara sy mistery',
    excerptFr: 'Plongez dans les récits ancestraux qui entourent ces formations rocheuses uniques au monde.',
    excerptEn: 'Dive into the ancestral tales surrounding these unique rock formations.',
    excerptMg: 'Midìra ao amin\'ny tantara nentim-paharazana manodidina ireo vatolampy tokana.',
  },
  {
    id: 3,
    image: lokobeImg,
    date: '02/01/2026',
    author: 'Équipe Gentlemen',
    categoryFr: 'Faune & Flore',
    categoryEn: 'Wildlife',
    categoryMg: 'Biby sy Zavamaniry',
    titleFr: 'Les lémuriens de Lokobe : rencontres privilégiées',
    titleEn: 'The lemurs of Lokobe: privileged encounters',
    titleMg: 'Ny gidro ao Lokobe: fihaonana manokana',
    excerptFr: 'Partez à la rencontre des espèces endémiques dans cette forêt primaire exceptionnelle.',
    excerptEn: 'Meet endemic species in this exceptional primary forest.',
    excerptMg: 'Mifanena amin\'ny biby tsy misy afa-tsy eto ao amin\'ity ala voalohany ity.',
  },
  {
    id: 4,
    image: tsingyRougesImg,
    date: '25/12/2025',
    author: 'Équipe Gentlemen',
    categoryFr: 'Géologie',
    categoryEn: 'Geology',
    categoryMg: 'Jeolojia',
    titleFr: 'Les Tsingy Rouges : un phénomène géologique unique',
    titleEn: 'The Red Tsingy: a unique geological phenomenon',
    titleMg: 'Tsingy Mena: endri-tany tokana',
    excerptFr: 'Comment l\'érosion a sculpté ces cathédrales de latérite rouge au fil des millénaires.',
    excerptEn: 'How erosion sculpted these red laterite cathedrals over millennia.',
    excerptMg: 'Ahoana no nandrafetan\'ny fisotroan-tany ireo tranobe laterita mena.',
  },
  {
    id: 5,
    image: montagneAmbreImg,
    date: '18/12/2025',
    author: 'Équipe Gentlemen',
    categoryFr: 'Écotourisme',
    categoryEn: 'Ecotourism',
    categoryMg: 'Fizahan-tany',
    titleFr: 'Montagne d\'Ambre : au cœur de la biodiversité',
    titleEn: 'Amber Mountain: at the heart of biodiversity',
    titleMg: 'Ambohitra: ao afovoan\'ny biodiversite',
    excerptFr: 'Explorez l\'une des forêts tropicales les plus riches en biodiversité de Madagascar.',
    excerptEn: 'Explore one of Madagascar\'s most biodiverse tropical forests.',
    excerptMg: 'Tsidiho ny iray amin\'ireo ala tropikaly manankarena indrindra.',
  },
  {
    id: 6,
    image: routeCacaoImg,
    date: '10/12/2025',
    author: 'Équipe Gentlemen',
    categoryFr: 'Gastronomie',
    categoryEn: 'Gastronomy',
    categoryMg: 'Sakafo',
    titleFr: 'La Route du Cacao : de la fève à la tablette',
    titleEn: 'The Cocoa Route: from bean to bar',
    titleMg: 'Lalana Kakao: avy amin\'ny voa mankany amin\'ny tablette',
    excerptFr: 'Suivez le parcours du cacao malgache, l\'un des meilleurs au monde.',
    excerptEn: 'Follow the journey of Malagasy cocoa, one of the best in the world.',
    excerptMg: 'Araho ny dian\'ny kakao malagasy, anisan\'ny tsara indrindra eran-tany.',
  },
];

export default function Blog() {
  const { t, language } = useLanguage();

  const getTitle = (post: typeof blogPosts[0]) => {
    switch (language) {
      case 'en': return post.titleEn;
      case 'mg': return post.titleMg;
      default: return post.titleFr;
    }
  };

  const getExcerpt = (post: typeof blogPosts[0]) => {
    switch (language) {
      case 'en': return post.excerptEn;
      case 'mg': return post.excerptMg;
      default: return post.excerptFr;
    }
  };

  const getCategory = (post: typeof blogPosts[0]) => {
    switch (language) {
      case 'en': return post.categoryEn;
      case 'mg': return post.categoryMg;
      default: return post.categoryFr;
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-navy">
        <div className="absolute inset-0 z-0">
          <img src={ankarana} alt="Blog" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 to-navy/90" />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-title mb-4"
          >
            {t.blog.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/80 max-w-2xl mx-auto"
          >
            {t.blog.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image}
                    alt={getTitle(post)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-azure text-navy text-xs font-medium px-3 py-1 rounded-full">
                    {getCategory(post)}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {post.author}
                    </span>
                  </div>
                  
                  <h2 className="font-serif text-xl font-medium text-navy mb-3 group-hover:text-azure-dark transition-colors line-clamp-2">
                    {getTitle(post)}
                  </h2>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {getExcerpt(post)}
                  </p>
                  
                  <Link 
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-azure-dark hover:text-navy transition-colors"
                  >
                    {t.blog.readMore}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
