import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ro from './ro.json'
import ru from './ru.json'
import en from './en.json'

i18n.use(initReactI18next).init({
  resources: {
    ro: {
      translation: ro,
    },
    ru: {
      translation: ru,
    },
    en: {
      translation: en,
    },
  },
  fallbackLng: 'ro',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
