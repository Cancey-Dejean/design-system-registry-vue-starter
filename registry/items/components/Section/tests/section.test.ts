import { describe, expect, test } from "vite-plus/test";
import { sectionVariants } from "../Section.variants";

describe("section responsive spacing", () => {
  test("uses the reference's medium vertical rhythm by default", () => {
    expect(sectionVariants()).toContain("py-20 md:py-24");
    expect(sectionVariants()).toContain("mx-auto w-full px-6");
  });
  test.each([
    ["sm", "py-12 md:py-16"],
    ["md", "py-20 md:py-24"],
    ["lg", "py-24 md:py-32"],
  ] as const)("supports %s spacing", (padding, classes) => {
    expect(sectionVariants({ padding })).toContain(classes);
  });
});
