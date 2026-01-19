// FAQ data for excursion pages - optimized for SEO
import { Language } from '@/i18n/translations';
import { ExcursionKey } from '@/lib/data';

interface FAQItem {
  question: { fr: string; en: string; mg: string };
  answer: { fr: string; en: string; mg: string };
}

type ExcursionFAQs = {
  [key in ExcursionKey]?: FAQItem[];
};

// General FAQs that appear on all tours
export const generalFAQs: FAQItem[] = [
  {
    question: {
      fr: 'Quelle est la meilleure période pour visiter Diego-Suarez ?',
      en: 'When is the best time to visit Diego-Suarez?',
      mg: 'Rahoviana ny fotoana tsara indrindra hitsidihana an\'i Diego-Suarez?',
    },
    answer: {
      fr: 'La meilleure période pour visiter Diego-Suarez est d\'avril à novembre, pendant la saison sèche. Les températures sont agréables (25-30°C) et les conditions sont idéales pour les excursions nautiques et les randonnées.',
      en: 'The best time to visit Diego-Suarez is from April to November, during the dry season. Temperatures are pleasant (25-30°C) and conditions are ideal for nautical excursions and hiking.',
      mg: 'Ny fotoana tsara indrindra hitsidihana an\'i Diego-Suarez dia amin\'ny volana Aprily ka hatramin\'ny Novambra, mandritra ny taom-pahavaratra. Tsara ny hafanana (25-30°C) ary tsara ny toe-javatra ho an\'ny fitsangatsanganana.',
    },
  },
  {
    question: {
      fr: 'Comment réserver une excursion avec Gentlemen Excursions ?',
      en: 'How do I book an excursion with Gentlemen Excursions?',
      mg: 'Ahoana ny fomba hanaovako booking amin\'ny Gentlemen Excursions?',
    },
    answer: {
      fr: 'Vous pouvez réserver directement via notre formulaire en ligne, par WhatsApp au +261 32 68 504 23, ou par email à gentlemenexcursions@gmail.com. Nous répondons sous 24h avec un devis personnalisé.',
      en: 'You can book directly via our online form, by WhatsApp at +261 32 68 504 23, or by email at gentlemenexcursions@gmail.com. We respond within 24 hours with a personalized quote.',
      mg: 'Afaka manao booking mivantana amin\'ny alalan\'ny taratasy an-tserasera ianao, na amin\'ny WhatsApp +261 32 68 504 23, na amin\'ny email gentlemenexcursions@gmail.com.',
    },
  },
  {
    question: {
      fr: 'Les excursions sont-elles adaptées aux enfants ?',
      en: 'Are the excursions suitable for children?',
      mg: 'Mety ho an\'ny ankizy ve ny fitsangatsanganana?',
    },
    answer: {
      fr: 'La plupart de nos excursions sont adaptées aux enfants à partir de 6 ans. Certaines randonnées plus techniques comme l\'Ankarana sont recommandées à partir de 12 ans. Contactez-nous pour un conseil personnalisé.',
      en: 'Most of our excursions are suitable for children from 6 years old. Some more technical hikes like Ankarana are recommended from 12 years old. Contact us for personalized advice.',
      mg: 'Ny ankamaroan\'ny fitsangatsanganana dia mety ho an\'ny ankizy manomboka amin\'ny 6 taona. Ny sasany dia soso-kevitra manomboka amin\'ny 12 taona.',
    },
  },
];

