import { useState, useEffect } from "react";

// Translation type
interface Translations {
  [key: string]: string;
}

// Current language state
let currentLanguage = "english";
let translations: Translations = {};

// Load translation file dynamically
const loadTranslations = async (language: string): Promise<Translations> => {
  try {
    switch (language) {
      case "english":
        const englishModule = await import("./translations/english");
        return englishModule.default;
      default:
        // Fallback to english for unknown languages
        const fallbackModule = await import("./translations/english");
        return fallbackModule.default;
    }
  } catch (error) {
    console.error(
      `Failed to load translations for language: ${language}`,
      error,
    );
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
