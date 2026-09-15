export default defineEventHandler(async (event) => {
  return getLlmsFullTextResponse(event);
});
