import { describe, expect, it } from "vitest";
import { COLOR } from "@/tokens/brand";
import { PINSTRIPE, pinstripeInk } from "@/tokens/pinstripe";

describe("shorts pinstripe system", () => {
  it("uses exactly two sublimated ink lines", () => {
    expect(PINSTRIPE.count).toBe(2);
    expect(PINSTRIPE.finish).toBe("sublimated-ink");
  });

  it("assigns white/bone to match and black to all others", () => {
    expect(pinstripeInk("match")).toBe(COLOR.bone);
    expect(pinstripeInk("other")).toBe(COLOR.inkBlack);
    expect(PINSTRIPE.match).toBe(COLOR.bone);
    expect(PINSTRIPE.other).toBe(COLOR.inkBlack);
  });
});
