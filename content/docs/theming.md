---
title: Theming
description: Customize the docs shell and published components with your own design tokens.
order: 3
---

The docs app uses the local shadcn-vue configuration in `components.json` and the global theme in
`registry/items/files/styles/globals.css`.

Published registry items are independent from the docs shell. Put installable component source in
`registry/items/**`, and include any required CSS, dependencies, or registry dependencies in the
item's `_registry.md` frontmatter.

Use semantic tokens such as `background`, `foreground`, `primary`, `muted`, and `border` so
installed components remain easy to customize.

## How light/dark switching works

`theme.css` defines every token twice: once under `:root` (light) and once under `.dark` (dark).
`globals.css` imports `theme.css` and declares `@custom-variant dark (&:is(.dark *));`, so any
`dark:` utility a component uses resolves against the values overridden inside a `.dark` ancestor.
Neither file toggles that class on its own — something in the consuming app has to add or remove
`dark` on `<html>` (or another ancestor) at runtime.

In this docs app that "something" is [`@nuxtjs/color-mode`](https://color-mode.nuxtjs.org/),
configured in `nuxt.config.ts`:

```ts
colorMode: {
  classSuffix: "",
},
```

The module's default behavior suffixes its class (`dark-mode` / `light-mode`); `classSuffix: ""`
makes it emit plain `dark` / `light` instead, so it lines up with the bare `.dark` selector
`theme.css` expects. `app/components/docs/ThemeToggle.vue` — part of the docs shell, not a
published registry item — flips the mode:

```ts
const colorMode = useColorMode();

function toggleTheme() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}
```

## Wiring it up in a consumer project

Installing the `styles` item only gives you the CSS tokens — it does not install a toggle
component or a color-mode module. To make `dark:` utilities respond to anything, add your own
mechanism that toggles a `dark` class:

- **Nuxt**: add [`@nuxtjs/color-mode`](https://color-mode.nuxtjs.org/) and set `classSuffix: ""`
  to match `theme.css`'s bare `.dark` selector, the same way this project does.
- **Other Vue setups**: VueUse's [`useColorMode`](https://vueuse.org/core/useColorMode/) composable
  applies the same class-toggling pattern without Nuxt.
- **Manual**: toggle it yourself, e.g. `document.documentElement.classList.toggle("dark")`, and
  persist the preference (`localStorage`, a cookie, etc.) however you like.

Whatever you choose, the class name must be exactly `dark` — `theme.css` doesn't know about any
other naming convention.

## Accent theme variants (not wired up yet)

`registry/items/files/styles/` also has `theme-secondary.css` and `theme-tertiary.css`. Each scopes
an accent palette under `[data-theme="theme-secondary"]` / `[data-theme="theme-tertiary"]` (plus a
`.dark[data-theme="..."]` variant for dark mode). Neither file is imported by `globals.css`, neither
is listed in the `styles` item's install table, and nothing in this docs app sets a `data-theme`
attribute — they're unused scaffolding today. To use one, `@import` it after `theme.css` and set
`data-theme="theme-secondary"` (or `"theme-tertiary"`) on the element you want re-themed.
