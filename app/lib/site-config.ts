import { registryConfig } from "./registry/config";

export function getSiteOrigin(): string {
  return registryConfig.homepage.replace(/\/+$/u, "");
}

export function normalizeSitePath(path: string): string {
  const trimmedPath = path.replace(/^\/+|\/+$/gu, "");

  return trimmedPath ? `/${trimmedPath}` : "/";
}

export function getCanonicalSiteUrl(path: string): string {
  return `${getSiteOrigin()}${normalizeSitePath(path)}`;
}

export function getCanonicalDocsUrl(path: string): string {
  return getCanonicalSiteUrl(path);
}

export function getCanonicalRegistryItemUrl(itemName: string): string {
  return `${getSiteOrigin()}/r/${encodeURIComponent(itemName)}.json`;
}
