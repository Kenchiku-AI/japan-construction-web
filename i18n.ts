import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./public/locales/en/common.json";
import jp from "./public/locales/jp/common.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { common: en },
    jp: { common: jp },
  },
  fallbackLng: "jp",
  lng: "jp",
  ns: ["common"],
  defaultNS: "common",
  interpolation: { escapeValue: false },
});

export default i18n;
