import { createI18n } from 'vue-i18n';
// translation files
import en from '@/locales/en.json';
import fr from '@/locales/fr.json';

// we can leverage TypeScript to type-check the translations
export type Messages = typeof en;
export default createI18n<[Messages], 'en' | 'fr', false>({
  legacy: false, // as we only want to use the "modern" composition API
  locale: window.localStorage.getItem('preferredLocale') ?? 'en',
  messages: {
    en,
    fr
  }
});
