import type { Component } from "vue";

// Every _preview.vue is authoring-only (never published — see each item's _registry.md files
// list) and lazily code-split; only the one the viewer actually opens gets loaded.
// A leading-slash glob resolves against Nuxt's srcDir (app/), not the project root, so this has
// to be relative to this file's own location instead (app/lib/registry -> registry/items/*).
const previewModules = import.meta.glob<{ default: Component }>([
  "../../../registry/items/components/*/_preview.vue",
  "../../../registry/items/blocks/*/_preview.vue",
]);

function toPreviewKey(name: string): string | undefined {
  // Item folders are PascalCase on disk (e.g. Button/, Hero/) while the registry item's `name`
  // stays kebab-case (e.g. "button", "hero"), so this match has to ignore case.
  const lowerName = name.toLowerCase();
  const suffixes = [`/components/${lowerName}/_preview.vue`, `/blocks/${lowerName}/_preview.vue`];
  return Object.keys(previewModules).find((path) => {
    const lowerPath = path.toLowerCase();
    return suffixes.some((suffix) => lowerPath.includes(suffix));
  });
}

export function hasPreview(name: string): boolean {
  return toPreviewKey(name) !== undefined;
}

export function resolvePreview(name: string): (() => Promise<{ default: Component }>) | undefined {
  const key = toPreviewKey(name);
  return key ? previewModules[key] : undefined;
}
