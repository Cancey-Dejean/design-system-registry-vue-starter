---
title: Installation
description: Install Design System UI items with the shadcn CLI.
order: 1
---

Install any item from **Design System UI** with the [shadcn CLI](https://ui.shadcn.com/docs/cli).
Replace `button` with the item name from the catalog.

Start with [styles](/docs/theming) so your project has the design system CSS foundation before
adding components.

## Configure the registry

Your project must already be set up with [shadcn-vue](https://shadcn-vue.com/docs/installation).
Then add this registry to `components.json` so the CLI can resolve `@design-system-ui/*` items:

```json
{
  "registries": {
    "@design-system-ui": "https://design-system-registry-vue-starter.vercel.app/r/{name}.json"
  }
}
```

Do this once per project. Without it, installs fail with `Unknown registry "@design-system-ui"`.

## Install an item

### npm

```sh
npx shadcn-vue@latest add @design-system-ui/button
```

### pnpm

```sh
pnpm dlx shadcn-vue@latest add @design-system-ui/button
```

### yarn

```sh
yarn dlx shadcn-vue@latest add @design-system-ui/button
```

### bun

```sh
bunx --bun shadcn-vue@latest add @design-system-ui/button
```

### vite-plus

```sh
vpx shadcn-vue@latest add @design-system-ui/button
```

Browse [components](/components), [hooks](/utilities), and [blocks](/blocks) for the exact
install command on each item page.
