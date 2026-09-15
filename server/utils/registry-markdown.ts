import type { H3Event } from "h3";
import {
  formatCodeBlock,
  formatMarkdownLinkListPage,
  getMarkdownLanguage,
  joinMarkdownBlocks,
  markdownResponseHeaders,
} from "~/lib/content/markdown";
import { registryCatalog } from "~/lib/registry/item-types";
import {
  getRegistryItemRoutePath,
  getRegistrySectionItem,
  getRegistrySectionWithItems,
  registrySectionList,
  type RegistrySectionId,
} from "~/lib/registry/sections";
import { getCanonicalDocsUrl, getCanonicalRegistryItemUrl } from "~/lib/site-config";
import { getRegistryItem, getRegistryItems, type RegistryCatalogItem } from "./registry-catalog";

function notFoundMarkdownResponse(message = "Registry item not found."): Response {
  return new Response(message, { headers: markdownResponseHeaders, status: 404 });
}

function markdownResponse(markdown: string): Response {
  return new Response(markdown, { headers: markdownResponseHeaders });
}

function toLinkedItems(items: readonly RegistryCatalogItem[]) {
  return items.map((item) => ({
    title: item.title,
    href: getCanonicalDocsUrl(getRegistryItemRoutePath(item)),
    description: item.description,
  }));
}

export async function getRegistryCatalogMarkdown(event: H3Event): Promise<string> {
  const items = await getRegistryItems(event);

  return formatMarkdownLinkListPage({
    title: registryCatalog.title,
    description: registryCatalog.description,
    emptyMessage: "No items are published in the registry yet.",
    items: toLinkedItems(items),
  });
}

export async function getRegistrySectionMarkdown(
  event: H3Event,
  sectionId: string,
): Promise<string | null> {
  const items = await getRegistryItems(event);
  const section = getRegistrySectionWithItems(sectionId, items);

  if (!section) {
    return null;
  }

  return formatMarkdownLinkListPage({
    title: section.title,
    description: section.description,
    emptyMessage: `No ${section.title.toLowerCase()} are published yet.`,
    items: toLinkedItems(section.items),
  });
}

export async function getRegistryItemMarkdown(
  event: H3Event,
  itemName: string,
): Promise<string | null> {
  const item = await getRegistryItem(event, itemName);

  return item ? createRegistryItemMarkdown(item) : null;
}

function createRegistryItemMarkdown(item: RegistryCatalogItem): string {
  const sourceBlocks = item.files.map((file) =>
    joinMarkdownBlocks([
      `### ${file.path}`,
      formatCodeBlock(file.content, getMarkdownLanguage(file.path)),
    ]),
  );

  return joinMarkdownBlocks([
    `# ${item.title}`,
    item.description,
    "## Installation",
    formatCodeBlock(`npx shadcn-vue@latest add ${getCanonicalRegistryItemUrl(item.name)}`, "bash"),
    `[Registry JSON](${getCanonicalRegistryItemUrl(item.name)})`,
    sourceBlocks.length > 0 ? joinMarkdownBlocks(["## Source", ...sourceBlocks]) : "",
    item.usageMarkdown ? joinMarkdownBlocks(["## Usage", item.usageMarkdown]) : "",
  ]);
}

export async function getRegistryCatalogMarkdownResponse(event: H3Event): Promise<Response> {
  return markdownResponse(await getRegistryCatalogMarkdown(event));
}

export async function getRegistrySectionMarkdownResponse(
  event: H3Event,
  sectionId: string,
): Promise<Response> {
  const markdown = await getRegistrySectionMarkdown(event, sectionId);

  return markdown
    ? markdownResponse(markdown)
    : notFoundMarkdownResponse("Registry section not found.");
}

export async function getRegistryItemMarkdownResponse(
  event: H3Event,
  itemName: string,
): Promise<Response> {
  const markdown = await getRegistryItemMarkdown(event, itemName);

  return markdown ? markdownResponse(markdown) : notFoundMarkdownResponse();
}

export async function getRegistrySectionItemMarkdownResponse(
  event: H3Event,
  sectionId: string,
  itemName: string,
): Promise<Response> {
  const items = await getRegistryItems(event);
  const item = getRegistrySectionItem(sectionId, itemName, items);

  if (!item) {
    return notFoundMarkdownResponse();
  }

  return markdownResponse(createRegistryItemMarkdown(item));
}

export function isKnownRegistrySectionId(value: string): value is RegistrySectionId {
  return registrySectionList.some((section) => section.id === value);
}
