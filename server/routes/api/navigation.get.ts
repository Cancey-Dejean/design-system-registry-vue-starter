export default defineEventHandler(async (event) => {
  return getSiteNavigationSections(event);
});
