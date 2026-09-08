import { describe, expect, it } from "vitest";
import { LETTERING, LETTERING_DRESS } from "@/lib/kit";
import { letteringFor, productById } from "@/lib/catalog";

describe("ref print area — Match jersey & jersey dress", () => {
  it("locks Match jersey to arched name + large number below", () => {
    const jersey = productById("jersey")!;
    const L = letteringFor(jersey);
    expect(L).toEqual(LETTERING);
    // Spine sits marginally left of frame center on the jersey-back plate.
    expect(L.centerX).toBeCloseTo(49.3, 1);
    expect(L.name.archDeg).toBe(0);
    expect(L.name.maxWidthPct).toBeLessThanOrEqual(52);
    expect(L.number.heightPct).toBeGreaterThanOrEqual(34);
    expect(L.number.y).toBeGreaterThan(L.name.y);
  });

  it("keeps jersey dress on the same system with dress framing", () => {
    const dress = productById("jersey-dress")!;
    const L = letteringFor(dress);
    expect(L).toEqual(LETTERING_DRESS);
    expect(L.name.archDeg).toBe(0);
    expect(L.number.heightPct).toBeGreaterThanOrEqual(30);
    expect(L.number.y).toBeGreaterThan(L.name.y);
  });
});
