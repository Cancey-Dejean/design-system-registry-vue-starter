import { markdownResponseHeaders } from "~/lib/content/markdown";

export default defineEventHandler(async (event) => {
  const page = await getDocsPage(event, "index");
  if (!page) {
    throw createError({ statusCode: 404, statusMessage: "Docs page not found." });
  }
  return new Response(`# ${page.title}\n\n${page.description}\n\n${page.markdown}\n`, {
    headers: markdownResponseHeaders,
  });
});
