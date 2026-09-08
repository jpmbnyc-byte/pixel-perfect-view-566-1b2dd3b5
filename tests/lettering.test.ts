import { describe, expect, it } from "vitest";
import { LETTERING } from "@/lib/kit";
import { letteringFor, productById } from "@/lib/catalog";

describe("ref print area — Heritage Jersey", () => {
  it("locks Heritage Jersey to arched name + large number below", () => {
    const jersey = productById("jersey")!;
    const L = letteringFor(jersey);
    expect(jersey.id).toBe("heritage-jersey");
    expect(L).toEqual(LETTERING);
    expect(L.centerX).toBeCloseTo(49.3, 1);
    expect(L.name.archDeg).toBe(0);
    expect(L.name.maxWidthPct).toBeLessThanOrEqual(52);
    expect(L.number.heightPct).toBeGreaterThanOrEqual(34);
    expect(L.number.y).toBeGreaterThan(L.name.y);
  });
});
