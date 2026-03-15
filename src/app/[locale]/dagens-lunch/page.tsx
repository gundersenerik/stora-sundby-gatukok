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

  // TODO: Fetch daily special from Sanity for today's date
  // const special = await sanityFetch({ query: dailySpecialQuery, params: { today: new Date().toISOString().split('T')[0] } });
  // If no special, render nothing or a gentle message

  return (
    <main id="main-content" className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-heading text-3xl md:text-4xl text-charcoal mb-8">
        {t("title")}
      </h1>
      <p className="text-charcoal-light font-body">
        {locale === "sv"
          ? "Dagens lunch laddas från Sanity CMS..."
          : "Daily specials loading from Sanity CMS..."}
      </p>
    </main>
  );
}
