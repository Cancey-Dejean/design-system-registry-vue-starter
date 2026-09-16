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
