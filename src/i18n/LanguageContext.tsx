import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language } from './translations';

export type { Language };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['fr'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'gentlemen-excursions-lang';

function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'fr';
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && (stored === 'fr' || stored === 'en' || stored === 'mg')) {
    return stored as Language;
  }
  
  const browserLang = navigator.language.toLowerCase();
  
  if (browserLang.startsWith('mg') || browserLang.includes('malagasy')) {
    return 'mg';
  }
  if (browserLang.startsWith('fr')) {
    return 'fr';
  }
  
  // Default to French for francophone Africa, otherwise English
  const francophoneCountries = ['fr', 'mg', 'be', 'ch', 'ca', 'sn', 'ci', 'cm', 'cd', 'ga', 'ml', 'ne', 'bf', 'tg', 'bj'];
  const countryCode = browserLang.split('-')[1]?.toLowerCase();
  
  if (countryCode && francophoneCountries.includes(countryCode)) {
    return 'fr';
  }
  
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'fr';
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && (stored === 'fr' || stored === 'en' || stored === 'mg')) {
      return stored as Language;
    }
    return detectBrowserLanguage();
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  const t = translations[language] as typeof translations['fr'];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
