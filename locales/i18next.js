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
  tl: tl,
  es: es,
  
  // bg:es,
  // cs: es,
  // da:es,
  // de:es,
  // el:es,
  // id:es,
  // it:es,
  // ja:es,
  // kk:es,
  // lv:es,
  // pl:es,
  // pt:es,
  // ro:es,
  // ru:es,
  // sk:es,
  // sl:es,
  // sv:es,
  // tr:es,
  // uk:es,
  // vi:es,

  // right hand
  // ar: ar,
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
