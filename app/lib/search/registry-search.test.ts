import { describe, expect, test } from "vite-plus/test";
import { createSearchIndex, searchIndex, type SearchRecord } from "./registry-search";

const records: SearchRecord[] = [
  {
    id: "docs:index",
    title: "Introduction",
    name: "index",
    description: "Start here",
    routePath: "/docs",
    section: "docs",
    sectionTitle: "Docs",
    type: "docs",
    categories: [],
    dependencies: [],
    fileNames: ["index.md"],
    keywords: "",
  },
  {
    id: "button",
    title: "Button",
    name: "button",
    description: "Trigger an action",
    routePath: "/components/button",
    section: "components",
    sectionTitle: "Components",
    type: "registry:ui",
    categories: [],
    dependencies: ["reka-ui"],
    fileNames: ["Button.variants.ts"],
    keywords: "",
  },
  {
    id: "hero",
    title: "Hero",
    name: "hero",
    description: "A section with a button",
    routePath: "/blocks/hero",
    section: "blocks",
    sectionTitle: "Blocks",
    type: "registry:block",
    categories: ["marketing"],
    dependencies: ["button"],
    fileNames: ["Hero.vue"],
    keywords: "landing page",
  },
];

describe("registry search", () => {
  test("ranks title matches ahead of descriptions", async () => {
    const result = await searchIndex(await createSearchIndex(records), "button");
    expect(result.results[0]?.id).toBe("button");
  });
  test("tolerates misspelled item names", async () => {
    const result = await searchIndex(await createSearchIndex(records), "buton");
    expect(result.results.some((item) => item.id === "button")).toBe(true);
  });
  test("searches dependencies, filenames, categories, type, and keywords", async () => {
    const index = await createSearchIndex(records);
    for (const query of ["reka", "variants", "marketing", "landing", "registry:block"]) {
      expect((await searchIndex(index, query)).count, query).toBeGreaterThan(0);
    }
  });
  test("returns initial items in catalog order and caps results", async () => {
    const result = await searchIndex(await createSearchIndex(records), "  ", 2);
    expect(result.count).toBe(3);
    expect(result.results.map((item) => item.id)).toEqual(["docs:index", "button"]);
  });
  test("empty catalogs and absent terms return no results", async () => {
    expect((await searchIndex(await createSearchIndex([]), "button")).results).toEqual([]);
    expect((await searchIndex(await createSearchIndex(records), "zzzzzzzzzz")).results).toEqual([]);
  });
});
