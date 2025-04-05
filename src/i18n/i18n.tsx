import i18n from "i18next";
import { cloneDeep } from "lodash";
import { initReactI18next } from "react-i18next";
import de from "./locales/de.json";
import en from "./locales/en.json";

export const FALLBACK_LANGUAGE = "en";
/**
 * Internationalisation issue
 * Problem1: Language interface was using JSX.Element for icons when we were using strings
  Solution: Changed icon type to string
  Reason: We're using emoji strings for language icons, not JSX element

  Problem2: Missing German translations for language switching
  Solution: Added complete German translations src/i18n/locales/de.json
  Reason: Needed translations to support German language option

  language switching functionality
  Solution: Created new component for language selection
  Reason: Needed UI for users to switch between languages

 */
export interface Language {
  locale: string;
  name: string;
  icon: string;
}

const getBrowserLanguage = () => {
  // @ts-ignore
  const userLang = navigator.language || navigator.userLanguage;

  return userLang ? userLang.split("-")[0] : FALLBACK_LANGUAGE;
};

const browserLanguage = getBrowserLanguage();

export const defaultTranslationModules = [
  { locale: "de", texts: de },
  { locale: "en", texts: en },
];
export const defaultLanguages = defaultTranslationModules.map((m) => m.locale);

const resources = cloneDeep(
  Object.fromEntries(
    defaultTranslationModules.map((m) => [m.locale, { app: m.texts }])
  )
);

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)

  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    ns: ["common", "app"],
    defaultNS: "app",
    lng: FALLBACK_LANGUAGE || browserLanguage,
    fallbackLng: FALLBACK_LANGUAGE,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
