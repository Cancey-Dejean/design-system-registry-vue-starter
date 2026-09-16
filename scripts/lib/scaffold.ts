import {
  getRegistryTypeFolder,
  publicRegistryItemTypes,
  type RegistryItemType,
} from "../../app/lib/registry/item-types";
import { isKebabCase, toCamelCase, toComposableName, toPascalCase, toTitleCase } from "./casing";

export type RegistryScaffoldItemType = RegistryItemType;

export type RegistryScaffoldInput = {
  type: RegistryScaffoldItemType;
  name: string;
  title: string;
  description: string;
  target?: string;
  fileExtension?: RegistryScaffoldFileExtension;
};

export type RegistryScaffoldFile = {
  path: string;
  content: string;
};

export type RegistryScaffoldPlan = {
  itemRoot: string;
  files: RegistryScaffoldFile[];
};

export type RegistryScaffoldConflict = {
  path: string;
  message: string;
};

export type RegistryScaffoldFileExtension = string;

const fileExtensionPattern = /^[a-zA-Z0-9][a-zA-Z0-9._-]*$/u;

// components.json aliases: this project resolves installs through these paths, not
// shadcn's implicit per-type resolution — every scaffolded file gets an explicit target.
const registryScaffoldTargetDirs = {
  "registry:ui": "components/ui",
  "registry:component": "components",
  "registry:block": "components",
  "registry:hook": "composables",
  "registry:lib": "lib",
} as const;

export const registryScaffoldItemTypes = publicRegistryItemTypes;

export const registryScaffoldFileExtensions = [
  "ts",
  "vue",
  "css",
  "json",
  "md",
  "mdc",
  "env",
  "js",
] as const satisfies readonly string[];

export function createRegistryScaffoldPlan(input: RegistryScaffoldInput): RegistryScaffoldPlan {
  validateRegistryScaffoldInput(input);

  const itemRoot = getRegistryScaffoldItemRoot(input);
  const sourceFiles = getRegistryScaffoldSourceFiles(input, itemRoot);
  const files: RegistryScaffoldFile[] = [...sourceFiles];

  files.push({
    path: `${itemRoot}/_registry.md`,
    content: renderRegistryMarkdown(input, sourceFiles, itemRoot),
  });

  if (shouldRenderRegistryPreview(input)) {
    files.push({
      path: `${itemRoot}/_preview.vue`,
      content: renderRegistryPreviewFile(input, sourceFiles, itemRoot),
    });
  }

  return { itemRoot, files };
}

export function getRegistryScaffoldConflicts(
  plan: RegistryScaffoldPlan,
  existingPaths: readonly string[],
): RegistryScaffoldConflict[] {
  const existingPathSet = new Set(existingPaths.map(normalizePath));

  return plan.files
    .filter((file) => existingPathSet.has(file.path))
    .map((file) => ({
      path: file.path,
      message: `File already exists: ${file.path}`,
    }));
}

export function validateRegistryScaffoldName(name: string): string | undefined {
  if (!name.trim()) {
    return "Enter an item name.";
  }

  if (!isKebabCase(name)) {
    return "Use kebab-case with lowercase letters, numbers, and hyphens.";
  }

  return undefined;
}

export function getDefaultRegistryScaffoldTitle(name: string): string {
  return toTitleCase(name);
}

function validateRegistryScaffoldInput(input: RegistryScaffoldInput): void {
  const nameError = validateRegistryScaffoldName(input.name);

  if (nameError) {
    throw new Error(nameError);
  }

  if (!input.title.trim()) {
    throw new Error("Registry item title is required.");
  }

  if (!input.description.trim()) {
    throw new Error("Registry item description is required.");
  }

  if ((input.type === "registry:page" || input.type === "registry:file") && !input.target?.trim()) {
    throw new Error(`Registry item type ${input.type} requires an install target.`);
  }

  if (shouldCreateRegistryScaffoldFile(input)) {
    const extensionError = validateRegistryScaffoldFileExtension(
      getRegistryScaffoldFileExtension(input),
    );

    if (extensionError) {
      throw new Error(extensionError);
    }
  }
}

