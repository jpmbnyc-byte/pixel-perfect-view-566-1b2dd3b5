/**
 * Fall 001 footwear — only sizes actually on the buy, men’s display with
 * women’s conversion (+1.5 US). Do not show a full empty size run.
 *
 * Mapped from the live wholesale variant SKU suffix (D-04 = 4, D-125 = 12.5)
 * plus the UPCs on the buy. Unmapped UPCs stay off the size grid.
 */

export type FootwearId = "nb-bbp400" | "nb-runner";

export type ShoeRun = {
  men: string;
  women: string;
  upc: string;
};

/** US women’s = US men’s + 1.5 (New Balance). */
export function womenUsFromMen(men: string): string {
  const n = Number(men);
  if (!Number.isFinite(n)) return "";
  const w = n + 1.5;
  return Number.isInteger(w) ? String(w) : String(w);
}

function run(men: string, upc: string): ShoeRun {
  return { men, women: womenUsFromMen(men), upc };
}

export function formatShoeOption(row: ShoeRun) {
  return `${row.men}M · ${row.women}W`;
}

/**
 * UPCs on the Fall 001 buy. Sizes are listed only after the variant suffix
 * is confirmed. Do not invent sizes for barcodes still in pending.
 */
export const FOOTWEAR_BUY_UPCS: Record<FootwearId, readonly string[]> = {
  "nb-runner": ["198689462957", "198688679899", "199063548267"],
  "nb-bbp400": ["198689917464", "199063943796", "198689850297"],
};

export const FOOTWEAR_RUNS: Record<FootwearId, ShoeRun[]> = {
  "nb-runner": [run("12.5", "198689462957")],
  "nb-bbp400": [run("4", "198689917464")],
};

/** On the buy; size suffix not yet confirmed — never offered at checkout. */
export const FOOTWEAR_UPCS_PENDING_SIZE: Record<FootwearId, string[]> = {
  "nb-runner": ["198688679899", "199063548267"],
  "nb-bbp400": ["199063943796", "198689850297"],
};

export function isFootwearId(id: string): id is FootwearId {
  return id === "nb-bbp400" || id === "nb-runner";
}

export function shoeRunsFor(productId: string): ShoeRun[] {
  if (!isFootwearId(productId)) return [];
  return FOOTWEAR_RUNS[productId];
}

export function shoeRunFor(productId: string, size: string) {
  return shoeRunsFor(productId).find((row) => row.men === size);
}

export function shoeSizeAllowed(productId: string, size: string) {
  return Boolean(shoeRunFor(productId, size));
}
