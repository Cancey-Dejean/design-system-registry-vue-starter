---
name: range-calendar
type: registry:ui
title: Range Calendar
description: A calendar for selecting a date range, such as a start and end date.
dependencies:
  - reka-ui
  - "@lucide/vue"
  - "@vueuse/core"
localRegistryDependencies:
  - button
files:
  - path: RangeCalendar.vue
    type: registry:ui
    target: components/ui/range-calendar/RangeCalendar.vue
  - path: RangeCalendarCell.vue
    type: registry:ui
    target: components/ui/range-calendar/RangeCalendarCell.vue
  - path: RangeCalendarCellTrigger.vue
    type: registry:ui
    target: components/ui/range-calendar/RangeCalendarCellTrigger.vue
  - path: RangeCalendarGrid.vue
    type: registry:ui
    target: components/ui/range-calendar/RangeCalendarGrid.vue
  - path: RangeCalendarGridBody.vue
    type: registry:ui
    target: components/ui/range-calendar/RangeCalendarGridBody.vue
  - path: RangeCalendarGridHead.vue
    type: registry:ui
    target: components/ui/range-calendar/RangeCalendarGridHead.vue
  - path: RangeCalendarGridRow.vue
    type: registry:ui
    target: components/ui/range-calendar/RangeCalendarGridRow.vue
  - path: RangeCalendarHeadCell.vue
    type: registry:ui
    target: components/ui/range-calendar/RangeCalendarHeadCell.vue
  - path: RangeCalendarHeader.vue
    type: registry:ui
    target: components/ui/range-calendar/RangeCalendarHeader.vue
  - path: RangeCalendarHeading.vue
    type: registry:ui
    target: components/ui/range-calendar/RangeCalendarHeading.vue
  - path: RangeCalendarNextButton.vue
    type: registry:ui
    target: components/ui/range-calendar/RangeCalendarNextButton.vue
  - path: RangeCalendarPrevButton.vue
    type: registry:ui
    target: components/ui/range-calendar/RangeCalendarPrevButton.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/range-calendar/index.ts
---

Use range calendar when a user needs to pick a start and end date together, such as a booking or
report date range. For a single date, use `Calendar` instead.

```vue
<script setup lang="ts">
import { RangeCalendar } from "@/components/ui/range-calendar";
</script>

<template>
  <RangeCalendar class="rounded-md border" />
</template>
```

`RangeCalendar` renders its own grid, header, and navigation internally from the `grid`/`weekDays`
slot data reka-ui provides, so most usages only need the root component. Built on
[reka-ui's Range Calendar](https://reka-ui.com/docs/components/range-calendar); pass `v-model:model-value`
with a `{ start, end }` `DateRange` to control the selection, and `number-of-months` to show multiple
months side by side.
