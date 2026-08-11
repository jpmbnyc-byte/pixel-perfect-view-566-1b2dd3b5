/**
 * BOE / nickname legal gate.
 * Purchasable product must not claim school marks or “Bees” until onFile is true.
 */

export const BOE_PERMISSION = {
  /** Flip only when signed Bayonne Board of Education letter is on file. */
  onFile: false,
  authority: "Bayonne Board of Education",
  blockedOnPurchasable: [
    "Bees",
    "Bayonne Bees",
    "Queen Bees",
    "BHS",
    "Bayonne High School",
  ] as const,
  /** Safe commerce language without BOE. */
  allowedWithoutPermission: [
    "BAYONNE",
    "garnet",
    "1936",
    "Avenue A",
    "boxing-bee", // NPFC original IP
    "lady-bee", // NPFC original IP — jersey dress crest only
  ] as const,
} as const;

/** Store / event brand lockup until BOE permission. */
export function commerceBrandName(): "Bayonne" | "Bayonne Bees" {
  return BOE_PERMISSION.onFile ? "Bayonne Bees" : "Bayonne";
}

export function assertPurchasableCopy(text: string): string[] {
  if (BOE_PERMISSION.onFile) return [];
  const hits: string[] = [];
  const upper = text.toUpperCase();
  for (const term of BOE_PERMISSION.blockedOnPurchasable) {
    if (upper.includes(term.toUpperCase())) hits.push(term);
  }
  return hits;
}
