import type { Language } from '../types';

const SUPPORTED_LANGUAGES: Language[] = ['en', 'ru', 'es', 'fr', 'de', 'zh'];
const DEFAULT_LANGUAGE: Language = 'en';

export const detectBrowserLanguage = (): Language => {
  // Получаем язык из localStorage (если пользователь выбрал вручную)
  const savedLanguage = localStorage.getItem('language') as Language;
  if (savedLanguage && SUPPORTED_LANGUAGES.includes(savedLanguage)) {
    return savedLanguage;
  }

  // Получаем языки браузера
  const browserLanguages = navigator.languages || [navigator.language];
  
  for (const browserLang of browserLanguages) {
    // Извлекаем код языка (например, 'en' из 'en-US')
    const langCode = browserLang.split('-')[0].toLowerCase() as Language;
    
    if (SUPPORTED_LANGUAGES.includes(langCode)) {
      return langCode;
    }
  }

  return DEFAULT_LANGUAGE;
};

export const saveLanguagePreference = (language: Language): void => {
  localStorage.setItem('language', language);
};

export const getSupportedLanguages = (): Language[] => {
  return [...SUPPORTED_LANGUAGES];
};
