import type { RegistryItemType } from "./registry/item-types";
import type { RegistrySectionId } from "./registry/sections";

export interface DocsNavigationItem {
  kind: "docs";
  title: string;
  description: string;
  slug: string;
  audience?: "maintainers";
  routePath: string;
}

export interface RegistryNavigationItem {
  kind: "registry";
  type?: RegistryItemType;
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
  sectionId: SiteNavigationSectionId;
};

function normalizeRoutePath(path: string): string {
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

/** Keep section identity so the pager cannot cross catalog boundaries. */
export function flattenSitePagerPages(sections: readonly SiteNavigationSection[]): SitePagerPage[] {
  return sections.flatMap((section) =>
    section.items.map((item) => ({
      title: item.title,
      routePath: item.routePath,
      sectionId: section.id,
    })),
  );
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

  const current = pages[index]!;
  const previous = pages[index - 1];
  const next = pages[index + 1];

  return {
    previous: previous?.sectionId === current.sectionId ? previous : null,
    next: next?.sectionId === current.sectionId ? next : null,
  };
}