// Component folders live under a PascalCase directory on disk while the registry item's `name`
// frontmatter stays kebab-case — see server/utils/registry-catalog.ts for the established reason.
function getRegistryScaffoldItemRoot(input: Pick<RegistryScaffoldInput, "name" | "type">): string {
  return `registry/items/${getRegistryTypeFolder(input.type)}/${toPascalCase(input.name)}`;
}

function getRegistryScaffoldSourceFiles(
  input: RegistryScaffoldInput,
  itemRoot: string,
): RegistryScaffoldFile[] {
  if (!shouldCreateRegistryScaffoldFile(input)) {
    return [];
  }

  switch (input.type) {
    case "registry:ui":
    case "registry:component":
    case "registry:block":
      return getRegistryScaffoldComponentFiles(input, itemRoot);
    case "registry:hook":
      return [
        {
          path: `${itemRoot}/${toComposableName(input.name)}.ts`,
          content: renderRegistryComposableSource(input),
        },
      ];
    case "registry:lib":
      return [
        {
          path: `${itemRoot}/${toCamelCase(input.name)}.ts`,
          content: renderRegistryLibSource(input),
        },
      ];
    case "registry:page":
      return [{ path: `${itemRoot}/page.vue`, content: renderRegistryPageSource(input) }];
    case "registry:file":
    case "registry:item":
      return [
        {
          path: `${itemRoot}/${input.name}.${getRegistryScaffoldFileExtension(input)}`,
          content: renderRegistryFileSource(input),
        },
      ];
    case "registry:base":
    case "registry:font":
    case "registry:style":
    case "registry:theme":
      return [];
    default:
      return assertNever(input.type);
  }
}

function getRegistryScaffoldComponentFiles(
  input: RegistryScaffoldInput,
  itemRoot: string,
): RegistryScaffoldFile[] {
  const componentName = toPascalCase(input.name);

  return [
    {
      path: `${itemRoot}/${componentName}.vue`,
      content: renderRegistryComponentSource(input),
    },
    {
      path: `${itemRoot}/index.ts`,
      content: `export { default as ${componentName} } from "./${componentName}.vue";\n`,
    },
  ];
}

function getRegistryScaffoldFileExtension(
  input: Pick<RegistryScaffoldInput, "fileExtension">,
): RegistryScaffoldFileExtension {
  return input.fileExtension ?? "ts";
}

function shouldCreateRegistryScaffoldFile(input: RegistryScaffoldInput): boolean {
  if (input.type === "registry:item") {
    return Boolean(input.target?.trim());
  }

  return !isMetadataOnlyRegistryScaffoldType(input.type);
}

function isMetadataOnlyRegistryScaffoldType(type: RegistryScaffoldItemType): boolean {
  return (
    type === "registry:base" ||
    type === "registry:font" ||
    type === "registry:item" ||
    type === "registry:style" ||
    type === "registry:theme"
  );
}

function shouldRenderRegistryPreview(input: RegistryScaffoldInput): boolean {
  return !isMetadataOnlyRegistryScaffoldType(input.type);
}

function renderRegistryMarkdown(
  input: RegistryScaffoldInput,
  sourceFiles: readonly RegistryScaffoldFile[],
  itemRoot: string,
): string {
  return [
    renderRegistryFrontmatter(input, sourceFiles, itemRoot),
    input.description.trim(),
    "",
    renderRegistryUsageSnippet(input),
    "",
  ].join("\n");
}

function renderRegistryFrontmatter(
  input: RegistryScaffoldInput,
  sourceFiles: readonly RegistryScaffoldFile[],
  itemRoot: string,
): string {
  const fields = [
    "---",
    `name: ${input.name}`,
    `type: ${input.type}`,
    `title: ${toYamlString(input.title)}`,
    `description: ${toYamlString(input.description)}`,
    ...getRegistryFrontmatterFiles(input, sourceFiles, itemRoot),
    "---",
    "",
  ];

  return fields.join("\n");
}

