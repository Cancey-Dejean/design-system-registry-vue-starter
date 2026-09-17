---
name: date-picker
type: registry:ui
title: Date Picker
description: A popover-driven calendar for picking a single date from a button-style trigger.
dependencies:
  - "@internationalized/date"
  - "@lucide/vue"
localRegistryDependencies:
  - button
  - calendar
  - popover
files:
  - path: DatePicker.vue
    type: registry:ui
    target: components/ui/date-picker/DatePicker.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/date-picker/index.ts
---

Use the date picker for a single-date field where a full inline calendar would take up too much
space — it opens a `Calendar` inside a `Popover`, triggered by a `Button` styled to look like a
text input. It supports `v-model` for the selected `DateValue`.

```vue
<script setup lang="ts">
import type { DateValue } from "@internationalized/date";
import { ref } from "vue";
import { DatePicker } from "@/components/ui/date-picker";

const date = ref<DateValue>();
</script>

<template>
  <DatePicker v-model="date" placeholder="Pick a date" />
</template>
```
