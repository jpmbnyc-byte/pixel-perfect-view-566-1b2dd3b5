import { describe, expect, it } from "vitest";
import { COLLECTION_COPY } from "@/copy/collection";
import { COLOR, IDENTITY } from "@/tokens/brand";
import { TYPE } from "@/tokens/type";

describe("storefront identity", () => {
  it("locks the brand-sheet palette for site chrome", () => {
    expect(IDENTITY.garnet).toBe("#4B0F17");
    expect(IDENTITY.black).toBe("#0B0B0B");
    expect(IDENTITY.bone).toBe("#EDE9E1");
    expect(IDENTITY.concrete).toBe("#6B6B6B");
    expect(IDENTITY.silver).toBe("#C0C0C0");
  });

  it("does not rewrite the print / dye-sub lock", () => {
    expect(COLOR.garnet).toBe("#5A1626");
    expect(COLOR.bone).toBe("#F4F1F0");
    expect(COLOR.trimBlack).toBe("#0A0A0A");
  });

  it("uses luxury display faces, not kit Forge, for storefront type", () => {
    expect(TYPE.wordmark).toBe("Bodoni Moda");
    expect(TYPE.story).toBe("Cormorant Garamond");
    expect(TYPE.ui).toBe("Barlow");
    expect(TYPE.numeric).toBe("Oswald");
    expect(TYPE.kit.forge).toBe("Forge");
  });

  it("carries the identity lockup, not the old Bees motto", () => {
    expect(COLLECTION_COPY.lockup).toBe("Built different.");
    expect(COLLECTION_COPY.motto).toBe("Train · Compete · Represent");
    expect(COLLECTION_COPY.standard).toBe("Athletics for a higher standard.");
  });
});
