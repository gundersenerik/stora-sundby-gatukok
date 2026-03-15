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
      className="font-body text-sm font-semibold uppercase tracking-wider px-3 py-2 rounded border border-current opacity-70 hover:opacity-100 transition-opacity"
    >
      {label}
    </a>
  );
}
