/**
 * Shorts side language — single sublimated bone outseam tape.
 * Never embroidered. Never three stripes (adidas trade dress).
 * Spec: 18mm bone tape on the outseam — see docs/OWAYO_F6_HERO.md (FP6 Hero).
 */

import { COLOR } from "./brand";

/** Shared outseam geometry for all shorts programs. */
export const SIDE_TAPE = {
  count: 1,
  widthMm: 18,
  finish: "sublimated-ink" as const,
  color: COLOR.bone,
} as const;

/**
 * Role-keyed side language. Match and other both use the same single bone tape
 * (trade-dress lock — never three stripes; never double black alumni stripes).
 */
export const PINSTRIPES = {
  match: { count: SIDE_TAPE.count, widthMm: SIDE_TAPE.widthMm, color: SIDE_TAPE.color },
  other: { count: SIDE_TAPE.count, widthMm: SIDE_TAPE.widthMm, color: SIDE_TAPE.color },
} as const;

/** @deprecated Prefer SIDE_TAPE / PINSTRIPES — kept for existing imports. */
export const PINSTRIPE = {
  count: SIDE_TAPE.count,
  widthMm: SIDE_TAPE.widthMm,
  finish: SIDE_TAPE.finish,
  match: SIDE_TAPE.color,
  other: SIDE_TAPE.color,
} as const;

export type ShortsPinstripeRole = "match" | "other";

export function pinstripeInk(role: ShortsPinstripeRole): string {
  return PINSTRIPES[role].color;
}
