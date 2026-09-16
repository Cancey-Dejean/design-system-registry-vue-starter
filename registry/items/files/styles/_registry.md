---
name: styles
type: registry:file
title: Styles
description: The design system's Tailwind CSS v4 entry point and semantic color/theme tokens for light and dark mode.
dependencies:
  - tw-animate-css
  - "@fontsource-variable/geist"
  - "@fontsource-variable/geist-mono"
  - "@tailwindcss/typography"
files:
  - path: globals.css
    type: registry:file
    target: src/styles/globals.css
  - path: theme.css
    type: registry:file
    target: src/styles/theme.css
  - path: theme-secondary.css
    type: registry:file
    target: src/styles/theme-secondary.css
  - path: theme-tertiary.css
    type: registry:file
    target: src/styles/theme-tertiary.css
---

Import the entry point once from your app's CSS/JS entry:

```ts
import "@/styles/globals.css";
```

`globals.css` already imports `theme.css`, `theme-secondary.css`, and `theme-tertiary.css`, so you
don't need to import those separately.

`theme-secondary.css` and `theme-tertiary.css` are optional accent palettes scoped to
`[data-theme="theme-secondary"]` / `[data-theme="theme-tertiary"]`. Set that attribute on `<html>`
(or any ancestor) to opt an element into the accent — see [Theming](/docs/theming) for how this docs
site's own accent-color switcher does it.

See [Styles](/docs/styles) for the full setup guide, and [Theming](/docs/theming) for how light/dark
mode switching works with these tokens.
