"use client";

import { useState, useEffect } from "react";

function getGreeting(locale: string): string {
  const hour = new Date().getHours();
  if (locale === "sv") {
    if (hour >= 5 && hour < 11) return "God morgon";
    if (hour >= 11 && hour < 17) return "God eftermiddag";
    return "God kväll";
  }
  if (hour >= 5 && hour < 11) return "Good morning";
  if (hour >= 11 && hour < 17) return "Good afternoon";
  return "Good evening";
}

interface TimeGreetingProps {
  locale?: string;
  className?: string;
}

export default function TimeGreeting({
  locale = "sv",
  className = "",
}: TimeGreetingProps) {
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    setGreeting(getGreeting(locale));
    const interval = setInterval(() => setGreeting(getGreeting(locale)), 60_000);
    return () => clearInterval(interval);
  }, [locale]);

  // Render empty on server, fill on client to avoid hydration mismatch
  if (!greeting) return <span className={className}>&nbsp;</span>;

  return <span className={className}>{greeting}</span>;
}
