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
