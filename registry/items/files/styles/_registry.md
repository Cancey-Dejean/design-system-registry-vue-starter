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
---

Import the entry point once from your app's CSS/JS entry:

```ts
import "@/styles/globals.css";
```

`globals.css` already imports `theme.css`, so you don't need a second import for the theme tokens.

See [Styles](/docs/styles) for the full setup guide, and [Theming](/docs/theming) for how light/dark
mode switching works with these tokens.
