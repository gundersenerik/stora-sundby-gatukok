"use client";

import { useEffect, useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Scroll-driven reveal animation.
 * Uses CSS `animation-timeline: view()` where supported (Chrome, Safari 18+).
 * Falls back to IntersectionObserver for Firefox.
 */
export default function ScrollReveal({ children, className = "" }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if CSS scroll-driven animations are supported
    if (CSS.supports("animation-timeline", "view()")) {
      // CSS handles everything — just ensure the class is present
      return;
    }

    // Fallback: IntersectionObserver
    el.style.opacity = "0";
    el.style.transform = "translateY(1.5rem)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal-on-scroll ${className}`}>
      {children}
    </div>
  );
}
