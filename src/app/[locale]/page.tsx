import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { menuItems } from "@/lib/seed-data";
import { RestaurantJsonLd } from "@/components/seo/JsonLd";
import DietaryBadge from "@/components/ui/DietaryBadge";
import FadeIn from "@/components/ui/FadeIn";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SEO" });

  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    alternates: {
      canonical: SITE_URL,
      languages: {
        sv: SITE_URL,
        en: `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDescription"),
      url: SITE_URL,
      siteName: "Stora Sundby Gatukök",
      locale: locale === "sv" ? "sv_SE" : "en_US",
      type: "website",
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Home" });

  const popularItems = menuItems.filter((item) => item.isPopular).slice(0, 6);

  return (
    <main id="main-content">
      <RestaurantJsonLd locale={locale} />

      {/* Hero */}
      <section className="min-h-hero flex items-center justify-center bg-charcoal text-cream px-4">
        <div className="max-w-3xl text-center">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl mb-6 text-cream">
            {t("heroTitle")}
          </h1>
          <p className="font-body text-lg md:text-xl text-cream-dark mb-8 max-w-2xl mx-auto">
            {t("heroSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={locale === "sv" ? "/bestall" : "/en/order"}
              className="w-full sm:w-auto inline-block bg-red text-white font-body font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-lg hover:bg-red-dark transition-colors text-center"
            >
              {t("orderNow")}
            </a>
            <a
              href={locale === "sv" ? "/meny" : "/en/menu"}
              className="w-full sm:w-auto inline-block border-2 border-gold text-gold font-body font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-lg hover:bg-gold hover:text-charcoal transition-colors text-center"
            >
              {t("viewMenu")}
            </a>
          </div>
        </div>
      </section>

      {/* Service area callout */}
      <section className="bg-cream-dark py-4 text-center">
        <p className="font-body text-charcoal-light text-sm">
          {t("serviceAreas")}
        </p>
      </section>

      {/* Popular items */}
      <FadeIn>
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="font-heading text-2xl md:text-3xl text-charcoal mb-8">
          {t("popularItems")}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-cream-dark hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-body font-semibold text-charcoal text-lg">
                  {locale === "sv" ? item.name_sv : item.name_en}
                </h3>
                <span className="font-body font-semibold text-red text-lg whitespace-nowrap ml-2 shrink-0">
                  {item.price} kr
                </span>
              </div>
              <p className="text-charcoal-light text-sm font-body mb-3">
                {locale === "sv" ? item.description_sv : item.description_en}
              </p>
              {item.dietary.length > 0 && (
                <div className="flex gap-1 flex-wrap">
                  {item.dietary.map((d) => (
                    <DietaryBadge key={d} type={d} locale={locale} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a
            href={locale === "sv" ? "/meny" : "/en/menu"}
            className="inline-block border-2 border-charcoal text-charcoal font-body font-semibold text-sm uppercase tracking-wider px-8 py-3 rounded-lg hover:bg-charcoal hover:text-cream transition-colors"
          >
            {t("viewMenu")}
          </a>
        </div>
      </section>
      </FadeIn>

      {/* Order CTA banner */}
      <section className="bg-red py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-white mb-4">
            {locale === "sv" ? "Beställ för avhämtning" : "Order for pickup"}
          </h2>
          <p className="font-body text-white/80 mb-6">
            {locale === "sv"
              ? "Snabbt och smidigt — beställ online och hämta hos oss"
              : "Quick and easy — order online and pick up at our location"}
          </p>
          <a
            href={locale === "sv" ? "/bestall" : "/en/order"}
            className="inline-block bg-white text-red font-body font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-lg hover:bg-cream transition-colors"
          >
            {t("orderNow")}
          </a>
        </div>
      </section>
    </main>
  );
}
