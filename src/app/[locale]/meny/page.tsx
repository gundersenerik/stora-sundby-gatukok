import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { categories, menuItems } from "@/lib/seed-data";
import { MenuJsonLd } from "@/components/seo/JsonLd";
import DietaryBadge from "@/components/ui/DietaryBadge";
import MenuDivider from "@/components/ui/MenuDivider";

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

      {/* Scroll progress bar (CSS-only, Chrome/Safari) */}
      <div className="scroll-progress" aria-hidden="true" />

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

      {/* Category quick links — horizontal scroll on mobile with fade edges */}
      <nav className="sticky top-16 z-40 bg-parchment/95 sticky-header-blur py-3 border-b border-parchment-dark">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide fade-edge-scroll -mx-1 px-1">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.slug}`}
                className="font-body text-xs font-medium px-3 py-1.5 rounded-full bg-parchment-dark text-smoke hover:bg-wheat hover:text-espresso transition-colors whitespace-nowrap shrink-0"
              >
                {locale === "sv" ? cat.title_sv : cat.title_en}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Menu categories */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="space-y-14">
          {categories.map((cat, catIndex) => {
            const items = menuItems.filter((item) => item.category === cat.id);
            const desc = locale === "sv" ? cat.description_sv : cat.description_en;
            return (
              <section key={cat.id} id={cat.slug} className="reveal-on-scroll">
                {catIndex > 0 && <MenuDivider className="mb-10" />}

                <div className="mb-6">
                  <h2 className="font-heading text-xl md:text-2xl text-espresso italic">
                    {locale === "sv" ? cat.title_sv : cat.title_en}
                  </h2>
                  {desc && (
                    <p className="text-smoke text-sm font-body mt-1">
                      {desc}
                    </p>
                  )}
                </div>

                <div className="space-y-0">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="py-2.5 group"
                    >
                      {/* Name row with dotted leader to price */}
                      <div className="flex items-baseline gap-1.5">
                        {item.number && (
                          <span className="text-smoke/50 text-sm font-body tabular-nums shrink-0">
                            {item.number}.
                          </span>
                        )}
                        <span className="font-body font-semibold text-espresso whitespace-nowrap">
                          {locale === "sv" ? item.name_sv : item.name_en}
                        </span>
                        {item.isPopular && (
                          <span className="text-[10px] font-body font-medium bg-ember/10 text-ember px-1.5 py-0.5 rounded shrink-0">
                            ★
                          </span>
                        )}
                        {/* Dotted leader line */}
                        <span className="menu-dots" />
                        <span className="font-body font-semibold text-espresso tabular-nums whitespace-nowrap shrink-0">
                          {item.price} kr
                        </span>
                      </div>

                      {/* Description + dietary badges */}
                      {(item.description_sv || item.description_en || item.dietary.length > 0) && (
                        <div className="mt-0.5 pl-0 sm:pl-5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                          {(item.description_sv || item.description_en) && (
                            <p className="text-smoke text-sm font-body">
                              {locale === "sv"
                                ? item.description_sv
                                : item.description_en}
                            </p>
                          )}
                          {item.dietary.map((d) => (
                            <DietaryBadge key={d} type={d} locale={locale} />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Order CTA */}
        <div className="mt-20 text-center bg-espresso rounded-sm p-10 md:p-14">
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
