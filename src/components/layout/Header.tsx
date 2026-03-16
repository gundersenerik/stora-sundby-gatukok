"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import OpenStatus from "@/components/ui/OpenStatus";
import { cn } from "@/lib/utils";

const navItems = [
  { key: "home", sv: "/", en: "/en" },
  { key: "menu", sv: "/meny", en: "/en/menu" },
  { key: "dailySpecials", sv: "/dagens-lunch", en: "/en/daily-specials" },
  { key: "contact", sv: "/kontakt", en: "/en/contact" },
  { key: "about", sv: "/om-oss", en: "/en/about" },
] as const;

export default function Header() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-espresso/97 sticky-header-blur pt-[env(safe-area-inset-top)]">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <a
              href={locale === "sv" ? "/" : "/en"}
              className="font-heading text-lg sm:text-xl text-parchment hover:text-wheat transition-colors whitespace-nowrap italic"
            >
              Stora Sundby
            </a>
            <OpenStatus locale={locale} showText={false} />
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => {
              const href = locale === "sv" ? item.sv : item.en;
              const isActive = pathname === item.sv || (pathname as string) === item.en;
              return (
                <a
                  key={item.key}
                  href={href}
                  className={cn(
                    "font-body text-sm transition-colors relative py-1",
                    isActive
                      ? "text-wheat"
                      : "text-parchment/60 hover:text-parchment"
                  )}
                >
                  {t(item.key)}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-px bg-wheat/60" />
                  )}
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
              className="text-parchment p-3"
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
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu — full-screen overlay (outside header to escape stacking context) */}
      <div
        className={cn(
          "md:hidden fixed inset-0 top-16 bg-espresso z-50 transition-all duration-300 ease-in-out flex flex-col items-center justify-center",
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center gap-6">
          {navItems.map((item) => {
            const href = locale === "sv" ? item.sv : item.en;
            const isActive = pathname === item.sv || (pathname as string) === item.en;
            return (
              <a
                key={item.key}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "font-heading text-2xl italic transition-colors",
                  isActive ? "text-wheat" : "text-parchment/60 hover:text-parchment"
                )}
              >
                {t(item.key)}
              </a>
            );
          })}
          <div className="mt-4 pt-4 border-t border-parchment/10">
            <OpenStatus locale={locale} showText={true} className="text-parchment/60" />
          </div>
        </div>
      </div>
    </>
  );
}
