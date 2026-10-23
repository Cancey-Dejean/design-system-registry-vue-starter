---
name: hero-01
type: registry:block
title: Hero01
description: A cloud product hero with announcement, calls to action, and an application screenshot.
categories:
  - hero
dependencies:
  - "@lucide/vue"
localRegistryDependencies:
  - button
files:
  - path: Hero01.vue
    type: registry:block
    target: components/blocks/hero-01/Hero01.vue
  - path: index.ts
    type: registry:block
    target: components/blocks/hero-01/index.ts
---

A cloud product hero with announcement, calls to action, and an application screenshot.

```vue
<script setup lang="ts">
import { Hero01 } from "@/components/blocks/hero-01";
</script>

<template><Hero01 /></template>
```