function toYamlString(value: string): string {
  return JSON.stringify(value.trim());
}

function getRegistryFrontmatterFiles(
  input: RegistryScaffoldInput,
  sourceFiles: readonly RegistryScaffoldFile[],
  itemRoot: string,
): string[] {
  if (sourceFiles.length === 0) {
    return [];
  }

  const lines = ["files:"];

  for (const file of sourceFiles) {
    const authoredPath = file.path.startsWith(`${itemRoot}/`)
      ? file.path.slice(itemRoot.length + 1)
      : file.path;
    const target = getRegistryScaffoldFileTarget(input, authoredPath);

    lines.push(`  - path: ${authoredPath}`, `    type: ${input.type}`);

    if (target) {
      lines.push(`    target: ${toYamlString(target)}`);
    }
  }

  return lines;
}

function getRegistryScaffoldFileTarget(
  input: RegistryScaffoldInput,
  authoredPath: string,
): string | undefined {
  if (input.target?.trim()) {
    return input.target;
  }

  const targetDir =
    registryScaffoldTargetDirs[input.type as keyof typeof registryScaffoldTargetDirs];

  if (targetDir) {
    return `${targetDir}/${input.name}/${authoredPath}`;
  }

  if (input.type === "registry:page") {
    return `pages/${input.name}.vue`;
  }

  return undefined;
}

function renderRegistryUsageSnippet(input: RegistryScaffoldInput): string {
  switch (input.type) {
    case "registry:ui":
      return [
        "```vue",
        `<script setup lang="ts">`,
        `import { ${toPascalCase(input.name)} } from "@/components/ui/${input.name}";`,
        `</script>`,
        "```",
      ].join("\n");
    case "registry:component":
    case "registry:block":
      return [
        "```vue",
        `<script setup lang="ts">`,
        `import { ${toPascalCase(input.name)} } from "@/components/${input.name}";`,
        `</script>`,
        "```",
      ].join("\n");
    case "registry:hook":
      return [
        "```ts",
        `import { ${toComposableName(input.name)} } from "@/composables/${toComposableName(input.name)}";`,
        "```",
      ].join("\n");
    case "registry:lib":
      return [
        "```ts",
        `import { ${toCamelCase(input.name)} } from "@/lib/${toCamelCase(input.name)}";`,
        "```",
      ].join("\n");
    case "registry:page":
    case "registry:file":
    case "registry:base":
    case "registry:font":
    case "registry:item":
    case "registry:style":
    case "registry:theme":
      return "";
    default:
      return assertNever(input.type);
  }
}

function renderRegistryPreviewFile(
  input: RegistryScaffoldInput,
  sourceFiles: readonly RegistryScaffoldFile[],
  itemRoot: string,
): string {
  const componentName = toPascalCase(input.name);
  const composableName = toComposableName(input.name);
  const helperName = toCamelCase(input.name);
  const mainSourcePath = sourceFiles[0]?.path.slice(itemRoot.length + 1).replace(/\.ts$/u, "");

  switch (input.type) {
    case "registry:ui":
    case "registry:component":
    case "registry:block":
      return [
        `<script setup lang="ts">`,
        `import { ${componentName} } from ".";`,
        `</script>`,
        "",
        `<template>`,
        `  <${componentName} />`,
        `</template>`,
        "",
      ].join("\n");
    case "registry:hook":
      return [
        `<script setup lang="ts">`,
        `import { ${composableName} } from "./${mainSourcePath}";`,
        "",
        `const { enabled, toggle } = ${composableName}();`,
        `</script>`,
        "",
        `<template>`,
        `  <button type="button" @click="toggle">{{ enabled ? "Enabled" : "Disabled" }}</button>`,
        `</template>`,
        "",
      ].join("\n");
    case "registry:lib":
      return [
        `<script setup lang="ts">`,
        `import { ${helperName} } from "./${mainSourcePath}";`,
        "",
        `const result = ${helperName}(${toTsString(input.title)});`,
        `</script>`,
        "",
        `<template>`,
        `  <pre>{{ result }}</pre>`,
        `</template>`,
        "",
      ].join("\n");
    case "registry:page":
      return [
        `<script setup lang="ts">`,
        `import Page from "./page.vue";`,
        `</script>`,
        "",
        `<template>`,
        `  <Page />`,
        `</template>`,
        "",
      ].join("\n");
    case "registry:file":
      return [
        `<script setup lang="ts">`,
        `const title = ${toTsString(input.title)};`,
        `</script>`,
        "",
        `<template>`,
        `  <div>{{ title }}</div>`,
        `</template>`,
        "",
      ].join("\n");
    case "registry:base":
    case "registry:font":
    case "registry:item":
    case "registry:style":
    case "registry:theme":
      return "";
    default:
      return assertNever(input.type);
  }
}

