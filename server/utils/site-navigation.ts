import type { H3Event } from "h3";
import type {
  DocsNavigationItem,
  RegistryNavigationItem,
  SiteNavigationSection,
} from "~/lib/navigation";
import { getRegistryItemRoutePath, getRegistrySectionsWithItems } from "~/lib/registry/sections";
import { getDocsPages } from "./docs-catalog";
import { getRegistryItems, type RegistryCatalogItem } from "./registry-catalog";

export async function getSiteNavigationSections(event: H3Event): Promise<SiteNavigationSection[]> {
  const [docsPages, registryItems] = await Promise.all([
    getDocsPages(event),
    getRegistryItems(event),
  ]);

  const docsSection: SiteNavigationSection | null =
    docsPages.length > 0
      ? {
          id: "docs",
          title: "Docs",
          basePath: "/docs",
          items: docsPages.map(
            (page): DocsNavigationItem => ({
              kind: "docs",
              title: page.title,
              description: page.description,
              slug: page.slug,
              routePath: `/docs/${page.slug}`,
            }),
          ),
        }
      : null;

  const registrySections: SiteNavigationSection[] =
    getRegistrySectionsWithItems<RegistryCatalogItem>(registryItems).map((section) => ({
      id: section.id,
      title: section.title,
      basePath: section.basePath,
      items: section.items.map(
        (item): RegistryNavigationItem => ({
          kind: "registry",
          title: item.title,
          name: item.name,
          description: item.description,
          sectionId: section.id,
          routePath: getRegistryItemRoutePath(item),
        }),
      ),
    }));

  return [docsSection, ...registrySections].filter(
    (section): section is SiteNavigationSection => section !== null && section.items.length > 0,
  );
}
