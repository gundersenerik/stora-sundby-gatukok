"use client";

import { useState, useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { RESTAURANT } from "@/lib/constants";

export default function PhoneFAB() {
  const locale = useLocale();
  const pathname = usePathname();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const fabRef = useRef<HTMLDivElement>(null);

  // Avoid SSR flash
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close popover on click outside
  useEffect(() => {
    if (!popoverOpen) return;
    function handleClick(e: MouseEvent) {
      if (fabRef.current && !fabRef.current.contains(e.target as Node)) {
        setPopoverOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setPopoverOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [popoverOpen]);

  // Hide on contact page (phone already prominent there)
  if (!mounted || pathname === "/kontakt") return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(RESTAURANT.phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback — select the text at least
    }
  };

  const label = locale === "sv" ? "Ring oss" : "Call us";

  return (
    <div
      ref={fabRef}
      className="fixed z-40 right-6"
      style={{ bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))" }}
    >
      {/* Desktop popover */}
      {popoverOpen && (
        <div className="phone-popover hidden md:block absolute bottom-full right-0 mb-3 bg-white border border-parchment-dark rounded-sm shadow-lg p-4 min-w-[220px]">
          <p className="font-body text-xs text-smoke/60 uppercase tracking-widest mb-2">
            {locale === "sv" ? "Telefon" : "Phone"}
          </p>
          <a
            href={`tel:${RESTAURANT.phoneIntl}`}
            className="font-heading text-xl italic text-ember hover:text-ember-dark transition-colors block mb-3"
          >
            {RESTAURANT.phone}
          </a>
          <button
            onClick={handleCopy}
            className="font-body text-xs text-smoke hover:text-espresso transition-colors w-full text-left"
          >
            {copied
              ? locale === "sv" ? "✓ Kopierat!" : "✓ Copied!"
              : locale === "sv" ? "Kopiera nummer" : "Copy number"}
          </button>
          <div aria-live="polite" className="sr-only">
            {copied && (locale === "sv" ? "Nummer kopierat" : "Number copied")}
          </div>
        </div>
      )}

      {/* Mobile: direct tel link */}
      <a
        href={`tel:${RESTAURANT.phoneIntl}`}
        className="phone-fab md:hidden flex items-center justify-center w-14 h-14 rounded-full bg-ember hover:bg-ember-dark text-white shadow-lg hover:shadow-xl transition-shadow"
        aria-label={label}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      </a>

      {/* Desktop: button with popover */}
      <button
        onClick={() => setPopoverOpen(!popoverOpen)}
        className="phone-fab hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-ember hover:bg-ember-dark text-white shadow-lg hover:shadow-xl transition-shadow"
        aria-label={label}
        aria-expanded={popoverOpen}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      </button>
    </div>
  );
}
