import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { SITE_URL, EORDER_URL } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SEO" });
  const path = locale === "sv" ? "/bestall" : "/en/order";

  return {
    title: t("orderTitle"),
    description: t("orderDescription"),
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: {
        sv: `${SITE_URL}/bestall`,
        en: `${SITE_URL}/en/order`,
      },
    },
  };
}

export default async function OrderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Order" });

  return (
    <main id="main-content" className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="font-heading text-3xl md:text-4xl text-espresso italic mb-2">
          {t("title")}
        </h1>
        <p className="text-smoke font-body text-sm">{t("subtitle")}</p>
      </div>

      {/* eOrder iframe embed */}
      <div className="w-full min-h-order sm:min-h-[80vh] relative rounded-sm overflow-hidden border border-parchment-dark">
        <iframe
          src={EORDER_URL}
          className="w-full h-full min-h-order sm:min-h-[80vh] border-0"
          title={t("title")}
          allow="payment"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
      </div>

      {/* Fallback link */}
      <a
        href={EORDER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block py-3 mt-4 text-center text-smoke text-sm font-body hover:text-ember transition-colors"
      >
        {t("fallbackText")}{" "}
        <span className="text-ember underline">{t("fallbackLink")}</span>
      </a>
    </main>
  );
}
