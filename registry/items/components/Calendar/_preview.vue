<script setup lang="ts">
import type { DateValue } from "@internationalized/date";
import type { Ref } from "vue";
import { getLocalTimeZone, today } from "@internationalized/date";
import { ref } from "vue";
import { Calendar } from ".";

const date = ref(today(getLocalTimeZone())) as Ref<DateValue>;
</script>

<template>
  <Calendar v-model="date" class="rounded-md border shadow-sm" />
</template>
