import { motion } from 'framer-motion';
import { Award, Heart, Users, Compass } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import heroImage from '@/assets/hero-madagascar.jpg';

export default function About() {
  const { language } = useLanguage();

  const content = {
    fr: {
      title: 'Notre Histoire',
      subtitle: 'Une passion pour Madagascar depuis plus de 10 ans',
      intro: 'Gentlemen Excursions est né d\'une passion profonde pour Madagascar et de la volonté de partager les merveilles du Nord de l\'île avec le monde entier.',
      mission: 'Notre Mission',
      missionText: 'Offrir des expériences authentiques et responsables qui révèlent la beauté naturelle et culturelle de Madagascar, tout en contribuant au développement local.',
      values: [
        { icon: Heart, title: 'Passion', text: 'Chaque excursion est guidée par notre amour pour cette terre unique' },
        { icon: Users, title: 'Authenticité', text: 'Des rencontres vraies avec les communautés locales' },
        { icon: Award, title: 'Excellence', text: 'Un service haut de gamme avec une attention aux détails' },
        { icon: Compass, title: 'Aventure', text: 'Des expériences uniques hors des sentiers battus' },
      ],
    },
    en: {
      title: 'Our Story',
      subtitle: 'A passion for Madagascar for over 10 years',
      intro: 'Gentlemen Excursions was born from a deep passion for Madagascar and the desire to share the wonders of the North of the island with the world.',
      mission: 'Our Mission',
      missionText: 'To offer authentic and responsible experiences that reveal the natural and cultural beauty of Madagascar, while contributing to local development.',
      values: [
        { icon: Heart, title: 'Passion', text: 'Every excursion is guided by our love for this unique land' },
        { icon: Users, title: 'Authenticity', text: 'True encounters with local communities' },
        { icon: Award, title: 'Excellence', text: 'High-end service with attention to detail' },
        { icon: Compass, title: 'Adventure', text: 'Unique experiences off the beaten path' },
      ],
    },
    mg: {
      title: 'Ny Tantaranay',
      subtitle: 'Fitiavana an\'i Madagasikara nandritra ny 10 taona mahery',
      intro: 'Gentlemen Excursions dia teraka avy amin\'ny fitiavana lalina an\'i Madagasikara sy ny faniriana hizara ny zava-mahagaga any avaratr\'ny nosy amin\'izao tontolo izao.',
      mission: 'Ny Asa Fanaovanay',
      missionText: 'Manolotra fanandramana tena izy sy tompon\'andraikitra izay mampiseho ny hatsaran\'ny natiora sy ny kolontsaina Malagasy, sady mandray anjara amin\'ny fampandrosoana eo an-toerana.',
      values: [
        { icon: Heart, title: 'Fitiavana', text: 'Ny fitsangatsanganana tsirairay dia tarihin\'ny fitiavanay ity tany tokana ity' },
        { icon: Users, title: 'Tena izy', text: 'Fifanenana marina amin\'ny fiarahamonina eo an-toerana' },
        { icon: Award, title: 'Fahombiazana', text: 'Serivisy ambony miaraka amin\'ny fitandremana ny antsipiriany' },
        { icon: Compass, title: 'Fikarohana', text: 'Fanandramana tokana lavitra ny lalana mahazatra' },
      ],
    },
  };

  const t = content[language];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="About"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/70" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-6"
        >
          <h1 className="hero-title mb-4">{t.title}</h1>
          <p className="hero-subtitle max-w-2xl mx-auto">{t.subtitle}</p>
        </motion.div>
      </section>

      {/* Intro */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl lg:text-2xl text-muted-foreground leading-relaxed"
            >
              {t.intro}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 lg:py-32 bg-sand">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="section-title text-navy mb-8">{t.mission}</h2>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              {t.missionText}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8"
              >
                <div className="w-16 h-16 bg-azure/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-azure-dark" />
                </div>
                <h3 className="font-serif text-xl font-medium text-navy mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">
                  {value.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
