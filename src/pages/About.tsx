import { motion, useScroll, useTransform } from 'framer-motion';
import { Crown, Leaf, Settings, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import { SEO } from '@/lib/seo';
import troisBaiesImg5 from '@/assets/gallery/trois-baies5.jpg';
import troisBaiesImg7 from '@/assets/gallery/trois-baies7.jpg';
export default function About() {
  const { language } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const content = {
    fr: {
      heroTitle: "L'Aventure a ses Codes.",
      manifesto: {
        intro: "Nous ne sommes pas des guides.",
        text: "Nous sommes les",
        highlight1: "gardiens",
        text2: "de vos",
        highlight2: "souvenirs",
        text3: "dans le Nord de Madagascar. De la Mer d'Émeraude aux secrets de l'Ankarana, nous cultivons l'art de l'exploration",
        highlight3: "exclusive",
        text4: "."
      },
      commitments: [
        { 
          icon: Crown, 
          title: "L'Exclusivité", 
          text: "Accéder là où les autres s'arrêtent." 
        },
        { 
          icon: Leaf, 
          title: "L'Éthique", 
          text: "Valoriser la terre malgache et ses artisans." 
        },
        { 
          icon: Settings, 
          title: "La Précision", 
          text: "Une logistique invisible pour un confort total." 
        },
      ],
      terroir: {
        subtitle: "TERROIR & PASSION",
        title: "Notre Lien avec Madagascar",
        text: "Au-delà des excursions, nous tissons des liens profonds avec les artisans et producteurs locaux. La vanille de la SAVA, les tissages traditionnels, les t-shirts confectionnés sur place — chaque produit raconte une histoire, celle d'un savoir-faire ancestral que nous avons à cœur de préserver et de partager.",
        cta: "Découvrir nos services"
      },
      didYouKnow: {
        label: "LE SAVIEZ-VOUS ?",
        text: "Gentlemen Excursions est basé à Diego-Suarez, là où le vent rencontre l'histoire."
      },
      finalCta: "Rejoignez l'expédition"
    },
    en: {
      heroTitle: "Adventure has its Codes.",
      manifesto: {
        intro: "We are not guides.",
        text: "We are the",
        highlight1: "guardians",
        text2: "of your",
        highlight2: "memories",
        text3: "in Northern Madagascar. From the Emerald Sea to the secrets of Ankarana, we cultivate the art of",
        highlight3: "exclusive",
        text4: "exploration."
      },
      commitments: [
        { 
          icon: Crown, 
          title: "Exclusivity", 
          text: "Access where others stop." 
        },
        { 
          icon: Leaf, 
          title: "Ethics", 
          text: "Valorize Malagasy land and its artisans." 
        },
        { 
          icon: Settings, 
          title: "Precision", 
          text: "Invisible logistics for total comfort." 
        },
      ],
      terroir: {
        subtitle: "TERROIR & PASSION",
        title: "Our Bond with Madagascar",
        text: "Beyond excursions, we weave deep connections with local artisans and producers. SAVA vanilla, traditional weavings, locally made t-shirts — each product tells a story, that of ancestral know-how we are committed to preserving and sharing.",
        cta: "Discover our services"
      },
      didYouKnow: {
        label: "DID YOU KNOW?",
        text: "Gentlemen Excursions is based in Diego-Suarez, where the wind meets history."
      },
      finalCta: "Join the expedition"
    },
    mg: {
      heroTitle: "Ny Fikarohana dia manana ny Feniny.",
      manifesto: {
        intro: "Tsy mpitarika izahay.",
        text: "Izahay no",
        highlight1: "mpiambina",
        text2: "ny",
        highlight2: "fahatsiarovana",
        text3: "anao any avaratr'i Madagasikara. Avy amin'ny Ranomasina Safira ka hatramin'ny tsiambaratelon'ny Ankarana, izahay mikolokolo ny kanton'ny fikarohana",
        highlight3: "manokana",
        text4: "."
      },
      commitments: [
        { 
          icon: Crown, 
          title: "Ny Manokana", 
          text: "Mahazo miditra amin'izay ijanonan'ny hafa." 
        },
        { 
          icon: Leaf, 
          title: "Ny Etika", 
          text: "Manome lanja ny tany malagasy sy ny mpiasa tanana." 
        },
        { 
          icon: Settings, 
          title: "Ny Fahamarinana", 
          text: "Logistika tsy hita mba ho amin'ny fiainana tanteraka." 
        },
      ],
      terroir: {
        subtitle: "TANY & FITIAVANA",
        title: "Ny Fifandraisanay amin'i Madagasikara",
        text: "Ankoatra ny fitsangatsanganana, mametraka fifandraisana lalina amin'ny mpiasa tanana sy mpamokatra eo an-toerana izahay. Ny lavanila SAVA, ny tenona nentim-paharazana, ny akanjo vita eo an-toerana — ny vokatra tsirairay dia mitantara tantara, momba ny fahaiza-manao nentin-drazana izay tianay hotehirizina sy hozaraina.",
        cta: "Fantaro ny serivisy"
      },
      didYouKnow: {
        label: "FANTATRAO VE?",
        text: "Gentlemen Excursions dia miorina ao Diego-Suarez, ao amin'ny toerana ihaonan'ny rivotra sy ny tantara."
      },
      finalCta: "Midira ao amin'ny dia"
    },
  };

  const t = content[language];

  const seoContent = {
    fr: {
      title: 'À Propos de Gentlemen Excursions | L\'Aventure Exclusive',
      description: 'Découvrez l\'esprit Gentlemen Excursions. Gardiens de vos souvenirs dans le Nord de Madagascar. Exclusivité, éthique et précision depuis Diego-Suarez.',
    },
    en: {
      title: 'About Gentlemen Excursions | Exclusive Adventure',
      description: 'Discover the Gentlemen Excursions spirit. Guardians of your memories in Northern Madagascar. Exclusivity, ethics and precision from Diego-Suarez.',
    },
    mg: {
      title: 'Momba ny Gentlemen Excursions | Fikarohana Manokana',
      description: 'Fantaro ny fanahin\'ny Gentlemen Excursions. Mpiambina ny fahatsiarovana anao any avaratr\'i Madagasikara.',
    },
  };

  return (
    <Layout>
      <SEO
        title={seoContent[language].title}
        description={seoContent[language].description}
        canonical="/about"
        language={language}
        keywords={['Agence voyage Madagascar', 'Tour opérateur Diego-Suarez', 'Voyage responsable Madagascar', 'Excursions exclusives']}
      />

      {/* Hero "Héritage" - B&W with film grain */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: heroY }}
          className="absolute inset-0"
        >
          <img
            src={troisBaiesImg7}
            alt="L'Aventure Gentlemen"
            className="w-full h-full object-cover grayscale contrast-110"
            style={{ filter: 'grayscale(100%) contrast(1.1) brightness(0.9)' }}
          />
          {/* Film grain overlay */}
          <div 
            className="absolute inset-0 opacity-30 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative z-10 text-center text-white px-6"
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight">
            {t.heroTitle}
          </h1>
        </motion.div>
      </section>

      {/* Section "Le Manifeste" */}
      <section className="py-32 lg:py-48 bg-[#050505]">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-zinc-400 text-xl md:text-2xl mb-6 italic">
              {t.manifesto.intro}
            </p>
            <p className="text-white text-2xl md:text-3xl lg:text-4xl leading-relaxed font-serif">
              {t.manifesto.text}{' '}
              <span className="text-gold font-medium">{t.manifesto.highlight1}</span>{' '}
              {t.manifesto.text2}{' '}
              <span className="text-gold font-medium">{t.manifesto.highlight2}</span>{' '}
              {t.manifesto.text3}{' '}
              <span className="text-gold font-medium">{t.manifesto.highlight3}</span>
              {t.manifesto.text4}
            </p>
          </motion.div>
        </div>
        
        {/* Thin gold separator */}
        <div className="flex justify-center mt-24">
          <div className="w-[10%] h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>
      </section>

      {/* Grid des Engagements */}
      <section className="py-32 lg:py-40 bg-[#0A0A0A]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
            {t.commitments.map((commitment, index) => (
              <motion.div
                key={commitment.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="text-center"
              >
                <div className="mb-8">
                  <commitment.icon className="w-12 h-12 text-gold mx-auto" strokeWidth={1} />
                </div>
                <h3 className="font-serif text-2xl font-medium text-white mb-4">
                  {commitment.title}
                </h3>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  {commitment.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section "Terroir & Passion" */}
      <section className="py-32 lg:py-40 bg-[#050505]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={troisBaiesImg5}
                  alt="Terroir Madagascar"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Gold frame accent */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/30 -z-10" />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:pl-8"
            >
              <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase block mb-4">
                {t.terroir.subtitle}
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium text-white mb-8">
                {t.terroir.title}
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-10">
                {t.terroir.text}
              </p>
              <Link
                to="/services"
                className="inline-flex items-center gap-3 text-gold hover:text-gold-light transition-colors group"
              >
                <span className="text-sm font-medium tracking-wider uppercase">
                  {t.terroir.cta}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Signature Finale */}
      <section className="py-24 lg:py-32 bg-[#0A0A0A] border-t border-gold/10">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          {/* Handwritten signature style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="font-serif text-gold text-4xl lg:text-5xl italic tracking-wide">
              Gentlemen Excursions
            </p>
            <div className="w-32 h-[1px] bg-gold/50 mx-auto mt-4" />
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/contact"
              className="inline-block border border-gold text-gold px-10 py-4 text-sm font-medium tracking-wider uppercase hover:bg-gold hover:text-[#050505] transition-all duration-300"
            >
              {t.finalCta}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Le Saviez-vous ? */}
      <section className="py-16 bg-[#050505] border-t border-gold/10">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="text-gold/60 text-xs font-medium tracking-[0.3em] uppercase block mb-3">
              {t.didYouKnow.label}
            </span>
            <p className="text-zinc-500 text-sm italic max-w-xl mx-auto">
              {t.didYouKnow.text}
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
