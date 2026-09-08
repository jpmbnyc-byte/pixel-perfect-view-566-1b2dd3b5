import { describe, expect, it } from "vitest";
import { CATEGORIES, LOOKBOOK_TEASER_IDS, PRODUCTS, productById, productsInCategory } from "@/lib/catalog";
import { IMAGE_REGISTRY } from "@/lib/imageRegistry";

describe("Fall 001 assortment", () => {
  it("locks 24 live listings including Harbor Division at $98", () => {
    expect(PRODUCTS).toHaveLength(24);
    const harbor = productById("harbor-coach")!;
    expect(harbor.name).toBe("Harbor Division Hooded Coach Jacket");
    expect(harbor.price).toBe(98);
    expect(harbor.category).toBe("harbor");
  });

  it("uses canonical product ids, not retired garment names", () => {
    const ids = PRODUCTS.map((p) => p.id);
    expect(ids).not.toContain("heritage-tee-garnet");
    expect(ids).not.toContain("quarter-zip");
    expect(ids).not.toContain("jersey-dress");
    expect(ids).not.toContain("crewneck");
    expect(productById("jersey")?.id).toBe("heritage-jersey");
    expect(productById("aop-hat")?.id).toBe("two-tone-cap");
  });

  it("keeps apparel on S–2XL and five departments", () => {
    expect(CATEGORIES.map((c) => c.id)).toEqual([
      "match",
      "performance",
      "travel",
      "harbor",
      "club",
    ]);
    expect(productsInCategory("match")).toHaveLength(3);
    expect(productsInCategory("harbor")).toHaveLength(1);
    expect(productsInCategory("club").map((p) => p.id)[0]).toBe("two-tone-cap");
    for (const p of PRODUCTS.filter((item) => item.sizeChart === "apparel")) {
      expect(p.sizeChart).toBe("apparel");
    }
  });

  it("does not feature unresolved Club Goods photography as the lead", () => {
    const featuredClub = productsInCategory("club")[0];
    expect(featuredClub?.id).toBe("two-tone-cap");
    expect(productById("nb-runner")?.imageryPending).toBe(false);
    expect(productById("nb-runner")?.name).toBe("New Balance Fresh Foam Runner");
    expect(productById("nb-bbp400")?.name).toBe("New Balance BB P400");
    expect(LOOKBOOK_TEASER_IDS).toContain("nb-runner");
    expect(LOOKBOOK_TEASER_IDS).toContain("gothic-b-beanie");
    expect(LOOKBOOK_TEASER_IDS).not.toContain("mens-raglan");
    expect(productById("nb-runner-heat")?.line).toMatch(/Pink Heat/);
    expect(productById("nb-runner-cardinal")?.line).toMatch(/Cardinal/);
    expect(productById("nb-p400-volt")?.line).toMatch(/Afterglow/);
  });

  it("teases only photographed pieces on the landing lookbook", () => {
    for (const id of LOOKBOOK_TEASER_IDS) {
      expect(productById(id)?.imageryPending).not.toBe(true);
    }
  });

  it("gives every listing a lookbook material line", () => {
    for (const p of PRODUCTS) {
      expect(p.line).toMatch(/·/);
      expect(p.line.length).toBeGreaterThan(8);
    }
  });

  it("marks only unresolved families as pending photography", () => {
    const pending = PRODUCTS.filter((p) => p.imageryPending).map((p) => p.id).sort();
    expect(pending).toEqual(
      ["field-cargo", "mens-raglan", "nb-p400-chalk", "pique-polo", "pocket-ls", "womens-raglan"].sort(),
    );
    expect(IMAGE_REGISTRY["harbor-coach"].productFront).toBeTruthy();
    expect(IMAGE_REGISTRY["heritage-jersey"].modelFront).toBeTruthy();
    expect(IMAGE_REGISTRY["match-set"].modelFront).toBe(IMAGE_REGISTRY["heritage-jersey"].modelFront);
    expect(IMAGE_REGISTRY["match-set"].modelSecondary).toBe(IMAGE_REGISTRY["match-short"].modelFront);
    expect(IMAGE_REGISTRY["performance-short"].modelFront).not.toBe(
      IMAGE_REGISTRY["performance-ls"].modelFront,
    );
  });

  it("does not import expired mascot, boxing-kit, or corrupt plates", async () => {
    const { readFile } = await import("node:fs/promises");
    const { resolve } = await import("node:path");
    const src = await readFile(resolve(process.cwd(), "src/lib/imageRegistry.ts"), "utf8");
    expect(src).not.toContain("match-hero-stadium");
    expect(src).not.toContain("match-set-front");
    expect(src).not.toContain("local-issue-tee");
    expect(src).not.toContain("performance-male-hero");
    expect(src).not.toContain("boxing-bee");
  });
});
