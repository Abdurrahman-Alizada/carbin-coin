import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {I18nManager} from 'react-native';
import en from './en.json';
import fr from './fr.json';
import ar from './ar.json';
import tl from './tl.json';
import es from './es.json';

export const languageResources = {
  en: en,
  fr: fr,
  // ar: ar,
  tl: tl,
  es: es,
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  lng: I18nManager.isRTL ? 'ar' : 'en',
  fallbackLng: 'en',
  resources: languageResources,
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18next;
