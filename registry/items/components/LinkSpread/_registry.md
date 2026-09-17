---
name: link-spread
type: registry:ui
title: Link Spread
description: An invisible full-coverage link overlay that makes an entire card or row clickable.
dependencies:
  - reka-ui
files:
  - path: LinkSpread.types.ts
    type: registry:ui
    target: components/ui/link-spread/LinkSpread.types.ts
  - path: LinkSpread.vue
    type: registry:ui
    target: components/ui/link-spread/LinkSpread.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/link-spread/index.ts
---

Use `LinkSpread` on a `relative` container to make the whole element clickable while keeping nested
interactive elements (buttons, other links) reachable — position it absolutely and give focusable
inner elements a higher `z-index` so they stay clickable above the overlay.

```vue
<script setup lang="ts">
import { LinkSpread } from "@/components/ui/link-spread";
</script>

<template>
  <div class="relative rounded-lg border p-4">
    <LinkSpread href="/posts/hello-world" />
    <h3 class="relative z-20 font-medium">Hello world</h3>
    <p class="relative z-20 text-sm text-muted-foreground">Click anywhere on this card.</p>
  </div>
</template>
```
