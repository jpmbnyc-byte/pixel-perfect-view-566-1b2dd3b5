import { describe, expect, it } from "vitest";
import { PINSTRIPES, SIDE_TAPE } from "../src/tokens/pinstripe";

describe("pinstripe / side-tape tokens", () => {
  it("locks match shorts to a single 18mm bone outseam tape (no three-stripe adidas trade dress)", () => {
    expect(PINSTRIPES.match.count).toBe(1);
    expect(PINSTRIPES.match.widthMm).toBe(18);
    expect(PINSTRIPES.match.color).toBe("#F4F1F0");
  });

  it("locks other shorts programs to the same single bone outseam tape", () => {
    expect(PINSTRIPES.other.count).toBe(1);
    expect(PINSTRIPES.other.widthMm).toBe(18);
    expect(PINSTRIPES.other.color).toBe("#F4F1F0");
  });

  it("exposes SIDE_TAPE as the shared outseam geometry", () => {
    expect(SIDE_TAPE.count).toBe(1);
    expect(SIDE_TAPE.widthMm).toBe(18);
    expect(SIDE_TAPE.color).toBe("#F4F1F0");
  });
});
