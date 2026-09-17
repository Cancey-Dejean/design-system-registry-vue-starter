---
name: slider
type: registry:ui
title: Slider
description: An input where the user selects a value from within a given range.
dependencies:
  - reka-ui
  - "@vueuse/core"
files:
  - path: Slider.vue
    type: registry:ui
    target: components/ui/slider/Slider.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/slider/index.ts
---

Use slider for numeric inputs with a bounded range, such as volume, price filters, or
brightness, where dragging feels more natural than typing a number. It renders one thumb per
value in `model-value`, so binding an array gives you a range slider for free.

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Slider } from "@/components/ui/slider";

const value = ref([50]);
</script>

<template>
  <Slider v-model="value" :max="100" :step="1" class="w-[60%]" />
</template>
```

Built on [reka-ui's Slider](https://reka-ui.com/docs/components/slider) primitive.
