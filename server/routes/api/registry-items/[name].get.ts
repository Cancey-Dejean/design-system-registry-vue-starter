export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, "name");

  if (!name) {
    throw createError({ statusCode: 400, statusMessage: "Missing registry item name." });
  }

  const item = await getRegistryItem(event, name);

  if (!item) {
    throw createError({ statusCode: 404, statusMessage: "Registry item not found." });
  }

  return item;
});
