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
  const [withinHours, setWithinHours] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setWithinHours(isCurrentlyOpen(getCurrentHours()));
    check();
    const interval = setInterval(check, 60_000);
    return () => clearInterval(interval);
  }, []);

  // Still loading — show skeleton to avoid flash
  if (withinHours === null) {
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="font-heading text-3xl md:text-4xl text-espresso italic mb-2">
          {title}
        </h1>
        <div className="flex items-center justify-center gap-2 mb-1">
          {withinHours && (
            <span className="w-2 h-2 rounded-full bg-sage pulse-dot" />
          )}
          <p className="text-smoke font-body text-sm">{subtitle}</p>
        </div>
      </div>

      {/* Phone CTA — always visible */}
      <div className="bg-parchment-dark rounded-sm p-6 md:p-8 mb-8 text-center">
        <p className="font-body text-sm text-smoke mb-2">
          {withinHours
            ? locale === "sv"
              ? "Går det inte att beställa online? Ring oss så fixar vi det!"
              : "Can't order online? Call us and we'll sort it out!"
            : locale === "sv"
              ? "Ring oss under öppettiderna för att beställa"
              : "Call us during opening hours to place an order"}
        </p>
        <a
          href={`tel:${RESTAURANT.phoneIntl}`}
          className="font-heading text-2xl md:text-3xl italic text-ember hover:text-ember-dark transition-colors"
        >
          {RESTAURANT.phone}
        </a>
      </div>

      {/* Outside business hours — gentle note */}
      {!withinHours && (
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 text-sm font-body text-smoke">
            <span className="w-2 h-2 rounded-full bg-ember/50" />
            {locale === "sv"
              ? "Vi har inte öppet just nu — onlinebeställning kanske inte är tillgänglig"
              : "We're not open right now — online ordering may not be available"}
          </span>
        </div>
      )}

      {/* eOrder iframe — always shown */}
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
