---
name: scroll-area
type: registry:ui
title: Scroll Area
description: Augments native scroll functionality for custom, cross-browser styling.
dependencies:
  - reka-ui
  - "@vueuse/core"
files:
  - path: ScrollArea.vue
    type: registry:ui
    target: components/ui/scroll-area/ScrollArea.vue
  - path: ScrollBar.vue
    type: registry:ui
    target: components/ui/scroll-area/ScrollBar.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/scroll-area/index.ts
---

Use scroll area when you need a scrollable region with a custom, consistently-styled scrollbar
instead of relying on the browser's native one — useful for lists, menus, and long content
inside constrained containers.

```vue
<script setup lang="ts">
import { ScrollArea } from "@/components/ui/scroll-area";

const tags = Array.from({ length: 20 }, (_, index) => `Tag ${index + 1}`);
</script>

<template>
  <ScrollArea class="h-72 w-48 rounded-md border">
    <div class="p-4">
      <h4 class="mb-4 text-sm font-medium">Tags</h4>
      <div v-for="tag in tags" :key="tag" class="text-sm">
        {{ tag }}
      </div>
    </div>
  </ScrollArea>
</template>
```

Built on [reka-ui's ScrollArea](https://reka-ui.com/docs/components/scroll-area) primitive.
