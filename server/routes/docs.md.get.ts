import { formatMarkdownLinkListPage, markdownResponseHeaders } from "~/lib/content/markdown";
import { getCanonicalDocsUrl } from "~/lib/site-config";

export default defineEventHandler(async (event) => {
  const pages = await getDocsPages(event);

  const markdown = formatMarkdownLinkListPage({
    title: "Docs",
    description: "Guides for installing and using Design System UI.",
    emptyMessage: "No docs pages published yet.",
    items: pages.map((page) => ({
      title: page.title,
      href: getCanonicalDocsUrl(`/docs/${page.slug}`),
      description: page.description,
    })),
  });

  return new Response(markdown, { headers: markdownResponseHeaders });
});
