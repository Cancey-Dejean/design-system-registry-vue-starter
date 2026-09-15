export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: "Missing docs slug." });
  }

  const page = await getDocsPage(event, slug);

  if (!page) {
    throw createError({ statusCode: 404, statusMessage: "Docs page not found." });
  }

  return page;
});
