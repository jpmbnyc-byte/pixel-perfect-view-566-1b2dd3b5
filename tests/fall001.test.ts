import { describe, expect, it } from "vitest";
import { CATEGORIES, LOOKBOOK_TEASER_IDS, PRODUCTS, productById, productsInCategory } from "@/lib/catalog";
import { IMAGE_REGISTRY } from "@/lib/imageRegistry";

describe("Fall 001 assortment", () => {
  it("locks 20 live listings including Harbor Division at $98", () => {
    expect(PRODUCTS).toHaveLength(20);
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
    expect(productById("nb-runner")?.imageryPending).toBe(true);
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
    expect(pending).toEqual(["field-cargo", "nb-runner", "pique-polo", "pocket-ls", "womens-raglan"].sort());
    expect(IMAGE_REGISTRY["harbor-coach"].productFront).toBeTruthy();
    expect(IMAGE_REGISTRY["heritage-jersey"].modelFront).toBeTruthy();
  });
});
