import i18n from 'i18n-js';
import * as Localization from 'expo-localization';
import en from './locales/en.json';
import pt from './locales/pt.json';
import es from './locales/es.json';

i18n.defaultLocale = 'en';
i18n.locale = Localization.locale;
i18n.fallbacks = true;
i18n.translations = { en, pt, es };

export const translate = key => i18n.t(key)

export const changeLanguage = language => {
    i18n.locale = language
}

export default i18n;