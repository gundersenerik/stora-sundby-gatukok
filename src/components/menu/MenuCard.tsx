"use client";

import DietaryBadge from "@/components/ui/DietaryBadge";
import type { SeedMenuItem } from "@/lib/seed-data";

interface MenuCardProps {
  item: SeedMenuItem;
  locale: string;
  animationDelay: number;
  popularLabel: string;
}

// ── Category accent colors (left border) ──
const categoryAccent: Record<string, string> = {
  "pizza-1": "border-l-ember",
  "pizza-2": "border-l-ember",
  "pizza-3": "border-l-ember",
  "pizza-4": "border-l-ember",
  "pizza-5": "border-l-ember",
  "pizza-6": "border-l-ember",
  amerikanska: "border-l-ember-light",
  kebab: "border-l-wheat",
  "korv-hamburgare": "border-l-wheat-dark",
  "a-la-carte": "border-l-smoke",
  sallad: "border-l-sage",
  menyer: "border-l-espresso",
  tillbehor: "border-l-parchment-dark",
  dryck: "border-l-parchment-dark",
};

// ── Protein / key ingredient detection → readable label badges ──
type ProteinTag = { sv: string; en: string; color: string };

const proteinRules: [RegExp, ProteinTag][] = [
  [/oxfilé|nötfärs|grillbiff|lövbiff/i, { sv: "Nötkött", en: "Beef", color: "bg-ember/8 text-ember-dark" }],
  [/fläsk|schnitzel|stekt fläsk|fläsknoisette/i, { sv: "Fläsk", en: "Pork", color: "bg-ember/8 text-ember-dark" }],
  [/kyckling|chicken/i, { sv: "Kyckling", en: "Chicken", color: "bg-wheat/15 text-wheat-dark" }],
  [/tonfisk|rödspätta/i, { sv: "Fisk", en: "Fish", color: "bg-sky-100 text-sky-700" }],
  [/räk|musslo/i, { sv: "Skaldjur", en: "Seafood", color: "bg-sky-100 text-sky-700" }],
  [/skinka|parmaskinka/i, { sv: "Skinka", en: "Ham", color: "bg-ember/8 text-ember-dark" }],
  [/kebab|gyros/i, { sv: "Kebab", en: "Kebab", color: "bg-wheat/15 text-wheat-dark" }],
  [/falafel/i, { sv: "Falafel", en: "Falafel", color: "bg-sage/10 text-sage" }],
  [/korv/i, { sv: "Korv", en: "Sausage", color: "bg-ember/8 text-ember-dark" }],
  [/köttbull/i, { sv: "Köttbullar", en: "Meatballs", color: "bg-ember/8 text-ember-dark" }],
  [/bacon/i, { sv: "Bacon", en: "Bacon", color: "bg-ember/8 text-ember-dark" }],
  [/salami/i, { sv: "Salami", en: "Salami", color: "bg-ember/8 text-ember-dark" }],
];

function getProteinTags(descSv: string): ProteinTag[] {
  if (!descSv) return [];
  const found: ProteinTag[] = [];
  const seen = new Set<string>();
  for (const [pattern, tag] of proteinRules) {
    if (pattern.test(descSv) && !seen.has(tag.sv) && found.length < 3) {
      found.push(tag);
      seen.add(tag.sv);
    }
  }
  return found;
}

export default function MenuCard({
  item,
  locale,
  animationDelay,
  popularLabel,
}: MenuCardProps) {
  const name = locale === "sv" ? item.name_sv : item.name_en;
  const description = locale === "sv" ? item.description_sv : item.description_en;
  const isCompact = !description && !item.number && item.dietary.length === 0;
  const accent = categoryAccent[item.category] || "border-l-parchment-dark";
  const proteinTags = getProteinTags(item.description_sv);

  if (isCompact) {
    return (
      <div
        className={`menu-card menu-card-enter bg-white/50 border border-parchment-dark border-l-[3px] ${accent} rounded-sm px-4 py-3 flex items-center justify-between gap-3`}
        style={{ animationDelay: `${animationDelay}ms` }}
      >
        <span className="font-body text-sm text-espresso">
          {name}
        </span>
        <span className="font-body text-sm font-semibold text-ember tabular-nums whitespace-nowrap shrink-0">
          {item.price} kr
        </span>
      </div>
    );
  }

  const hasBadges = item.dietary.length > 0 || proteinTags.length > 0;

  return (
    <div
      className={`menu-card menu-card-enter bg-white/50 border border-parchment-dark border-l-[3px] ${accent} rounded-sm p-4 md:p-5 flex flex-col`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Top row: number + name + popular badge */}
      <div className="flex items-start justify-between mb-1.5">
        <div className="flex items-center gap-2">
          {item.number && (
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-espresso text-parchment text-[10px] font-body font-semibold tabular-nums shrink-0">
              {item.number}
            </span>
          )}
          <h3 className="font-heading text-base md:text-lg text-espresso italic leading-tight">
            {name}
          </h3>
        </div>
        {item.isPopular && (
          <span
            className="text-[10px] font-body font-medium bg-ember/10 text-ember px-1.5 py-0.5 rounded shrink-0 ml-2"
            aria-label={popularLabel}
          >
            ★
          </span>
        )}
      </div>

      {/* Description */}
      {description && (
        <p className="text-smoke text-sm font-body leading-relaxed mb-2">
          {description}
        </p>
      )}

      {/* Protein + dietary badges */}
      {hasBadges && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {proteinTags.map((tag) => (
            <span
              key={tag.sv}
              className={`inline-block text-[11px] font-body font-medium px-2 py-0.5 rounded ${tag.color}`}
            >
              {locale === "sv" ? tag.sv : tag.en}
            </span>
          ))}
          {item.dietary.map((d) => (
            <DietaryBadge key={d} type={d} locale={locale} />
          ))}
        </div>
      )}

      {/* Price — anchored bottom */}
      <div className="flex items-end justify-end mt-auto">
        <span className="font-body font-semibold text-ember tabular-nums whitespace-nowrap">
          {item.price} kr
        </span>
      </div>
    </div>
  );
}