function renderRegistryComponentSource(input: RegistryScaffoldInput): string {
  const componentName = toPascalCase(input.name);

  return `<script setup lang="ts">
export interface ${componentName}Props {
  title?: string;
  description?: string;
}

withDefaults(defineProps<${componentName}Props>(), {
  title: ${toTsString(input.title)},
  description: ${toTsString(input.description)},
});
</script>

<template>
  <div class="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
    <h3 class="font-medium">{{ title }}</h3>
    <p class="mt-1 text-sm text-muted-foreground">{{ description }}</p>
  </div>
</template>
`;
}

function renderRegistryComposableSource(input: Pick<RegistryScaffoldInput, "name">): string {
  const composableName = toComposableName(input.name);

  return `import { ref } from "vue";

export function ${composableName}(initialValue = false) {
  const enabled = ref(initialValue);

  function toggle(): void {
    enabled.value = !enabled.value;
  }

  return { enabled, toggle };
}
`;
}

function renderRegistryLibSource(input: Pick<RegistryScaffoldInput, "name">): string {
  const helperName = toCamelCase(input.name);

  return `export function ${helperName}(value: string): string {
  return value.trim();
}
`;
}

function renderRegistryPageSource(
  input: Pick<RegistryScaffoldInput, "description" | "title">,
): string {
  return `<script setup lang="ts">
const title = ${toTsString(input.title)};
const description = ${toTsString(input.description)};

useHead({ title });
</script>

<template>
  <main class="mx-auto flex max-w-3xl flex-col gap-3 p-6">
    <h1 class="text-2xl font-semibold">{{ title }}</h1>
    <p class="text-muted-foreground">{{ description }}</p>
  </main>
</template>
`;
}

function renderRegistryFileSource(input: RegistryScaffoldInput): string {
  const extension = getRegistryScaffoldFileExtension(input);
  const helperName = toCamelCase(input.name);

  switch (extension) {
    case "css":
      return `.${input.name} {
  display: block;
}
`;
    case "json":
      return `${JSON.stringify({ name: input.name, description: input.description.trim() }, null, 2)}\n`;
    case "js":
    case "ts":
      return `export const ${helperName} = "${input.name}";
`;
    case "vue":
      return `<template>
  <div>{{ ${toTsString(input.title)} }}</div>
</template>
`;
    default:
      return `${input.description.trim()}\n`;
  }
}

function normalizePath(path: string): string {
  return path.replace(/\\/gu, "/").replace(/^\/+|\/+$/gu, "");
}

export function validateRegistryScaffoldFileExtension(value: string): string | undefined {
  if (!value.trim()) {
    return "Enter a file extension.";
  }

  if (!fileExtensionPattern.test(value)) {
    return "Use letters, numbers, dots, underscores, or hyphens.";
  }

  return undefined;
}

function toTsString(value: string): string {
  return JSON.stringify(value.trim());
}

function assertNever(value: never): never {
  throw new Error(`Unsupported registry scaffold value: ${String(value)}`);
}
