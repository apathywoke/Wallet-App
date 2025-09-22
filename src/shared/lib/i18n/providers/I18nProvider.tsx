/**
 * Simple i18n provider
 * 
 * Manages language state and provides translations
 */

import { createContext, useState, useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import type { Language, Translations } from '../types';
import { translations } from '../translations';
import { detectBrowserLanguage, saveLanguagePreference } from '../utils/detectLanguage';

interface I18nContextType {
  language: Language;
  t: Translations;
  setLanguage: (language: Language) => void;
  getText: (key: string) => string;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

// Simple nested key accessor
const getNestedValue = (obj: any, key: string): string => {
  return key.split('.').reduce((result, k) => result?.[k], obj) || key;
};

export const I18nProvider: FC<I18nProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => detectBrowserLanguage());
  const [t, setTranslations] = useState<Translations>(() => translations[language]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    setTranslations(translations[newLanguage]);
    saveLanguagePreference(newLanguage);
  };

  const getText = (key: string): string => getNestedValue(t, key);

  useEffect(() => {
    setTranslations(translations[language]);
  }, [language]);

  return (
    <I18nContext.Provider value={{ language, t, setLanguage, getText }}>
      {children}
    </I18nContext.Provider>
  );
};
