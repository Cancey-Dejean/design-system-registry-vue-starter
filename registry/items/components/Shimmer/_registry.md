---
name: shimmer
type: registry:ui
title: Shimmer
description: An animated shimmering text or inline-content effect.
dependencies:
  - reka-ui
files:
  - path: Shimmer.vue
    type: registry:ui
    target: components/ui/shimmer/Shimmer.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/shimmer/index.ts
---

Use shimmer to draw attention to short pieces of text, such as a loading label or a highlighted
callout, without the block-level placeholder look of a skeleton. Pass `as-child` to apply the
effect to an existing element instead of the default `<p>`.

```vue
<script setup lang="ts">
import { Shimmer } from "@/components/ui/shimmer";
</script>

<template>
  <Shimmer class="text-sm font-medium">Generating response...</Shimmer>
</template>
```

Built on [reka-ui's Primitive](https://reka-ui.com/docs/utilities/primitive) so it can render as
any element via the `as` prop.
