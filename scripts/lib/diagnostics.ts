import { parse as parseYaml } from "yaml";
import { publicRegistryItemTypes, type RegistryItemType } from "../../app/lib/registry/item-types";

export type RegistryDiagnosticLevel = "error" | "warning";

export type RegistryDiagnostic = {
  level: RegistryDiagnosticLevel;
  path: string;
  message: string;
};

export type RegistryDiagnostics = {
  errors: RegistryDiagnostic[];
  warnings: RegistryDiagnostic[];
};

export type RegistryDiagnosticsInput = {
  files: Readonly<Record<string, string>>;
};

type RegistryFrontmatterFile = { path: string; type: string; target?: string };

type ParsedRegistryItem = {
  mdPath: string;
  itemRoot: string;
  name: string;
  type: RegistryItemType;
  description: string;
  dependencies: string[];
  localRegistryDependencies: string[];
  files: RegistryFrontmatterFile[];
};

const registryItemAuthoringFile = "_registry.md";
const registryItemPreviewFile = "_preview.vue";
const ignoredRegistryFileNames = new Set([".DS_Store"]);
const frontmatterPattern = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/u;

// Mirrors app/lib/registry/item-types.ts's registryTypeFolders — kept independent so this
// script can run standalone with bun, without importing anything Nuxt-runtime-shaped.
const registryTypeFolders: Record<RegistryItemType, string> = {
  "registry:base": "bases",
  "registry:block": "blocks",
  "registry:component": "components",
  "registry:font": "fonts",
  "registry:lib": "lib",
  "registry:hook": "hooks",
  "registry:ui": "components",
  "registry:page": "pages",
  "registry:file": "files",
  "registry:style": "styles",
  "registry:theme": "themes",
  "registry:item": "items",
};
const knownRegistryTypeFolders = new Set(Object.values(registryTypeFolders));

export function getRegistryDiagnostics(input: RegistryDiagnosticsInput): RegistryDiagnostics {
  const files = normalizeRegistryFiles(input.files);
  const itemSources = getRegistryItemSources(files);
  const parseResult = parseRegistryItemSources(itemSources);
  const diagnostics: RegistryDiagnostics = {
    errors: parseResult.errors,
    warnings: [],
  };

  diagnostics.errors.push(...getRegistryItemValidationErrors(parseResult.items, files));
  diagnostics.errors.push(...getRegistryPreviewValidationErrors(files));
  diagnostics.warnings.push(...getUnknownRegistryFolderWarnings(files));
  diagnostics.warnings.push(...getSuspiciousRegistryFileWarnings(files, parseResult.items));

  diagnostics.errors = sortDiagnostics(diagnostics.errors);
  diagnostics.warnings = sortDiagnostics(diagnostics.warnings);

  return diagnostics;
}

export function getRegistryDoctorExitCode(diagnostics: RegistryDiagnostics): 0 | 1 {
  return diagnostics.errors.length > 0 ? 1 : 0;
}

function normalizeRegistryFiles(files: Readonly<Record<string, string>>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(files).map(([path, source]) => [normalizeRegistryPath(path), source]),
  );
}

function normalizeRegistryPath(path: string): string {
  return path.replace(/\\/gu, "/").replace(/^\/+|\/+$/gu, "");
}

function getRegistryItemSources(files: Readonly<Record<string, string>>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(files).filter(
      ([path]) =>
        path.startsWith("registry/items/") && getFileName(path) === registryItemAuthoringFile,
    ),
  );
}

function parseRegistryItemSources(sources: Readonly<Record<string, string>>): {
  items: ParsedRegistryItem[];
  errors: RegistryDiagnostic[];
} {
  const items: ParsedRegistryItem[] = [];
  const errors: RegistryDiagnostic[] = [];

  for (const [path, source] of Object.entries(sources)) {
    try {
      items.push(parseRegistryItemSource(path, source));
    } catch (error) {
      errors.push(
        createError(path, error instanceof Error ? error.message : `${path} could not be parsed.`),
      );
    }
  }

  return { items, errors };
}

