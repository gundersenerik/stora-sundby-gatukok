"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import MenuCardGrid from "./MenuCardGrid";
import MenuCard from "./MenuCard";
import OrderListBar from "./OrderListBar";
import type { OrderListEntry } from "./OrderListBar";
import type { SeedMenuItem, SeedCategory } from "@/lib/seed-data";

const STORAGE_KEY = "sundby-order-list";

interface MenuTabsProps {
  categories: SeedCategory[];
  menuItems: SeedMenuItem[];
  locale: string;
  popularLabel: string;
}

// Exclude drinks, sides from random picks — not exciting enough
const SKIP_CATEGORIES = new Set(["tillbehor", "dryck"]);

export default function MenuTabs({
  categories,
  menuItems,
  locale,
  popularLabel,
}: MenuTabsProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? "");
  const [randomPick, setRandomPick] = useState<SeedMenuItem | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const tabsNavRef = useRef<HTMLElement>(null);

  // ── Order list (session-based) ──
  const [orderList, setOrderList] = useState<OrderListEntry[]>([]);

  // Hydrate from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const ids: { id: string; qty: number }[] = JSON.parse(stored);
        const entries: OrderListEntry[] = [];
        for (const { id, qty } of ids) {
          const item = menuItems.find((m) => m.id === id);
          if (item) entries.push({ item, quantity: qty });
        }
        if (entries.length > 0) setOrderList(entries);
      }
    } catch {
      // ignore corrupt storage
    }
  }, [menuItems]);

  // Persist to sessionStorage on change
  useEffect(() => {
    if (orderList.length === 0) {
      sessionStorage.removeItem(STORAGE_KEY);
    } else {
      const slim = orderList.map((e) => ({ id: e.item.id, qty: e.quantity }));
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(slim));
    }
  }, [orderList]);

  const addToList = useCallback((item: SeedMenuItem) => {
    setOrderList((prev) => {
      const existing = prev.find((e) => e.item.id === item.id);
      if (existing) {
        return prev.map((e) =>
          e.item.id === item.id ? { ...e, quantity: e.quantity + 1 } : e
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((itemId: string, delta: number) => {
    setOrderList((prev) => {
      return prev
        .map((e) =>
          e.item.id === itemId ? { ...e, quantity: e.quantity + delta } : e
        )
        .filter((e) => e.quantity > 0);
    });
  }, []);

  const clearList = useCallback(() => {
    setOrderList([]);
  }, []);

  // Build a quick-lookup map of item quantities for the cards
  const listQuantities: Record<string, number> = {};
  for (const entry of orderList) {
    listQuantities[entry.item.id] = entry.quantity;
  }

  const activeItems = menuItems.filter(
    (item) => item.category === activeCategory
  );
  const activeCat = categories.find((c) => c.id === activeCategory);
  const activeIndex = categories.findIndex((c) => c.id === activeCategory);
  const prevCat = activeIndex > 0 ? categories[activeIndex - 1] : null;
  const nextCat = activeIndex < categories.length - 1 ? categories[activeIndex + 1] : null;
  const desc =
    activeCat && (locale === "sv" ? activeCat.description_sv : activeCat.description_en);

  const switchCategory = useCallback((catId: string) => {
    setActiveCategory(catId);
    setRandomPick(null);
    // Scroll the sticky tabs into view so user sees the new category
    tabsNavRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, []);

  // Pick a random item from all "real food" categories
  const pickRandom = useCallback(() => {
    const pool = menuItems.filter((item) => !SKIP_CATEGORIES.has(item.category));
    if (pool.length === 0) return;

    setIsSpinning(true);

    // Quick shuffle effect — flash through 5-6 items before landing
    let count = 0;
    const flashes = 6;
    const interval = setInterval(() => {
      const idx = Math.floor(Math.random() * pool.length);
      setRandomPick(pool[idx]);
      count++;
      if (count >= flashes) {
        clearInterval(interval);
        // Final pick
        const finalIdx = Math.floor(Math.random() * pool.length);
        setRandomPick(pool[finalIdx]);
        setIsSpinning(false);
      }
    }, 80);
  }, [menuItems]);

  const dismissPick = useCallback(() => {
    setRandomPick(null);
  }, []);

  return (
    <div>
      {/* Category tabs + random button */}
      <nav
        ref={tabsNavRef}
        className="sticky top-16 z-40 bg-parchment/95 sticky-header-blur py-3 border-b border-parchment-dark"
        role="tablist"
        aria-label={locale === "sv" ? "Menykategorier" : "Menu categories"}
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide fade-edge-scroll -mx-1 px-1">
            {categories.map((cat) => {
              const isActive = cat.id === activeCategory && !randomPick;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${cat.id}`}
                  onClick={() => switchCategory(cat.id)}
                  className={`font-body text-xs font-medium px-3 py-1.5 rounded-full transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? "bg-espresso text-parchment"
                      : "bg-parchment-dark text-smoke hover:bg-wheat hover:text-espresso"
                  }`}
                >
                  {locale === "sv" ? cat.title_sv : cat.title_en}
                </button>
              );
            })}

            {/* Random picker button */}
            <button
              onClick={pickRandom}
              disabled={isSpinning}
              className={`font-body text-xs font-medium px-3 py-1.5 rounded-full transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                randomPick
                  ? "bg-wheat text-espresso"
                  : "bg-parchment-dark text-smoke hover:bg-wheat hover:text-espresso"
              } ${isSpinning ? "animate-pulse" : ""}`}
              aria-label={locale === "sv" ? "Slumpa en rätt" : "Pick a random dish"}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="1" width="22" height="22" rx="4" />
                <circle cx="8" cy="8" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="16" cy="8" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="8" cy="16" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="16" cy="16" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
              </svg>
              {locale === "sv" ? "Välj åt mig" : "Pick for me"}
            </button>
          </div>
        </div>
      </nav>

      {/* Random pick result */}
      {randomPick && (
        <div className="max-w-5xl mx-auto px-4 pt-8">
          <div className="random-pick-reveal max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-4">
              <p className="font-heading text-lg md:text-xl text-espresso italic">
                {isSpinning
                  ? locale === "sv" ? "Hmm, låt mig tänka..." : "Hmm, let me think..."
                  : locale === "sv" ? "Du ska ha..." : "You should get..."}
              </p>
            </div>

            {/* The picked card — highlighted */}
            <div className={`transition-all duration-200 ${isSpinning ? "opacity-60 scale-[0.97]" : "opacity-100 scale-100"}`}>
              <MenuCard
                item={randomPick}
                locale={locale}
                animationDelay={0}
                popularLabel={popularLabel}
                onAdd={addToList}
                listQuantity={listQuantities[randomPick.id] || 0}
              />
            </div>

            {/* Category hint */}
            {!isSpinning && (
              <p className="text-center text-smoke/50 text-xs font-body mt-2">
                {locale === "sv" ? "från " : "from "}
                {(() => {
                  const cat = categories.find((c) => c.id === randomPick.category);
                  return cat ? (locale === "sv" ? cat.title_sv : cat.title_en) : "";
                })()}
              </p>
            )}

            {/* Actions */}
            <div className="flex items-center justify-center gap-3 mt-4 mb-2">
              <button
                onClick={pickRandom}
                disabled={isSpinning}
                className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 4v6h6" />
                  <path d="M23 20v-6h-6" />
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                </svg>
                {locale === "sv" ? "Igen!" : "Again!"}
              </button>
              <button
                onClick={dismissPick}
                className="btn-ghost text-sm px-5 py-2.5"
              >
                {locale === "sv" ? "Visa menyn" : "Show menu"}
              </button>
            </div>
          </div>

          {/* Divider before regular menu */}
          <div className="border-b border-parchment-dark mt-8" />
        </div>
      )}

      {/* Active category panel */}
      <div
        id={`panel-${activeCategory}`}
        role="tabpanel"
        className="max-w-5xl mx-auto px-4 py-8"
      >
        {/* Category heading + description */}
        <div className="mb-6 max-w-3xl">
          <h2 className="font-heading text-xl md:text-2xl text-espresso italic">
            {activeCat &&
              (locale === "sv" ? activeCat.title_sv : activeCat.title_en)}
          </h2>
          {desc && (
            <p className="text-smoke text-sm font-body mt-1">{desc}</p>
          )}
        </div>

        {/* Menu item cards */}
        <MenuCardGrid
          key={activeCategory}
          items={activeItems}
          locale={locale}
          popularLabel={popularLabel}
          onAddToList={addToList}
          listQuantities={listQuantities}
        />

        {/* Item count hint */}
        <p className="text-smoke/40 text-xs font-body mt-6 text-center">
          {activeItems.length}{" "}
          {locale === "sv" ? "rätter" : "items"}
        </p>

        {/* Bottom category navigation */}
        <div className="mt-8 pt-6 border-t border-parchment-dark">
          <div className="flex items-center justify-between gap-2">
            {/* Previous category */}
            {prevCat ? (
              <button
                onClick={() => switchCategory(prevCat.id)}
                className="flex items-center gap-1.5 font-body text-sm text-smoke hover:text-espresso transition-colors group min-w-0"
              >
                <svg className="w-4 h-4 shrink-0 transition-transform group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                <span className="max-w-[100px] sm:max-w-none truncate">
                  {locale === "sv" ? prevCat.title_sv : prevCat.title_en}
                </span>
              </button>
            ) : (
              <div />
            )}

            {/* Scroll to top / all categories */}
            <button
              onClick={() => tabsNavRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="flex items-center gap-1.5 font-body text-xs text-smoke/60 hover:text-espresso transition-colors shrink-0"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 14h4v4H4zM14 14h4v4h-4zM4 4h4v4H4zM14 4h4v4h-4z" />
              </svg>
              {locale === "sv" ? "Alla kategorier" : "All categories"}
            </button>

            {/* Next category */}
            {nextCat ? (
              <button
                onClick={() => switchCategory(nextCat.id)}
                className="flex items-center gap-1.5 font-body text-sm text-smoke hover:text-espresso transition-colors group min-w-0"
              >
                <span className="max-w-[100px] sm:max-w-none truncate text-right">
                  {locale === "sv" ? nextCat.title_sv : nextCat.title_en}
                </span>
                <svg className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>

        {/* Spacer when order list bar is visible */}
        {orderList.length > 0 && <div className="h-14" />}
      </div>

      {/* Floating order list bar */}
      <OrderListBar
        entries={orderList}
        locale={locale}
        onUpdateQuantity={updateQuantity}
        onClear={clearList}
      />
    </div>
  );
}
