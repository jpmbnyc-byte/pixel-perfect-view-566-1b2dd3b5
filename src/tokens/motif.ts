/**
 * Pattern system (Peter Saville method — documented meanings).
 * chevron → hive geometry · grid → Avenue A street plan · arc → Kop terrace curve
 */
export const MOTIF = ["chevron", "grid", "arc"] as const;

export type MotifId = (typeof MOTIF)[number];

export const MOTIF_MEANING: Record<MotifId, string> = {
  chevron: "Hive geometry — the Bees' hexagonal field, drawn as diagonal blocks.",
  grid: "Avenue A street plan — the peninsula grid under the school.",
  arc: "The old Kop terrace curve — the bowl that held Friday night.",
};
