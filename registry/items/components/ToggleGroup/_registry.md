---
name: toggle-group
type: registry:ui
title: Toggle Group
description: A set of two-state buttons that can be toggled on or off, grouped together.
dependencies:
  - reka-ui
  - "@vueuse/core"
localRegistryDependencies:
  - toggle
files:
  - path: ToggleGroup.vue
    type: registry:ui
    target: components/ui/toggle-group/ToggleGroup.vue
  - path: ToggleGroupItem.vue
    type: registry:ui
    target: components/ui/toggle-group/ToggleGroupItem.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/toggle-group/index.ts
---

Use toggle group for a related set of options, such as text alignment or a multi-select filter
bar. `variant`, `size`, and `spacing` set on the root are provided to every `ToggleGroupItem` —
installing `toggle-group` also installs `toggle`, which supplies the shared button styles.

```vue
<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
</script>

<template>
  <ToggleGroup type="single" default-value="center">
    <ToggleGroupItem value="left">Left</ToggleGroupItem>
    <ToggleGroupItem value="center">Center</ToggleGroupItem>
    <ToggleGroupItem value="right">Right</ToggleGroupItem>
  </ToggleGroup>
</template>
```
