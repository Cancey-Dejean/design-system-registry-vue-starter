import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { queryCollection } from "@nuxt/content/server";
import type { H3Event } from "h3";

export interface DocsCatalogPage {
  slug: string;
  title: string;
  description: string;
  order: number;
  markdown: string;
  /** Parsed markdown AST (render with <ContentRenderer :value="{ body }" />). */
  body: unknown;
}

const docsRoot = resolve(process.cwd(), "content/docs");
const frontmatterPattern = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/;

interface DocsCollectionRow {
  title: string;
  description: string;
  order: number;
  path: string;
  body?: unknown;
}

function slugFromPath(path: string): string {
  return path.replace(/^\/+/, "");
}

async function readDocsMarkdown(slug: string): Promise<string> {
  const raw = await readFile(resolve(docsRoot, `${slug}.md`), "utf8");

  return raw.replace(frontmatterPattern, "").trim();
}

async function toDocsCatalogPage(row: DocsCollectionRow): Promise<DocsCatalogPage> {
  const slug = slugFromPath(row.path);

  return {
    slug,
    title: row.title,
    description: row.description,
    order: row.order,
    markdown: await readDocsMarkdown(slug),
    body: row.body,
  };
}

export async function getDocsPages(event: H3Event): Promise<DocsCatalogPage[]> {
  const rows = (await queryCollection(event, "docs")
    .order("order", "ASC")
    .all()) as unknown as DocsCollectionRow[];

  return Promise.all(rows.map(toDocsCatalogPage));
}

export async function getDocsPage(
  event: H3Event,
  slug: string,
): Promise<DocsCatalogPage | undefined> {
  const row = (await queryCollection(event, "docs")
    .where("path", "=", `/${slug}`)
    .first()) as unknown as DocsCollectionRow | null;

  if (!row) {
    return undefined;
  }

  return toDocsCatalogPage(row);
}
