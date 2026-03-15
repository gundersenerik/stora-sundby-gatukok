"use client";

import MenuCard from "./MenuCard";
import type { SeedMenuItem } from "@/lib/seed-data";

interface MenuCardGridProps {
  items: SeedMenuItem[];
  locale: string;
  popularLabel: string;
}

export default function MenuCardGrid({
  items,
  locale,
  popularLabel,
}: MenuCardGridProps) {
  // Detect if all items in this category are compact (no descriptions, no numbers, no dietary)
  const isCompactCategory = items.every(
    (item) =>
      !(locale === "sv" ? item.description_sv : item.description_en) &&
      !item.number &&
      item.dietary.length === 0
  );

  return (
    <div
      className={
        isCompactCategory
          ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
          : "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
      }
    >
      {items.map((item, index) => (
        <MenuCard
          key={item.id}
          item={item}
          locale={locale}
          popularLabel={popularLabel}
          animationDelay={Math.min(index * 30, 300)}
        />
      ))}
    </div>
  );
}
