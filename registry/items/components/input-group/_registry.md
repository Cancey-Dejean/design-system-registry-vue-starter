---
name: input-group
type: registry:ui
title: Input Group
description: Groups an input with addons, icons, and inline actions.
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
  - path: index.ts
    type: registry:ui
    target: components/ui/input-group/index.ts
---

A small supporting primitive used by `command`'s search input — not part of the original 15-component
batch, added because both source and shadcn-vue's own `command` component depend on it.

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
