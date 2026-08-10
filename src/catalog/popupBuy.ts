/**
 * Sept 2026 pop-up physical buy — Bayonne version (no BOE school marks).
 * COGS are estimates; replace with vendor quotes before commit.
 */

export type SizeId = "S" | "M" | "L" | "XL" | "2XL" | "3XL" | "OS";

export type PopupLine = {
  sku: string;
  name: string;
  qty: number;
  cogsEach: number;
  retail: number;
  /** Units per size — omit keys for one-size */
  sizes?: Partial<Record<SizeId, number>>;
  notes: string;
  /** Carry as shelf stock for this event */
  stockForEvent: boolean;
};

export const POPUP_BUY: PopupLine[] = [
  {
    sku: "BB-F36",
    name: "Founding 36 Jacket",
    qty: 6,
    cogsEach: 58,
    retail: 165,
    sizes: { M: 1, L: 2, XL: 2, "2XL": 1 },
    notes: "Numbered 1/36–36/36 inside collar. Anchor — order 6 only.",
    stockForEvent: true,
  },
  {
    sku: "BB-MJ-REP",
    name: "Match Jersey (blank back)",
    qty: 18,
    cogsEach: 26,
    retail: 58,
    sizes: { M: 4, L: 6, XL: 5, "2XL": 3 },
    notes: "Blank back on table; name/number MTO at $98 ships ~3 wks.",
    stockForEvent: true,
  },
  {
    sku: "BB-BEANIE",
    name: "Garnet Beanie",
    qty: 30,
    cogsEach: 9,
    retail: 34,
    sizes: { OS: 30 },
    notes: "One size. Highest expected unit velocity.",
    stockForEvent: true,
  },
  {
    sku: "BB-SCARF",
    name: "Avenue A Scarf",
    qty: 24,
    cogsEach: 12,
    retail: 34,
    sizes: { OS: 24 },
    notes: "Jacquard. Universal sizing.",
    stockForEvent: true,
  },
  {
    sku: "BB-TEE",
    name: "Bayonne Tee",
    qty: 24,
    cogsEach: 12,
    retail: 38,
    sizes: { S: 3, M: 6, L: 7, XL: 5, "2XL": 3 },
    notes: "Tees skew smaller — S carried. BAYONNE / 1936 / Avenue A only.",
    stockForEvent: true,
  },
  {
    sku: "BB-SOCK",
    name: "Match Socks",
    qty: 30,
    cogsEach: 6.5,
    retail: 18,
    sizes: { OS: 30 },
    notes: "Attach-rate item.",
    stockForEvent: true,
  },
  {
    sku: "BB-PIN",
    name: "1936 Enamel Pin",
    qty: 100,
    cogsEach: 2,
    retail: 14,
    sizes: { OS: 100 },
    notes: "Register impulse. 86% GM.",
    stockForEvent: true,
  },
];

/** Explicitly excluded from this physical buy. */
export const POPUP_EXCLUDED = [
  {
    sku: "BB-MS",
    name: "Match Shorts",
    reason:
      "GM ~47% at $36 / ~$19 COGS — below floor. Raise to $44 or sell only inside sets.",
  },
] as const;

export const POPUP_EVENT = {
  label: "Bayonne pop-up",
  window: "2026-09",
  branding: "Bayonne" as const,
  cardRate: 0.032,
  eventCosts: 325,
  customOrderRetail: 98,
  baseCustomOrders: 15,
  baseSellThrough: 0.45,
} as const;

export function lineCogs(line: PopupLine): number {
  return Math.round(line.qty * line.cogsEach * 100) / 100;
}

export function lineRetail(line: PopupLine): number {
  return line.qty * line.retail;
}

export function buyTotals(lines: PopupLine[] = POPUP_BUY) {
  const cogs = lines.reduce((s, l) => s + lineCogs(l), 0);
  const retail = lines.reduce((s, l) => s + lineRetail(l), 0);
  const units = lines.reduce((s, l) => s + l.qty, 0);
  const gm = retail === 0 ? 0 : (retail - cogs) / retail;
  return {
    units,
    cogs: Math.round(cogs * 100) / 100,
    retail,
    gmPct: Math.round(gm * 100),
  };
}

/** Size curve must sum to qty when sizes are provided. */
export function sizeCurveValid(line: PopupLine): boolean {
  if (!line.sizes) return true;
  const sum = Object.values(line.sizes).reduce((a, b) => a + (b ?? 0), 0);
  return sum === line.qty;
}
