"use client";

import { useState } from "react";
import MenuCardGrid from "./MenuCardGrid";
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
        <div className="max-w-5xl mx-auto px-4">
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
        className="max-w-5xl mx-auto px-4 py-8"
      >
        {/* Category heading + description */}
        <div className="mb-6 max-w-3xl">
          <h2 className="font-heading text-xl md:text-2xl text-espresso italic">
            {activeCat &&
              (locale === "sv" ? activeCat.title_sv : activeCat.title_en)}
          </h2>
          {desc && (
            <p className="text-smoke text-sm font-body mt-1">{desc}</p>
          )}
        </div>

        {/* Menu item cards — key forces remount to re-trigger entrance animations */}
        <MenuCardGrid
          key={activeCategory}
          items={activeItems}
          locale={locale}
          popularLabel={popularLabel}
        />

        {/* Item count hint */}
        <p className="text-smoke/40 text-xs font-body mt-6 text-center">
          {activeItems.length}{" "}
          {locale === "sv" ? "rätter" : "items"}
        </p>
      </div>
    </div>
  );
}
