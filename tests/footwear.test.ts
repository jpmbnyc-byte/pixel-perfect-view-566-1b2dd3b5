import { describe, expect, it } from "vitest";
import {
  FOOTWEAR_IDS,
  FOOTWEAR_RUNS,
  formatShoeOption,
  shoeRunsFor,
  womenUsFromMen,
} from "@/lib/footwear";

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
});
