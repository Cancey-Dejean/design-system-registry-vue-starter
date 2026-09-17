---
name: number-field
type: registry:ui
title: Number Field
description: An input for entering a number, with increment and decrement controls.
dependencies:
  - reka-ui
  - "@lucide/vue"
  - "@vueuse/core"
files:
  - path: NumberField.vue
    type: registry:ui
    target: components/ui/number-field/NumberField.vue
  - path: NumberFieldContent.vue
    type: registry:ui
    target: components/ui/number-field/NumberFieldContent.vue
  - path: NumberFieldDecrement.vue
    type: registry:ui
    target: components/ui/number-field/NumberFieldDecrement.vue
  - path: NumberFieldIncrement.vue
    type: registry:ui
    target: components/ui/number-field/NumberFieldIncrement.vue
  - path: NumberFieldInput.vue
    type: registry:ui
    target: components/ui/number-field/NumberFieldInput.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/number-field/index.ts
---

Use number field for quantity, currency, or other numeric inputs that benefit from stepper controls
and built-in min/max/step clamping, instead of a plain `Input` with `type="number"`.

```vue
<script setup lang="ts">
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field";
</script>

<template>
  <NumberField :default-value="1" :min="0" :max="10">
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>
```

Built on [reka-ui's Number Field](https://reka-ui.com/docs/components/number-field); supports
`v-model`, `disabled`, and keyboard arrow/page-up/page-down stepping.
