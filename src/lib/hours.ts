export interface SeasonalHours {
  label_sv: string;
  label_en: string;
  startMonth: number; // 1-12
  endMonth: number; // 1-12
  hours: string; // e.g. "11:00-20:00"
}

/**
 * Get the active seasonal hours entry based on the current date.
 *
 * Fallback logic:
 * 1. Find entry where startMonth <= currentMonth <= endMonth (handles year-wrap)
 * 2. If no match, fall back to the entry with the most recent startMonth before current month
 * 3. If only one entry exists, always use it
 * 4. Never returns null — there must always be hours visible
 */
export function getActiveHours(
  entries: SeasonalHours[],
  now: Date = new Date()
): SeasonalHours {
  if (entries.length === 0) {
    return {
      label_sv: "Öppettider",
      label_en: "Opening Hours",
      startMonth: 1,
      endMonth: 12,
      hours: "11:00-20:00",
    };
  }

  if (entries.length === 1) {
    return entries[0];
  }

  const currentMonth = now.getMonth() + 1; // 1-12

  // Try to find an exact match
  const match = entries.find((entry) => {
    if (entry.startMonth <= entry.endMonth) {
      // Same year range: e.g. May(5) - Aug(8)
      return currentMonth >= entry.startMonth && currentMonth <= entry.endMonth;
    } else {
      // Year-wrap range: e.g. Sep(9) - Apr(4)
      return currentMonth >= entry.startMonth || currentMonth <= entry.endMonth;
    }
  });

  if (match) return match;

  // Fallback: find the entry with the most recent startMonth before current month
  const sorted = [...entries].sort((a, b) => {
    const diffA = (currentMonth - a.startMonth + 12) % 12;
    const diffB = (currentMonth - b.startMonth + 12) % 12;
    return diffA - diffB;
  });

  return sorted[0];
}

/**
 * Check if the restaurant is currently open based on hours string.
 * hours format: "11:00-20:00"
 */
export function isCurrentlyOpen(hours: string, now: Date = new Date()): boolean {
  const [openStr, closeStr] = hours.split("-");
  if (!openStr || !closeStr) return false;

  const [openH, openM] = openStr.split(":").map(Number);
  const [closeH, closeM] = closeStr.split(":").map(Number);

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}
