import { describe, expect, it } from "vitest";
import { LETTERING_MATCH_JERSEY } from "@/lib/kit";
import { letteringFor, productById } from "@/lib/catalog";

describe("ref print area — Match Jersey", () => {
  it("locks the 1936 Match Jersey to name over number on the blank back", () => {
    const jersey = productById("jersey")!;
    const L = letteringFor(jersey);
    expect(jersey.id).toBe("heritage-jersey");
    expect(jersey.nameNumber).toBe(true);
    expect(jersey.name).toBe("1936 Match Jersey");
    expect(L).toEqual(LETTERING_MATCH_JERSEY);
    expect(L.centerX).toBeCloseTo(50, 1);
    expect(L.number.y).toBeGreaterThan(L.name.y);
  });
});
