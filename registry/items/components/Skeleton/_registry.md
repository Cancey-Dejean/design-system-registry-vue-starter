---
name: skeleton
type: registry:ui
title: Skeleton
description: Use to show a placeholder while content is loading.
files:
  - path: Skeleton.vue
    type: registry:ui
    target: components/ui/skeleton/Skeleton.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/skeleton/index.ts
---

Use skeletons to reserve layout space and hint at incoming content shape while data is loading,
reducing perceived latency and layout shift compared to a blank container or spinner.

```vue
<script setup lang="ts">
import { Skeleton } from "@/components/ui/skeleton";
</script>

<template>
  <div class="flex items-center gap-4">
    <Skeleton class="size-12 rounded-full" />
    <div class="flex flex-col gap-2">
      <Skeleton class="h-4 w-[250px]" />
      <Skeleton class="h-4 w-[200px]" />
    </div>
  </div>
</template>
```
