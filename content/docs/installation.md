---
title: Installation
description: Install Design System UI Vue items with the shadcn-vue CLI.
order: 1
---

Install any item from **Design System UI Vue** with the [shadcn-vue CLI](https://www.shadcn-vue.com/docs/cli). Replace `button` with the item name from the catalog.

Start with [styles](/docs/styles) so your project has the design system CSS foundation before adding components.

## Configure the registry

Your project must already be set up with [shadcn-vue](https://www.shadcn-vue.com/docs/installation). Then add this registry to `components.json` so the CLI can resolve `@design-system-ui-vue/*` items:

```json
{
  "registries": {
    "@design-system-ui-vue": "https://design-system-registry-vue.vercel.app/r/{name}.json"
  }
}
```

Update the URL to your deployed `homepage` from `registry/config.ts`. Do this once per project. Without it, installs fail with `Unknown registry "@design-system-ui-vue"`.

## Install an item

Add a specific item by its name from the [catalog](/components), prefixed with the `@design-system-ui-vue` namespace. Swap `sidebar` below for any item you want (`button`, `spinner`, and so on).

### npm

```sh
npx shadcn-vue@latest add @design-system-ui-vue/sidebar
```

### pnpm

```sh
pnpm dlx shadcn-vue@latest add @design-system-ui-vue/sidebar
```

### yarn

```sh
yarn dlx shadcn-vue@latest add @design-system-ui-vue/sidebar
```

### bun

```sh
bunx --bun shadcn-vue@latest add @design-system-ui-vue/sidebar
```

You can also install via the full item URL without registering the namespace:

```sh
npx shadcn-vue@latest add https://design-system-registry-vue.vercel.app/r/sidebar.json
```

## Find the exact command

Every item page has a copy-ready command with a tab for each package manager. Browse [components](/components), [blocks](/blocks), and [utilities](/utilities), open an item such as [sidebar](/components/sidebar), and copy its exact install command from the **Installation** section.
