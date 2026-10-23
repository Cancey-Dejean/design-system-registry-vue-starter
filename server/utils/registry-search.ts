import type { H3Event } from "h3";
import { createSearchIndex, searchIndex, type SearchRecord } from "~/lib/search/registry-search";
import {
  getRegistrySectionForType,
  getRegistryItemRoutePath,
  getRegistrySectionsWithItems,
} from "~/lib/registry/sections";
import { getDocsPages } from "./docs-catalog";
import { getRegistryItems } from "./registry-catalog";

let cachedSignature: string | undefined;
let cachedIndex: ReturnType<typeof createSearchIndex> | undefined;

export async function searchRegistry(event: H3Event, query: string) {
  const [pages, items] = await Promise.all([getDocsPages(event), getRegistryItems(event)]);
  const records: SearchRecord[] = [
    ...pages.map(
      (page): SearchRecord => ({
        id: `docs:${page.slug}`,
        name: page.slug,
        title: page.title,
        description: page.description,
        section: "docs",
        sectionTitle: "Docs",
        routePath: page.routePath,
        type: "docs",
        categories: [],
        dependencies: [],
        fileNames: [page.sourceFile],
        keywords: page.markdown,
      }),
    ),
    ...getRegistrySectionsWithItems(items)
      .flatMap((section) => section.items)
      .map((item): SearchRecord => {
        const section = getRegistrySectionForType(item.type);
        return {
          id: item.name,
          name: item.name,
          title: item.title,
          description: item.description,
          section: section.id,
          sectionTitle: section.title,
          routePath: getRegistryItemRoutePath(item),
          type: item.type,
          categories:
            item.categories ?? (section.id === "blocks" ? [item.name.replace(/-\d+$/u, "")] : []),
          dependencies: [...(item.dependencies ?? []), ...(item.localRegistryDependencies ?? [])],
          fileNames: item.files.map((file) => file.path.split("/").at(-1) ?? file.path),
          keywords: [item.name.replaceAll("-", " "), ...(item.keywords ?? [])].join(" "),
        };
      }),
  ];
  // Include searchable metadata so edits invalidate the index in the running dev server.
  const signature = JSON.stringify(records);
  if (!cachedIndex || cachedSignature !== signature) {
    cachedSignature = signature;
    cachedIndex = createSearchIndex(records);
    cachedIndex.catch(() => {
      if (cachedSignature === signature) cachedIndex = undefined;
    });
  }
  return searchIndex(await cachedIndex, query);
}
