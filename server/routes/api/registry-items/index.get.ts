export default defineEventHandler(async (event) => {
  return getRegistryItems(event);
});
