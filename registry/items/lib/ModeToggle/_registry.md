---
name: mode-toggle
type: registry:lib
title: Mode Toggle
description: A persistent light, dark, and system color-mode control.
dependencies:
  - "@lucide/vue"
localRegistryDependencies:
  - button
files:
  - path: ModeToggle.vue
    type: registry:lib
    target: components/ui/mode-toggle/ModeToggle.vue
  - path: modeToggle.ts
    type: registry:lib
    target: components/ui/mode-toggle/modeToggle.ts
  - path: index.ts
    type: registry:lib
    target: components/ui/mode-toggle/index.ts
---

A persistent light, dark, and system color-mode control.

```vue
<script setup lang="ts">
import { ModeToggle } from "@/components/ui/mode-toggle";
</script>

<template><ModeToggle /></template>
```
