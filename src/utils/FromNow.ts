import { formatDistanceToNowStrict, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function fromNow(value: string, i18nLocale: 'en' | 'fr') {
  const date = parseISO(value);
  return formatDistanceToNowStrict(date, { addSuffix: true, locale: i18nLocale === 'fr' ? fr : undefined });
}
