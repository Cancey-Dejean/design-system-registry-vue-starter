<script setup lang="ts">
import type { DateRange } from "reka-ui";
import type { Ref } from "vue";
import { getLocalTimeZone, today } from "@internationalized/date";
import { ref } from "vue";
import { RangeCalendar } from ".";

const start = today(getLocalTimeZone());
const dateRange = ref({ start, end: start.add({ days: 6 }) }) as Ref<DateRange>;
</script>

<template>
  <RangeCalendar v-model="dateRange" class="rounded-md border shadow-sm" />
</template>
