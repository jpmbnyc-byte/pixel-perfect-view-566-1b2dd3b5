import type { KitSpec, View } from "@/spec/types";
import { RENDER_CONTRACT_VERSION } from "./contract";

/** FNV-1a 32-bit */
export function fnv1a(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

export function canonicalJson(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  const obj = value as Record<string, unknown>;
  const keys = Object.keys(obj).sort();
  return `{${keys.map((k) => `${JSON.stringify(k)}:${canonicalJson(obj[k])}`).join(",")}}`;
}

/** Same input → same output, forever, across machines. */
export function renderSeed(spec: KitSpec, view: View): number {
  return fnv1a(
    `${RENDER_CONTRACT_VERSION}|${spec.sku}|${canonicalJson(spec.colorway)}|` +
      `${canonicalJson(spec.graphics)}|${canonicalJson(spec.personalization)}|${view}`,
  );
}

export function variantKey(spec: KitSpec): string {
  return [
    spec.sku,
    String(RENDER_CONTRACT_VERSION),
    fnv1a(canonicalJson(spec.colorway)).toString(16),
    fnv1a(canonicalJson(spec.graphics)).toString(16),
    fnv1a(canonicalJson(spec.personalization)).toString(16),
  ].join(":");
}
