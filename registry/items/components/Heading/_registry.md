---
name: heading
type: registry:ui
title: Heading
description: A polymorphic heading element with configurable level, size, weight, and tone.
dependencies:
  - class-variance-authority
files:
  - path: Heading.types.ts
    type: registry:ui
    target: components/ui/heading/Heading.types.ts
  - path: Heading.variants.ts
    type: registry:ui
    target: components/ui/heading/Heading.variants.ts
  - path: Heading.vue
    type: registry:ui
    target: components/ui/heading/Heading.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/heading/index.ts
---

Use heading to keep visual size decoupled from semantic level — pick the `level` (1–6) that's
correct for document structure, and the `size`, `weight`, and `tone` that fit the design.

```vue
<script setup lang="ts">
import { Heading } from "@/components/ui/heading";
</script>

<template>
  <Heading :level="1" size="xl" tone="brand">Design System</Heading>
</template>
```
