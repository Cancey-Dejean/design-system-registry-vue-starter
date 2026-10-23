import { describe, expect, test } from "vite-plus/test";
import type { SiteNavigationSection } from "./navigation";
import { getRouteSeo, getSitemapPaths, renderSitemap } from "./seo";

const sections: SiteNavigationSection[] = [
  {
    id: "docs",
    title: "Docs",
    basePath: "/docs",
    items: [
      {
        kind: "docs",
        title: "Introduction",
        description: "Get started",
        slug: "index",
        routePath: "/docs",
      },
      {
        kind: "docs",
        title: "Installation",
        description: "Install components",
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
        name: "button",
        description: "Trigger an action",
        sectionId: "components",
        routePath: "/components/button",
      },
    ],
  },
];

describe("page SEO", () => {
  test("uses authored page metadata with stable canonical URL", () => {
    const result = getRouteSeo("/docs/installation?source=test#heading", sections);
    expect(result.title).toBe("Installation — design-system-ui");
    expect(result.description).toBe("Install components");
    expect(result.canonical).toBe("https://vuedocs.canceydejean.dev/docs/installation");
    expect(result.robots).toBe("index, follow");
    expect(result.markdownUrl).toBe("https://vuedocs.canceydejean.dev/docs/installation.md");
    expect(result.ogType).toBe("article");
  });
  test("canonicalizes docs index and registry item aliases", () => {
    expect(getRouteSeo("/docs/index", sections).canonical).toBe(
      "https://vuedocs.canceydejean.dev/docs",
    );
    const result = getRouteSeo("/registry/button", sections);
    expect(result.canonical).toBe("https://vuedocs.canceydejean.dev/components/button");
    expect(result.robots).toBe("noindex, follow");
  });
  test("defines public home, section and flow pages", () => {
    expect(getRouteSeo("/", sections).title).toBe("design-system-ui");
    expect(getRouteSeo("/components?category=all", sections).description).toBe(
      "Installable UI primitives and components.",
    );
    expect(getRouteSeo("/flows", sections).title).toBe("Component flows — design-system-ui");
    expect(getRouteSeo("/unknown", sections).robots).toBe("noindex, follow");
  });
});

describe("sitemap", () => {
  test("includes public canonical destinations once and excludes machine and alias routes", () => {
    const paths = getSitemapPaths(sections);
    expect(paths).toEqual([
      "/",
      "/flows",
      "/docs",
      "/docs/installation",
      "/components",
      "/components/button",
    ]);
    expect(paths).not.toContain("/docs/index");
    expect(paths).not.toContain("/registry/button");
  });
  test("escapes XML and deduplicates URL entries", () => {
    const xml = renderSitemap(["/docs", "/docs", "/a?b=1&c=2"]);
    expect(xml.match(/<loc>/g)?.length).toBe(2);
    expect(xml).toContain("https://vuedocs.canceydejean.dev/a?b=1&amp;c=2");
    expect(xml).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
  });
});
