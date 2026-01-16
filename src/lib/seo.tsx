import { Helmet } from 'react-helmet-async';
import { Language } from '@/i18n/translations';

// ============= SEO Component =============
interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  language: Language;
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
  structuredData?: object;
}

export function SEO({
  title,
  description,
  canonical,
  image = '/og-image.jpg',
  type = 'website',
  language,
  noindex = false,
  publishedTime,
  modifiedTime,
  author,
  keywords = [],
  structuredData,
}: SEOProps) {
  const siteName = 'Gentlemen Excursions';
  const baseUrl = 'https://gentlemen-excursions.mg';
  const fullTitle = `${title} | ${siteName}`;
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;
  const fullImage = image.startsWith('http') ? image : `${baseUrl}${image}`;

  // Default keywords for Madagascar tourism
  const defaultKeywords = [
    'Excursion Nord Madagascar',
    'Voyage luxe Diego-Suarez',
    'Guide touristique Nosy Be',
    'Kitesurf Mer d\'Émeraude',
    'Trekking Tsingy Ankarana',
  ];

  const allKeywords = [...new Set([...keywords, ...defaultKeywords])];

  const localeMap: Record<Language, string> = {
    fr: 'fr_FR',
    en: 'en_US',
    mg: 'mg_MG',
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang={language} />
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords.join(', ')} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={fullCanonical} />

      {/* Alternate Languages */}
      <link rel="alternate" hrefLang="fr" href={`${baseUrl}/fr${canonical || ''}`} />
      <link rel="alternate" hrefLang="en" href={`${baseUrl}/en${canonical || ''}`} />
      <link rel="alternate" hrefLang="mg" href={`${baseUrl}/mg${canonical || ''}`} />
      <link rel="alternate" hrefLang="x-default" href={fullCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={localeMap[language]} />
      <meta property="og:locale:alternate" content="fr_FR" />
      <meta property="og:locale:alternate" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Article Meta (for blog posts) */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

// ============= JSON-LD Structured Data Generators =============

// Organization Schema
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Gentlemen Excursions',
    alternateName: 'Gentlemen Excursions Madagascar',
    url: 'https://gentlemen-excursions.mg',
    logo: 'https://gentlemen-excursions.mg/logo.png',
    description: 'Agence de voyage haut de gamme spécialisée dans les excursions au Nord de Madagascar',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Diego-Suarez',
      addressRegion: 'Diana',
      addressCountry: 'MG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -12.2765,
      longitude: 49.2913,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+261-32-XX-XXX-XX',
      contactType: 'customer service',
      availableLanguage: ['French', 'English', 'Malagasy'],
    },
    sameAs: [
      'https://www.facebook.com/gentlemenexcursions',
      'https://www.instagram.com/gentlemenexcursions',
    ],
    priceRange: '€€€',
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: -12.2765,
        longitude: 49.2913,
      },
      geoRadius: '200 km',
    },
  };
}

// Tour/Excursion Schema
interface TourSchemaProps {
  name: string;
  description: string;
  image: string;
  duration: string;
  price: string;
  location: string;
  region: string;
  slug: string;
  included?: string[];
  difficulty?: string;
  maxParticipants?: number;
}

export function generateTourSchema({
  name,
  description,
  image,
  duration,
  price,
  location,
  region,
  slug,
  included = [],
  difficulty = 'Moderate',
  maxParticipants = 12,
}: TourSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name,
    description,
    image: image.startsWith('http') ? image : `https://gentlemen-excursions.mg${image}`,
    url: `https://gentlemen-excursions.mg/expeditions/${slug}`,
    touristType: ['Adventure travelers', 'Eco tourists', 'Luxury travelers'],
    itinerary: {
      '@type': 'ItemList',
      name: `Itinéraire ${name}`,
      description: `Programme détaillé de l'excursion ${name}`,
    },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
      seller: {
        '@type': 'TravelAgency',
        name: 'Gentlemen Excursions',
      },
    },
    provider: {
      '@type': 'TravelAgency',
      name: 'Gentlemen Excursions',
      url: 'https://gentlemen-excursions.mg',
    },
    contentLocation: {
      '@type': 'Place',
      name: location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: location,
        addressRegion: region,
        addressCountry: 'Madagascar',
      },
    },
    duration: parseDurationToISO(duration),
    maximumAttendeeCapacity: maxParticipants,
    typicalAgeRange: '18-80',
    isAccessibleForFree: false,
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Difficulty',
        value: difficulty,
      },
      {
        '@type': 'PropertyValue',
        name: 'Included',
        value: included.join(', '),
      },
    ],
  };
}

// Blog Article Schema
interface ArticleSchemaProps {
  title: string;
  description: string;
  image: string;
  slug: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  category: string;
}

export function generateArticleSchema({
  title,
  description,
  image,
  slug,
  author,
  datePublished,
  dateModified,
  category,
}: ArticleSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: image.startsWith('http') ? image : `https://gentlemen-excursions.mg${image}`,
    url: `https://gentlemen-excursions.mg/blog/${slug}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Gentlemen Excursions',
      logo: {
        '@type': 'ImageObject',
        url: 'https://gentlemen-excursions.mg/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://gentlemen-excursions.mg/blog/${slug}`,
    },
    articleSection: category,
    inLanguage: 'fr-FR',
  };
}

// FAQ Schema for tour pages
interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Breadcrumb Schema
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://gentlemen-excursions.mg${item.url}`,
    })),
  };
}

// ============= Helper Functions =============

function parseDurationToISO(duration: string): string {
  const lowerDuration = duration.toLowerCase();
  
  if (lowerDuration.includes('demi') || lowerDuration.includes('half')) {
    return 'PT4H'; // 4 hours
  }
  if (lowerDuration.includes('2 jour') || lowerDuration.includes('2 day')) {
    return 'P2D'; // 2 days
  }
  if (lowerDuration.includes('jour') || lowerDuration.includes('day')) {
    return 'P1D'; // 1 day
  }
  return 'P1D'; // Default to 1 day
}

// ============= SEO Utilities =============

// Generate meta description (max 155 characters)
export function generateMetaDescription(text: string, maxLength: number = 155): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3).trim() + '...';
}

// Generate meta title (max 60 characters)
export function generateMetaTitle(text: string, maxLength: number = 60): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3).trim() + '...';
}

// Sanitize slug to kebab-case
export function sanitizeSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Generate alt text for images
export function generateImageAlt(
  tourName: string,
  location: string,
  context?: string
): string {
  const base = `${tourName} - ${location}, Madagascar`;
  return context ? `${base} - ${context}` : base;
}
