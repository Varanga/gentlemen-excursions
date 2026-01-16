import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function TestimonialsSection() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const testimonials = [
    t.testimonials.review1,
    t.testimonials.review2,
    t.testimonials.review3,
  ];
  
  const currentTestimonial = testimonials[currentIndex];

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, testimonials.length]);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="py-24 lg:py-32 bg-[#050505] relative overflow-hidden">
      {/* Golden separator line at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[10%] h-[1px] bg-gold/50" />
      
      {/* Background decorative element */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/[0.02] blur-3xl" />
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
            {t.sections.testimonials}
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-white">
            {t.sections.clientReviews}
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto relative">
          {/* Navigation Arrows */}
          <button 
            onClick={prev}
            className="absolute left-0 lg:-left-20 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold/10 hover:border-gold transition-all group"
          >
            <ChevronLeft className="w-5 h-5 text-zinc group-hover:text-gold transition-colors" />
          </button>
          
          <button 
            onClick={next}
            className="absolute right-0 lg:-right-20 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold/10 hover:border-gold transition-all group"
          >
            <ChevronRight className="w-5 h-5 text-zinc group-hover:text-gold transition-colors" />
          </button>

          {/* Testimonial Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-center px-8 lg:px-16"
            >
              {/* Quote Icon */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-16 h-16 mx-auto mb-8 rounded-full bg-gold/10 flex items-center justify-center"
              >
                <Quote className="w-7 h-7 text-gold" />
              </motion.div>

              {/* Golden Stars */}
              <div className="flex justify-center gap-1.5 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.div
                    key={star}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * star }}
                  >
                    <Star 
                      className="w-5 h-5 text-gold fill-gold" 
                      strokeWidth={1}
                    />
                  </motion.div>
                ))}
              </div>
              
              {/* Title */}
              <h3 className="font-serif text-2xl lg:text-3xl text-white mb-6 italic">
                "{currentTestimonial.title}"
              </h3>
              
              {/* Text */}
              <p className="text-zinc text-lg lg:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
                {currentTestimonial.text}
              </p>
              
              {/* Author Info */}
              <div className="space-y-2">
                <p className="text-white font-medium text-lg">
                  {currentTestimonial.name}
                </p>
                <p className="text-gold text-sm tracking-wider uppercase">
                  {currentTestimonial.trip}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                  setTimeout(() => setIsAutoPlaying(true), 10000);
                }}
                className={`transition-all duration-500 ${
                  index === currentIndex 
                    ? 'w-8 h-1 bg-gold' 
                    : 'w-2 h-1 bg-zinc-700 hover:bg-gold/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Current slide indicator */}
          <div className="text-center mt-8">
            <span className="text-gold font-serif text-2xl">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="text-zinc-600 mx-2">/</span>
            <span className="text-zinc-600">{String(testimonials.length).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      {/* Golden separator line at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[10%] h-[1px] bg-gold/50" />
    </section>
  );
}
