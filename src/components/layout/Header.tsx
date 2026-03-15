"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

const navItems = [
  { key: "home", sv: "/", en: "/en" },
  { key: "menu", sv: "/meny", en: "/en/menu" },
  { key: "dailySpecials", sv: "/dagens-lunch", en: "/en/daily-specials" },
  { key: "order", sv: "/bestall", en: "/en/order" },
  { key: "contact", sv: "/kontakt", en: "/en/contact" },
  { key: "about", sv: "/om-oss", en: "/en/about" },
] as const;

export default function Header() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-charcoal/95 backdrop-blur-sm">
      <nav className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo / Brand */}
        <a
          href={locale === "sv" ? "/" : "/en"}
          className="font-heading text-lg text-cream hover:text-gold transition-colors"
        >
          Stora Sundby Gatukök
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const href = locale === "sv" ? item.sv : item.en;
            const isActive = pathname === item.sv || pathname === item.en;
            return (
              <a
                key={item.key}
                href={href}
                className={cn(
                  "font-body text-sm uppercase tracking-wider transition-colors",
                  isActive ? "text-gold" : "text-cream/70 hover:text-cream"
                )}
              >
                {t(item.key)}
              </a>
            );
          })}
          <LanguageSwitcher />
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-cream p-2"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-charcoal",
          mobileMenuOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <div className="px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const href = locale === "sv" ? item.sv : item.en;
            const isActive = pathname === item.sv || pathname === item.en;
            return (
              <a
                key={item.key}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block py-3 font-body text-sm uppercase tracking-wider transition-colors",
                  isActive ? "text-gold" : "text-cream/70 hover:text-cream"
                )}
              >
                {t(item.key)}
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}
