import { describe, expect, it } from "vitest";
import { SKUS } from "@/catalog/skus";
import { publishVariant, parityGate } from "@/render/parity";
import { render, sha256Hex } from "@/render/engine";
import { RES } from "@/render/contract";
import { composePersonalization } from "@/personalize/compose";

describe("parityGate", () => {
  it("passes publishVariant for every SKU (front/side/back/hero)", async () => {
    for (const sku of SKUS) {
      const outputs = await publishVariant(sku);
      expect(outputs.front.width).toBe(RES.live);
      expect(outputs.hero.width).toBe(RES.hero);
      const heroCheck = render(sku, "front", { resolution: RES.hero });
      expect(sha256Hex(outputs.hero)).toBe(sha256Hex(heroCheck));
    }
  });

  it("hero fingerprint matches render(front)@HERO_RES", () => {
    const spec = SKUS[0]!;
    const frontHero = render(spec, "front", { resolution: RES.hero });
    const outputs = {
      front: render(spec, "front", { resolution: RES.live }),
      side: render(spec, "side", { resolution: RES.live }),
      back: render(spec, "back", { resolution: RES.live }),
      hero: frontHero,
    };
    expect(parityGate(spec, outputs).pass).toBe(true);
  });

  it("personalization change still passes atomic publish", async () => {
    const base = SKUS.find((s) => s.personalization.mode === "name-number")!;
    const next = composePersonalization(base, {
      name: "CARTER",
      number: "7",
      font: "forge",
    });
    await expect(publishVariant(next)).resolves.toBeTruthy();
  });
});
