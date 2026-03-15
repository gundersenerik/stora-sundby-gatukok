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
        <div className="rounded-sm overflow-hidden border border-parchment-dark">
          <iframe
            src={`https://www.google.com/maps?q=${RESTAURANT.coordinates.latitude},${RESTAURANT.coordinates.longitude}&z=14&output=embed`}
            className="w-full aspect-square md:aspect-auto md:h-full min-h-[300px] border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={locale === "sv" ? "Karta — Stora Sundby Gatukök" : "Map — Stora Sundby Gatukök"}
          />
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${RESTAURANT.coordinates.latitude},${RESTAURANT.coordinates.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 bg-parchment-dark hover:bg-wheat/20 transition-colors text-sm font-body text-smoke hover:text-espresso"
          >
            {t("getDirections")}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </main>
  );
}
