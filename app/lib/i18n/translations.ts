import { useState, useEffect } from 'react';

// Translation type
interface Translations {
  [key: string]: string;
}

// Current language state
let currentLanguage = 'english';
let translations: Translations = {};

// Load translation file dynamically
const loadTranslations = async (language: string): Promise<Translations> => {
  try {
    const module = await import(`./translations/${language}.ts`);
    return module.default;
  } catch (error) {
    console.error(`Failed to load translations for language: ${language}`, error);
    // Fallback to english if other language fails
    if (language !== 'english') {
      const fallback = await import(`./translations/english.ts`);
      return fallback.default;
    }
    return {};
  }
};

// Initialize translations
const initializeTranslations = async () => {
  translations = await loadTranslations(currentLanguage);
};

// Initialize on load
initializeTranslations();

// Translation hook
export const useTranslation = () => {
  const [, forceUpdate] = useState({});

  const t = (key: string, fallback?: string): string => {
    return translations[key] || fallback || key;
  };

  const changeLanguage = async (language: string) => {
    currentLanguage = language;
    translations = await loadTranslations(language);
    forceUpdate({}); // Force re-render
  };

  return { t, changeLanguage, currentLanguage };
};

// Direct translation function for non-component usage
export const t = (key: string, fallback?: string): string => {
  return translations[key] || fallback || key;
}; 