function parseRegistryItemSource(path: string, source: string): ParsedRegistryItem {
  const match = frontmatterPattern.exec(source);

  if (!match) {
    throw new Error(`${path} is missing YAML frontmatter.`);
  }

  const frontmatter = parseYaml(match[1]);

  if (typeof frontmatter !== "object" || frontmatter === null) {
    throw new Error(`${path} frontmatter must be a YAML mapping.`);
  }

  const data = frontmatter as Record<string, unknown>;

  return {
    mdPath: path,
    itemRoot: getParentPath(path),
    name: requireStringField(data, "name", path),
    type: requireRegistryItemType(data, path),
    description: requireStringField(data, "description", path),
    dependencies: optionalStringArrayField(data, "dependencies", path),
    localRegistryDependencies: optionalStringArrayField(data, "localRegistryDependencies", path),
    files: optionalFilesField(data, path),
  };
}

function requireStringField(data: Record<string, unknown>, field: string, path: string): string {
  const value = data[field];

  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${path} is missing required field "${field}".`);
  }

  return value;
}

function requireRegistryItemType(data: Record<string, unknown>, path: string): RegistryItemType {
  const value = data.type;

  if (typeof value !== "string" || !publicRegistryItemTypes.includes(value as RegistryItemType)) {
    throw new Error(`${path} has an unsupported "type": ${String(value)}`);
  }

  return value as RegistryItemType;
}

function optionalStringArrayField(
  data: Record<string, unknown>,
  field: string,
  path: string,
): string[] {
  const value = data[field];

  if (value === undefined) {
    return [];
  }

  if (!Array.isArray(value) || value.some((entry) => typeof entry !== "string")) {
    throw new Error(`${path} field "${field}" must be an array of strings.`);
  }

  return value;
}

function optionalFilesField(
  data: Record<string, unknown>,
  path: string,
): RegistryFrontmatterFile[] {
  const value = data.files;

  if (value === undefined) {
    return [];
  }

  if (!Array.isArray(value)) {
    throw new Error(`${path} field "files" must be an array.`);
  }

  return value.map((entry, index) => {
    if (typeof entry !== "object" || entry === null) {
      throw new Error(`${path} files[${index}] must be an object.`);
    }

    const file = entry as Record<string, unknown>;

    if (typeof file.path !== "string" || !file.path.trim()) {
      throw new Error(`${path} files[${index}] is missing "path".`);
    }

    if (typeof file.type !== "string") {
      throw new Error(`${path} files[${index}] is missing "type".`);
    }

    return {
      path: file.path,
      type: file.type,
      target: typeof file.target === "string" ? file.target : undefined,
    };
  });
}

function getRegistryPreviewValidationErrors(
  files: Readonly<Record<string, string>>,
): RegistryDiagnostic[] {
  const errors: RegistryDiagnostic[] = [];

  for (const [path, source] of Object.entries(files)) {
    if (!path.startsWith("registry/items/") || getFileName(path) !== registryItemPreviewFile) {
      continue;
    }

    if (!source.includes("<template")) {
      errors.push(createError(path, `Registry preview ${path} must contain a <template> block.`));
    }
  }

  return errors;
}

function getRegistryItemValidationErrors(
  items: readonly ParsedRegistryItem[],
  files: Readonly<Record<string, string>>,
): RegistryDiagnostic[] {
  const errors: RegistryDiagnostic[] = [];
  const seenNames = new Map<string, string>();
  const registryItemNames = new Set(items.map((item) => item.name));

  for (const item of items) {
    const existingPath = seenNames.get(item.name);

    if (existingPath) {
      errors.push(
        createError(
          item.mdPath,
          `Duplicate registry item name "${item.name}" also used in ${existingPath}.`,
        ),
      );
    } else {
      seenNames.set(item.name, item.mdPath);
    }

    for (const dependency of item.localRegistryDependencies) {
      if (!registryItemNames.has(dependency)) {
        errors.push(
          createError(
            item.mdPath,
            `Registry item "${item.name}" references unknown local registry dependency "${dependency}".`,
          ),
        );
      }
    }

    for (const file of item.files) {
      errors.push(...getRegistryPublishedFileErrors(item, file, files));
    }
  }

  return errors;
}

function getRegistryPublishedFileErrors(
  item: ParsedRegistryItem,
  file: RegistryFrontmatterFile,
  files: Readonly<Record<string, string>>,
): RegistryDiagnostic[] {
  const errors: RegistryDiagnostic[] = [];
  const sourcePath = `${item.itemRoot}/${file.path}`;

  if (getFileName(file.path).startsWith("_")) {
    errors.push(
      createError(
        sourcePath,
        `Registry item "${item.name}" must not publish registry authoring files.`,
      ),
    );
  }

  if ((files[sourcePath] ?? "").length === 0) {
    errors.push(
      createError(
        sourcePath,
        `Registry item "${item.name}" references a missing file: ${sourcePath}`,
      ),
    );
  }

  if ((file.type === "registry:file" || file.type === "registry:page") && !file.target) {
    errors.push(
      createError(
        sourcePath,
        `Registry item "${item.name}" file ${file.path} must include a target.`,
      ),
    );
  }

  return errors;
}

function getUnknownRegistryFolderWarnings(
  files: Readonly<Record<string, string>>,
): RegistryDiagnostic[] {
  const unknownFolders = new Set<string>();

  for (const path of Object.keys(files)) {
    const segments = path.split("/");

    if (segments[0] === "registry" && segments[1] === "items" && segments[2]) {
      if (!knownRegistryTypeFolders.has(segments[2])) {
        unknownFolders.add(`registry/items/${segments[2]}`);
      }
    }
  }

  return [...unknownFolders]
    .toSorted()
    .map((folder) =>
      createWarning(folder, `${folder} is not a recognized registry item type folder.`),
    );
}

function getSuspiciousRegistryFileWarnings(
  files: Readonly<Record<string, string>>,
  items: readonly ParsedRegistryItem[],
): RegistryDiagnostic[] {
  const itemRoots = getRegistryItemRoots(files);
  const itemsByRoot = new Map(items.map((item) => [item.itemRoot, item]));
  const warnings: RegistryDiagnostic[] = [];

  for (const root of itemRoots) {
    const item = itemsByRoot.get(root);
    const rootFiles = Object.keys(files).filter((path) => path.startsWith(`${root}/`));
    const hasRegistryMd = rootFiles.some((path) => getFileName(path) === registryItemAuthoringFile);
    const hasPublishableLookingFile = rootFiles.some(
      (path) => !isKnownAuthoringOrIgnoredFile(path),
    );

    if (!item && !hasRegistryMd && hasPublishableLookingFile) {
      warnings.push(
        createWarning(
          root,
          `Registry item folder contains source files but no ${registryItemAuthoringFile}.`,
        ),
      );
      continue;
    }

    if (!item) {
      continue;
    }

    const publishedSourcePaths = new Set(item.files.map((file) => `${root}/${file.path}`));

    for (const path of rootFiles) {
      if (isKnownAuthoringOrIgnoredFile(path)) {
        continue;
      }

      if (!publishedSourcePaths.has(path)) {
        warnings.push(
          createWarning(path, `Registry item "${item.name}" does not publish this source file.`),
        );
      }
    }
  }

  return warnings;
}

function getRegistryItemRoots(files: Readonly<Record<string, string>>): string[] {
  const roots = new Set<string>();

  for (const path of Object.keys(files)) {
    const segments = path.split("/");

    if (
      segments[0] === "registry" &&
      segments[1] === "items" &&
      segments.length >= 4 &&
      knownRegistryTypeFolders.has(segments[2] ?? "")
    ) {
      roots.add(segments.slice(0, 4).join("/"));
    }
  }

  return [...roots].toSorted();
}

function isKnownAuthoringOrIgnoredFile(path: string): boolean {
  const fileName = getFileName(path);

  return (
    fileName === registryItemAuthoringFile ||
    fileName === registryItemPreviewFile ||
    ignoredRegistryFileNames.has(fileName)
  );
}

function getFileName(path: string): string {
  return path.replace(/\\/gu, "/").split("/").at(-1) ?? path;
}

function getParentPath(path: string): string {
  return path.replace(/\\/gu, "/").split("/").slice(0, -1).join("/");
}

function createError(path: string, message: string): RegistryDiagnostic {
  return { level: "error", path, message };
}

function createWarning(path: string, message: string): RegistryDiagnostic {
  return { level: "warning", path, message };
}

function sortDiagnostics(diagnostics: RegistryDiagnostic[]): RegistryDiagnostic[] {
  return diagnostics.toSorted(
    (a, b) =>
      a.path.localeCompare(b.path, "en", { numeric: true }) || a.message.localeCompare(b.message),
  );
}
