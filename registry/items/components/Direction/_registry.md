---
name: direction
type: registry:ui
title: Direction
description: A provider for left-to-right and right-to-left component direction.
dependencies:
  - "reka-ui"
files:
  - path: Direction.types.ts
    type: registry:ui
    target: components/ui/direction/Direction.types.ts
  - path: Direction.vue
    type: registry:ui
    target: components/ui/direction/Direction.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/direction/index.ts
---

Set component reading direction with `DirectionProvider`. It provides Reka UI's direction context without adding a DOM wrapper. Also set `dir` on your document or local layout container so native browser layout follows the same direction.

```vue
<script setup lang="ts">
import { DirectionProvider } from "@/components/ui/direction";
</script>

<template>
  <DirectionProvider direction="rtl">
    <main dir="rtl">مرحبا بالعالم</main>
  </DirectionProvider>
</template>
```

Descendants can import `useDirection` from the same barrel. It returns a reactive computed ref (`direction.value` in scripts) using the nearest provider. Omit `direction` for `ltr`. The provider can be nested to override direction for part of a page; it preserves inherited locale, scroll policy, nonce, teleport target, and SSR ID configuration.
