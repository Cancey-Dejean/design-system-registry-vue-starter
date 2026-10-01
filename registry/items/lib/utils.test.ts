import { readFileSync } from "node:fs";

import { describe, expect, test } from "vite-plus/test";

import { cn, themeTextSizes } from "./utils";

describe("cn", () => {
  test("registers every theme font size", () => {
    const theme = readFileSync(new URL("../files/styles/theme.css", import.meta.url), "utf8");
    const themeSizes = [...theme.matchAll(/--text-([a-z0-9-]+):/g)]
      .map((match) => match[1])
      .filter((name) => name && !name.includes("--"));

    expect([...themeTextSizes].toSorted()).toEqual([...new Set(themeSizes)].toSorted());
  });

  test("keeps a custom size next to a text color", () => {
    expect(cn("font-code text-label text-muted-foreground", "bg-muted text-foreground")).toBe(
      "font-code text-label bg-muted text-foreground",
    );
    expect(cn("text-14 text-foreground")).toBe("text-14 text-foreground");
  });

  test("resolves size against size", () => {
    expect(cn("text-sm", "text-label")).toBe("text-label");
    expect(cn("text-label", "text-display-xl")).toBe("text-display-xl");
    expect(cn("text-meta", "text-[13px]")).toBe("text-[13px]");
  });

  test("resolves color against color", () => {
    expect(cn("text-red-500", "text-foreground")).toBe("text-foreground");
  });

  test("keeps heading scale sizes beside a tone", () => {
    expect(
      cn("text-60 font-semibold tracking-tight text-foreground sm:text-72", "leading-none"),
    ).toBe("text-60 font-semibold tracking-tight text-foreground sm:text-72 leading-none");
  });
});
