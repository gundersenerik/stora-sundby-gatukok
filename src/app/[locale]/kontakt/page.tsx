import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { SITE_URL, RESTAURANT } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SEO" });
  const path = locale === "sv" ? "/kontakt" : "/en/contact";

  return {
    title: t("contactTitle"),
    description: t("contactDescription"),
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: {
        sv: `${SITE_URL}/kontakt`,
        en: `${SITE_URL}/en/contact`,
      },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Contact" });

  return (
    <main id="main-content" className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-heading text-3xl md:text-4xl text-charcoal mb-8">
        {t("title")}
      </h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact info */}
        <div className="space-y-6">
          {/* Phone */}
          <div>
            <h2 className="font-heading text-lg text-charcoal mb-1">{t("phone")}</h2>
            <a
              href={`tel:${RESTAURANT.phoneIntl}`}
              className="text-red text-lg font-body font-semibold hover:text-red-dark transition-colors"
            >
              {RESTAURANT.phone}
            </a>
          </div>

          {/* Address */}
          <div>
            <h2 className="font-heading text-lg text-charcoal mb-1">{t("address")}</h2>
            <p className="text-charcoal-light font-body">
              {RESTAURANT.address.street}
              <br />
              {RESTAURANT.address.postalCode} {RESTAURANT.address.city}
            </p>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${RESTAURANT.coordinates.latitude},${RESTAURANT.coordinates.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red text-sm font-body hover:text-red-dark transition-colors mt-1 inline-block"
            >
              {t("getDirections")} →
            </a>
          </div>

          {/* Opening hours */}
          <div>
            <h2 className="font-heading text-lg text-charcoal mb-2">{t("openingHours")}</h2>
            <div className="space-y-2">
              <div className="bg-cream-dark rounded-lg p-4">
                <p className="text-charcoal-light text-sm font-body">
                  {locale === "sv" ? "Vintertid (sep–apr)" : "Winter (Sep–Apr)"}
                </p>
                <p className="text-charcoal font-body font-semibold">11:00 – 20:00</p>
              </div>
              <div className="bg-cream-dark rounded-lg p-4">
                <p className="text-charcoal-light text-sm font-body">
                  {locale === "sv" ? "Sommartid (maj–aug)" : "Summer (May–Aug)"}
                </p>
                <p className="text-charcoal font-body font-semibold">11:00 – 21:00</p>
              </div>
            </div>
          </div>

          {/* Service area */}
          <div>
            <h2 className="font-heading text-lg text-charcoal mb-2">{t("serviceArea")}</h2>
            <p className="text-charcoal-light text-sm font-body mb-2">
              {t("serviceAreaDescription")}
            </p>
            <div className="flex flex-wrap gap-2">
              {RESTAURANT.serviceAreas.map((area) => (
                <span
                  key={area}
                  className="bg-cream-dark text-charcoal-light text-sm font-body px-3 py-1 rounded-full"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Map */}
        <div>
          <div className="bg-cream-dark rounded-lg overflow-hidden aspect-square md:aspect-auto md:h-full min-h-[300px] flex items-center justify-center">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${RESTAURANT.coordinates.latitude},${RESTAURANT.coordinates.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal-light hover:text-red transition-colors text-center p-8"
            >
              <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <p className="font-body font-semibold">
                {locale === "sv" ? "Öppna i Google Maps" : "Open in Google Maps"}
              </p>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
