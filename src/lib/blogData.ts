// Centralized blog articles data
import merEmeraudeImg from '@/assets/excursions/mer-emeraude.jpg';
import lokobeImg from '@/assets/excursions/lokobe.jpg';
import montagneAmbreImg from '@/assets/excursions/montagne-ambre.jpg';
import ankarana from '@/assets/excursions/ankarana.jpg';
import tsingyRougesImg from '@/assets/excursions/tsingy-rouges.jpg';
import nosyIranjaImg from '@/assets/excursions/nosy-iranja.jpg';

export interface BlogArticle {
  id: string;
  slug: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
  category: {
    fr: string;
    en: string;
    mg: string;
  };
  title: {
    fr: string;
    en: string;
    mg: string;
  };
  excerpt: {
    fr: string;
    en: string;
    mg: string;
  };
  content: {
    fr: string;
    en: string;
    mg: string;
  };
  featured?: boolean;
}

export const blogArticles: BlogArticle[] = [
  {
    id: '1',
    slug: 'mystere-lac-sacre',
    image: lokobeImg,
    date: '2026-01-10',
    readTime: '8 min',
    author: 'Équipe Gentlemen',
    featured: true,
    category: {
      fr: 'Légendes & Culture',
      en: 'Legends & Culture',
      mg: 'Angano sy Kolontsaina',
    },
    title: {
      fr: 'Le Mystère du Lac Sacré d\'Anivorano',
      en: 'The Mystery of Anivorano\'s Sacred Lake',
      mg: 'Ny Mistery ny Farihy Masina Anivorano',
    },
    excerpt: {
      fr: 'Plongez dans la légende ancestrale des crocodiles sacrés, gardiens spirituels du lac d\'Anivorano depuis des siècles.',
      en: 'Dive into the ancestral legend of the sacred crocodiles, spiritual guardians of Lake Anivorano for centuries.',
      mg: 'Midìra ao amin\'ny angano razana momba ny voay masina, mpiambina ara-panahy ny Farihin\'i Anivorano nandritra ny taonjato maro.',
    },
    content: {
      fr: `Au cœur du Nord de Madagascar, à quelques kilomètres de Diego-Suarez, se cache l'un des sites les plus mystérieux de l'île : le Lac Sacré d'Anivorano.

## La Légende des Crocodiles Sacrés

Selon la tradition orale Antakarana, ce lac abrite les esprits des ancêtres transformés en crocodiles. La légende raconte qu'un village entier fut englouti par les eaux après avoir refusé l'hospitalité à un voyageur assoiffé. Les habitants furent alors métamorphosés en crocodiles, condamnés à veiller éternellement sur ce lieu sacré.

## Un Rituel Ancestral

Aujourd'hui encore, les gardiens du lac perpétuent les traditions. Lors de votre visite, vous pourrez assister à la cérémonie des offrandes : viande de zébu, miel et rhum sont offerts aux crocodiles qui, étrangement, remontent à la surface à l'appel du gardien.

## Une Expérience Spirituelle Unique

Cette excursion n'est pas un simple tour touristique. C'est une immersion dans la spiritualité malgache, où le respect des ancêtres et de la nature se mêlent dans une harmonie millénaire.

*Réservez votre excursion au Lac Sacré et vivez une expérience qui transcende le voyage ordinaire.*`,
      en: `In the heart of Northern Madagascar, a few kilometers from Diego-Suarez, lies one of the island's most mysterious sites: the Sacred Lake of Anivorano.

## The Legend of the Sacred Crocodiles

According to Antakarana oral tradition, this lake houses the spirits of ancestors transformed into crocodiles. Legend has it that an entire village was engulfed by the waters after refusing hospitality to a thirsty traveler. The inhabitants were then metamorphosed into crocodiles, condemned to eternally watch over this sacred place.

## An Ancestral Ritual

Even today, the lake guardians perpetuate the traditions. During your visit, you can witness the offering ceremony: zebu meat, honey, and rum are offered to the crocodiles who, strangely, rise to the surface at the guardian's call.

## A Unique Spiritual Experience

This excursion is not just a tourist tour. It's an immersion in Malagasy spirituality, where respect for ancestors and nature blend in a millennia-old harmony.

*Book your excursion to the Sacred Lake and experience something that transcends ordinary travel.*`,
      mg: `Ao afovoan\'i Madagasikara Avaratra, kilometatra vitsivitsy avy any Diego-Suarez, dia misy ny iray amin\'ireo toerana misterika indrindra ao amin\'ny nosy: ny Farihy Masin\'i Anivorano.

## Ny Angano momba ny Voay Masina

Araka ny fomban-drazana Antakarana, ity farihy ity dia misy ny fanahin\'ny razana niova ho voay. Ny angano dia milaza fa tanàna iray manontolo no nosaforin\'ny rano taorian\'ny nandavany ny vahiny nangetaheta. Ny mponina dia niova ho voay, voaheloka hiambina mandrakizay ity toerana masina ity.

## Fombafomba Razana

Hatramin\'izao, ny mpiambina ny farihy dia manohy ny fomban-drazana. Mandritra ny fitsidihana, azonao jerena ny fombafomba fanatitra: henan\'omby, tantely ary toaka no atolotra ny voay izay, hafahafa, miakatra amin\'ny fanambarana ny mpiambina.

## Fanandramana Ara-panahy Tokana

Ity fitsangatsanganana ity dia tsy dia fizahan-tany tsotra fotsiny. Fandalinana ny ara-panahy malagasy izany, izay mampifandray ny fanajana ny razana sy ny natiora.`,
    },
  },
  {
    id: '2',
    slug: 'guide-kitesurf-diego',
    image: merEmeraudeImg,
    date: '2026-01-05',
    readTime: '10 min',
    author: 'Équipe Gentlemen',
    featured: true,
    category: {
      fr: 'Sports & Aventure',
      en: 'Sports & Adventure',
      mg: 'Fanatanjahantena sy Fikarohana',
    },
    title: {
      fr: 'Guide Complet du Kitesurf à Diego-Suarez',
      en: 'Complete Kitesurf Guide to Diego-Suarez',
      mg: 'Torolalana Feno momba ny Kitesurf ao Diego-Suarez',
    },
    excerpt: {
      fr: 'Découvrez pourquoi la baie de Sakalava et la Mer d\'Émeraude sont devenues les spots de kitesurf les plus prisés de l\'Océan Indien.',
      en: 'Discover why Sakalava Bay and the Emerald Sea have become the most sought-after kitesurfing spots in the Indian Ocean.',
      mg: 'Fantaro ny antony nahatonga ny Helodranon\'i Sakalava sy ny Ranomasina Safira ho lasa toerana kitesurf tian\'ny olona indrindra ao amin\'ny Ranomasimbe Indiana.',
    },
    content: {
      fr: `Diego-Suarez n'est pas seulement la plus belle baie du monde. C'est aussi un paradis pour les kitesurfeurs du monde entier.

## Sakalava Bay : Le Spot Légendaire

De mai à novembre, les alizés soufflent avec une régularité exceptionnelle sur la Baie des Sakalava. Des vents de 15 à 25 nœuds, une eau plate, et un cadre de rêve : les conditions parfaites pour progresser ou se perfectionner.

### Pourquoi c'est unique :
- Vents constants et prévisibles
- Eau peu profonde sur 500 mètres
- Température de l'eau : 26-28°C
- Pas de récifs dangereux

## La Mer d'Émeraude : Le Spot Secret

Moins connue des kitesurfeurs, la Mer d'Émeraude offre des conditions exceptionnelles pour les riders confirmés. Imaginez : kiter sur des eaux turquoise, avec les îlots calcaires en arrière-plan.

## Notre Service Kitesurf

Chez Gentlemen Excursions, nous proposons :
- **Cours débutants** : Apprenez en toute sécurité avec nos moniteurs certifiés
- **Location matériel** : Équipement premium Duotone et North
- **Excursions kite** : Sessions privées sur les spots secrets

*Contactez-nous pour organiser votre session kite à Diego-Suarez.*`,
      en: `Diego-Suarez is not just the most beautiful bay in the world. It's also a paradise for kitesurfers from around the globe.

## Sakalava Bay: The Legendary Spot

From May to November, the trade winds blow with exceptional regularity over Sakalava Bay. Winds of 15 to 25 knots, flat water, and a dream setting: the perfect conditions to progress or perfect your skills.

### Why it's unique:
- Consistent and predictable winds
- Shallow water for 500 meters
- Water temperature: 26-28°C
- No dangerous reefs

## The Emerald Sea: The Secret Spot

Less known to kitesurfers, the Emerald Sea offers exceptional conditions for advanced riders. Imagine: kiting on turquoise waters, with limestone islets in the background.

## Our Kitesurf Service

At Gentlemen Excursions, we offer:
- **Beginner courses**: Learn safely with our certified instructors
- **Equipment rental**: Premium Duotone and North equipment
- **Kite excursions**: Private sessions at secret spots

*Contact us to organize your kite session in Diego-Suarez.*`,
      mg: `Diego-Suarez dia tsy ny helodrano tsara indrindra eto an-tany ihany. Paradisa ho an\'ny kitesurfers eran-tany koa.

## Helodrano Sakalava: Ny Toerana Malaza

Manomboka mey ka hatramin\'ny novambra, ny rivotra alizé dia mitsoka amin\'ny fomba mahagaga eo ambonin\'ny Helodranon\'i Sakalava. Rivotra 15 ka hatramin\'ny 25 knots, rano milamina, ary tontolo mahafinaritra.

### Nahoana no tokana:
- Rivotra maharitra sy azo ampoizina
- Rano maivan-dalina mandritra ny 500 metatra
- Hafanana ny rano: 26-28°C
- Tsy misy haran-dranomasina mampidi-doza

## Ranomasina Safira: Ny Toerana Miafina

Tsy dia fantatra loatra amin\'ny kitesurfers, ny Ranomasina Safira dia manome toe-javatra mahafinaritra ho an\'ny mpanao efa nahay.

## Ny Serivisinay Kitesurf

Ao amin\'ny Gentlemen Excursions, manolotra izahay:
- **Kilasy ho an\'ny vao manomboka**: Mianara amim-pilaminana
- **Fampanofana fitaovana**: Fitaovana premium Duotone sy North
- **Fitsangatsanganana kite**: Sessions manokana

*Mifandraisa aminay hanomana ny session kite anao ao Diego-Suarez.*`,
    },
  },
  {
    id: '3',
    slug: 'or-vert-vanille-madagascar',
    image: montagneAmbreImg,
    date: '2025-12-28',
    readTime: '7 min',
    author: 'Équipe Gentlemen',
    featured: true,
    category: {
      fr: 'Terroir & Gastronomie',
      en: 'Terroir & Gastronomy',
      mg: 'Tany sy Sakafo',
    },
    title: {
      fr: 'L\'Or Vert : La Vanille de Madagascar',
      en: 'The Green Gold: Madagascar Vanilla',
      mg: 'Ny Volamena Maitso: Lavanila Malagasy',
    },
    excerpt: {
      fr: 'Partez sur les traces de la vanille bourbon, l\'épice la plus précieuse au monde, cultivée avec passion dans la région SAVA.',
      en: 'Follow the trail of bourbon vanilla, the most precious spice in the world, cultivated with passion in the SAVA region.',
      mg: 'Araho ny dian\'ny lavanila bourbon, ny zava-manitra sarobidy indrindra eran-tany, volena amim-pitiavana ao amin\'ny faritra SAVA.',
    },
    content: {
      fr: `Madagascar produit 80% de la vanille mondiale. Mais derrière ce chiffre se cache un savoir-faire ancestral et une passion qui fait de la vanille malgache la meilleure au monde.

## La Région SAVA : Berceau de l'Or Vert

Entre Sambava, Antalaha, Vohemar et Andapa, s'étend la région SAVA, où les conditions climatiques créent l'environnement parfait pour la culture de la vanille.

## Un Processus Artisanal

### La Pollinisation Manuelle
Chaque fleur de vanille est pollinisée à la main, un geste précis transmis de génération en génération. Les "marieuses de vanille" ont seulement quelques heures le matin pour effectuer ce travail délicat.

### L'Affinage
Après la récolte, les gousses subissent un processus d'affinage de 6 à 9 mois : échaudage, étuvage, séchage, et affinage en malles. C'est ce processus qui développe les 200+ arômes de la vanille bourbon.

## Notre Sélection Vanille

Chez Gentlemen Excursions, nous collaborons directement avec des producteurs locaux pour vous proposer :
- **Vanille Gourmet** : Gousses de 16-18cm, taux de vanilline optimal
- **Vanille TK** : Qualité export, idéale pour les professionnels
- **Poudre de Vanille** : 100% pure, sans additifs

*Découvrez notre collection et ramenez un morceau d'excellence malgache.*`,
      en: `Madagascar produces 80% of the world's vanilla. But behind this figure lies ancestral know-how and a passion that makes Malagasy vanilla the best in the world.

## The SAVA Region: Cradle of Green Gold

Between Sambava, Antalaha, Vohemar, and Andapa, lies the SAVA region, where climatic conditions create the perfect environment for vanilla cultivation.

## An Artisanal Process

### Manual Pollination
Each vanilla flower is hand-pollinated, a precise gesture passed down from generation to generation. The "vanilla matchmakers" have only a few hours in the morning to perform this delicate work.

### Curing
After harvest, the pods undergo a 6 to 9-month curing process: scalding, sweating, drying, and trunk curing. It's this process that develops the 200+ aromas of bourbon vanilla.

## Our Vanilla Selection

At Gentlemen Excursions, we work directly with local producers to offer you:
- **Gourmet Vanilla**: 16-18cm pods, optimal vanillin content
- **TK Vanilla**: Export quality, ideal for professionals
- **Vanilla Powder**: 100% pure, no additives

*Discover our collection and bring back a piece of Malagasy excellence.*`,
      mg: `Madagasikara dia mamokatra 80% ny lavanila eran-tany. Saingy ao ambadiky io isa io dia misy fahalalana razana sy fitiavana izay mahatonga ny lavanila malagasy ho tsara indrindra eran-tany.

## Ny Faritra SAVA: Fiandohana ny Volamena Maitso

Eo anelanelan\'i Sambava, Antalaha, Vohemar, ary Andapa, dia misy ny faritra SAVA, izay misy toe-trandro mamorona ny tontolo tonga lafatra ho an\'ny fambolena lavanila.

## Fomba Fanao Tanana

### Pollination Tanana
Ny voninkazo lavanila tsirairay dia pollinated amin\'ny tanana, fihetsika marina ampitaina avy amin\'ny taranaka ho amin\'ny taranaka.

### Fanamboarana
Aorian\'ny fijinjana, ny lavanila dia mandalo dingana fanamboarana 6 ka hatramin\'ny 9 volana.

## Ny Safidy Lavanila anay

Ao amin\'ny Gentlemen Excursions, miara-miasa mivantana amin\'ny mpamokatra eo an-toerana izahay:
- **Lavanila Gourmet**: 16-18cm
- **Lavanila TK**: Kalitao export
- **Vovon-dlavanila**: 100% madio

*Fantaro ny fanangonana anay ary mitondra sombin\'ny fahatsaran\'i Madagasikara.*`,
    },
  },
];

// Helper functions
export const getFeaturedArticles = () => blogArticles.filter(article => article.featured);
export const getArticleBySlug = (slug: string) => blogArticles.find(article => article.slug === slug);
export const getArticleById = (id: string) => blogArticles.find(article => article.id === id);
