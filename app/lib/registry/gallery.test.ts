import { describe, expect, test } from "vite-plus/test";
import { filterGalleryItems, getGalleryCategories, getBlockCategory } from "./gallery";

const items = [
  { name: "hero-01", title: "Hero 01", description: "Marketing introduction", sectionId: "blocks" },
  { name: "hero-02", title: "Hero 02", description: "Product introduction", sectionId: "blocks" },
  {
    name: "announcement-bar",
    title: "Announcement",
    description: "Site announcement",
    sectionId: "blocks",
  },
];

describe("registry gallery browsing", () => {
  test("numbered variants share one category", () => {
    expect(getBlockCategory("hero-01")).toEqual({ id: "hero", title: "Hero" });
    expect(getBlockCategory("announcement-bar")).toEqual({
      id: "announcement-bar",
      title: "Announcement Bar",
    });
  });
  test("category counts reflect the complete catalog rather than current search", () => {
    expect(getGalleryCategories(items)).toEqual([
      { id: "hero", title: "Hero", count: 2 },
      { id: "announcement-bar", title: "Announcement Bar", count: 1 },
    ]);
  });
  test("category and normalized search apply together", () => {
    expect(filterGalleryItems(items, "hero", " PRODUCT ").map((item) => item.name)).toEqual([
      "hero-02",
    ]);
  });
  test("all categories search names, titles, descriptions and category labels", () => {
    expect(filterGalleryItems(items, "all", "announcement bar").map((item) => item.name)).toEqual([
      "announcement-bar",
    ]);
    expect(filterGalleryItems(items, "all", "marketing").map((item) => item.name)).toEqual([
      "hero-01",
    ]);
  });
  test("unknown categories and unmatched searches show an empty result", () => {
    expect(filterGalleryItems(items, "unknown", "")).toEqual([]);
    expect(filterGalleryItems(items, "all", "missing")).toEqual([]);
  });
});
