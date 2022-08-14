import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import XHR from 'i18next-xhr-backend'
import { initReactI18next } from 'react-i18next'

import de from './assets/locales/de.json'
import en from './assets/locales/en.json'
import esAR from './assets/locales/es-AR.json'
import esUS from './assets/locales/es-US.json'
import itIT from './assets/locales/it-IT.json'
import iw from './assets/locales/iw.json'
import ro from './assets/locales/ro.json'
import ru from './assets/locales/ru.json'
import tr from './assets/locales/tr.json'
import vi from './assets/locales/vi.json'
import zhCN from './assets/locales/zh-CN.json'
import zhTW from './assets/locales/zh-TW.json'

const resources = {
  en: {
    translation: en,
  },
  de: {
    translation: de,
  },
  'es-AR': {
    translation: esAR,
  },
  'es-US': {
    translation: esUS,
  },
  'it-IT': {
    translation: itIT,
  },
  iw: {
    translation: iw,
  },
  ro: {
    translation: ro,
  },
  ru: {
    translation: ru,
  },
  tr: {
    translation: tr,
  },
  vi: {
    translation: vi,
  },
  'zh-CN': {
    translation: zhCN,
  },
  'zh-TW': {
    translation: zhTW,
  },
}

i18next
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    react: {
      useSuspense: true,
    },
    fallbackLng: 'en',
    preload: ['en'],
    keySeparator: false,
    interpolation: { escapeValue: false },
  })

export default i18next
