import { RESTAURANT, SITE_URL } from "@/lib/constants";

export function RestaurantJsonLd({ locale }: { locale: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: RESTAURANT.name,
    image: `${SITE_URL}/og-image.jpg`,
    telephone: RESTAURANT.phoneIntl,
    address: {
      "@type": "PostalAddress",
      streetAddress: RESTAURANT.address.street,
      postalCode: RESTAURANT.address.postalCode,
      addressLocality: RESTAURANT.address.city,
      addressCountry: "SE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: RESTAURANT.coordinates.latitude,
      longitude: RESTAURANT.coordinates.longitude,
    },
    url: SITE_URL,
    menu: `${SITE_URL}${locale === "sv" ? "/meny" : "/en/menu"}`,
    servesCuisine: ["Pizza", "Kebab", "Hamburgers", "Salads"],
    priceRange: "$$",
    areaServed: RESTAURANT.serviceAreas.map((area) => ({
      "@type": "City",
      name: area,
    })),
    hasMenu: {
      "@type": "Menu",
      url: `${SITE_URL}${locale === "sv" ? "/meny" : "/en/menu"}`,
    },
    potentialAction: {
      "@type": "OrderAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}${locale === "sv" ? "/bestall" : "/en/order"}`,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      deliveryMethod: ["http://purl.org/goodrelations/v1#DeliveryModePickUp"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

type MenuItem = {
  name: string;
  description: string;
  price: number;
};

type MenuSection = {
  name: string;
  items: MenuItem[];
};

export function MenuJsonLd({ sections }: { sections: MenuSection[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "Stora Sundby Gatukök Menu",
    hasMenuSection: sections.map((section) => ({
      "@type": "MenuSection",
      name: section.name,
      hasMenuItem: section.items.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        description: item.description,
        offers: {
          "@type": "Offer",
          price: item.price,
          priceCurrency: "SEK",
        },
      })),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
