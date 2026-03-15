"use client";

import { useState, useEffect } from "react";
import { isCurrentlyOpen } from "@/lib/hours";

const WINTER_HOURS = "11:00-20:00";
const SUMMER_HOURS = "11:00-21:00";

function getCurrentHours(): string {
  const month = new Date().getMonth() + 1; // 1-12
  // Summer: May(5) - Aug(8), Winter: Sep(9) - Apr(4)
  return month >= 5 && month <= 8 ? SUMMER_HOURS : WINTER_HOURS;
}

interface OpenStatusProps {
  locale?: string;
  showText?: boolean;
  className?: string;
}

export default function OpenStatus({
  locale = "sv",
  showText = true,
  className = "",
}: OpenStatusProps) {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setIsOpen(isCurrentlyOpen(getCurrentHours()));
    check();
    const interval = setInterval(check, 60_000);
    return () => clearInterval(interval);
  }, []);

  // Don't render during SSR to avoid hydration mismatch
  if (isOpen === null) return null;

  const openText = locale === "sv" ? "Öppet nu" : "Open now";
  const closedText = locale === "sv" ? "Stängt" : "Closed";

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span
        className={`w-2 h-2 rounded-full ${
          isOpen
            ? "bg-sage pulse-dot"
            : "bg-ember/50"
        }`}
      />
      {showText && (
        <span className="text-xs font-body font-medium tracking-wide">
          {isOpen ? openText : closedText}
        </span>
      )}
    </span>
  );
}
