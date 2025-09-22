/**
 * Hook for accessing translation context
 * 
 * Provides access to:
 * - Current language
 * - Translation function (t)
 * - Language setter
 * - Text getter utility
 */

import { useContext } from 'react';
import { I18nContext } from '../providers/I18nProvider';

export const useTranslation = () => {
  const context = useContext(I18nContext);
  
  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider');
  }
  
  return context;
};
