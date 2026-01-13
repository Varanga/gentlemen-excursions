import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Compass } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

// Import an image for the map background
import heroImage from '@/assets/hero-madagascar.jpg';

export default function TestimonialsSection() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    t.testimonials.review1,
    t.testimonials.review2,
    t.testimonials.review3,
  ];
  
  const currentTestimonial = testimonials[currentIndex];

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 lg:py-32 bg-background relative">
      {/* Left Navigation Panel */}
      <div className="absolute left-0 top-0 bottom-0 w-16 lg:w-24 bg-azure flex flex-col items-center justify-center gap-6 z-10">
        <button 
          onClick={next}
          className="w-12 h-12 rounded-full border-2 border-navy/30 flex items-center justify-center hover:bg-navy/10 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-navy" />
        </button>
        <button 
          onClick={prev}
          className="w-12 h-12 rounded-full border-2 border-navy/30 flex items-center justify-center hover:bg-navy/10 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-navy" />
        </button>
        
        {/* Page Indicator */}
        <div className="mt-8">
          <span className="text-4xl lg:text-5xl font-serif font-medium text-navy">
            {String(currentIndex + 1).padStart(2, '0')}
          </span>
          <span className="text-lg text-navy/40 ml-1">
            {String(testimonials.length).padStart(2, '0')}
          </span>
        </div>
      </div>
      
      <div className="container mx-auto px-6 lg:px-12 pl-24 lg:pl-36">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-azure-dark text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
            {t.sections.testimonials}
          </span>
          <h2 className="section-title text-navy mb-4">
            {t.sections.clientReviews}
          </h2>
          
          {/* All Reviews Link */}
          <div className="flex justify-end">
            <a href="#" className="text-sm text-muted-foreground hover:text-navy transition-colors flex items-center gap-2">
              <span className="w-8 h-px bg-muted-foreground"></span>
              {t.sections.allReviews}
            </a>
          </div>
        </motion.div>

        {/* Testimonial Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-lg overflow-hidden"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img 
                src={heroImage}
                alt="Madagascar map"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-navy/85" />
            </div>
            
            {/* Content */}
            <div className="relative z-10 p-8 lg:p-12 text-white">
              <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                {/* Map Outline (decorative) */}
                <div className="hidden lg:block w-64 h-64 opacity-30">
                  <svg viewBox="0 0 200 300" className="w-full h-full">
                    <path 
                      d="M100,10 Q140,50 130,100 Q120,150 140,200 Q160,250 100,290 Q40,250 60,200 Q80,150 70,100 Q60,50 100,10"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                
                {/* Review Content */}
                <div className="flex-1">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-white text-white" />
                    ))}
                  </div>
                  
                  {/* Author */}
                  <p className="text-lg font-medium mb-1">
                    {currentTestimonial.name}, <span className="font-normal text-white/70">{currentTestimonial.age}</span>
                  </p>
                  <p className="text-azure text-sm mb-6">
                    {currentTestimonial.trip}
                  </p>
                  
                  {/* Title & Text */}
                  <h3 className="font-serif text-2xl font-medium mb-4 italic">
                    {currentTestimonial.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed max-w-2xl italic">
                    {currentTestimonial.text}
                  </p>
                  
                  {/* Activity Tag */}
                  <div className="flex items-center gap-2 mt-6 text-white/60">
                    <Compass className="w-4 h-4" />
                    <span className="text-sm">{currentTestimonial.activity}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
