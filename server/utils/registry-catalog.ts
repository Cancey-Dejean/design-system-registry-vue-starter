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
  /**
   * Raw source of `_preview.vue` — the exact code that renders this item's live Preview tab.
   * Undefined when the item has no preview demo (see preview-map.ts's own hasPreview check).
   */
  previewCode?: string;
}

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

// Component folders are a mix of PascalCase (on disk, no word separator, e.g. "AlertDialog") and
// kebab-case (in each item's `name` frontmatter, e.g. "alert-dialog" — which is what
// folder/name/file.path keys get built from below). Lowercasing alone only reconciles casing
// drift, not the missing hyphen, so both sides also strip non-alphanumeric characters here —
// the same drift fixed case-insensitively (but not hyphen-insensitively) elsewhere in this
// project (preview-map.ts, CommandItem.vue). unstorage's key lookup is exact-match, so build a
// normalized index once per cold start.
let registryAssetKeyMapPromise: Promise<Map<string, string>> | undefined;

function normalizeAssetKey(key: string): string {
  return key.toLowerCase().replace(/[^a-z0-9:]/g, "");
}

async function getRegistryAssetKeyMap(): Promise<Map<string, string>> {
  registryAssetKeyMapPromise ??= useStorage("assets:registry-items")
    .getKeys()
    .then((keys) => new Map(keys.map((key) => [normalizeAssetKey(key), key])));

  return registryAssetKeyMapPromise;
}

/** @param path Slash-joined segments, e.g. `${folder}/${name}/file.vue` — unstorage's own keys
 *  use `:` as the separator (and match the real on-disk casing), so both get normalized here. */
async function readRegistryAsset(path: string): Promise<string> {
  const keyMap = await getRegistryAssetKeyMap();
  const lookupKey = normalizeAssetKey(path.replace(/\//g, ":"));
  const realKey = keyMap.get(lookupKey);
  const raw = realKey ? await useStorage("assets:registry-items").getItem(realKey) : null;

  if (raw == null) {
    throw createError({ statusCode: 404, statusMessage: `Registry asset not found: ${path}` });
  }

  // Server assets are decoded as text only when unstorage's MIME sniff recognizes the
  // extension as text/*; `.vue`/`.ts` don't (`.ts` even collides with the MPEG-TS video
  // type), so those come back as raw bytes instead of a string — decode them ourselves.
  return typeof raw === "string" ? raw : Buffer.from(raw as ArrayBufferLike).toString("utf-8");
}

async function readUsageMarkdown(type: RegistryItemType, name: string): Promise<string> {
  const folder = getRegistryTypeFolder(type);
  const raw = await readRegistryAsset(`${folder}/${name}/_registry.md`);

  return raw.replace(frontmatterPattern, "").trim();
}

async function readPreviewCode(type: RegistryItemType, name: string): Promise<string | undefined> {
  const folder = getRegistryTypeFolder(type);

  try {
    const raw = await readRegistryAsset(`${folder}/${name}/_preview.vue`);
    return rewriteInternalAliasesForPublishing(raw);
  } catch {
    // Not every item has a _preview.vue (see preview-map.ts's hasPreview) — no demo to show.
    return undefined;
  }
}

async function resolveRegistryCatalogItem(
  item: RegistryItemCollectionRow,
): Promise<RegistryCatalogItem> {
  const folder = getRegistryTypeFolder(item.type);
  const [files, usageMarkdown, previewCode] = await Promise.all([
    Promise.all(
      (item.files ?? []).map(async (file) => {
        const rawContent = await readRegistryAsset(`${folder}/${item.name}/${file.path}`);
        return { ...file, content: rewriteInternalAliasesForPublishing(rawContent) };
      }),
    ),
    readUsageMarkdown(item.type, item.name),
    readPreviewCode(item.type, item.name),
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
    previewCode,
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
