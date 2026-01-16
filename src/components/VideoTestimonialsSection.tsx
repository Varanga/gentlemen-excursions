import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface VideoTestimonial {
  id: string;
  youtubeId: string;
  clientName: string;
  expedition: string;
  thumbnail?: string;
}

const videoTestimonials: VideoTestimonial[] = [
  {
    id: '1',
    youtubeId: 'CcZNtmC0QOs',
    clientName: 'Échappées Belles',
    expedition: 'Découverte de Madagascar',
  },
  {
    id: '2',
    youtubeId: 'gvlIqiKXayo',
    clientName: 'Aventuriers',
    expedition: 'Safari Sauvage',
  },
  {
    id: '3',
    youtubeId: 'eFo9iMipATg',
    clientName: 'Voyageurs Premium',
    expedition: 'Hôtels d\'Exception',
  },
];

const sectionContent = {
  fr: {
    subtitle: 'Témoignages Vidéo',
    title: "L'Aventure Vécue par nos Gentlemen",
    testimonialOf: 'Témoignage de',
    expedition: 'Expédition',
  },
  en: {
    subtitle: 'Video Testimonials',
    title: 'The Adventure Lived by Our Gentlemen',
    testimonialOf: 'Testimonial from',
    expedition: 'Expedition',
  },
  mg: {
    subtitle: 'Vavolombelona Video',
    title: "Ny Aventira Niainan'ny Gentlemen",
    testimonialOf: 'Vavolombelona avy amin\'i',
    expedition: 'Dia',
  },
};

function VideoCard({ video, content }: { video: VideoTestimonial; content: typeof sectionContent.fr }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnailUrl = video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative aspect-video rounded-xl overflow-hidden border border-zinc-800 hover:border-gold/50 transition-all duration-500">
        {!isPlaying ? (
          <>
            {/* Custom Thumbnail with Lazy Loading */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={thumbnailUrl}
                alt={`${content.testimonialOf} ${video.clientName}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
            </div>

            {/* Play Button */}
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center z-10"
              aria-label="Lire la vidéo"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gold/90 hover:bg-gold flex items-center justify-center shadow-2xl transition-colors duration-300"
              >
                <Play className="w-7 h-7 lg:w-8 lg:h-8 text-black ml-1" fill="currentColor" />
              </motion.div>
            </button>

            {/* Golden corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/0 group-hover:border-gold/50 transition-colors duration-500 rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/0 group-hover:border-gold/50 transition-colors duration-500 rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold/0 group-hover:border-gold/50 transition-colors duration-500 rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/0 group-hover:border-gold/50 transition-colors duration-500 rounded-br-xl" />
          </>
        ) : (
          /* YouTube Embed */
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={`${content.testimonialOf} ${video.clientName}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        )}
      </div>

      {/* Caption */}
      <p className="mt-4 text-center text-zinc-400 italic text-sm lg:text-base">
        {content.testimonialOf} <span className="text-white">{video.clientName}</span>
        <span className="text-gold mx-2">—</span>
        {content.expedition} <span className="text-gold">{video.expedition}</span>
      </p>
    </motion.div>
  );
}

export default function VideoTestimonialsSection() {
  const { language } = useLanguage();
  const content = sectionContent[language];

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-[#050505] to-[#0a0a0a] relative overflow-hidden">
      {/* Golden separator line at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[10%] h-[1px] bg-gold/50" />

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-gold/[0.02] blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gold/[0.02] blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
            {content.subtitle}
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-white">
            {content.title}
          </h2>
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {videoTestimonials.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <VideoCard video={video} content={content} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Golden separator line at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[10%] h-[1px] bg-gold/50" />
    </section>
  );
}
