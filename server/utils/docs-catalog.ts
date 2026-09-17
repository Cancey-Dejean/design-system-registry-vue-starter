import { queryCollection } from "@nuxt/content/server";
import type { Toc } from "@nuxt/content";
import type { H3Event } from "h3";

export interface DocsCatalogPage {
  slug: string;
  title: string;
  description: string;
  order: number;
  markdown: string;
  /** Parsed markdown AST (render with <ContentRenderer :value="{ body }" />). */
  body: unknown;
  /** Table of contents generated from the page's h2/h3 headings. */
  toc?: Toc;
}

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
  const storage = useStorage("assets:docs");
  const raw =
    (await storage.getItem<string>(`${slug}.md`)) ?? (await storage.getItem<string>(`${slug}.mdx`));

  if (typeof raw !== "string") {
    throw createError({ statusCode: 404, statusMessage: `Docs markdown not found: ${slug}` });
  }

  return raw.replace(frontmatterPattern, "").trim();
}

async function toDocsCatalogPage(row: DocsCollectionRow): Promise<DocsCatalogPage> {
  const slug = slugFromPath(row.path);
  const body = row.body as { toc?: Toc } | undefined;

  return {
    slug,
    title: row.title,
    description: row.description,
    order: row.order,
    markdown: await readDocsMarkdown(slug),
    body: row.body,
    toc: body?.toc,
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
