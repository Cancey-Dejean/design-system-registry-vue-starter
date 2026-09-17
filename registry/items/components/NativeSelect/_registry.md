---
name: native-select
type: registry:ui
title: Native Select
description: A styled wrapper around the native HTML select element.
dependencies:
  - reka-ui
  - "@lucide/vue"
  - "@vueuse/core"
files:
  - path: NativeSelect.vue
    type: registry:ui
    target: components/ui/native-select/NativeSelect.vue
  - path: NativeSelectOptGroup.vue
    type: registry:ui
    target: components/ui/native-select/NativeSelectOptGroup.vue
  - path: NativeSelectOption.vue
    type: registry:ui
    target: components/ui/native-select/NativeSelectOption.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/native-select/index.ts
---

Reach for native select over `Select` when you want the browser's own picker — mobile wheel pickers,
built-in keyboard search, and no JavaScript-driven positioning — while keeping the same visual language.

```vue
<script setup lang="ts">
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "@/components/ui/native-select";
</script>

<template>
  <NativeSelect v-model="fruit">
    <NativeSelectOption value="apple">Apple</NativeSelectOption>
    <NativeSelectOption value="banana">Banana</NativeSelectOption>
    <NativeSelectOptGroup label="Citrus">
      <NativeSelectOption value="orange">Orange</NativeSelectOption>
      <NativeSelectOption value="lemon">Lemon</NativeSelectOption>
    </NativeSelectOptGroup>
  </NativeSelect>
</template>
```

Supports `v-model`, disabled state, and `aria-invalid` styling for form errors.
