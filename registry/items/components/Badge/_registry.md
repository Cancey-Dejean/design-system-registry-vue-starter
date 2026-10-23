---
name: badge
type: registry:ui
title: Badge
description: Displays a badge or a component that looks like a badge.
dependencies:
  - "@vueuse/core"
  - class-variance-authority
  - reka-ui
files:
  - path: Badge.vue
    type: registry:ui
    target: components/ui/badge/Badge.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/badge/index.ts
---

Use badges for status, counts, labels, and compact metadata.

```vue
<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
</script>

<template>
  <Badge>Badge</Badge>
</template>
```

Variants: `default`, `secondary`, `destructive`, `outline`, `ghost`, and `link`. Render as a link by
passing an `as="a"` (or `as-child`) prop.
