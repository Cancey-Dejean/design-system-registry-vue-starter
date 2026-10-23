import { getSitemapPaths, renderSitemap } from "~/lib/seo";
import { getSiteNavigationSections } from "../utils/site-navigation";

export default defineEventHandler(async (event) => {
  const sections = await getSiteNavigationSections(event);
  return new Response(renderSitemap(getSitemapPaths(sections)), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
});
