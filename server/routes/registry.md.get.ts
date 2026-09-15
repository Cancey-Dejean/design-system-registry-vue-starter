export default defineEventHandler(async (event) => {
  return getRegistryCatalogMarkdownResponse(event);
});
