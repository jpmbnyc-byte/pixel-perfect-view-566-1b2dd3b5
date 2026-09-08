import { describe, expect, it } from "vitest";
import { sanitizeName } from "../src/lib/kit";

describe("sanitizeName", () => {
  it("keeps apostrophes and hyphens", () => {
    expect(sanitizeName("O'Brien-Anne", 12)).toBe("O'BRIEN-ANNE");
  });

  it("keeps Latin diacritics (NFC uppercase)", () => {
    expect(sanitizeName("José", 12)).toBe("JOSÉ");
    expect(sanitizeName("Nuñez", 12)).toBe("NUÑEZ");
  });

  it("strips digits and symbols", () => {
    expect(sanitizeName("Bee#36!", 12)).toBe("BEE");
  });

  it("enforces max length as a hard stop", () => {
    expect(sanitizeName("CARTEREXTRA", 6)).toBe("CARTER");
  });
});
