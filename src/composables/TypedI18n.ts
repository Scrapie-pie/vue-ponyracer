import { useI18n } from 'vue-i18n';
import { Messages } from '../i18n';

export function useTypedI18n() {
  return useI18n<[Messages], 'en' | 'fr'>();
}
