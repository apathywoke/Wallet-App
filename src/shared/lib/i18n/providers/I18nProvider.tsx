import { createContext, useState, useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import type { Language, Translations } from '../types';
import { translations } from '../translations';
import { detectBrowserLanguage, saveLanguagePreference } from '../utils/detectLanguage';

interface I18nContextType {
  language: Language;
  t: Translations;
  setLanguage: (language: Language) => void;
  // Утилитарная функция для получения вложенных переводов
  getText: (key: string) => string;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: FC<I18nProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => detectBrowserLanguage());
  const [t, setTranslations] = useState<Translations>(() => translations[language]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    setTranslations(translations[newLanguage]);
    saveLanguagePreference(newLanguage);
  };

  const getText = (key: string): string => {
    const keys = key.split('.');
    let result: any = t;
    
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        console.warn(`Translation key "${key}" not found`);
        return key; // Возвращаем ключ, если перевод не найден
      }
    }
    
    return typeof result === 'string' ? result : key;
  };

  useEffect(() => {
    setTranslations(translations[language]);
  }, [language]);

  return (
    <I18nContext.Provider value={{ language, t, setLanguage, getText }}>
      {children}
    </I18nContext.Provider>
  );
};
