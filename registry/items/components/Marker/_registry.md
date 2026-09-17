---
name: marker
type: registry:ui
title: Marker
description: A compact inline marker for labeling content, with an optional icon and separator style.
dependencies:
  - reka-ui
  - class-variance-authority
files:
  - path: Marker.vue
    type: registry:ui
    target: components/ui/marker/Marker.vue
  - path: MarkerContent.vue
    type: registry:ui
    target: components/ui/marker/MarkerContent.vue
  - path: MarkerContent.variants.ts
    type: registry:ui
    target: components/ui/marker/MarkerContent.variants.ts
  - path: MarkerIcon.vue
    type: registry:ui
    target: components/ui/marker/MarkerIcon.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/marker/index.ts
---

Use `Marker` for small metadata labels — timestamps, statuses, or section dividers. Pass
`variant="separator"` to draw flanking rules on either side of the content (useful for "OR" dividers),
or `variant="border"` for a simple bottom-bordered label row.

```vue
<script setup lang="ts">
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";
import { Icon } from "@/components/ui/icons";
</script>

<template>
  <Marker variant="separator">
    <MarkerIcon>
      <Icon icon="check" />
    </MarkerIcon>
    <MarkerContent>Verified</MarkerContent>
  </Marker>
</template>
```
