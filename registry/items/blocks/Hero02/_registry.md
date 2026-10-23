---
name: hero-02
type: registry:block
title: Hero02
description: An alternate entry point for the reference cloud product hero.
categories:
  - hero
localRegistryDependencies:
  - hero-01
files:
  - path: Hero02.vue
    type: registry:block
    target: components/blocks/hero-02/Hero02.vue
  - path: index.ts
    type: registry:block
    target: components/blocks/hero-02/index.ts
---

An alternate entry point for the reference cloud product hero.

```vue
<script setup lang="ts">
import { Hero02 } from "@/components/blocks/hero-02";
</script>

<template><Hero02 /></template>
```
