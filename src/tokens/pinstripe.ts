/**
 * Shorts side language — double ink pinstripes (sublimation), never embroidered.
 * Two lines only — never three (manufacturer three-stripe exclusion).
 */

import { COLOR } from "./brand";

export const PINSTRIPE = {
  count: 2,
  finish: "sublimated-ink",
  /** Match day kit shorts */
  match: COLOR.bone,
  /** Alumni, sideline, and all non-match shorts */
  other: COLOR.inkBlack,
} as const;

export type ShortsPinstripeRole = "match" | "other";

export function pinstripeInk(role: ShortsPinstripeRole): string {
  return role === "match" ? PINSTRIPE.match : PINSTRIPE.other;
}