// Specific FAQs per excursion
export const excursionFAQs: ExcursionFAQs = {
  merEmeraude: [
    {
      question: {
        fr: 'Peut-on faire du kitesurf à la Mer d\'Émeraude ?',
        en: 'Can you do kitesurfing at the Emerald Sea?',
        mg: 'Azo atao ve ny kitesurf ao amin\'ny Ranomasina Safira?',
      },
      answer: {
        fr: 'La Mer d\'Émeraude est un spot de kitesurf exceptionnel avec des conditions idéales de mai à novembre. Les vents alizés réguliers (15-25 nœuds) et les eaux peu profondes en font un paradis pour les kitesurfeurs de tous niveaux.',
        en: 'The Emerald Sea is an exceptional kitesurfing spot with ideal conditions from May to November. Regular trade winds (15-25 knots) and shallow waters make it a paradise for kitesurfers of all levels.',
        mg: 'Ny Ranomasina Safira dia toerana tsara ho an\'ny kitesurf miaraka amin\'ny fepetra tsara indrindra manomboka amin\'ny Mey ka hatramin\'ny Novambra.',
      },
    },
    {
      question: {
        fr: 'L\'eau de la Mer d\'Émeraude est-elle vraiment turquoise ?',
        en: 'Is the water of the Emerald Sea really turquoise?',
        mg: 'Tena turquoise tokoa ve ny ranon\'ny Ranomasina Safira?',
      },
      answer: {
        fr: 'Oui, la Mer d\'Émeraude tire son nom de ses eaux d\'un turquoise intense. Ce phénomène est dû à la faible profondeur (1-3 mètres), au sable blanc et à la barrière de corail qui protège le lagon.',
        en: 'Yes, the Emerald Sea gets its name from its intense turquoise waters. This phenomenon is due to the shallow depth (1-3 meters), white sand and the coral reef that protects the lagoon.',
        mg: 'Eny, ny Ranomasina Safira dia mahazo ny anarany avy amin\'ny rano turquoise mafy. Io tranga io dia noho ny halalin\'ny rano kely (1-3 metatra).',
      },
    },
  ],
  tsingyRouges: [
    {
      question: {
        fr: 'Les Tsingy Rouges sont-ils vraiment éphémères ?',
        en: 'Are the Red Tsingy really ephemeral?',
        mg: 'Tena mandalo tokoa ve ny Tsingy Mena?',
      },
      answer: {
        fr: 'Oui, les Tsingy Rouges sont une formation géologique qui évolue constamment sous l\'effet de l\'érosion. Ils changent de forme au fil des années, ce qui en fait un site unique à visiter maintenant.',
        en: 'Yes, the Red Tsingy are a geological formation that constantly evolves due to erosion. They change shape over the years, making it a unique site to visit now.',
        mg: 'Eny, ny Tsingy Mena dia fananganana jeolojika miova hatrany noho ny erosion. Miova endrika izy ireo rehefa mandeha ny taona.',
      },
    },
    {
      question: {
        fr: 'Quelle est la différence entre les Tsingy Rouges et l\'Ankarana ?',
        en: 'What is the difference between the Red Tsingy and Ankarana?',
        mg: 'Inona ny fahasamihafan\'ny Tsingy Mena sy ny Ankarana?',
      },
      answer: {
        fr: 'Les Tsingy Rouges sont formés de grès et de marne aux teintes ocre-rouge, tandis que les Tsingy de l\'Ankarana sont des formations calcaires grises et acérées. Les deux offrent des paysages spectaculaires mais très différents.',
        en: 'The Red Tsingy are made of sandstone and marl in ochre-red shades, while the Ankarana Tsingy are sharp grey limestone formations. Both offer spectacular but very different landscapes.',
        mg: 'Ny Tsingy Mena dia vita amin\'ny fasika sy marne mena, fa ny Tsingy Ankarana kosa dia vato sokay fotsy maranitra.',
      },
    },
  ],
  ankarana: [
    {
      question: {
        fr: 'Faut-il être sportif pour visiter l\'Ankarana ?',
        en: 'Do you need to be athletic to visit Ankarana?',
        mg: 'Mila ho atletika ve ianao hitsidika an\'i Ankarana?',
      },
      answer: {
        fr: 'Une condition physique correcte est recommandée car le terrain peut être accidenté. Cependant, nos guides adaptent les parcours selon votre niveau. Des sentiers plus accessibles existent pour les marcheurs occasionnels.',
        en: 'A reasonable physical condition is recommended as the terrain can be rugged. However, our guides adapt the routes according to your level. More accessible trails exist for occasional walkers.',
        mg: 'Misy fepetra ara-batana tsara ilaina satria mety ho sarotra ny tany. Na izany aza, ny mpitarika anay dia mampifanaraka ny lalana araka ny haavonao.',
      },
    },
    {
      question: {
        fr: 'Quels animaux peut-on observer dans l\'Ankarana ?',
        en: 'What animals can you observe in Ankarana?',
        mg: 'Inona avy ny biby azo jerena ao Ankarana?',
      },
      answer: {
        fr: 'L\'Ankarana abrite 11 espèces de lémuriens, des crocodiles dans les grottes, le rare Brookesia (plus petit caméléon du monde), des chauves-souris, et une flore endémique exceptionnelle.',
        en: 'Ankarana is home to 11 lemur species, crocodiles in caves, the rare Brookesia (world\'s smallest chameleon), bats, and exceptional endemic flora.',
        mg: 'Ny Ankarana dia misy karazana gidro 11, voay ao anaty zohy, ny Brookesia (tana kely indrindra eto an-tany), ramanavy, ary zavamaniry endemic miavaka.',
      },
    },
  ],
  montagneAmbre: [
    {
      question: {
        fr: 'Quelle différence de température y a-t-il à la Montagne d\'Ambre ?',
        en: 'What is the temperature difference at Amber Mountain?',
        mg: 'Inona ny fahasamihafan\'ny mari-pana ao amin\'ny Ambohitra?',
      },
      answer: {
        fr: 'La Montagne d\'Ambre est significativement plus fraîche que Diego-Suarez (environ 10°C de moins). Prévoyez une veste légère. Cette fraîcheur crée une forêt tropicale unique avec ses propres espèces endémiques.',
        en: 'Amber Mountain is significantly cooler than Diego-Suarez (about 10°C less). Bring a light jacket. This coolness creates a unique tropical forest with its own endemic species.',
        mg: 'Ny Ambohitra dia mangatsiaka kokoa noho Diego-Suarez (manodidina ny 10°C latsaka). Mitondra jaket maivana. Io hatsiaka io dia mamorona ala tropikaly miavaka.',
      },
    },
    {
      question: {
        fr: 'Peut-on voir des lémuriens à la Montagne d\'Ambre ?',
        en: 'Can you see lemurs at Amber Mountain?',
        mg: 'Afaka mahita gidro ao amin\'ny Ambohitra ve?',
      },
      answer: {
        fr: 'Oui ! La Montagne d\'Ambre abrite plusieurs espèces de lémuriens, dont le Lémurien couronné et le Lémur de Sanford. Nos guides experts savent où les trouver pour une observation optimale.',
        en: 'Yes! Amber Mountain is home to several lemur species, including the Crowned Lemur and Sanford\'s Lemur. Our expert guides know where to find them for optimal observation.',
        mg: 'Eny! Ny Ambohitra dia misy karazana gidro maro, anisan\'izany ny Gidro misy satroboninahitra sy ny Gidro Sanford.',
      },
    },
  ],
  nosyIranja: [
    {
      question: {
        fr: 'Peut-on voir des tortues marines à Nosy Iranja ?',
        en: 'Can you see sea turtles at Nosy Iranja?',
        mg: 'Afaka mahita sokatra an-dranomasina ao Nosy Iranja ve?',
      },
      answer: {
        fr: 'Oui, Nosy Iranja est un site de ponte important pour les tortues vertes et imbriquées. La meilleure période d\'observation est de novembre à février. Le site est protégé pour préserver ces espèces.',
        en: 'Yes, Nosy Iranja is an important nesting site for green and hawksbill turtles. The best viewing period is from November to February. The site is protected to preserve these species.',
        mg: 'Eny, Nosy Iranja dia toerana fanatenana zava-dehibe ho an\'ny sokatra maitso sy imbriquées. Ny fotoana tsara indrindra hijerena azy dia manomboka amin\'ny Novambra ka hatramin\'ny Febroary.',
      },
    },
    {
      question: {
        fr: 'Combien de temps dure la traversée jusqu\'à Nosy Iranja ?',
        en: 'How long does the crossing to Nosy Iranja take?',
        mg: 'Hafiriana ny fotoana ilaina hiampita any Nosy Iranja?',
      },
      answer: {
        fr: 'La traversée en bateau depuis Nosy Be dure environ 1h30 à 2h selon les conditions météorologiques. Le voyage lui-même est magnifique, avec possibilité d\'observer des dauphins.',
        en: 'The boat crossing from Nosy Be takes about 1.5 to 2 hours depending on weather conditions. The journey itself is beautiful, with the possibility of spotting dolphins.',
        mg: 'Ny fiampitana amin\'ny sambo avy any Nosy Be dia maharitra manodidina ny 1h30 ka hatramin\'ny 2h arakaraka ny toe-trandro.',
      },
    },
  ],
  lokobe: [
    {
      question: {
        fr: 'Pourquoi Lokobe est-elle appelée la dernière forêt primaire de Nosy Be ?',
        en: 'Why is Lokobe called the last primary forest of Nosy Be?',
        mg: 'Nahoana no antsoina hoe ala voalohany farany ao Nosy Be i Lokobe?',
      },
      answer: {
        fr: 'Lokobe est la seule forêt de Nosy Be qui n\'a jamais été exploitée. Cette réserve de 740 hectares préserve un écosystème intact avec des espèces qu\'on ne trouve nulle part ailleurs.',
        en: 'Lokobe is the only forest on Nosy Be that has never been exploited. This 740-hectare reserve preserves an intact ecosystem with species found nowhere else.',
        mg: 'Lokobe no hany ala ao Nosy Be tsy mbola notetezina. Io zaridaina 740 hektara io dia mitahiry ny ecosystème tsy misy fahasimbana.',
      },
    },
  ],
  lacSacre: [
    {
      question: {
        fr: 'Quelle est la légende du Lac Sacré d\'Anivorano ?',
        en: 'What is the legend of the Sacred Lake of Anivorano?',
        mg: 'Inona ny angano momba ny Farihy Masin\'i Anivorano?',
      },
      answer: {
        fr: 'Selon la légende, un village refusa l\'hospitalité à un voyageur assoiffé. En punition, le village fut englouti et ses habitants transformés en crocodiles. Ces crocodiles sacrés sont aujourd\'hui protégés et vénérés.',
        en: 'According to legend, a village refused hospitality to a thirsty traveler. As punishment, the village was engulfed and its inhabitants transformed into crocodiles. These sacred crocodiles are now protected and revered.',
        mg: 'Araka ny angano, nisy tanàna nandà ny fandraisam-bahiny tamin\'ny mpandeha nangetaheta. Ho sazy, ny tanàna dia natelina ary ny mponina dia niova ho voay.',
      },
    },
  ],
  nosyHara: [
    {
      question: {
        fr: 'Comment se déroule le bivouac de luxe à Nosy Hara ?',
        en: 'How does the luxury bivouac at Nosy Hara work?',
        mg: 'Ahoana ny fomba fanaovana bivouac de luxe ao Nosy Hara?',
      },
      answer: {
        fr: 'Notre bivouac de luxe comprend des tentes spacieuses avec literie de qualité, un chef qui prépare des repas gastronomiques, et tout le confort nécessaire tout en préservant l\'authenticité de l\'expérience.',
        en: 'Our luxury bivouac includes spacious tents with quality bedding, a chef who prepares gourmet meals, and all necessary comforts while preserving the authenticity of the experience.',
        mg: 'Ny bivouac de luxe anay dia misy trano lay midadasika misy fandriana tsara kalitao, mpahandro manomana sakafo matsiro, ary fiadanana rehetra ilaina.',
      },
    },
  ],
};

// Helper function to get FAQs for a specific excursion
export function getExcursionFAQs(key: ExcursionKey, language: Language): { question: string; answer: string }[] {
  const specificFAQs = excursionFAQs[key] || [];
  const allFAQs = [...specificFAQs, ...generalFAQs];
  
  return allFAQs.map((faq) => ({
    question: faq.question[language],
    answer: faq.answer[language],
  }));
}
