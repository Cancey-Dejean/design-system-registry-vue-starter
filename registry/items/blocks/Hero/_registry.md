---
name: hero
type: registry:block
title: Hero
description: A marketing hero section with a heading, supporting copy, primary and secondary CTAs, and a tiled image gallery.
files:
  - path: Hero.vue
    type: registry:block
    target: components/hero/Hero.vue
  - path: index.ts
    type: registry:block
    target: components/hero/index.ts
---

Drop `Hero` at the top of a marketing page. It's self-contained and fills the available width.

```vue
<script setup lang="ts">
import { Hero } from "@/components/hero";
</script>

<template>
  <Hero />
</template>
```
