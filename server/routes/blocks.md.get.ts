export default defineEventHandler(async (event) => {
  return getRegistrySectionMarkdownResponse(event, "blocks");
});
