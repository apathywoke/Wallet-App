/**
 * Language detection and management utilities
 * 
 * Features:
 * - Auto-detects browser language preferences
 * - Falls back to saved user preference
 * - Supports multiple language codes
 * - Persists language choice in localStorage
 */

import type { Language } from '../types';

// Supported languages in the application
const SUPPORTED_LANGUAGES: Language[] = ['en', 'ru', 'es', 'fr', 'de', 'zh'];
const DEFAULT_LANGUAGE: Language = 'en';

/**
 * Detects the best language to use based on:
 * 1. Saved user preference (localStorage)
 * 2. Browser language settings
 * 3. Default fallback
 */
export const detectBrowserLanguage = (): Language => {
  // Check saved user preference first
  const savedLanguage = localStorage.getItem('language') as Language;
  if (savedLanguage && SUPPORTED_LANGUAGES.includes(savedLanguage)) {
    return savedLanguage;
  }

  // Get browser language preferences
  const browserLanguages = navigator.languages || [navigator.language];
  
  for (const browserLang of browserLanguages) {
    // Extract language code (e.g., 'en' from 'en-US')
    const langCode = browserLang.split('-')[0].toLowerCase() as Language;
    
    if (SUPPORTED_LANGUAGES.includes(langCode)) {
      return langCode;
    }
  }

  return DEFAULT_LANGUAGE;
};

/**
 * Saves user's language preference to localStorage
 */
export const saveLanguagePreference = (language: Language): void => {
  localStorage.setItem('language', language);
};

/**
 * Returns array of all supported languages
 */
export const getSupportedLanguages = (): Language[] => {
  return [...SUPPORTED_LANGUAGES];
};
