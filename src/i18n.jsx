import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import thTranslation from "./assets/locales/th/translation.json";
import enSGTranslation from "./assets/locales/en-SG/translation.json";
import viTranslation from "./assets/locales/vi/translation.json";
import idTranslation from "./assets/locales/id/translation.json";
import cnTranslation from "./assets/locales/cn/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      th: { translation: thTranslation },
      "en-SG": { translation: enSGTranslation },
      ms: { translation: enSGTranslation },
      fil: { translation: enSGTranslation },
      vi: { translation: viTranslation },
      id: { translation: idTranslation },
      cn: { translation: cnTranslation },
    },
    fallbackLng: "th",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
