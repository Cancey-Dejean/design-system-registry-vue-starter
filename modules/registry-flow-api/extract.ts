import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import ts from "typescript";
import { createCheckerByJson } from "vue-component-meta";
import { parse as parseYaml } from "yaml";

import type {
  RegistryFlowApi,
  RegistryFlowApiSource,
  RegistryFlowProp,
  RegistryFlowVariant,
} from "../../app/lib/registry/flow-data";

const MAX_TYPE_LENGTH = 240;
const IGNORED_PROPS = new Set(["class"]);
const REGISTRY_FILE_NAME = "_registry.md";
const frontmatterPattern = /^---\r?\n([\s\S]*?)\r?\n---/u;

type ComponentChecker = ReturnType<typeof createCheckerByJson>;

/** Type-checks registry sources only, so reading every item costs one small program. */
export function createRegistryApiChecker(rootDir: string): ComponentChecker {
  return createCheckerByJson(
    rootDir,
    {
      include: ["registry/items/**/*.vue", "registry/items/**/*.ts"],
      exclude: ["**/_preview.vue", "**/stories/**", "**/tests/**"],
      compilerOptions: {
        target: "ESNext",
        module: "ESNext",
        moduleResolution: "Bundler",
        strict: true,
        skipLibCheck: true,
        allowImportingTsExtensions: true,
        noEmit: true,
        types: [],
        baseUrl: rootDir,
        paths: {
          "@registry/*": ["registry/items/*"],
          "#registry-ui/*": ["registry/items/components/*"],
        },
      },
    },
    { schema: true },
  );
}

/** Finds every `_registry.md` under `itemsDir` and describes the sources it publishes. */
export function findRegistryApiSources(itemsDir: string): RegistryFlowApiSource[] {
  const sources: RegistryFlowApiSource[] = [];

  const visit = (directory: string) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        visit(entryPath);
      } else if (entry.name === REGISTRY_FILE_NAME) {
        const source = readRegistryApiSource(entryPath);

        if (source) {
          sources.push(source);
        }
      }
    }
  };

  if (existsSync(itemsDir)) {
    visit(itemsDir);
  }

  return sources;
}

function readRegistryApiSource(registryFile: string): RegistryFlowApiSource | undefined {
  const frontmatter = frontmatterPattern.exec(readFileSync(registryFile, "utf-8"))?.[1];
  const metadata: unknown = frontmatter ? parseYaml(frontmatter) : undefined;

  if (!isRecord(metadata) || typeof metadata.name !== "string") {
    return undefined;
  }

  return {
    directory: path.dirname(registryFile),
    name: metadata.name,
    title: typeof metadata.title === "string" ? metadata.title : metadata.name,
    files: (Array.isArray(metadata.files) ? metadata.files : []).flatMap((file: unknown) =>
      isRecord(file) && typeof file.path === "string" ? [file.path] : [],
    ),
  };
}

/** The public API of every registry item under `registry/items`, keyed by item name. */
export function getRegistryApis(rootDir: string): Record<string, RegistryFlowApi> {
  const itemsDir = path.join(rootDir, "registry", "items");
  const checker = createRegistryApiChecker(rootDir);

  return Object.fromEntries(
    findRegistryApiSources(itemsDir).map((source) => [
      source.name,
      getRegistryItemApi(source, checker, itemsDir),
    ]),
  );
}

/**
 * Reads the public API of a registry item: `cva` variants from its TypeScript
 * files, and the props its main component declares itself. Inherited props
 * such as reka-ui primitives and HTML attributes are left out.
 */
export function getRegistryItemApi(
  { directory, files, name, title }: RegistryFlowApiSource,
  checker: ComponentChecker,
  itemsDir: string,
): RegistryFlowApi {
  const sourceFiles = files
    .map((file) => path.resolve(directory, file))
    .filter((file) => existsSync(file));
  const cvaVariants = dedupeByName(
    sourceFiles.filter((file) => file.endsWith(".ts")).flatMap((file) => readVariants(file)),
  );
  const componentFile = findMainComponent(sourceFiles, [
    toPascalCase(name),
    title.replaceAll(/\s+/gu, ""),
  ]);

  if (!componentFile) {
    return { variants: cvaVariants, props: [] };
  }

  return {
    component: path.basename(componentFile, ".vue"),
    ...readComponentApi(checker, componentFile, itemsDir, cvaVariants),
  };
}

function findMainComponent(
  sourceFiles: readonly string[],
  preferredNames: readonly string[],
): string | undefined {
  const components = sourceFiles.filter((file) => file.endsWith(".vue"));

  return (
    preferredNames
      .map((name) => components.find((file) => path.basename(file, ".vue") === name))
      .find(Boolean) ?? components[0]
  );
}

