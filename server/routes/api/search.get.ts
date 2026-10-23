import { searchRegistry } from "../../utils/registry-search";

export default defineEventHandler(async (event) => {
  const query = getQuery(event).q;
  if (query !== undefined && typeof query !== "string") {
    throw createError({ statusCode: 400, statusMessage: "Search query must be a string." });
  }
  return searchRegistry(event, (query ?? "").slice(0, 200));
});
