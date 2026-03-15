import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { categories, menuItems } from "@/lib/seed-data";
import { MenuJsonLd } from "@/components/seo/JsonLd";
import DietaryBadge from "@/components/ui/DietaryBadge";

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
    <main id="main-content" className="max-w-5xl mx-auto px-4 py-12">
      <MenuJsonLd sections={menuSections} />

      <h1 className="font-heading text-3xl md:text-4xl text-charcoal mb-4">
        {t("title")}
      </h1>

      {/* Category quick links — horizontal scroll on mobile, wraps on desktop */}
      <nav className="flex gap-2 overflow-x-auto pb-2 mb-10 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible scrollbar-hide">
        {categories.map((cat) => (
          <a
            key={cat.id}
            href={`#${cat.slug}`}
            className="font-body text-xs sm:text-sm font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-cream-dark text-charcoal hover:bg-gold hover:text-charcoal transition-colors whitespace-nowrap"
          >
            {locale === "sv" ? cat.title_sv : cat.title_en}
          </a>
        ))}
      </nav>

      {/* Menu categories */}
      <div className="space-y-14">
        {categories.map((cat) => {
          const items = menuItems.filter((item) => item.category === cat.id);
          const desc = locale === "sv" ? cat.description_sv : cat.description_en;
          return (
            <section key={cat.id} id={cat.slug}>
              <div className="mb-6 pb-2 border-b-2 border-gold/30">
                <h2 className="font-heading text-2xl md:text-3xl text-charcoal">
                  {locale === "sv" ? cat.title_sv : cat.title_en}
                </h2>
                {desc && (
                  <p className="text-charcoal-light text-sm font-body mt-1">
                    {desc}
                  </p>
                )}
              </div>
              <div className="grid gap-1">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start gap-2 sm:gap-4 py-2.5 border-b border-cream-dark last:border-0"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        {item.number && (
                          <span className="text-charcoal-light text-sm font-body tabular-nums w-6 shrink-0">
                            {item.number}.
                          </span>
                        )}
                        <h3 className="font-body font-semibold text-charcoal">
                          {locale === "sv" ? item.name_sv : item.name_en}
                        </h3>
                        {item.isPopular && (
                          <span className="text-xs font-body font-medium bg-red/10 text-red px-2 py-0.5 rounded">
                            {t("popular")}
                          </span>
                        )}
                        {item.dietary.map((d) => (
                          <DietaryBadge key={d} type={d} locale={locale} />
                        ))}
                      </div>
                      {(item.description_sv || item.description_en) && (
                        <p className="text-charcoal-light text-sm font-body mt-0.5 ml-0 sm:ml-8">
                          {locale === "sv"
                            ? item.description_sv
                            : item.description_en}
                        </p>
                      )}
                    </div>
                    <p className="font-body font-semibold text-charcoal whitespace-nowrap shrink-0">
                      {item.price} kr
                    </p>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Order CTA */}
      <div className="mt-16 text-center bg-charcoal rounded-xl p-8 md:p-12">
        <h2 className="font-heading text-2xl text-cream mb-3">
          {locale === "sv" ? "Hungrig?" : "Hungry?"}
        </h2>
        <p className="text-cream/70 font-body mb-6">
          {locale === "sv"
            ? "Beställ online för smidig avhämtning"
            : "Order online for convenient pickup"}
        </p>
        <a
          href={locale === "sv" ? "/bestall" : "/en/order"}
          className="inline-block bg-red text-white font-body font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-lg hover:bg-red-dark transition-colors"
        >
          {locale === "sv" ? "Beställ Online" : "Order Online"}
        </a>
      </div>
    </main>
  );
}
