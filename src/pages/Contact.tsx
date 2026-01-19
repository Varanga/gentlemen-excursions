import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, MessageCircle, Smartphone } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import Layout from '@/components/Layout';
import { SEO } from '@/lib/seo';
import { tours } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import heroImage from '@/assets/hero-madagascar.jpg';
export default function Contact() {
  const {
    t,
    language
  } = useLanguage();
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: "✨ Demande envoyée",
      description: "Notre équipe vous contactera sous 24h."
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      destination: '',
      message: ''
    });
    setIsSubmitting(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const handleDestinationChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      destination: value
    }));
  };
  const whatsappMessage = encodeURIComponent("Bonjour Gentlemen Excursions, je souhaite organiser une expédition...");
  const whatsappLink = `https://wa.me/261326850423?text=${whatsappMessage}`;

  // SEO content per language
  const seoContent = {
    fr: {
      title: 'Contactez-nous | Devis Gratuit',
      description: 'Contactez Gentlemen Excursions pour organiser votre voyage sur mesure au Nord de Madagascar. Réponse sous 24h. WhatsApp, email ou formulaire.'
    },
    en: {
      title: 'Contact Us | Free Quote',
      description: 'Contact Gentlemen Excursions to plan your custom trip to Northern Madagascar. Response within 24h. WhatsApp, email or form.'
    },
    mg: {
      title: 'Mifandraisa Aminay | Devis Maimaim-poana',
      description: 'Mifandraisa amin\'ny Gentlemen Excursions mba hanomanana ny dianao any Avaratra Madagasikara. Valiny ao anatin\'ny 24h.'
    }
  };
  return <Layout>
      <SEO title={seoContent[language].title} description={seoContent[language].description} canonical="/contact" language={language} keywords={['Contact agence voyage Madagascar', 'Devis excursion Diego-Suarez', 'Réserver voyage Nosy Be']} />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Contact Gentlemen Excursions" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />
        </div>

        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} className="relative z-10 text-center px-6">
          <p className="text-gold uppercase tracking-[0.3em] text-sm font-medium mb-4">
            Conciergerie Privée
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {t.contact.title}
          </h1>
          <p className="text-zinc-300 text-lg max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </motion.div>
      </section>

      {/* Contact Content - Asymmetric Layout */}
      <section className="py-20 lg:py-32 bg-[#050505]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column - L'Expérience (40%) */}
            <motion.div initial={{
            opacity: 0,
            x: -30
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="lg:col-span-5 space-y-10">
              <div>
                <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4">
                  Parlons de votre projet
                </h2>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  Une aventure sur mesure commence par un échange. Notre équipe de conciergerie est à votre disposition pour créer l'expérience parfaite.
                </p>
              </div>

              {/* Two Columns: Quick Assistance vs Detailed Requests */}
              <div className="space-y-6">
                {/* Quick Assistance Section */}
                <div>
                  <h3 className="text-gold text-xs font-medium tracking-[0.2em] uppercase mb-4">Assistance Rapide</h3>
                  <div className="space-y-3">
                    {/* WhatsApp - Primary */}
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 border border-gold/30 rounded-lg hover:border-gold hover:bg-gold/5 transition-all group">
                      <div className="w-14 h-14 rounded-full border border-gold flex items-center justify-center group-hover:bg-gold transition-colors">
                        <MessageCircle className="w-6 h-6 text-gold group-hover:text-black transition-colors" />
                      </div>
                      <div>
                        <p className="text-white font-medium">+261 32 68 504 23</p>
                        <p className="text-zinc-400 text-sm">Ligne Privée WhatsApp • Réponse instantanée</p>
                      </div>
                    </a>

                    {/* Phone - Calls only */}
                    <a href="tel:+261382122147" className="flex items-center gap-4 p-5 border border-zinc-800 rounded-lg hover:border-gold/50 transition-all group">
                      <div className="w-14 h-14 rounded-full border border-zinc-700 flex items-center justify-center group-hover:border-gold transition-colors">
                        <Phone className="w-6 h-6 text-zinc-400 group-hover:text-gold transition-colors" />
                      </div>
                      <div>
                        <p className="text-white font-medium">+261 38 21 221 47</p>
                        <p className="text-zinc-400 text-sm">Bureau & Logistique • Suivi de dossiers</p>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Detailed Requests Section */}
                <div>
                  <h3 className="text-gold text-xs font-medium tracking-[0.2em] uppercase mb-4">Demandes de Devis</h3>
                  <div className="space-y-3">
                    {/* Email */}
                    <a href="mailto:gentlemenexcursions@gmail.com" className="flex items-center gap-4 p-5 border border-zinc-800 rounded-lg hover:border-gold/50 transition-all group">
                      <div className="w-14 h-14 rounded-full border border-zinc-700 flex items-center justify-center group-hover:border-gold transition-colors">
                        <Mail className="w-6 h-6 text-zinc-400 group-hover:text-gold transition-colors" />
                      </div>
                      <div>
                        <p className="text-white font-medium">gentlemenexcursions@gmail.com</p>
                        <p className="text-zinc-400 text-sm">Pour devis détaillés et itinéraires sur mesure</p>
                      </div>
                    </a>

                    {/* Location */}
                    <div className="flex items-center gap-4 p-5 border border-zinc-800 rounded-lg">
                      <div className="w-14 h-14 rounded-full border border-zinc-700 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-zinc-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Diego-Suarez</p>
                        <p className="text-zinc-400 text-sm">Nord Madagascar</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-8 border-t border-zinc-800">
                <p className="text-zinc-500 text-sm uppercase tracking-wider mb-4">Suivez-nous</p>
                <div className="flex gap-3">
                  {['facebook', 'instagram', 'pinterest'].map(social => <a key={social} href="#" className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center hover:border-gold hover:text-gold transition-colors text-zinc-500">
                      {social === 'facebook' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>}
                      {social === 'instagram' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>}
                      {social === 'pinterest' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                        </svg>}
                    </a>)}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Premium Form (60%) */}
            <motion.div initial={{
            opacity: 0,
            x: 30
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }} className="lg:col-span-7">
              <div className="bg-[#0A0A0A] border border-gold/20 rounded-xl p-8 lg:p-12">
                <h3 className="font-serif text-2xl text-white mb-2">
                  Formulaire de demande
                </h3>
                <p className="text-zinc-500 text-sm mb-8">
                  Décrivez votre projet, nous créerons l'expérience parfaite.
                </p>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Name */}
                  <div className="relative">
                    <label htmlFor="name" className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
                      {t.contact.form.name} *
                    </label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-transparent border-b border-zinc-700 focus:border-gold outline-none py-3 text-white text-lg transition-colors placeholder:text-zinc-600" placeholder="Votre nom complet" />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label htmlFor="email" className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
                      {t.contact.form.email} *
                    </label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-transparent border-b border-zinc-700 focus:border-gold outline-none py-3 text-white text-lg transition-colors placeholder:text-zinc-600" placeholder="votre@email.com" />
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <label htmlFor="phone" className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
                      <span className="inline-flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-gold" />
                        Téléphone / WhatsApp
                      </span>
                      <span className="text-zinc-600 ml-2 normal-case tracking-normal">(Optionnel)</span>
                    </label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      className="w-full bg-transparent border-b border-zinc-700 focus:border-gold outline-none py-3 text-white text-lg transition-colors placeholder:text-zinc-600" 
                      placeholder="+261 34 00 000 00" 
                    />
                    <p className="text-zinc-600 text-xs mt-2">
                      Précisez si vous préférez être recontacté par WhatsApp pour plus de réactivité.
                    </p>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <label htmlFor="message" className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
                      {t.contact.form.message} *
                    </label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full bg-transparent border-b border-zinc-700 focus:border-gold outline-none py-3 text-white text-lg resize-none transition-colors placeholder:text-zinc-600" placeholder="Décrivez votre projet d'aventure..." />
                  </div>

                  {/* Submit Button */}
                  <button type="submit" disabled={isSubmitting} className="w-full group inline-flex items-center justify-center gap-3 bg-gold text-black px-10 py-5 text-sm font-semibold uppercase tracking-wider hover:bg-gold/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-lg">
                    {isSubmitting ? <>
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Envoi en cours...
                      </> : <>
                        Envoyer la demande
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>}
                  </button>

                  <p className="text-zinc-600 text-xs text-center">
                    En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>;
}