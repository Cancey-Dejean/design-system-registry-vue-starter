import type { H3Event } from "h3";
import {
  escapeMarkdownLinkText,
  joinMarkdownBlocks,
  plainTextResponseHeaders,
} from "~/lib/content/markdown";
import { registryConfig } from "~/lib/registry/config";
import { getRegistryItemRoutePath, getRegistrySectionsWithItems } from "~/lib/registry/sections";
import { getCanonicalSiteUrl } from "~/lib/site-config";
import { getDocsPages } from "./docs-catalog";
import { getRegistryItems, type RegistryCatalogItem } from "./registry-catalog";
import { getRegistryItemMarkdown, getRegistrySectionMarkdown } from "./registry-markdown";

interface LlmsDocument {
  title: string;
  url: string;
  description: string;
  renderMarkdown: () => Promise<string>;
}

interface LlmsSection {
  title: string;
  documents: LlmsDocument[];
}

function getDocsMarkdownPath(routePath: string): string {
  return `${routePath}.md`;
}

async function getLlmsSections(event: H3Event): Promise<LlmsSection[]> {
  const [docsPages, registryItems] = await Promise.all([
    getDocsPages(event),
    getRegistryItems(event),
  ]);

  const docsSection: LlmsSection = {
    title: "Docs",
    documents: docsPages.map((page) => ({
      title: page.title,
      url: getCanonicalSiteUrl(getDocsMarkdownPath(`/docs/${page.slug}`)),
      description: page.description || "Documentation page.",
      renderMarkdown: async () => page.markdown,
    })),
  };

  const registrySections = getRegistrySectionsWithItems<RegistryCatalogItem>(registryItems).map(
    (section) => ({
      title: section.title,
      documents: [
        {
          title: `${section.title} index`,
          url: getCanonicalSiteUrl(getDocsMarkdownPath(section.basePath)),
          description: section.description,
          renderMarkdown: async () => (await getRegistrySectionMarkdown(event, section.id)) ?? "",
        },
        ...section.items.map((item) => ({
          title: item.title,
          url: getCanonicalSiteUrl(getDocsMarkdownPath(getRegistryItemRoutePath(item))),
          description: item.description,
          renderMarkdown: async () => (await getRegistryItemMarkdown(event, item.name)) ?? "",
        })),
      ],
    }),
  );

  return [docsSection, ...registrySections];
}

function formatLlmsSection(section: LlmsSection): string {
  const items = section.documents
    .map(
      (document) =>
        `- [${escapeMarkdownLinkText(document.title)}](${document.url}): ${document.description || "Markdown page."}`,
    )
    .join("\n");

  return joinMarkdownBlocks([`## ${section.title}`, items || "No pages are published yet."]);
}

async function formatLlmsFullDocument(document: LlmsDocument): Promise<string> {
  const markdown = await document.renderMarkdown();

  return joinMarkdownBlocks(["---", `URL: ${document.url}`, document.description, markdown.trim()]);
}

export async function getLlmsText(event: H3Event): Promise<string> {
  const sections = await getLlmsSections(event);
  const llmsFullTextUrl = getCanonicalSiteUrl("/llms-full.txt");
  const registryIndexUrl = getCanonicalSiteUrl("/registry.json");

  return joinMarkdownBlocks([
    `# ${registryConfig.name}`,
    `> ${registryConfig.description}`,
    [
      `This site publishes shadcn-compatible registry items and authored documentation for ${registryConfig.name}.`,
      `Use ${llmsFullTextUrl} for one expanded context file containing the linked Markdown pages.`,
    ].join(" "),
    ...sections.map(formatLlmsSection),
    formatLlmsSection({
      title: "Optional",
      documents: [
        {
          title: "Registry JSON",
          url: registryIndexUrl,
          description: "Machine-readable shadcn registry index.",
          renderMarkdown: async () => "",
        },
      ],
    }),
  ]);
}

export async function getLlmsFullText(event: H3Event): Promise<string> {
  const sections = await getLlmsSections(event);
  const documents = sections.flatMap((section) => section.documents);
  const llmsTextUrl = getCanonicalSiteUrl("/llms.txt");
  const registryIndexUrl = getCanonicalSiteUrl("/registry.json");

  return joinMarkdownBlocks([
    `# ${registryConfig.name} Full Context`,
    `> ${registryConfig.description}`,
    [
      `This file expands the Markdown pages listed in ${llmsTextUrl}.`,
      `Use ${registryIndexUrl} for the machine-readable shadcn registry index.`,
    ].join(" "),
    ...(await Promise.all(documents.map(formatLlmsFullDocument))),
  ]);
}

export async function getLlmsTextResponse(event: H3Event): Promise<Response> {
  return new Response(await getLlmsText(event), { headers: plainTextResponseHeaders });
}

export async function getLlmsFullTextResponse(event: H3Event): Promise<Response> {
  return new Response(await getLlmsFullText(event), { headers: plainTextResponseHeaders });
}
