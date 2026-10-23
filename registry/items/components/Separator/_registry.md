---
name: separator
type: registry:ui
title: Separator
description: Visually or semantically separates content.
dependencies:
  - "@vueuse/core"
  - reka-ui
files:
  - path: Separator.vue
    type: registry:ui
    target: components/ui/separator/Separator.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/separator/index.ts
---

Use a separator to divide content groups horizontally or vertically.

```vue
<script setup lang="ts">
import { Separator } from "@/components/ui/separator";
</script>

<template>
  <div>
    <div>Section one</div>
    <Separator class="my-4" />
    <div>Section two</div>
  </div>
</template>
```

Pass `orientation="vertical"` for an upright divider.
