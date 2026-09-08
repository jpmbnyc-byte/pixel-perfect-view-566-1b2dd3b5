/**
 * Fall 001 footwear — one listing per colorway on the buy.
 * Men’s US display, women’s = +1.5. Only the size on that barcode.
 */

export type FootwearId =
  | "nb-runner"
  | "nb-runner-heat"
  | "nb-runner-cardinal"
  | "nb-bbp400"
  | "nb-p400-chalk"
  | "nb-p400-volt";

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

export const FOOTWEAR_RUNS: Record<FootwearId, ShoeRun[]> = {
  "nb-runner": [run("12.5", "198689462957")],
  "nb-runner-heat": [run("12.5", "198688679899")],
  "nb-runner-cardinal": [run("11.5", "199063548267")],
  "nb-bbp400": [run("4", "198689917464")],
  "nb-p400-chalk": [run("4", "199063943796")],
  "nb-p400-volt": [run("4", "198689850297")],
};

export const FOOTWEAR_IDS = Object.keys(FOOTWEAR_RUNS) as FootwearId[];

export function isFootwearId(id: string): id is FootwearId {
  return id in FOOTWEAR_RUNS;
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
