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
  const path = locale === "sv" ? "/dagens-lunch" : "/en/daily-specials";

  return {
    title: t("dailySpecialsTitle"),
    description: t("dailySpecialsDescription"),
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: {
        sv: `${SITE_URL}/dagens-lunch`,
        en: `${SITE_URL}/en/daily-specials`,
      },
    },
  };
}

export default async function DailySpecialsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "DailySpecials" });

  // TODO: Fetch from Sanity when project is connected
  // const today = new Date().toISOString().split('T')[0];
  // const special = await sanityFetch({ query: dailySpecialQuery, params: { today } });
  const special = null;

  if (!special) {
    return (
      <main id="main-content" className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="font-heading text-3xl md:text-4xl text-charcoal mb-8">
          {t("title")}
        </h1>
        <div className="bg-cream-dark rounded-xl p-8 md:p-12 text-center">
          <p className="text-charcoal-light font-body text-base sm:text-lg mb-6">
            {locale === "sv"
              ? "Ingen dagens lunch är publicerad just nu. Kolla vår vanliga meny istället!"
              : "No daily special posted right now. Check out our regular menu instead!"}
          </p>
          <a
            href={locale === "sv" ? "/meny" : "/en/menu"}
            className="inline-block bg-red text-white font-body font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-lg hover:bg-red-dark transition-colors"
          >
            {locale === "sv" ? "Se Menyn" : "View Menu"}
          </a>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-heading text-3xl md:text-4xl text-charcoal mb-8">
        {t("title")}
      </h1>
    </main>
  );
}
