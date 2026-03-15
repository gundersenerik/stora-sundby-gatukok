import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

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

  return (
    <main id="main-content">
      {/* Hero */}
      <section className="min-h-[80vh] flex items-center justify-center bg-charcoal text-cream px-4">
        <div className="max-w-3xl text-center">
          <h1 className="font-heading text-4xl md:text-6xl mb-6 text-cream">
            {t("heroTitle")}
          </h1>
          <p className="font-body text-lg md:text-xl text-cream-dark mb-8 max-w-2xl mx-auto">
            {t("heroSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={locale === "sv" ? "/bestall" : "/en/order"}
              className="inline-block bg-red text-white font-body font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-lg hover:bg-red-dark transition-colors"
            >
              {t("orderNow")}
            </a>
            <a
              href={locale === "sv" ? "/meny" : "/en/menu"}
              className="inline-block border-2 border-gold text-gold font-body font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-lg hover:bg-gold hover:text-charcoal transition-colors"
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

      {/* Placeholder sections - will be filled in Phase 5 */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="font-heading text-2xl md:text-3xl text-charcoal mb-8">
          {t("popularItems")}
        </h2>
        <p className="text-charcoal-light">
          {locale === "sv" ? "Menyobjekt laddas från Sanity..." : "Menu items loading from Sanity..."}
        </p>
      </section>
    </main>
  );
}
