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
  const path = locale === "sv" ? "/meny" : "/en/menu";

  return {
    title: t("menuTitle"),
    description: t("menuDescription"),
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: {
        sv: `${SITE_URL}/meny`,
        en: `${SITE_URL}/en/menu`,
      },
    },
  };
}

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Menu" });

  return (
    <main id="main-content" className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-heading text-3xl md:text-4xl text-charcoal mb-8">
        {t("title")}
      </h1>
      <p className="text-charcoal-light">
        {locale === "sv"
          ? "Menyn laddas från Sanity CMS..."
          : "Menu loading from Sanity CMS..."}
      </p>
    </main>
  );
}
