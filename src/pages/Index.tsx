import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import ExcursionCard from '@/components/ExcursionCard';

// Excursion images
import merEmeraudeImg from '@/assets/excursions/mer-emeraude.jpg';
import troisBaiesImg from '@/assets/excursions/trois-baies.jpg';
import montagneAmbreImg from '@/assets/excursions/montagne-ambre.jpg';
import tsingyRougesImg from '@/assets/excursions/tsingy-rouges.jpg';
import ankarana from '@/assets/excursions/ankarana.jpg';
import nosyIranjaImg from '@/assets/excursions/nosy-iranja.jpg';
import lokobeImg from '@/assets/excursions/lokobe.jpg';
import routeCacaoImg from '@/assets/excursions/route-cacao.jpg';

export default function Index() {
  const { t } = useLanguage();

  const diegoExcursions = [
    {
      image: merEmeraudeImg,
      title: t.excursions.merEmeraude.title,
      titleMg: t.excursions.merEmeraude.titleMg,
      description: t.excursions.merEmeraude.description,
    },
    {
      image: troisBaiesImg,
      title: t.excursions.troisBaies.title,
      titleMg: t.excursions.troisBaies.titleMg,
      description: t.excursions.troisBaies.description,
    },
    {
      image: montagneAmbreImg,
      title: t.excursions.montagneAmbre.title,
      titleMg: t.excursions.montagneAmbre.titleMg,
      description: t.excursions.montagneAmbre.description,
    },
    {
      image: tsingyRougesImg,
      title: t.excursions.tsingyRouges.title,
      titleMg: t.excursions.tsingyRouges.titleMg,
      description: t.excursions.tsingyRouges.description,
    },
  ];

  const nosyBeExcursions = [
    {
      image: nosyIranjaImg,
      title: t.excursions.nosyIranja.title,
      description: t.excursions.nosyIranja.description,
    },
    {
      image: ankarana,
      title: t.excursions.ankarana.title,
      description: t.excursions.ankarana.description,
    },
    {
      image: lokobeImg,
      title: t.excursions.lokobe.title,
      description: t.excursions.lokobe.description,
    },
  ];

  const tours = [
    {
      image: routeCacaoImg,
      title: t.excursions.routeCacao.title,
      titleMg: t.excursions.routeCacao.titleMg,
      description: t.excursions.routeCacao.description,
    },
  ];

  return (
    <Layout>
      <Hero />

      {/* Diego-Suarez Section */}
      <section id="destinations" className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="section-title text-navy mb-4">
              {t.sections.diegoTitle}
            </h2>
            <p className="section-subtitle mx-auto">
              {t.sections.diegoSubtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {diegoExcursions.map((excursion, index) => (
              <ExcursionCard
                key={excursion.title}
                {...excursion}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Nosy Be Section */}
      <section id="experiences" className="py-20 lg:py-32 bg-sand">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="section-title text-navy mb-4">
              {t.sections.nosyBeTitle}
            </h2>
            <p className="section-subtitle mx-auto">
              {t.sections.nosyBeSubtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {nosyBeExcursions.map((excursion, index) => (
              <ExcursionCard
                key={excursion.title}
                {...excursion}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="section-title text-navy mb-4">
              {t.sections.toursTitle}
            </h2>
            <p className="section-subtitle mx-auto">
              {t.sections.toursSubtitle}
            </p>
          </motion.div>

          <div className="max-w-md mx-auto">
            {tours.map((tour, index) => (
              <ExcursionCard
                key={tour.title}
                {...tour}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-navy text-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title mb-6">
              {t.contact.subtitle}
            </h2>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 text-sm font-medium tracking-wider uppercase bg-azure text-navy hover:bg-white transition-colors"
            >
              {t.nav.contact}
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
