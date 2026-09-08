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
    expect(L.number.y).toBeGreaterThan(L.name.y + L.name.heightPct + 4);
    expect(L.name.archDeg).toBeGreaterThan(0);
    expect(L.number.heightPct).toBeGreaterThan(L.name.heightPct * 3);
  });

  it("renders name and number on the plate bounds, not a square crop", async () => {
    const { readFile } = await import("node:fs/promises");
    const { resolve } = await import("node:path");
    const canvas = await readFile(resolve(process.cwd(), "src/components/ProductCanvas.tsx"), "utf8");
    expect(canvas).toContain("PrintName");
    expect(canvas).toContain("aspectRatio");
    expect(canvas).toContain("containerType");
    expect(canvas).not.toContain('name || "CARTER"');
    expect(canvas).not.toContain("figcaption");
  });
});
