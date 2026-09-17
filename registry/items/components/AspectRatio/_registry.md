---
name: aspect-ratio
type: registry:ui
title: Aspect Ratio
description: Displays content within a fixed, desired width-to-height ratio.
dependencies:
  - reka-ui
files:
  - path: AspectRatio.vue
    type: registry:ui
    target: components/ui/aspect-ratio/AspectRatio.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/aspect-ratio/index.ts
---

Use aspect ratio to constrain media like images, videos, or embeds so they scale predictably
without layout shift. Pass the desired ratio via the `ratio` prop and size the content to fill it.

```vue
<script setup lang="ts">
import { AspectRatio } from "@/components/ui/aspect-ratio";
</script>

<template>
  <AspectRatio :ratio="16 / 9" class="bg-muted rounded-lg">
    <img
      src="/images/photo.jpg"
      alt="A scenic landscape"
      class="h-full w-full rounded-lg object-cover"
    />
  </AspectRatio>
</template>
```

Built on [reka-ui's Aspect Ratio](https://reka-ui.com/docs/components/aspect-ratio).
