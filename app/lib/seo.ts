import type { SiteNavigationSection } from "./navigation";
import { registryConfig } from "./registry/config";
import { flowsPage } from "./registry/flows";
import { getRegistrySection } from "./registry/sections";
import { getCanonicalSiteUrl } from "./site-config";

function pathnameOf(path: string): string {
  const pathname = path.split(/[?#]/u)[0] || "/";
  return pathname === "/" ? pathname : pathname.replace(/\/+$/u, "");
}

export function getRouteSeo(path: string, sections: readonly SiteNavigationSection[]) {
  const pathname = pathnameOf(path);
  let canonicalPath = pathname === "/docs/index" ? "/docs" : pathname;
  const isRegistryAlias = pathname === "/registry" || pathname.startsWith("/registry/");
  const aliasName = isRegistryAlias ? pathname.slice("/registry/".length) : undefined;
  const item = sections
    .flatMap((section) => section.items)
    .find(
      (candidate) =>
        candidate.routePath === canonicalPath ||
        (aliasName && candidate.kind === "registry" && candidate.name === aliasName),
    );
  if (item) canonicalPath = item.routePath;
  const section = sections.find((candidate) => candidate.basePath === canonicalPath);
  const sectionConfig = section ? getRegistrySection(section.id) : undefined;
  const isHome = pathname === "/";
  const isFlows = pathname === flowsPage.path;
  const title = item?.title ?? section?.title ?? (isFlows ? flowsPage.title : registryConfig.name);
  const pageTitle = title === registryConfig.name ? title : `${title} — ${registryConfig.name}`;
  const description =
    item?.description ||
    sectionConfig?.description ||
    (isFlows ? flowsPage.description : registryConfig.description);
  const known = Boolean(item || section || isHome || isFlows);
  const hasMarkdown = Boolean(item || (section && section.id !== "docs"));
  return {
    title: pageTitle,
    description,
    canonical: getCanonicalSiteUrl(canonicalPath),
    robots: known && !isRegistryAlias ? "index, follow" : "noindex, follow",
    ogType: item ? ("article" as const) : ("website" as const),
    markdownUrl: hasMarkdown ? getCanonicalSiteUrl(`${canonicalPath}.md`) : undefined,
  };
}

export function getSitemapPaths(sections: readonly SiteNavigationSection[]): string[] {
  return [
    ...new Set([
      "/",
      flowsPage.path,
      ...sections.flatMap((section) => [
        section.basePath,
        ...section.items.map((item) => item.routePath),
      ]),
    ]),
  ].filter(
    (path) =>
      !/\.(?:json|md|txt|xml)$/u.test(path) &&
      path !== "/docs/index" &&
      path !== "/registry" &&
      !path.startsWith("/registry/") &&
      (path === "/" || !path.endsWith("/")),
  );
}

function escapeXml(value: string): string {
  return value.replace(
    /[&<>"']/gu,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[character]!,
  );
}

export function renderSitemap(paths: readonly string[]): string {
  const urls = [...new Set(paths)].map(
    (path) => `  <url><loc>${escapeXml(getCanonicalSiteUrl(path))}</loc></url>`,
  );
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
}
