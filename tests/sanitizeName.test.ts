import { describe, expect, it } from "vitest";
import { sanitizeName } from "../src/lib/kit";
import { validatePersonalization } from "../src/personalize/validate";

describe("sanitizeName", () => {
  it("keeps apostrophes, hyphens, spaces and Latin diacritics", () => {
    expect(sanitizeName("O'Brien-Anne", 12)).toBe("O'BRIEN-ANNE");
    expect(sanitizeName("José", 12)).toBe("JOSÉ");
    expect(sanitizeName("Nuñez", 12)).toBe("NUÑEZ");
    expect(sanitizeName("Van Ness", 12)).toBe("VAN NESS");
  });

  it("strips digits and symbols", () => {
    expect(sanitizeName("Bee#36!", 12)).toBe("BEE");
  });

  it("enforces max length as a hard stop", () => {
    expect(sanitizeName("CARTEREXTRA", 6)).toBe("CARTER");
  });
});

describe("validatePersonalization", () => {
  it("accepts printable name characters that will actually be heat-pressed", () => {
    expect(validatePersonalization({ name: "JOSÉ", number: "21" })).toEqual([]);
    expect(validatePersonalization({ name: "O'BRIEN", number: "7" })).toEqual([]);
    expect(validatePersonalization({ name: "VAN NESS", number: "12" })).toEqual([]);
  });
});
