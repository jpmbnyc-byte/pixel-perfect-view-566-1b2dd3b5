/**
 * Finished Match strip product copy — customer-facing.
 * Manufacturing partner names do not appear here.
 */

import type { CategoryId } from "@/lib/catalog";

export type MatchProductCopy = {
  tagline: string;
  /** PDP body */
  body: string;
  /** Product card / grid */
  card: string;
  cta: string;
  sizeHeading?: string;
  personalizeHeading?: string;
  personalizeHelper?: string;
  confirm: string;
};

export const MATCH_PRODUCT_COPY: Record<"jersey" | "shorts" | "full-set", MatchProductCopy> = {
  jersey: {
    tagline: "The one with your name on it.",
    body: "Bayonne across the chest. Yours across the back.\n\nBuilt in the garnet that belongs here, the Match Jersey takes the familiar language of a school kit and cleans it up: narrow crew neck, uninterrupted BAYONNE chest band and the crest at the heart.\n\nPersonalize the back with your name and number. It’s included.",
    card: "The right garnet. BAYONNE across the front. Your name and number on the back.",
    cta: "Make it yours →",
    personalizeHeading: "Your shirt. Your name.",
    personalizeHelper: "Add the name and number exactly as you want them printed.",
    confirm:
      "I’ve checked the spelling, number and size. I understand personalized pieces can’t be changed after checkout.",
  },
  shorts: {
    tagline: "Same garnet. No extra noise.",
    body: "The bottom half of the Bayonne strip, finished with the same restraint as the jersey.\n\nA clean garnet body is cut with a single bone outseam — one line, because one is enough. Designed to work as part of the full Match kit or stand on its own well beyond the gym.\n\nNo name. No number. Nothing it doesn’t need.",
    card: "One garnet. One bone stripe. Nothing unnecessary.",
    cta: "Choose your size →",
    sizeHeading: "Find your fit.",
    confirm:
      "I’ve checked my size. I understand made-to-order pieces can’t be changed after checkout.",
  },
  "full-set": {
    tagline: "Bayonne, head to hem.",
    body: "The complete Match strip in one uninterrupted garnet.\n\nThe set pairs the BAYONNE Match Jersey with the coordinating Match Shorts, keeping the color, proportions and detailing consistent from top to bottom. Your name and number are added to the jersey at no extra charge.\n\nOne kit. One color. Your name on it.",
    card: "The complete Bayonne strip. Jersey, shorts and your name on the back.",
    cta: "Build your kit →",
    personalizeHeading: "Put your name in the lineup.",
    personalizeHelper: "Enter the name and number exactly as you want them printed on the jersey.",
    confirm:
      "I’ve checked the spelling, number and size. I understand personalized kits can’t be changed after checkout.",
  },
};

export const MATCH_DEPARTMENT_COPY = {
  line: "For the whistle.",
  title: "Three pieces. One garnet.",
  body: "The Bayonne Match collection keeps the uniform disciplined: the jersey, the shorts, or the complete strip. Built to look like it belongs in the gym — because it does.",
  cta: "Shop Match →",
} as const;

export const STORE_INTRO_COPY = {
  eyebrow: "Bayonne store",
  title: "Garnet. Not “close enough” red.",
  body: "Bayonne has worn the color long enough to know when it’s wrong.\n\nSo we started there.\n\nTeam customs built around the garnet, history and visual language of Avenue A — then stripped away everything that didn’t belong.\n\nFor the players.\nFor the sideline.\nFor the people who never really stopped wearing Bayonne.",
  lockup: "Garnet since 1936.",
  cta: "Enter the store →",
} as const;

export function matchCopyFor(productId: string): MatchProductCopy | null {
  if (productId === "jersey" || productId === "shorts" || productId === "full-set") {
    return MATCH_PRODUCT_COPY[productId];
  }
  return null;
}

export function departmentLine(id: CategoryId): string {
  if (id === "match") return MATCH_DEPARTMENT_COPY.line;
  if (id === "sideline") return "For November on the bleachers.";
  if (id === "warmups") return "Before kickoff.";
  return "1936 — kept close.";
}
