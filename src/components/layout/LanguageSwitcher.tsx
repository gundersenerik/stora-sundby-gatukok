"use client";

import { usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  const otherLocale = locale === "sv" ? "en" : "sv";
  const label = locale === "sv" ? "EN" : "SV";

  // Build the href for the other locale
  const href = otherLocale === "sv" ? pathname : `/en${pathname === "/" ? "" : pathname}`;

  return (
    <a
      href={href}
      className="font-body text-xs font-medium px-2.5 py-1.5 rounded-sm border border-parchment/20 text-parchment/50 hover:text-parchment hover:border-parchment/40 transition-colors"
    >
      {label}
    </a>
  );
}
