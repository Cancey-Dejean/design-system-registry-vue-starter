---
name: shadcn-registry
description: >-
  Use when adding, adapting, or publishing installable shadcn-vue registry
  items in this Nuxt registry; or when editing _registry.md, _preview.vue,
  registry/items/**, install targets, or localRegistryDependencies.
---

# Shadcn Registry (Vue)

This is a Nuxt 4 + shadcn-vue registry. Published source lives in `registry/items/**`. The docs shell is `app/` + `content/docs/`. There is no `src/components/ui` copy — the docs app imports registry UI through `#registry-ui`.

## Workflow

1. For new items, scaffold before editing:

```sh
bun --bun ./scripts/new.ts --type registry:ui --name example-card --description "A compact card component."
```

Interactive (no flags): `bun --bun ./scripts/new.ts`. `--name` is kebab-case. `--title` defaults from the name. Use `--target` for `registry:page`, `registry:file`, custom install paths, and targeted `registry:item` files. Use `--file-extension` for `registry:file` and targeted `registry:item` (default `ts`). Then replace the placeholder source — copy patterns from `Badge`, `Button` (variants), or `Field` (local deps) as needed.

2. Put installable source under `registry/items/**`. Do not put installable item source under `app/`.
3. Every published item needs `_registry.md`. Blocks, hooks, and files without one are unpublished.

## Type map

| User intent               | Type                 | Folder                              |
| ------------------------- | -------------------- | ----------------------------------- |
| shadcn-style UI component | `registry:ui`        | `registry/items/components/<Name>/` |
| non-UI component          | `registry:component` | `registry/items/components/<Name>/` |
| composed UI pattern       | `registry:block`     | `registry/items/blocks/<Name>/`     |
| Vue composable            | `registry:hook`      | `registry/items/hooks/<Name>/`      |
| helper module             | `registry:lib`       | `registry/items/lib/<Name>/`        |
| app page                  | `registry:page`      | `registry/items/pages/<Name>/`      |
| explicit target file      | `registry:file`      | `registry/items/files/<Name>/`      |
| style / theme / font / base / universal | `registry:style` / `theme` / `font` / `base` / `item` | matching type folder |

`name` in frontmatter is kebab-case (`button`, `button-group`). `scripts/new.ts` writes a PascalCase folder (`example-card` → `ExampleCard/`). Older items may still be `Button-group` (first letter capitalized, hyphens kept). Catalog lookup is case-insensitive. Vue files and exports are PascalCase (`Button.vue`, `ButtonGroup.vue`). `registry/items/utility/` is unpublished Storybook helpers, not a registry type.

## `_registry.md`

Each item uses `_registry.md` for YAML frontmatter and optional public Usage markdown. Put interactive docs demos in sibling `_preview.vue` files. Never list `_registry.md`, `_preview.vue`, or `stories/**` in `files`.

```yaml
---
name: button
type: registry:ui
title: Button
description: A polymorphic button with variants, sizes, icons, and a CTA group helper.
dependencies:
  - class-variance-authority
localRegistryDependencies:
  - separator
files:
  - path: Button.vue
    type: registry:ui
    target: components/ui/button/Button.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/button/index.ts
---
```

- `dependencies`: npm packages the consumer must install.
- `localRegistryDependencies`: kebab-case names of **other local items**. Published JSON rewrites them to `@design-system-ui/<name>` (see `app/lib/registry/config.ts`). Do not add a `registryDependencies` frontmatter field.
- `files`: list every published source file. `path` is relative to the item folder (`Button.vue`, not `registry/items/...`). Give each file an explicit `target`. UI defaults to `components/ui/<kebab-name>/<File>`; hooks use `composables/`. `registry:page` and `registry:file` always need `target`.

Usage examples should import the **consumer** path from `components.json` (`ui` → `@/components/ui`):

````md
```vue
<script setup lang="ts">
import { Button } from "@/components/ui/button";
</script>
```
````

Inside published source, import sibling files relatively or from the item `index.ts`. Import other local UI with `#registry-ui/<Folder>` (rewritten to `@/components/ui/` on publish) or `@registry/components/<Folder>`. Use `cn` from `@/lib/utils`. Do not leave `#registry-ui` or `@registry` in usage snippets — those aliases do not exist in consumer apps.

## Previews and stories

`_preview.vue` is authoring-only. Import from the local barrel and keep it client-safe (static data and local state; no network, auth, env, or app-only providers). Docs currently glob `registry/items/components/*/_preview.vue`.

```vue
<script setup lang="ts">
import { Button } from ".";
</script>
```

Optional Storybook files live at `registry/items/**/stories/*.stories.ts`. Import variant key lists for `argTypes.options`. Do not publish stories to silence `scripts/doctor.ts` warnings.

## Variant files (`*.variants.ts`)

Follow `registry/items/components/Button/Button.variants.ts` and [variant files](/docs/variants) (`content/docs/variants.mdx`). Do not inline `cva("classes", { variants })` or hardcode variant-name arrays.

1. `{name}Base` via `cn(...)`
2. `{name}Config` with `variants`, `compoundVariants` (empty is fine), `defaultVariants`, and `as const`
3. `{name}Cva = cva(base, { ...config, compoundVariants: [...config.compoundVariants] })`
4. `Object.keys` exports for each **string** axis (`BUTTON_VARIANTS`, `BUTTON_SIZES`, …). Skip boolean axes.
5. `{name}Variants = {name}Cva`

Put `VariantProps` aliases in `<Component>.types.ts` when that file exists. Re-export helpers and key lists from `index.ts`. List the `.variants.ts` file in `_registry.md` `files` when the item publishes it.

## Adaptation

- Extract only the reusable unit into the item folder.
- Replace app data access with props, sample data, or small exported fixtures.
- Remove app routing, auth, database, analytics, env, and server-only helpers unless the item intentionally installs those integrations.
- Preserve visual behavior unless the user asks for a redesign.
- Keep relative imports inside the item folder relative.
- Publish shared helpers as separate `registry:lib` items only when that improves install clarity.

## Consumer install

Consumers do not need Bun. Homepage comes from `app/lib/registry/config.ts`:

```sh
npx shadcn-vue@latest add https://<homepage>/r/button.json
pnpm dlx shadcn-vue@latest add https://<homepage>/r/button.json
bun x --bun shadcn-vue@latest add https://<homepage>/r/button.json
```

## Verification

- Run `bun --bun ./scripts/doctor.ts` after registry item changes.
- Run `vp check` (and `vp test` when behavior changed).
- Run `vp run build` before handoff when docs, routes, registry JSON, or catalog/source loading changed.
- After user-facing registry or docs changes, update `content/docs/changelog.mdx` per `updating-changelog`.
