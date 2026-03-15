import type { MetadataRoute } from "next";

const BASE_URL = "https://ssgatukok.se";

const routes = [
  { sv: "/", en: "/en" },
  { sv: "/meny", en: "/en/menu" },
  { sv: "/bestall", en: "/en/order" },
  { sv: "/kontakt", en: "/en/contact" },
  { sv: "/dagens-lunch", en: "/en/daily-specials" },
  { sv: "/om-oss", en: "/en/about" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${BASE_URL}${route.sv}`,
    lastModified: new Date(),
    changeFrequency: route.sv === "/dagens-lunch" ? "daily" : "weekly",
    priority: route.sv === "/" ? 1 : 0.8,
    alternates: {
      languages: {
        sv: `${BASE_URL}${route.sv}`,
        en: `${BASE_URL}${route.en}`,
      },
    },
  }));
}
