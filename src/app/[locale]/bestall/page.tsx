import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import OrderContent from "@/components/order/OrderContent";

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
    <main id="main-content">
      <OrderContent
        locale={locale}
        title={t("title")}
        subtitle={t("subtitle")}
        fallbackText={t("fallbackText")}
        fallbackLink={t("fallbackLink")}
      />
    </main>
  );
}
