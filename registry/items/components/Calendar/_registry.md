---
name: calendar
type: registry:ui
title: Calendar
description: A date field component that allows users to enter and edit dates, and navigate by month and year.
dependencies:
  - reka-ui
  - "@vueuse/core"
  - "@lucide/vue"
localRegistryDependencies:
  - button
  - native-select
files:
  - path: Calendar.types.ts
    type: registry:ui
    target: components/ui/calendar/Calendar.types.ts
  - path: Calendar.vue
    type: registry:ui
    target: components/ui/calendar/Calendar.vue
  - path: CalendarCell.vue
    type: registry:ui
    target: components/ui/calendar/CalendarCell.vue
  - path: CalendarCellTrigger.vue
    type: registry:ui
    target: components/ui/calendar/CalendarCellTrigger.vue
  - path: CalendarGrid.vue
    type: registry:ui
    target: components/ui/calendar/CalendarGrid.vue
  - path: CalendarGridBody.vue
    type: registry:ui
    target: components/ui/calendar/CalendarGridBody.vue
  - path: CalendarGridHead.vue
    type: registry:ui
    target: components/ui/calendar/CalendarGridHead.vue
  - path: CalendarGridRow.vue
    type: registry:ui
    target: components/ui/calendar/CalendarGridRow.vue
  - path: CalendarHeadCell.vue
    type: registry:ui
    target: components/ui/calendar/CalendarHeadCell.vue
  - path: CalendarHeader.vue
    type: registry:ui
    target: components/ui/calendar/CalendarHeader.vue
  - path: CalendarHeading.vue
    type: registry:ui
    target: components/ui/calendar/CalendarHeading.vue
  - path: CalendarNextButton.vue
    type: registry:ui
    target: components/ui/calendar/CalendarNextButton.vue
  - path: CalendarPrevButton.vue
    type: registry:ui
    target: components/ui/calendar/CalendarPrevButton.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/calendar/index.ts
---

Use calendar for standalone date picking, or compose it inside a `Popover` to build a date-picker
field. Pass `layout="month-and-year"` to swap the heading for quick month/year `NativeSelect`
dropdowns, which is useful for birthdates or other dates far from today.

```vue
<script setup lang="ts">
import { getLocalTimeZone, today } from "@internationalized/date";
import { ref } from "vue";
import { Calendar } from "@/components/ui/calendar";

const value = ref(today(getLocalTimeZone()));
</script>

<template>
  <Calendar v-model="value" layout="month-and-year" class="rounded-lg border" />
</template>
```

Built on [reka-ui's Calendar](https://reka-ui.com/docs/components/calendar) and the
[`@internationalized/date`](https://react-spectrum.adobe.com/internationalized/date/index.html)
library for locale-aware date values — install it alongside this component if it isn't already a
dependency. Month/year navigation buttons reuse `Button`'s outline variant, and the layout
dropdowns reuse `NativeSelect`.
