export default defineEventHandler(async (event) => {
  const name = getSuffixedRouteParam(event, "name", ".json");

  if (!name) {
    throw createError({ statusCode: 400, statusMessage: "Missing registry item name." });
  }

  return getRegistryItemJsonResponse(event, name);
});
