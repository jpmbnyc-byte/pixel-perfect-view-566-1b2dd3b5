import { describe, expect, it } from "vitest";
import {
  FOOTWEAR_BUY_UPCS,
  FOOTWEAR_RUNS,
  FOOTWEAR_UPCS_PENDING_SIZE,
  formatShoeOption,
  shoeRunsFor,
  womenUsFromMen,
} from "@/lib/footwear";

describe("footwear inventory", () => {
  it("converts women’s US as men’s + 1.5", () => {
    expect(womenUsFromMen("4")).toBe("5.5");
    expect(womenUsFromMen("12.5")).toBe("14");
    expect(womenUsFromMen("9")).toBe("10.5");
    expect(formatShoeOption({ men: "12.5", women: "14", upc: "198689462957" })).toBe("12.5M · 14W");
  });

  it("lists only mapped sizes from the buy and never pending barcodes", () => {
    const offered = [...FOOTWEAR_RUNS["nb-runner"], ...FOOTWEAR_RUNS["nb-bbp400"]].map((r) => r.upc);
    const pending = [
      ...FOOTWEAR_UPCS_PENDING_SIZE["nb-runner"],
      ...FOOTWEAR_UPCS_PENDING_SIZE["nb-bbp400"],
    ];
    expect(offered).toEqual(["198689462957", "198689917464"]);
    expect(pending).toEqual(["198688679899", "199063548267", "199063943796", "198689850297"]);
    for (const upc of offered) {
      expect(pending).not.toContain(upc);
    }
    expect(FOOTWEAR_BUY_UPCS["nb-runner"]).toEqual(["198689462957", "198688679899", "199063548267"]);
    expect(FOOTWEAR_BUY_UPCS["nb-bbp400"]).toEqual(["198689917464", "199063943796", "198689850297"]);
    expect(shoeRunsFor("heritage-jersey")).toEqual([]);
  });
});
