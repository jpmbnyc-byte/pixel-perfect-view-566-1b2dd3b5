import { describe, expect, it } from "vitest";
import {
  FOOTWEAR_IDS,
  FOOTWEAR_RUNS,
  formatShoeOption,
  shoeRunsFor,
  womenUsFromMen,
} from "@/lib/footwear";
import { IMAGE_REGISTRY, galleryShots } from "@/lib/imageRegistry";
import { productById } from "@/lib/catalog";
import { SHOP_LOOKS, lookFor } from "@/lib/looks";

describe("footwear inventory", () => {
  it("converts women’s US as men’s + 1.5", () => {
    expect(womenUsFromMen("4")).toBe("5.5");
    expect(womenUsFromMen("12.5")).toBe("14");
    expect(womenUsFromMen("11.5")).toBe("13");
    expect(formatShoeOption({ men: "12.5", women: "14", upc: "198689462957" })).toBe("12.5M · 14W");
  });

  it("maps each buy UPC to one colorway and only that size", () => {
    expect(FOOTWEAR_IDS).toHaveLength(6);
    expect(FOOTWEAR_RUNS["nb-runner"].map((r) => r.upc)).toEqual(["198689462957"]);
    expect(FOOTWEAR_RUNS["nb-runner-heat"].map((r) => r.upc)).toEqual(["198688679899"]);
    expect(FOOTWEAR_RUNS["nb-runner-cardinal"].map((r) => r.upc)).toEqual(["199063548267"]);
    expect(FOOTWEAR_RUNS["nb-bbp400"].map((r) => r.upc)).toEqual(["198689917464"]);
    expect(FOOTWEAR_RUNS["nb-p400-chalk"].map((r) => r.upc)).toEqual(["199063943796"]);
    expect(FOOTWEAR_RUNS["nb-p400-volt"].map((r) => r.upc)).toEqual(["198689850297"]);
    expect(FOOTWEAR_RUNS["nb-runner"][0]?.men).toBe("12.5");
    expect(FOOTWEAR_RUNS["nb-runner-cardinal"][0]?.men).toBe("11.5");
    expect(FOOTWEAR_RUNS["nb-bbp400"][0]?.men).toBe("4");
    expect(shoeRunsFor("heritage-jersey")).toEqual([]);
  });

  it("fills sneaker plates and pairs each colorway with a shop-this-look", async () => {
    const { readFile } = await import("node:fs/promises");
    const { resolve } = await import("node:path");
    const card = await readFile(resolve(process.cwd(), "src/components/ProductLookbookCard.tsx"), "utf8");
    const pdp = await readFile(resolve(process.cwd(), "src/routes/team.$slug.$product.tsx"), "utf8");
    const gallery = await readFile(resolve(process.cwd(), "src/components/ProductZoomGallery.tsx"), "utf8");
    expect(card).toContain("ShopLookChips");
    expect(card).toContain('aspect={shoe ? "square"');
    expect(pdp).toContain("ShopThisLook");
    expect(gallery).toContain("aspect-square");
    for (const id of FOOTWEAR_IDS) {
      expect(SHOP_LOOKS[id]).toBeTruthy();
      const listing = productById(id)!;
      const set = IMAGE_REGISTRY[id];
      const shots = galleryShots(id);
      expect(listing.imageryPending).not.toBe(true);
      expect(listing.thumb).toBe(set.productFront);
      expect(listing.previews.secondary).toBe(set.modelFront);
      expect(set.modelFront).toBeTruthy();
      expect(shots.length).toBeGreaterThanOrEqual(5);
      expect(shots.some((shot) => shot.fit === "cover" && shot.src === set.modelFront)).toBe(true);
      const look = lookFor(id)!;
      expect(look.pieces).toHaveLength(3);
      for (const piece of look.pieces) {
        expect(productById(piece)?.imageryPending).not.toBe(true);
      }
    }
  });
});
