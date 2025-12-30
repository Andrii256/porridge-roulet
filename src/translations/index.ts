import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import cz from "./cz.json";
import ua from "./ua.json";
import { LS_KEYS } from "../constants";

const resources = {
  en: {
    translation: en,
  },
  uk: {
    translation: ua,
  },
  cs: {
    translation: cz,
  },
};

// Detect browser language and set default
const getBrowserLanguage = (): string => {
  const browserLang = navigator.language.split("-")[0];
  const supportedLanguages = ["en", "uk", "cs"];

  return supportedLanguages.includes(browserLang) ? browserLang : "en";
};

// Get stored language or fall back to browser language
const getInitialLanguage = (): string => {
  try {
    const storedLang = localStorage.getItem(LS_KEYS.PREV_LANGUAGE);
    if (storedLang && ["en", "uk", "cs"].includes(storedLang)) {
      return storedLang;
    }
  } catch (e) {
    console.error("Failed to read from localStorage:", e);
  }
  return getBrowserLanguage();
};

// Save language preference
const saveLanguagePreference = (lang: string): void => {
  try {
    localStorage.setItem(LS_KEYS.PREV_LANGUAGE, lang);
  } catch (e) {
    console.error("Failed to save to localStorage:", e);
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

// Listen for language changes and persist them
i18n.on("languageChanged", (lng) => {
  saveLanguagePreference(lng);
});

export default i18n;
