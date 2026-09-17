<script setup lang="ts">
import type { DateValue } from "@internationalized/date";
import { ref } from "vue";
import { DatePicker } from ".";

const date = ref<DateValue>();
</script>

<template>
  <DatePicker v-model="date" placeholder="Pick a travel date" />
</template>
