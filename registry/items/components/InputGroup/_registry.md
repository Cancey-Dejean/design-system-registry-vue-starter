---
name: input-group
type: registry:ui
title: Input Group
description: Groups an input with addons, icons, and inline actions.
dependencies:
  - class-variance-authority
localRegistryDependencies:
  - button
  - input
  - textarea
files:
  - path: InputGroup.vue
    type: registry:ui
    target: components/ui/input-group/InputGroup.vue
  - path: InputGroupAddon.vue
    type: registry:ui
    target: components/ui/input-group/InputGroupAddon.vue
  - path: InputGroupText.vue
    type: registry:ui
    target: components/ui/input-group/InputGroupText.vue
  - path: InputGroupButton.vue
    type: registry:ui
    target: components/ui/input-group/InputGroupButton.vue
  - path: InputGroupInput.vue
    type: registry:ui
    target: components/ui/input-group/InputGroupInput.vue
  - path: InputGroupTextarea.vue
    type: registry:ui
    target: components/ui/input-group/InputGroupTextarea.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/input-group/index.ts
---

Compose an input or textarea with icons, text, and actions using the Input Group primitives.
Installing this item includes its public input, textarea, and button components and their dependencies.

```vue
<script setup lang="ts">
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import { SearchIcon } from "@lucide/vue";
</script>

<template>
  <InputGroup>
    <input class="w-full text-sm outline-none" placeholder="Search..." />
    <InputGroupAddon>
      <SearchIcon class="size-4 opacity-50" />
    </InputGroupAddon>
  </InputGroup>
</template>
```
