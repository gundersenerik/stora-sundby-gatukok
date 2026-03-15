"use client";

import { useState, useEffect } from "react";
import { isCurrentlyOpen } from "@/lib/hours";
import { RESTAURANT } from "@/lib/constants";

const EORDER_URL =
  process.env.NEXT_PUBLIC_EORDER_URL ||
  "https://app.esorder.se/menu/sv/395";

const WINTER_HOURS = "11:00-20:00";
const SUMMER_HOURS = "11:00-21:00";

function getCurrentHours(): string {
  const month = new Date().getMonth() + 1;
  return month >= 5 && month <= 8 ? SUMMER_HOURS : WINTER_HOURS;
}

function getCurrentSeason(locale: string): string {
  const month = new Date().getMonth() + 1;
  if (month >= 5 && month <= 8) {
    return locale === "sv" ? "Sommartid (maj–aug): 11:00–21:00" : "Summer (May–Aug): 11:00–21:00";
  }
  return locale === "sv" ? "Vintertid (sep–apr): 11:00–20:00" : "Winter (Sep–Apr): 11:00–20:00";
}

interface OrderContentProps {
  locale: string;
  title: string;
  subtitle: string;
  fallbackText: string;
  fallbackLink: string;
}

export default function OrderContent({
  locale,
  title,
  subtitle,
  fallbackText,
  fallbackLink,
}: OrderContentProps) {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setIsOpen(isCurrentlyOpen(getCurrentHours()));
    check();
    const interval = setInterval(check, 60_000);
    return () => clearInterval(interval);
  }, []);

  // Still loading — show nothing to avoid flash
  if (isOpen === null) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl md:text-4xl text-espresso italic mb-2">
            {title}
          </h1>
          <p className="text-smoke font-body text-sm">{subtitle}</p>
        </div>
        <div className="w-full min-h-[50vh] flex items-center justify-center">
          <p className="text-smoke/50 font-body text-sm">
            {locale === "sv" ? "Laddar..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  // ── CLOSED STATE ──
  if (!isOpen) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 md:py-24 text-center">
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 text-sm font-body text-smoke">
            <span className="w-2 h-2 rounded-full bg-ember/50" />
            {locale === "sv" ? "Stängt just nu" : "Currently closed"}
          </span>
        </div>

        <h1 className="font-heading text-3xl md:text-4xl text-espresso italic mb-4">
          {locale === "sv"
            ? "Vi har stängt för idag"
            : "We're closed for today"}
        </h1>

        <p className="text-smoke font-body mb-2">
          {getCurrentSeason(locale)}
        </p>

        <p className="text-smoke font-body text-sm mb-10">
          {locale === "sv"
            ? "Onlinebeställning är tillgänglig under våra öppettider."
            : "Online ordering is available during our opening hours."}
        </p>

        {/* Phone CTA — big and prominent */}
        <div className="bg-parchment-dark rounded-sm p-8 md:p-12 mb-6">
          <p className="font-body text-xs text-smoke/60 uppercase tracking-widest mb-3">
            {locale === "sv" ? "Frågor? Ring oss" : "Questions? Call us"}
          </p>
          <a
            href={`tel:${RESTAURANT.phoneIntl}`}
            className="font-heading text-3xl md:text-4xl italic text-ember hover:text-ember-dark transition-colors"
          >
            {RESTAURANT.phone}
          </a>
        </div>

        {/* Menu link */}
        <a
          href={locale === "sv" ? "/meny" : "/en/menu"}
          className="btn-ghost"
        >
          {locale === "sv" ? "Se vår meny" : "View our menu"}
        </a>
      </div>
    );
  }

  // ── OPEN STATE — show eOrder iframe ──
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="font-heading text-3xl md:text-4xl text-espresso italic mb-2">
          {title}
        </h1>
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-sage pulse-dot" />
          <p className="text-smoke font-body text-sm">{subtitle}</p>
        </div>
      </div>

      {/* eOrder iframe */}
      <div className="w-full min-h-order sm:min-h-[80vh] relative rounded-sm overflow-hidden border border-parchment-dark">
        <iframe
          src={EORDER_URL}
          className="w-full h-full min-h-order sm:min-h-[80vh] border-0"
          title={title}
          allow="payment"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
      </div>

      {/* Fallback link */}
      <a
        href={EORDER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block py-3 mt-4 text-center text-smoke text-sm font-body hover:text-ember transition-colors"
      >
        {fallbackText}{" "}
        <span className="text-ember underline">{fallbackLink}</span>
      </a>
    </div>
  );
}
