import type { KitSpec } from "@/spec/types";
import type { KitFontId } from "@/tokens/type";
import { normalizeName, validatePersonalization } from "./validate";

/**
 * Apply personalization → new KitSpec.
 * Caller must run publishVariant / parityGate on the result (atomic regen).
 */
export function composePersonalization(
  base: KitSpec,
  input: {
    name?: string;
    number?: string;
    font?: KitFontId;
  },
): KitSpec {
  const issues = validatePersonalization(input);
  if (issues.length > 0) {
    throw new Error(issues.map((i) => i.message).join("; "));
  }
  const name = input.name !== undefined ? normalizeName(input.name) : base.personalization.name;
  const number = input.number !== undefined ? input.number : base.personalization.number;
  const font = input.font ?? base.personalization.font;

  return {
    ...base,
    personalization: {
      ...base.personalization,
      ...(name !== undefined ? { name } : {}),
      ...(number !== undefined ? { number } : {}),
      ...(font !== undefined ? { font } : {}),
    },
  };
}
