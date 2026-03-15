"use client";

import { useState } from "react";
import DietaryBadge from "@/components/ui/DietaryBadge";
import type { SeedMenuItem, SeedCategory } from "@/lib/seed-data";

interface MenuTabsProps {
  categories: SeedCategory[];
  menuItems: SeedMenuItem[];
  locale: string;
  popularLabel: string;
}

export default function MenuTabs({
  categories,
  menuItems,
  locale,
  popularLabel,
}: MenuTabsProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? "");

  const activeItems = menuItems.filter(
    (item) => item.category === activeCategory
  );
  const activeCat = categories.find((c) => c.id === activeCategory);
  const desc =
    activeCat && (locale === "sv" ? activeCat.description_sv : activeCat.description_en);

  return (
    <div>
      {/* Category tabs — horizontal scroll on mobile, wraps on desktop */}
      <nav
        className="sticky top-16 z-40 bg-parchment/95 sticky-header-blur py-3 border-b border-parchment-dark"
        role="tablist"
        aria-label={locale === "sv" ? "Menykategorier" : "Menu categories"}
      >
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide fade-edge-scroll -mx-1 px-1">
            {categories.map((cat) => {
              const isActive = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${cat.id}`}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`font-body text-xs font-medium px-3 py-1.5 rounded-full transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? "bg-espresso text-parchment"
                      : "bg-parchment-dark text-smoke hover:bg-wheat hover:text-espresso"
                  }`}
                >
                  {locale === "sv" ? cat.title_sv : cat.title_en}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Active category panel */}
      <div
        id={`panel-${activeCategory}`}
        role="tabpanel"
        className="max-w-3xl mx-auto px-4 py-8"
      >
        {/* Category heading + description */}
        <div className="mb-6">
          <h2 className="font-heading text-xl md:text-2xl text-espresso italic">
            {activeCat &&
              (locale === "sv" ? activeCat.title_sv : activeCat.title_en)}
          </h2>
          {desc && (
            <p className="text-smoke text-sm font-body mt-1">{desc}</p>
          )}
        </div>

        {/* Menu items */}
        <div className="space-y-0">
          {activeItems.map((item) => (
            <div key={item.id} className="py-2.5">
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
              {(item.description_sv ||
                item.description_en ||
                item.dietary.length > 0) && (
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

        {/* Item count hint */}
        <p className="text-smoke/40 text-xs font-body mt-6 text-center">
          {activeItems.length}{" "}
          {locale === "sv" ? "rätter" : "items"}
        </p>
      </div>
    </div>
  );
}
