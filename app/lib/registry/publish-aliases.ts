interface PublishableItem {
  name: string;
  files?: readonly { path: string; target?: string }[];
}

export type PublishedAliasMap = Map<string, string>;

function normalizeComponentName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function consumerImportPath(target: string): string | undefined {
  if (target.startsWith("components/")) return `@/${target}`;
  if (target.startsWith("@ui/")) return target.replace(/^@ui\//, "@/components/ui/");
  return undefined;
}

/** Resolve authoring folders against the manifest rather than guessing target casing. */
export function createPublishedAliasMap(items: readonly PublishableItem[]): PublishedAliasMap {
  const aliases: PublishedAliasMap = new Map();
  for (const item of items) {
    const name = normalizeComponentName(item.name);
    for (const file of item.files ?? []) {
      if (!file.target) continue;
      const target = consumerImportPath(file.target);
      if (!target) continue;
      aliases.set(`${name}/${file.path}`, target);
      aliases.set(
        `${name}/${file.path.replace(/\.(?:vue|[cm]?[jt]sx?)$/u, "")}`,
        target.replace(/\.(?:vue|[cm]?[jt]sx?)$/u, ""),
      );
      if (file.path === "index.ts") aliases.set(name, target.replace(/\/index\.ts$/u, ""));
    }
  }
  return aliases;
}

/** Only paths that leave the item's root address a sibling registry item. */
function resolveRelativeComponentImport(
  specifier: string,
  sourcePath: string,
  aliases: PublishedAliasMap,
): string | undefined {
  const segments = sourcePath.split("/").slice(0, -1);
  let parentDepth = 0;
  for (const segment of specifier.split("/")) {
    if (segment === "..") {
      if (segments.length) segments.pop();
      else parentDepth++;
    } else if (segment !== "." && segment !== "") {
      segments.push(segment);
    }
  }
  if (parentDepth !== 1 || !segments.length) return undefined;
  const [component, ...rest] = segments;
  const suffix = rest.length ? `/${rest.join("/")}` : "";
  return aliases.get(`${normalizeComponentName(component!)}${suffix}`);
}

export function rewriteInternalAliasesForPublishing(
  content: string,
  aliases: PublishedAliasMap,
  sourcePath?: string,
): string {
  return content
    .replace(
      /(?:#registry-ui\/|@registry\/components\/)([A-Za-z0-9_-]+)(\/[A-Za-z0-9_./-]+)?/gu,
      (original, name: string, suffix: string | undefined) =>
        aliases.get(`${normalizeComponentName(name)}${suffix ?? ""}`) ?? original,
    )
    .replace(/@registry\/lib\/utils(?=(?:\.ts)?["'])/gu, "@/lib/utils")
    .replace(
      /\b(from\s+|import\s*\(?\s*)(["'])(\.\.\/[^"']+)\2/gu,
      (original, prefix: string, quote: string, specifier: string) => {
        if (!sourcePath) return original;
        const target = resolveRelativeComponentImport(specifier, sourcePath, aliases);
        return target ? `${prefix}${quote}${target}${quote}` : original;
      },
    );
}
