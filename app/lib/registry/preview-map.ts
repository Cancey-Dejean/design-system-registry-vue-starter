import type { Component } from "vue";

// Every _preview.vue is authoring-only (never published — see each item's _registry.md files
// list) and lazily code-split; only the one the viewer actually opens gets loaded.
// A leading-slash glob resolves against Nuxt's srcDir (app/), not the project root, so this has
// to be relative to this file's own location instead (app/lib/registry -> registry/items/*).
const previewModules = import.meta.glob<{ default: Component }>([
  "../../../registry/items/components/*/_preview.vue",
  "../../../registry/items/blocks/*/_preview.vue",
  "../../../registry/items/lib/*/_preview.vue",
  "../../../registry/items/hooks/*/_preview.vue",
]);

// Item folders are PascalCase on disk with no word separator (e.g. AlertDialog/, Hero/) while the
// registry item's `name` stays kebab-case (e.g. "alert-dialog", "hero") — lowercasing alone isn't
// enough to match them, so hyphens (and any other non-alphanumeric characters) are stripped too.
function normalizeSegment(segment: string): string {
  return segment.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function toPreviewKey(name: string): string | undefined {
  const normalizedName = normalizeSegment(name);
  const suffixes = [
    `/components/${normalizedName}/_preview.vue`,
    `/blocks/${normalizedName}/_preview.vue`,
    `/lib/${normalizedName}/_preview.vue`,
    `/hooks/${normalizedName}/_preview.vue`,
  ];
  return Object.keys(previewModules).find((path) => {
    const normalizedPath = path
      .split("/")
      .map((segment) => (segment.endsWith("_preview.vue") ? segment : normalizeSegment(segment)))
      .join("/")
      .toLowerCase();
    return suffixes.some((suffix) => normalizedPath.includes(suffix));
  });
}

export function hasPreview(name: string): boolean {
  return toPreviewKey(name) !== undefined;
}

export function resolvePreview(name: string): (() => Promise<{ default: Component }>) | undefined {
  const key = toPreviewKey(name);
  return key ? previewModules[key] : undefined;
}
