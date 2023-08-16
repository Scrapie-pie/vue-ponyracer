import { watchEffect } from 'vue';
import { defineRule, configure } from 'vee-validate';
import { confirmed, min, min_value, required } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import { useTypedI18n } from '@/composables/TypedI18n';

export function isOldEnough(value: number): boolean {
  return value <= new Date().getFullYear() - 18;
}

export function useForms() {
  const { locale } = useTypedI18n();
  defineRule('confirmed', confirmed);
  defineRule('required', required);
  defineRule('min', min);
  defineRule('min_value', min_value);
  defineRule('isOldEnough', isOldEnough);
  configure({
    validateOnInput: true,
    generateMessage: localize({
      en: {
        messages: {
          required: `The {field} is required.`,
          min_value: 'The {field} must be 0:{min} or more.',
          min: 'The {field} must be at least 0:{min} characters.',
          confirmed: `The {field} does not match.`,
          isOldEnough: `You're not old enough to bet on ponies.`
        },
        names: {
          confirmPassword: 'password confirmation',
          birthYear: 'birth year'
        }
      },
      fr: {
        messages: {
          required: `Le champ {field} est obligatoire.`,
          min_value: 'Le champ {field} doit être supérieur ou égal à 0:{min}.',
          min: 'Le champ {field} doit avoir au moins 0:{min} caractères.',
          confirmed: `Le champ {field} ne correspond pas.`,
          isOldEnough: `Tu n'es pas assez vieux pour parier sur des courses de poneys.`
        },
        names: {
          login: 'identifiant',
          password: 'mot de passe',
          confirmPassword: 'confirmation du mot de passe',
          birthYear: 'année de naissance'
        }
      }
    })
  });
  watchEffect(() => {
    setLocale(locale.value);
  });
}
