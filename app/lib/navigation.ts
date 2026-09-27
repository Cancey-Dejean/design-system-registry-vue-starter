import type { RegistrySectionId } from "./registry/sections";

export interface DocsNavigationItem {
  kind: "docs";
  title: string;
  description: string;
  slug: string;
  routePath: string;
}

export interface RegistryNavigationItem {
  kind: "registry";
  title: string;
  name: string;
  description: string;
  sectionId: RegistrySectionId;
  routePath: string;
}

export type SiteNavigationItem = RegistryNavigationItem | DocsNavigationItem;

export interface SiteNavigationSection {
  id: "docs" | RegistrySectionId;
  title: string;
  basePath: string;
  items: SiteNavigationItem[];
}

export type SiteNavigationSectionId = SiteNavigationSection["id"];

export type SitePagerPage = {
  title: string;
  routePath: string;
};

const docsIndexPath = "/docs";

function normalizeRoutePath(path: string): string {
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

/** Flatten sidebar sections into the pager order, skipping the /docs redirect. */
export function flattenSitePagerPages(
  sections: readonly SiteNavigationSection[],
): SitePagerPage[] {
  return sections.flatMap((section) => {
    const landing =
      section.basePath === docsIndexPath
        ? []
        : [{ title: section.title, routePath: section.basePath }];

    return [
      ...landing,
      ...section.items.map((item) => ({
        title: item.title,
        routePath: item.routePath,
      })),
    ];
  });
}

export function getSitePagerNeighbors(
  pages: readonly SitePagerPage[],
  currentPath: string,
): { previous: SitePagerPage | null; next: SitePagerPage | null } {
  const path = normalizeRoutePath(currentPath);
  const index = pages.findIndex((page) => page.routePath === path);

  if (index === -1 || pages.length < 2) {
    return { previous: null, next: null };
  }

  const count = pages.length;

  return {
    previous: pages[(index - 1 + count) % count]!,
    next: pages[(index + 1) % count]!,
  };
}
