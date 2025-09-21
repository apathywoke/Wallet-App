import type { Language, Translations } from '../types';
import { en } from './en';
import { ru } from './ru';

export const translations: Record<Language, Translations> = {
  en,
  ru,
  // Для других языков пока используем английский как fallback
  es: en,
  fr: en,
  de: en,
  zh: en,
};
