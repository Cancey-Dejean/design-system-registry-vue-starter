---
name: radio-group
type: registry:ui
title: Radio Group
description: A set of checkable buttons where only one item can be checked at a time.
dependencies:
  - reka-ui
  - "@lucide/vue"
  - "@vueuse/core"
files:
  - path: RadioGroup.vue
    type: registry:ui
    target: components/ui/radio-group/RadioGroup.vue
  - path: RadioGroupItem.vue
    type: registry:ui
    target: components/ui/radio-group/RadioGroupItem.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/radio-group/index.ts
---

Use radio group for single-choice selection among a small set of mutually exclusive options,
such as a settings form or a plan picker.

```vue
<script setup lang="ts">
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
</script>

<template>
  <RadioGroup default-value="comfortable" class="flex flex-col gap-3">
    <div class="flex items-center gap-2">
      <RadioGroupItem id="r1" value="default" />
      <label for="r1">Default</label>
    </div>
    <div class="flex items-center gap-2">
      <RadioGroupItem id="r2" value="comfortable" />
      <label for="r2">Comfortable</label>
    </div>
    <div class="flex items-center gap-2">
      <RadioGroupItem id="r3" value="compact" />
      <label for="r3">Compact</label>
    </div>
  </RadioGroup>
</template>
```

Supports `v-model`, `disabled`, and `aria-invalid` styling for form errors. Built on
[reka-ui's Radio Group](https://reka-ui.com/docs/components/radio-group).
