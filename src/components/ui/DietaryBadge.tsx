const labels: Record<string, Record<string, string>> = {
  vegetarian: { sv: "Vegetarisk", en: "Vegetarian" },
  vegan: { sv: "Vegansk", en: "Vegan" },
  "gluten-free": { sv: "Glutenfri", en: "Gluten-Free" },
  "lactose-free": { sv: "Laktosfri", en: "Lactose-Free" },
  spicy: { sv: "Stark", en: "Spicy" },
};

export default function DietaryBadge({
  type,
  locale = "sv",
}: {
  type: string;
  locale?: string;
}) {
  const label = labels[type]?.[locale] || type;

  return (
    <span className="inline-block bg-olive/10 text-olive text-xs font-body font-medium px-2 py-0.5 rounded">
      {label}
    </span>
  );
}
