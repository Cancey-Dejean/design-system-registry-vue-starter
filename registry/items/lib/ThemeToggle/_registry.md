---
name: theme-toggle
type: registry:lib
title: Theme Toggle
description: A persistent brand-palette selector.
localRegistryDependencies:
  - toggle-group
files:
  - path: ThemeToggle.vue
    type: registry:lib
    target: components/ui/theme-toggle/ThemeToggle.vue
  - path: themeToggle.ts
    type: registry:lib
    target: components/ui/theme-toggle/themeToggle.ts
  - path: index.ts
    type: registry:lib
    target: components/ui/theme-toggle/index.ts
---

A persistent brand-palette selector.

```vue
<script setup lang="ts">
import { ThemeToggle } from "@/components/ui/theme-toggle";
</script>

<template><ThemeToggle /></template>
```
