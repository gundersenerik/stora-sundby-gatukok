import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { SITE_URL, RESTAURANT } from "@/lib/constants";
import OpenStatus from "@/components/ui/OpenStatus";

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
    <main id="main-content" className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="font-heading text-3xl md:text-4xl text-espresso italic mb-2">
          {t("title")}
        </h1>
        <OpenStatus locale={locale} showText={true} className="text-smoke" />
      </div>

      <div className="grid md:grid-cols-2 gap-10 md:gap-16">
        {/* Contact info */}
        <div className="space-y-8">
          {/* Phone — prominent */}
          <div>
            <p className="font-body text-xs text-smoke/60 uppercase tracking-widest mb-2">
              {t("phone")}
            </p>
            <a
              href={`tel:${RESTAURANT.phoneIntl}`}
              className="font-heading text-2xl md:text-3xl italic text-ember hover:text-ember-dark transition-colors"
            >
              {RESTAURANT.phone}
            </a>
          </div>

          {/* Address */}
          <div>
            <p className="font-body text-xs text-smoke/60 uppercase tracking-widest mb-2">
              {t("address")}
            </p>
            <p className="text-espresso font-body leading-relaxed">
              {RESTAURANT.address.street}
              <br />
              {RESTAURANT.address.postalCode} {RESTAURANT.address.city}
            </p>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${RESTAURANT.coordinates.latitude},${RESTAURANT.coordinates.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ember text-sm font-body hover:text-ember-dark transition-colors mt-2 inline-flex items-center gap-1"
            >
              {t("getDirections")}
              <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Opening hours */}
          <div>
            <p className="font-body text-xs text-smoke/60 uppercase tracking-widest mb-3">
              {t("openingHours")}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-parchment-dark rounded-sm p-4">
                <p className="text-smoke text-xs font-body mb-1">
                  {locale === "sv" ? "Sep–Apr" : "Sep–Apr"}
                </p>
                <p className="text-espresso font-heading text-lg italic">
                  11–20
                </p>
              </div>
              <div className="bg-parchment-dark rounded-sm p-4">
                <p className="text-smoke text-xs font-body mb-1">
                  {locale === "sv" ? "Maj–Aug" : "May–Aug"}
                </p>
                <p className="text-espresso font-heading text-lg italic">
                  11–21
                </p>
              </div>
            </div>
          </div>

          {/* Service area */}
          <div>
            <p className="font-body text-xs text-smoke/60 uppercase tracking-widest mb-2">
              {t("serviceArea")}
            </p>
            <p className="text-smoke text-sm font-body leading-relaxed">
              {RESTAURANT.serviceAreas.join(", ")}
            </p>
          </div>
        </div>

        {/* Map */}
        <div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${RESTAURANT.coordinates.latitude},${RESTAURANT.coordinates.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-parchment-dark rounded-sm overflow-hidden aspect-square md:aspect-auto md:h-full min-h-[300px] relative group hover:bg-parchment-dark/80 transition-colors"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <svg
                className="w-10 h-10 text-smoke/30 mb-4 group-hover:text-ember transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <p className="font-heading text-sm italic text-smoke group-hover:text-espresso transition-colors">
                {locale === "sv" ? "Öppna i Google Maps" : "Open in Google Maps"}
              </p>
            </div>
          </a>
        </div>
      </div>
    </main>
  );
}