function readComponentApi(
  checker: ComponentChecker,
  componentFile: string,
  itemsDir: string,
  cvaVariants: readonly RegistryFlowVariant[],
): Pick<RegistryFlowApi, "variants" | "props"> {
  const variants: RegistryFlowVariant[] = [];
  const props: RegistryFlowProp[] = [];

  for (const prop of checker.getComponentMeta(componentFile).props) {
    const isOwnProp = prop.getDeclarations().some(({ file }) => {
      const fileName = path.resolve(file);

      return fileName.startsWith(itemsDir) && !fileName.includes(`${path.sep}node_modules`);
    });

    if (prop.global || !isOwnProp || IGNORED_PROPS.has(prop.name)) {
      continue;
    }

    const cvaVariant = cvaVariants.find((variant) => variant.name === prop.name);
    // `withDefaults(…, { layout: undefined })` reports the literal text "undefined".
    const defaultValue =
      prop.default === undefined || prop.default === "undefined"
        ? cvaVariant?.defaultValue
        : unquote(prop.default);
    const options = getStringLiteralOptions(prop.schema);

    if (options) {
      variants.push({
        name: prop.name,
        options: cvaVariant
          ? [
              ...cvaVariant.options.filter((option) => options.includes(option)),
              ...options.filter((option) => !cvaVariant.options.includes(option)),
            ]
          : options,
        ...(defaultValue === undefined ? {} : { defaultValue }),
      });
      continue;
    }

    props.push({
      name: prop.name,
      type: formatType(prop.type),
      optional: !prop.required,
      ...(defaultValue === undefined ? {} : { defaultValue }),
    });
  }

  return {
    variants: variants.toSorted(
      (a, b) => getVariantOrder(a, cvaVariants) - getVariantOrder(b, cvaVariants),
    ),
    props: props.toSorted(
      (a, b) => Number(a.optional) - Number(b.optional) || a.name.localeCompare(b.name),
    ),
  };
}

const NULLISH_MEMBERS = new Set(["undefined", "null"]);

/** The options of a prop typed as a union of two or more string literals. */
function getStringLiteralOptions(schema: unknown): string[] | undefined {
  if (!isRecord(schema) || schema.kind !== "enum" || !Array.isArray(schema.schema)) {
    return undefined;
  }

  const members = schema.schema.filter(
    (member: unknown) => typeof member !== "string" || !NULLISH_MEMBERS.has(member),
  );

  if (
    members.length < 2 ||
    !members.every((member: unknown) => typeof member === "string" && /^".*"$/u.test(member))
  ) {
    return undefined;
  }

  return members.map((member: string) => member.slice(1, -1));
}

function readVariants(file: string): RegistryFlowVariant[] {
  const sourceFile = ts.createSourceFile(
    file,
    readFileSync(file, "utf-8"),
    ts.ScriptTarget.Latest,
    true,
  );
  const variants: RegistryFlowVariant[] = [];

  function visit(node: ts.Node) {
    if (ts.isObjectLiteralExpression(node)) {
      const variantsObject = getObjectProperty(node, "variants");

      if (variantsObject) {
        const defaults = getObjectProperty(node, "defaultVariants");

        for (const property of variantsObject.properties) {
          if (!ts.isPropertyAssignment(property)) {
            continue;
          }

          const variantName = getPropertyName(property.name);
          const options = ts.isObjectLiteralExpression(property.initializer)
            ? property.initializer.properties.flatMap((option) => {
                const optionName = option.name ? getPropertyName(option.name) : undefined;

                return optionName ? [optionName] : [];
              })
            : [];
          const defaultValue = defaults ? getLiteralProperty(defaults, variantName) : undefined;

          if (variantName && options.length > 0) {
            variants.push({
              name: variantName,
              options,
              ...(defaultValue === undefined ? {} : { defaultValue }),
            });
          }
        }

        return;
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  return variants;
}

function getVariantOrder(
  variant: RegistryFlowVariant,
  cvaVariants: readonly RegistryFlowVariant[],
): number {
  const index = cvaVariants.findIndex((cvaVariant) => cvaVariant.name === variant.name);

  return index === -1 ? cvaVariants.length : index;
}

function formatType(value: string): string {
  const formatted = value
    .replaceAll(/import\("[^"]*"\)\./gu, "")
    .replaceAll(/\s*\|\s*(?:undefined|null)(?=\s*(?:\||$))/gu, "")
    .trim();

  return formatted.length > MAX_TYPE_LENGTH
    ? `${formatted.slice(0, MAX_TYPE_LENGTH - 1)}…`
    : formatted;
}

function unquote(value: string): string {
  return /^(["'`]).*\1$/u.test(value) ? value.slice(1, -1) : value;
}

function getObjectProperty(
  node: ts.ObjectLiteralExpression,
  name: string,
): ts.ObjectLiteralExpression | undefined {
  for (const property of node.properties) {
    if (
      ts.isPropertyAssignment(property) &&
      getPropertyName(property.name) === name &&
      ts.isObjectLiteralExpression(property.initializer)
    ) {
      return property.initializer;
    }
  }

  return undefined;
}

function getLiteralProperty(node: ts.ObjectLiteralExpression, name: string): string | undefined {
  for (const property of node.properties) {
    if (!ts.isPropertyAssignment(property) || getPropertyName(property.name) !== name) {
      continue;
    }

    const { initializer } = property;

    if (ts.isStringLiteralLike(initializer) || ts.isNumericLiteral(initializer)) {
      return initializer.text;
    }

    if (initializer.kind === ts.SyntaxKind.TrueKeyword) {
      return "true";
    }

    if (initializer.kind === ts.SyntaxKind.FalseKeyword) {
      return "false";
    }
  }

  return undefined;
}

function getPropertyName(name: ts.PropertyName): string {
  return ts.isIdentifier(name) || ts.isStringLiteralLike(name) || ts.isNumericLiteral(name)
    ? name.text
    : name.getText();
}

function dedupeByName<T extends { name: string }>(entries: readonly T[]): T[] {
  const seen = new Set<string>();

  return entries.filter((entry) => !seen.has(entry.name) && seen.add(entry.name));
}

function toPascalCase(value: string): string {
  return value
    .split(/[-_\s]+/u)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
