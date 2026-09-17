---
name: link-text
type: registry:ui
title: Link Text
description: A styled, polymorphic text link with tone, underline, and size variants.
dependencies:
  - reka-ui
  - class-variance-authority
files:
  - path: LinkText.types.ts
    type: registry:ui
    target: components/ui/link-text/LinkText.types.ts
  - path: LinkText.variants.ts
    type: registry:ui
    target: components/ui/link-text/LinkText.variants.ts
  - path: LinkText.vue
    type: registry:ui
    target: components/ui/link-text/LinkText.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/link-text/index.ts
---

Use `LinkText` for inline text links that need consistent tone and underline treatment across the
app, such as body copy links or footer navigation. It renders an `<a>` by default but accepts
`as-child` to delegate rendering to another element (e.g. a router link).

```vue
<script setup lang="ts">
import { LinkText } from "@/components/ui/link-text";
</script>

<template>
  <p>
    Read our
    <LinkText href="/docs" tone="default" underline="hover">documentation</LinkText>
    to get started.
  </p>
</template>
```
