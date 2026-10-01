import { readFileSync } from "node:fs";

import { fc, test } from "@fast-check/vitest";
import { describe, expect } from "vite-plus/test";

import { cn, themeTextSizes } from "../utils";

const textColors = [
  "text-foreground",
  "text-muted-foreground",
  "text-primary",
  "text-destructive",
] as const;

describe("cn", () => {
  test("registers every theme font size", () => {
    const theme = readFileSync(new URL("../../files/styles/theme.css", import.meta.url), "utf8");
    const themeSizes = [...theme.matchAll(/--text-([a-z0-9-]+):/g)]
      .map((match) => match[1])
      .filter((name) => name && !name.includes("--"));

    expect([...themeTextSizes].toSorted()).toEqual([...new Set(themeSizes)].toSorted());
  });

  test("keeps a custom size next to a text color", () => {
    expect(cn("font-code text-16 text-muted-foreground", "bg-muted text-foreground")).toBe(
      "font-code text-16 bg-muted text-foreground",
    );
    expect(cn("text-14 text-foreground")).toBe("text-14 text-foreground");
  });

  test("resolves size against size", () => {
    expect(cn("text-sm", "text-14")).toBe("text-14");
    expect(cn("text-14", "text-120")).toBe("text-120");
    expect(cn("text-16", "text-[13px]")).toBe("text-[13px]");
  });

  test("resolves color against color", () => {
    expect(cn("text-red-500", "text-foreground")).toBe("text-foreground");
  });

  test("keeps heading scale sizes beside a tone", () => {
    expect(
      cn("text-60 font-semibold tracking-tight text-foreground sm:text-72", "leading-none"),
    ).toBe("text-60 font-semibold tracking-tight text-foreground sm:text-72 leading-none");
  });

  test.prop({
    size: fc.constantFrom(...themeTextSizes),
    color: fc.constantFrom(...textColors),
  })("keeps a theme size next to a text color", ({ size, color }) => {
    expect(cn(`text-${size}`, color)).toBe(`text-${size} ${color}`);
  });

  test.prop({
    earlier: fc.constantFrom(...themeTextSizes),
    later: fc.constantFrom(...themeTextSizes),
  })("keeps the later theme size", ({ earlier, later }) => {
    expect(cn(`text-${earlier}`, `text-${later}`)).toBe(`text-${later}`);
  });
});
