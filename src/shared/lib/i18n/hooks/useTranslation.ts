import { useContext } from 'react';
import { I18nContext } from '../providers/I18nProvider';

export const useTranslation = () => {
  const context = useContext(I18nContext);
  
  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider');
  }
  
  return context;
};
