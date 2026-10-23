import Negotiator from "negotiator";
import { isRegistrySectionId } from "~/lib/registry/sections";

const markdownMediaTypes = new Set(["text/plain", "text/markdown", "text/x-markdown"]);
const shadcnRegistryMediaType = "application/vnd.shadcn.v1+json";
const contentNegotiationVaryHeaders = ["Accept", "User-Agent"] as const;
const fileExtensionPattern = /\/[^/]+\.[^/]+$/u;

function normalizePathname(pathname: string): string {
  return pathname.replace(/\/+$/u, "") || "/";
}

function decodePathSegment(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

function getPathSegments(path: string): string[] {
  return path.split("/").filter(Boolean).map(decodePathSegment);
}

function isMachineEndpointOrAssetPath(path: string): boolean {
  return path.startsWith("/r/") || fileExtensionPattern.test(path);
}

function getAcceptedMediaTypes(headers: Headers): string[] {
  const headerRecord: Record<string, string> = {};
  headers.forEach((value, key) => {
    headerRecord[key] = value;
  });

  return new Negotiator({ headers: headerRecord }).mediaTypes();
}

function isShadcnCliUserAgent(headers: Headers): boolean {
  return headers.get("user-agent")?.trim().toLowerCase().startsWith("shadcn") ?? false;
}

function isShadcnRegistryJsonPreferred(headers: Headers): boolean {
  if (isShadcnCliUserAgent(headers)) {
    return true;
  }

  return getAcceptedMediaTypes(headers).some(
    (mediaType) => mediaType.toLowerCase() === shadcnRegistryMediaType,
  );
}

function isMarkdownPreferred(headers: Headers): boolean {
  return getAcceptedMediaTypes(headers).some((mediaType) =>
    markdownMediaTypes.has(mediaType.toLowerCase()),
  );
}

function mergeVaryHeader(currentValue: string | null, headersToAdd: readonly string[]): string {
  if (!currentValue) {
    return headersToAdd.join(", ");
  }

  const currentHeaders = currentValue
    .split(",")
    .map((header) => header.trim())
    .filter(Boolean);

  if (currentHeaders.includes("*")) {
    return "*";
  }

  const normalizedCurrentHeaders = new Set(currentHeaders.map((header) => header.toLowerCase()));
  const missingHeaders = headersToAdd.filter(
    (header) => !normalizedCurrentHeaders.has(header.toLowerCase()),
  );

  return [...currentHeaders, ...missingHeaders].join(", ");
}

function withVaryHeader(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("Vary", mergeVaryHeader(headers.get("Vary"), contentNegotiationVaryHeaders));

  return new Response(response.body, {
    headers,
    status: response.status,
    statusText: response.statusText,
  });
}

async function getRegistryJsonNegotiationResponse(
  event: Parameters<typeof getRegistryItemJsonResponse>[0],
  path: string,
): Promise<Response | undefined> {
  if (isMachineEndpointOrAssetPath(path)) {
    return undefined;
  }

  if (path === "/") {
    // The home page has no registry JSON of its own; matches source's behavior of returning a
    // (404-ing) item lookup rather than the catalog index for "/".
    return getRegistryItemJsonResponse(event, "index");
  }

  const segments = getPathSegments(path);

  if (segments[0] === "docs") {
    return undefined;
  }

  if (segments[0] === "registry") {
    return segments[1]
      ? getRegistryItemJsonResponse(event, segments[1])
      : getRegistryIndexJsonResponse(event);
  }

  if (segments.length >= 1 && segments.length <= 2 && isRegistrySectionId(segments[0])) {
    const name = segments[1];
    return name ? getRegistryItemJsonResponse(event, name) : undefined;
  }

  return undefined;
}

async function getMarkdownNegotiationResponse(
  event: Parameters<typeof getRegistryItemMarkdownResponse>[0],
  path: string,
): Promise<Response | undefined> {
  if (path === "/" || isMachineEndpointOrAssetPath(path)) {
    return undefined;
  }

  const segments = getPathSegments(path);

  if (segments[0] === "docs") {
    const slug = segments[1] ?? "index";

    const page = await getDocsPage(event, slug);
    if (!page) {
      return new Response("Docs page not found.", { status: 404 });
    }

    return new Response(`# ${page.title}\n\n${page.description}\n\n${page.markdown}\n`);
  }

  if (segments[0] === "registry") {
    return segments[1]
      ? getRegistryItemMarkdownResponse(event, segments[1])
      : getRegistryCatalogMarkdownResponse(event);
  }

  if (segments.length >= 1 && segments.length <= 2 && isRegistrySectionId(segments[0])) {
    const [section, name] = segments;

    return name
      ? getRegistrySectionItemMarkdownResponse(event, section, name)
      : getRegistrySectionMarkdownResponse(event, section);
  }

  return undefined;
}

export default defineEventHandler(async (event) => {
  if (event.method !== "GET") {
    return;
  }

  const path = normalizePathname(getRequestURL(event).pathname);
  const headers = event.headers;

  if (isShadcnRegistryJsonPreferred(headers)) {
    const response = await getRegistryJsonNegotiationResponse(event, path);
    if (response) {
      return withVaryHeader(response);
    }
  }

  // Explicit ".md" URLs for dynamic pages (e.g. /docs/installation.md, /components/button.md)
  // are handled here rather than as dedicated Nitro route files: a route file like
  // `[slug].md.get.ts` matches *any* value for that segment (the ".md" only ends up in the
  // param's name, not a routing constraint — see server/utils/route-params.ts), so it would
  // swallow the equivalent extension-less page route with no way to fall through to it.
  const explicitMarkdownPath = path.endsWith(".md") && path !== ".md";
  if (explicitMarkdownPath || isMarkdownPreferred(headers)) {
    const targetPath = explicitMarkdownPath ? normalizePathname(path.slice(0, -3)) : path;
    const response = await getMarkdownNegotiationResponse(event, targetPath);
    if (response) {
      return withVaryHeader(response);
    }
  }

  return undefined;
});
