/**
 * Get a localized field from a Sanity document.
 * Falls back to Swedish if the requested locale field is empty.
 */
export function localized(
  obj: Record<string, unknown>,
  field: string,
  locale: string
): string {
  return (obj[`${field}_${locale}`] as string) || (obj[`${field}_sv`] as string) || "";
}

/**
 * Format price in SEK
 */
export function formatPrice(price: number): string {
  return `${price} kr`;
}

/**
 * Generate a className string from conditional classes
 */
export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
