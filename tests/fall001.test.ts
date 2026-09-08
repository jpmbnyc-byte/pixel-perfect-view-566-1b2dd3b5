import { describe, expect, it } from "vitest";
import { CATEGORIES, LOOKBOOK_TEASER_IDS, PRODUCTS, productById, productsInCategory } from "@/lib/catalog";
import { IMAGE_REGISTRY } from "@/lib/imageRegistry";
import { sourceForProduct } from "@/lib/productSources";

describe("Fall 001 assortment", () => {
  it("locks 36 live listings including Harbor Division at $98", () => {
    expect(PRODUCTS).toHaveLength(36);
    const harbor = productById("harbor-coach")!;
    expect(harbor.name).toBe("Harbor Division Hooded Coach Jacket");
    expect(harbor.price).toBe(98);
    expect(harbor.category).toBe("harbor");
  });

  it("keeps the full Bayonne product system in the storefront", () => {
    expect(productById("club-hood")?.name).toBe("Club Hood");
    expect(productById("collegiate-tee")?.name).toBe("Collegiate Tee");
    expect(productById("recreation-crew")?.name).toBe("Recreation Crew");
    expect(productById("local-issue-ls")?.name).toBe("Local Issue Longsleeve");
    expect(productById("sideline-shell")?.name).toBe("Sideline Shell");
    expect(productById("field-short-grey")?.name).toBe("Field Short — Grey");
    expect(productById("field-short-bone")?.name).toBe("Field Short — Bone");
    expect(productById("market-tote")?.name).toBe("Market Tote");
    expect(productById("club-sock-4pk")?.price).toBe(60);
    expect(productById("broadway-21-jersey")?.name).toBe("Broadway 21 Club Jersey");
    expect(productById("broadway-club-short")?.name).toBe("Broadway Club Short");
    expect(productById("broadway-21-set")?.name).toBe("Broadway 21 Match Set");
  });

  it("uses canonical product ids and preserves useful old URLs", () => {
    const ids = PRODUCTS.map((p) => p.id);
    expect(ids).not.toContain("heritage-tee-garnet");
    expect(ids).not.toContain("quarter-zip");
    expect(ids).not.toContain("jersey-dress");
    expect(ids).not.toContain("crewneck");
    expect(productById("jersey")?.id).toBe("heritage-jersey");
    expect(productById("aop-hat")?.id).toBe("two-tone-cap");
    expect(productById("harbor-jacket")?.id).toBe("harbor-coach");
    expect(productById("tote-bag")?.id).toBe("market-tote");
  });

  it("keeps apparel on S–2XL and five departments", () => {
    expect(CATEGORIES.map((c) => c.id)).toEqual([
      "match",
      "performance",
      "travel",
      "harbor",
      "club",
    ]);
    expect(productsInCategory("match")).toHaveLength(6);
    expect(productsInCategory("performance")).toHaveLength(7);
    expect(productsInCategory("travel")).toHaveLength(10);
    expect(productsInCategory("harbor")).toHaveLength(2);
    expect(productsInCategory("club")).toHaveLength(11);
    expect(productsInCategory("club").map((p) => p.id)[0]).toBe("two-tone-cap");
    for (const p of PRODUCTS.filter((item) => item.sizeChart === "apparel")) {
      expect(p.sizeChart).toBe("apparel");
    }
  });

  it("uses verified OpenTip and Foot Locker details without exposing sources in product copy", () => {
    expect(sourceForProduct("club-sock")?.supplier).toBe("OpenTip");
    expect(sourceForProduct("harbor-coach")?.facts.join(" ")).toMatch(/10,000 mm/);
    expect(sourceForProduct("two-tone-cap")?.facts.join(" ")).toMatch(/cotton twill/i);
    expect(sourceForProduct("nb-bbp400")?.supplier).toBe("Foot Locker");
    expect(sourceForProduct("nb-bbp400")?.facts.join(" ")).toMatch(/Fresh Foam X/);
    expect(productById("nb-bbp400")?.price).toBe(130);
    expect(productById("nb-p400-chalk")?.price).toBe(130);
    expect(productById("nb-p400-volt")?.price).toBe(130);
    expect(productById("club-sock")?.details.length).toBeGreaterThan(0);
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

  it("marks unresolved families as pending photography", () => {
    const pending = PRODUCTS.filter((p) => p.imageryPending).map((p) => p.id).sort();
    expect(pending).toEqual(
      [
        "broadway-21-jersey",
        "broadway-club-short",
        "broadway-21-set",
        "field-short-grey",
        "field-short-bone",
        "mens-raglan",
        "womens-raglan",
        "field-cargo",
        "club-hood",
        "collegiate-tee",
        "recreation-crew",
        "local-issue-ls",
        "pique-polo",
        "pocket-ls",
        "sideline-shell",
        "club-sock-4pk",
        "market-tote",
        "nb-p400-chalk",
      ].sort(),
    );
    expect(IMAGE_REGISTRY["harbor-coach"].productFront).toBeTruthy();
    expect(IMAGE_REGISTRY["heritage-jersey"].modelFront).toBeTruthy();
    expect(IMAGE_REGISTRY["match-set"].modelFront).toBe(IMAGE_REGISTRY["heritage-jersey"].productFront);
    expect(IMAGE_REGISTRY["heritage-jersey"].productBack).toBeTruthy();
    expect(PRODUCTS.filter((p) => p.nameNumber).map((p) => p.id)).toEqual(["heritage-jersey"]);
    expect(IMAGE_REGISTRY["performance-short"].modelFront).not.toBe(
      IMAGE_REGISTRY["performance-ls"].modelFront,
    );
    expect(IMAGE_REGISTRY["performance-set"].modelFront).toBeTruthy();
    expect(IMAGE_REGISTRY["performance-set"].modelSecondary).not.toBe(
      IMAGE_REGISTRY["performance-set"].modelFront,
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
    expect(src).not.toContain("performance-hero.jpg");
    expect(src).not.toContain("performance-ls-front.jpg");
    expect(src).not.toContain("performance-ls-back.jpg");
    expect(src).not.toContain("performance-ls-model.jpg");
    expect(src).not.toContain("performance-short-front.jpg");
    expect(src).not.toContain("boxing-bee");
  });

  it("uses the new Match Jersey kit and blank back for the customizer", async () => {
    const { galleryShots } = await import("@/lib/imageRegistry");
    const jersey = productById("heritage-jersey")!;
    const shots = galleryShots("heritage-jersey");
    expect(jersey.name).toBe("1936 Match Jersey");
    expect(shots[0]?.src).toBe(IMAGE_REGISTRY["heritage-jersey"].productFront);
    expect(shots.at(-1)?.src).toBe(IMAGE_REGISTRY["heritage-jersey"].productBack);
    expect(jersey.previews.secondary).toBe(IMAGE_REGISTRY["heritage-jersey"].productBack);
  });

  it("uses the new women’s and men’s Performance studio plates", async () => {
    const { galleryShots, HEROES } = await import("@/lib/imageRegistry");
    expect(HEROES.landing).not.toBe(IMAGE_REGISTRY["performance-set"].modelFront);
    expect(HEROES.performance).toBe(IMAGE_REGISTRY["performance-set"].modelSecondary);
    const registry = await import("node:fs/promises").then((fs) =>
      fs.readFile(new URL("../src/lib/imageRegistry.ts", import.meta.url), "utf8"),
    );
    expect(registry).toContain("landing-hero.png");
    const setShots = galleryShots("performance-set");
    const lsShots = galleryShots("performance-ls");
    const shortShots = galleryShots("performance-short");
    expect(setShots).toHaveLength(6);
    expect(lsShots).toHaveLength(6);
    expect(shortShots).toHaveLength(6);
    expect(lsShots[0]?.src).toBe(IMAGE_REGISTRY["performance-ls"].productFront);
    expect(lsShots[1]?.src).toBe(IMAGE_REGISTRY["performance-ls"].productBack);
    expect(shortShots[0]?.src).toBe(IMAGE_REGISTRY["performance-short"].productFront);
    expect(shortShots[1]?.src).toBe(IMAGE_REGISTRY["performance-short"].productBack);
    expect(LOOKBOOK_TEASER_IDS).toContain("performance-set");
  });

  it("keeps photo zoom in a portal and locks the page frame", async () => {
    const { readFile } = await import("node:fs/promises");
    const { resolve } = await import("node:path");
    const gallery = await readFile(resolve(process.cwd(), "src/components/ProductZoomGallery.tsx"), "utf8");
    const css = await readFile(resolve(process.cwd(), "src/styles.css"), "utf8");
    const pdp = await readFile(resolve(process.cwd(), "src/routes/team.$slug.$product.tsx"), "utf8");
    expect(gallery).toContain("createPortal");
    expect(gallery).toContain("document.body");
    expect(gallery).toContain("overscroll-x-contain");
    expect(gallery).not.toContain("zoom-in-95");
    expect(gallery).not.toContain("scale-[1.85]");
    expect(css).toContain("overflow-x: clip");
    expect(pdp).toContain("minmax(0,1.15fr)");
    expect(pdp).toContain("min-w-0");
  });
});