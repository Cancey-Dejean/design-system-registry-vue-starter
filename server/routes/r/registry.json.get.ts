export default defineEventHandler(async (event) => {
  return getRegistryIndexJsonResponse(event);
});
