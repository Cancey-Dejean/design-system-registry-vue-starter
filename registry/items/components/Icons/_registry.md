---
name: icons
type: registry:ui
title: Icons
description: A namespaced icon registry with a renderer component, grid layout, and searchable gallery.
dependencies:
  - "@lucide/vue"
  - class-variance-authority
  - "@vueuse/core"
files:
  - path: index.ts
    type: registry:ui
    target: components/ui/icons/index.ts
  - path: icons.ts
    type: registry:ui
    target: components/ui/icons/icons.ts
  - path: IconGrid.vue
    type: registry:ui
    target: components/ui/icons/IconGrid.vue
  - path: IconGallery.vue
    type: registry:ui
    target: components/ui/icons/IconGallery.vue
  - path: Icon/Icon.vue
    type: registry:ui
    target: components/ui/icons/Icon/Icon.vue
  - path: Icon/Icon.types.ts
    type: registry:ui
    target: components/ui/icons/Icon/Icon.types.ts
  - path: Icon/Icon.variants.ts
    type: registry:ui
    target: components/ui/icons/Icon/Icon.variants.ts
  - path: IconSet/NavArrow.vue
    type: registry:ui
    target: components/ui/icons/IconSet/NavArrow.vue
  - path: IconSet/XCircleSolid.vue
    type: registry:ui
    target: components/ui/icons/IconSet/XCircleSolid.vue
---

Use `Icon` to render any icon by name from the shared `ICONS` map — it mixes Lucide icons with a few
custom SVGs (like `nav-arrow` and `x-circle-solid`) behind a single lookup so consumers never import
icon libraries directly. `IconGrid` lays out icons in a responsive grid, and `IconGallery` composes it
into a searchable, click-to-copy icon browser for docs.

```vue
<script setup lang="ts">
import { Icon } from "@/components/ui/icons";
</script>

<template>
  <Icon icon="shield-check" size="lg" class="text-primary" />
</template>
```

Add new icons by dropping a `.vue` file in `IconSet/` and registering it in `icons.ts`; the `IconKey`
type is derived from that map, so new entries are type-safe everywhere `Icon` is used.
