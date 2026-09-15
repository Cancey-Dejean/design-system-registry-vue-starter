import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { queryCollection } from "@nuxt/content/server";
import type { H3Event } from "h3";
import { getRegistryTypeFolder, type RegistryItemType } from "~/lib/registry/item-types";

export interface RegistryCatalogFile {
  path: string;
  type: RegistryItemType;
  target?: string;
  content: string;
}

export interface RegistryCatalogItem {
  name: string;
  type: RegistryItemType;
  title: string;
  description: string;
  dependencies?: string[];
  localRegistryDependencies?: string[];
  files: RegistryCatalogFile[];
  hasUsage: boolean;
  /** Parsed markdown AST for the item's usage docs body (render with <ContentRenderer>). */
  body: unknown;
  /** Raw markdown usage docs (everything below the frontmatter in _registry.md). */
  usageMarkdown: string;
}

const registryItemsRoot = resolve(process.cwd(), "registry/items");

function toDefaultTitle(name: string): string {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

interface RegistryItemCollectionRow {
  name: string;
  type: RegistryItemType;
  title?: string;
  description: string;
  dependencies?: string[];
  localRegistryDependencies?: string[];
  files?: Array<{ path: string; type: RegistryItemType; target?: string }>;
  body?: unknown;
}

const frontmatterPattern = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/;

/**
 * `#registry-ui` is a dev-only alias (nuxt.config.ts) that lets this project's docs shell import
 * components straight from registry/items/components/** — the single source of truth — instead
 * of duplicating them under app/components/ui. It doesn't exist in a consumer project, so
 * published file content must be rewritten to the alias a real shadcn-vue install actually
 * resolves (matching this project's own components.json `ui` alias and each item's `target`).
 */
function rewriteInternalAliasesForPublishing(content: string): string {
  return content.replace(/#registry-ui\//g, "@/components/ui/");
}

async function readUsageMarkdown(type: RegistryItemType, name: string): Promise<string> {
  const folder = getRegistryTypeFolder(type);
  const registryPath = resolve(registryItemsRoot, folder, name, "_registry.md");
  const raw = await readFile(registryPath, "utf8");

  return raw.replace(frontmatterPattern, "").trim();
}

async function resolveRegistryCatalogItem(
  item: RegistryItemCollectionRow,
): Promise<RegistryCatalogItem> {
  const folder = getRegistryTypeFolder(item.type);
  const [files, usageMarkdown] = await Promise.all([
    Promise.all(
      (item.files ?? []).map(async (file) => {
        const fullPath = resolve(registryItemsRoot, folder, item.name, file.path);
        const rawContent = await readFile(fullPath, "utf8");
        return { ...file, content: rewriteInternalAliasesForPublishing(rawContent) };
      }),
    ),
    readUsageMarkdown(item.type, item.name),
  ]);

  return {
    name: item.name,
    type: item.type,
    title: item.title ?? toDefaultTitle(item.name),
    description: item.description,
    dependencies: item.dependencies,
    localRegistryDependencies: item.localRegistryDependencies,
    files,
    hasUsage: Boolean(item.body),
    body: item.body,
    usageMarkdown,
  };
}

export async function getRegistryItems(event: H3Event): Promise<RegistryCatalogItem[]> {
  const items = (await queryCollection(
    event,
    "registryItems",
  ).all()) as unknown as RegistryItemCollectionRow[];

  const results = await Promise.allSettled(items.map((item) => resolveRegistryCatalogItem(item)));
  const resolved: RegistryCatalogItem[] = [];

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      resolved.push(result.value);
      return;
    }

    // Not yet ported (Stage E hasn't created its source files) — exclude it from the catalog
    // rather than failing the whole index. A direct getRegistryItem() lookup still throws.
    console.warn(
      `[registry-catalog] Skipping "${items[index]?.name}" from the catalog index: ${result.reason instanceof Error ? result.reason.message : String(result.reason)}`,
    );
  });

  return resolved;
}

export async function getRegistryItem(
  event: H3Event,
  name: string,
): Promise<RegistryCatalogItem | undefined> {
  const item = (await queryCollection(event, "registryItems")
    .where("name", "=", name)
    .first()) as unknown as RegistryItemCollectionRow | null;

  if (!item) {
    return undefined;
  }

  return resolveRegistryCatalogItem(item);
}
