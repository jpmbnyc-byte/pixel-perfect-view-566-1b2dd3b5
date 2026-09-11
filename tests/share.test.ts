import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { productById } from "@/lib/catalog";
import { OG_IMAGE, SHARE_COPY, shareDepartment, shareHome, shareProduct } from "@/copy/share";
import { shareHead } from "@/lib/shareHead";

describe("share language", () => {
  it("keeps the store voice in captions and cards", () => {
    const home = shareHome();
    expect(home.title).toMatch(/Bayonne Athletics/);
    expect(home.description).toMatch(/Built different/);
    expect(home.caption).toMatch(/Train · Compete · Represent/);
    expect(home.caption).toMatch(/07002/);
    expect(home.caption).not.toMatch(/lorem/i);
    expect(home.caption).not.toMatch(/OpenTip/i);
    expect(SHARE_COPY.passOn).toBe("Pass it on");
    expect(SHARE_COPY.copied).toBe("Copied. Represent.");
  });

  it("writes product captions from tagline, name, and motto", () => {
    const cap = productById("area-code-cap")!;
    const share = shareProduct(cap);
    expect(share.title).toBe("201 Area Code Cap — Bayonne Athletics");
    expect(share.caption).toMatch(/Same ground/);
    expect(share.caption).toMatch(/201 Area Code Cap/);
    expect(share.path).toBe("/team/bayonne-bees/area-code-cap");
    expect(shareDepartment("club").path).toBe("/team/bayonne-bees/club");
  });

  it("stamps every card with the Harbor shop OG plate", async () => {
    const { stat } = await import("node:fs/promises");
    const meta = shareHead(shareHome()).meta;
    const keys = meta.map((entry) => ("property" in entry ? entry.property : entry.name));
    expect(keys).toContain("og:image");
    expect(keys).toContain("twitter:image");
    expect(meta.some((entry) => "content" in entry && entry.content === OG_IMAGE)).toBe(true);
    expect(SHARE_COPY.ogAlt).toMatch(/Harbor Sweatpant/i);
    expect(existsSync(resolve(process.cwd(), "public/og.jpg"))).toBe(true);
    expect((await stat(resolve(process.cwd(), "public/og.jpg"))).size).toBeGreaterThan(180_000);
    expect(existsSync(resolve(process.cwd(), "public/favicon.svg"))).toBe(true);
    expect(existsSync(resolve(process.cwd(), "public/apple-touch-icon.png"))).toBe(true);
  });
});

describe("local ground + monogram", () => {
  it("places Fluffies under a garnet BA stamp and wires the favicon", async () => {
    const ground = await readFile(resolve(process.cwd(), "src/components/LocalGround.tsx"), "utf8");
    const nav = await readFile(resolve(process.cwd(), "src/components/brand/StoreNav.tsx"), "utf8");
    const root = await readFile(resolve(process.cwd(), "src/routes/__root.tsx"), "utf8");
    const favicon = await readFile(resolve(process.cwd(), "public/favicon.svg"), "utf8");
    expect(ground).toContain("fluffies-broadway");
    expect(ground).toContain("fluffies-reverse");
    expect(ground).toContain("grayscale");
    expect(ground).toContain("animate-local-defocus");
    expect(ground).toContain("Monogram");
    expect(ground).toContain("text-garnet");
    expect(ground).toContain("ShareMark");
    expect(nav).toContain("<Monogram");
    expect(nav).toContain("text-garnet");
    expect(root).toContain("/favicon.svg");
    expect(root).toContain("#4B0F17");
    expect(favicon).toContain("#4B0F17");
    expect(favicon).toContain("BA");
  });
});
