import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { categories, menuItems } from "@/lib/seed-data";
import { MenuJsonLd } from "@/components/seo/JsonLd";
import MenuTabs from "@/components/menu/MenuTabs";

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

// Only include food categories in the JSON-LD schema (skip drinks/sides)
const foodCategories = categories.filter(
  (c) => !["tillbehor", "dryck"].includes(c.id)
);

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Menu" });

  const menuSections = foodCategories.map((cat) => ({
    name: locale === "sv" ? cat.title_sv : cat.title_en,
    items: menuItems
      .filter((item) => item.category === cat.id)
      .map((item) => ({
        name: locale === "sv" ? item.name_sv : item.name_en,
        description: locale === "sv" ? item.description_sv : item.description_en,
        price: item.price,
      })),
  }));

  return (
    <main id="main-content">
      <MenuJsonLd sections={menuSections} />

      {/* Header area */}
      <div className="max-w-3xl mx-auto px-4 pt-12 pb-6 text-center">
        <h1 className="font-heading text-3xl md:text-4xl text-espresso italic mb-2">
          {t("title")}
        </h1>
        <p className="font-body text-smoke text-sm">
          {locale === "sv"
            ? "Allt lagas färskt med kvalitetsingredienser"
            : "Everything made fresh with quality ingredients"}
        </p>
      </div>

      {/* Tab-based menu — one category at a time */}
      <MenuTabs
        categories={categories}
        menuItems={menuItems}
        locale={locale}
        popularLabel={t("popular")}
      />

      {/* Order CTA */}
      <div className="max-w-3xl mx-auto px-4 pb-10">
        <div className="mt-12 text-center bg-espresso rounded-sm p-10 md:p-14">
          <h2 className="font-heading text-2xl md:text-3xl text-parchment italic mb-3">
            {locale === "sv" ? "Hungrig?" : "Hungry?"}
          </h2>
          <p className="text-parchment/50 font-body text-sm mb-6">
            {locale === "sv"
              ? "Beställ online för smidig avhämtning"
              : "Order online for convenient pickup"}
          </p>
          <a
            href={locale === "sv" ? "/bestall" : "/en/order"}
            className="btn-primary"
          >
            {locale === "sv" ? "Beställ Online" : "Order Online"}
          </a>
        </div>
      </div>
    </main>
  );
}
