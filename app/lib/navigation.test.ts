import { describe, expect, test } from "vite-plus/test";
import {
  flattenSitePagerPages,
  getSitePagerNeighbors,
  type SiteNavigationSection,
} from "./navigation";

const sections: SiteNavigationSection[] = [
  {
    id: "docs",
    title: "Docs",
    basePath: "/docs",
    items: [
      { kind: "docs", title: "Introduction", description: "", slug: "index", routePath: "/docs" },
      {
        kind: "docs",
        title: "Installation",
        description: "",
        slug: "installation",
        routePath: "/docs/installation",
      },
    ],
  },
  {
    id: "components",
    title: "Components",
    basePath: "/components",
    items: [
      {
        kind: "registry",
        title: "Button",
        description: "",
        name: "button",
        sectionId: "components",
        routePath: "/components/button",
      },
      {
        kind: "registry",
        title: "Card",
        description: "",
        name: "card",
        sectionId: "components",
        routePath: "/components/card",
      },
    ],
  },
];
const pages = flattenSitePagerPages(sections);

describe("section page navigation", () => {
  test("does not add section landing pages to the item sequence", () => {
    expect(pages.map((page) => page.routePath)).toEqual([
      "/docs",
      "/docs/installation",
      "/components/button",
      "/components/card",
    ]);
  });
  test("first page has no previous page and links to its section's next item", () => {
    const neighbors = getSitePagerNeighbors(pages, "/docs");
    expect(neighbors.previous).toBeNull();
    expect(neighbors.next?.routePath).toBe("/docs/installation");
  });
  test("last docs page does not continue into components", () => {
    expect(getSitePagerNeighbors(pages, "/docs/installation").next).toBeNull();
  });
  test("first component does not return to docs", () => {
    expect(getSitePagerNeighbors(pages, "/components/button").previous).toBeNull();
  });
  test("last component does not wrap to introduction", () => {
    const neighbors = getSitePagerNeighbors(pages, "/components/card/");
    expect(neighbors.next).toBeNull();
    expect(neighbors.previous?.routePath).toBe("/components/button");
  });
  test("unknown routes and section landing pages have no neighbors", () => {
    for (const path of ["/missing", "/components"]) {
      expect(getSitePagerNeighbors(pages, path)).toEqual({ previous: null, next: null });
    }
  });
});
