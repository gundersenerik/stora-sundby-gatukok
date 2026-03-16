import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["sv", "en"],
  defaultLocale: "sv",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/meny": {
      sv: "/meny",
      en: "/menu",
    },
    "/kontakt": {
      sv: "/kontakt",
      en: "/contact",
    },
    "/dagens-lunch": {
      sv: "/dagens-lunch",
      en: "/daily-specials",
    },
    "/om-oss": {
      sv: "/om-oss",
      en: "/about",
    },
  },
});
