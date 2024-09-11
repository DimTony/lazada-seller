import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import thTranslation from "./assets/locales/th/translation.json";
import enSGTranslation from "./assets/locales/en-SG/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      th: { translation: thTranslation },
      "en-SG": { translation: enSGTranslation },
    },
    fallbackLng: "th",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
