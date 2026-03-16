"use client";

import { useState, useEffect, useRef } from "react";
import type { SeedMenuItem } from "@/lib/seed-data";

export interface OrderListEntry {
  item: SeedMenuItem;
  quantity: number;
}

interface OrderListBarProps {
  entries: OrderListEntry[];
  locale: string;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onClear: () => void;
}

export default function OrderListBar({
  entries,
  locale,
  onUpdateQuantity,
  onClear,
}: OrderListBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const totalItems = entries.reduce((sum, e) => sum + e.quantity, 0);
  const totalPrice = entries.reduce((sum, e) => sum + e.item.price * e.quantity, 0);

  // Close on Escape
  useEffect(() => {
    if (!isExpanded) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsExpanded(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isExpanded]);

  // Close on click outside
  useEffect(() => {
    if (!isExpanded) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isExpanded]);

  if (totalItems === 0) return null;

  return (
    <div
      ref={panelRef}
      className="fixed bottom-0 left-0 right-0 z-[42] pb-[env(safe-area-inset-bottom,0px)]"
    >
      {/* Expanded list panel */}
      {isExpanded && (
        <div className="bg-espresso border-t border-wheat/20 order-list-slide-up">
          <div className="max-w-lg mx-auto px-4 py-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading text-base text-parchment italic">
                {locale === "sv" ? "Min beställning" : "My order"}
              </h3>
              <button
                onClick={onClear}
                className="font-body text-xs text-parchment/40 hover:text-parchment/70 transition-colors"
              >
                {locale === "sv" ? "Rensa" : "Clear"}
              </button>
            </div>

            {/* Item list */}
            <ul className="space-y-2 max-h-[40vh] overflow-y-auto scrollbar-hide">
              {entries.map((entry) => {
                const name =
                  locale === "sv" ? entry.item.name_sv : entry.item.name_en;
                return (
                  <li
                    key={entry.item.id}
                    className="flex items-center gap-3 font-body text-sm"
                  >
                    {/* Quantity controls */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => onUpdateQuantity(entry.item.id, -1)}
                        className="w-7 h-7 rounded-full bg-parchment/10 text-parchment hover:bg-parchment/20 transition-colors flex items-center justify-center text-base leading-none"
                        aria-label={
                          locale === "sv" ? "Minska antal" : "Decrease quantity"
                        }
                      >
                        −
                      </button>
                      <span className="w-5 text-center text-parchment tabular-nums text-sm font-medium">
                        {entry.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(entry.item.id, 1)}
                        className="w-7 h-7 rounded-full bg-parchment/10 text-parchment hover:bg-parchment/20 transition-colors flex items-center justify-center text-base leading-none"
                        aria-label={
                          locale === "sv" ? "Öka antal" : "Increase quantity"
                        }
                      >
                        +
                      </button>
                    </div>

                    {/* Item name */}
                    <span className="text-parchment/80 truncate flex-1 min-w-0">
                      {entry.item.number && (
                        <span className="text-wheat/60 mr-1">
                          {entry.item.number}.
                        </span>
                      )}
                      {name}
                    </span>

                    {/* Line total */}
                    <span className="text-wheat tabular-nums whitespace-nowrap shrink-0 font-medium">
                      {entry.item.price * entry.quantity} kr
                    </span>
                  </li>
                );
              })}
            </ul>

            {/* Divider + total */}
            <div className="border-t border-parchment/10 mt-3 pt-3 flex items-center justify-between">
              <span className="font-body text-xs text-parchment/40">
                {totalItems} {locale === "sv" ? "st" : "items"}
              </span>
              <span className="font-body font-semibold text-wheat tabular-nums">
                {locale === "sv" ? "Totalt" : "Total"}: {totalPrice} kr
              </span>
            </div>

            {/* Hint */}
            <p className="font-body text-[11px] text-parchment/30 mt-2 text-center">
              {locale === "sv"
                ? "Visa listan när du ringer för att beställa"
                : "Show this list when you call to order"}
            </p>
          </div>
        </div>
      )}

      {/* Collapsed summary bar */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-espresso border-t border-wheat/20 px-4 py-3 flex items-center justify-between gap-3 transition-colors hover:bg-espresso/95 group"
        aria-expanded={isExpanded}
        aria-label={
          locale === "sv" ? "Visa beställningslista" : "Show order list"
        }
      >
        <div className="flex items-center gap-2.5 max-w-lg mx-auto w-full">
          {/* List icon + count badge */}
          <div className="relative shrink-0">
            <svg
              className="w-5 h-5 text-parchment/70"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
              <rect x="9" y="3" width="6" height="4" rx="1" />
              <path d="M9 12h6M9 16h4" />
            </svg>
            <span className="absolute -top-1.5 -right-1.5 bg-ember text-white text-[10px] font-body font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
              {totalItems}
            </span>
          </div>

          {/* Summary text */}
          <span className="font-body text-sm text-parchment/70 flex-1 text-left truncate">
            {locale === "sv" ? "Min beställning" : "My order"}
          </span>

          {/* Total */}
          <span className="font-body font-semibold text-wheat tabular-nums whitespace-nowrap text-sm">
            {totalPrice} kr
          </span>

          {/* Chevron */}
          <svg
            className={`w-4 h-4 text-parchment/40 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </div>
      </button>
    </div>
  );
}
