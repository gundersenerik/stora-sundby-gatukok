export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ssgatukok.se";
export const EORDER_URL = process.env.NEXT_PUBLIC_EORDER_URL || "https://app.esorder.se/menu/sv/395";

export const RESTAURANT = {
  name: "Stora Sundby Gatukök",
  phone: "016-620 23",
  phoneIntl: "+4616620023",
  address: {
    street: "Alberga Centrum 1",
    postalCode: "635 34",
    city: "Stora Sundby",
  },
  coordinates: {
    latitude: 59.2791243,
    longitude: 16.1182959,
  },
  serviceAreas: [
    "Stora Sundby",
    "Katrineholm",
    "Kungsör",
    "Eskilstuna",
    "Julita",
    "Västermo",
    "Hjälmaresund",
    "Lista",
    "Gillberga",
  ],
} as const;
