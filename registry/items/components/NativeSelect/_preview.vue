<script setup lang="ts">
import { NativeSelect, NativeSelectOption } from ".";
</script>

<template>
  <NativeSelect class="w-full max-w-xs" aria-label="Status">
    <NativeSelectOption value="">Select status</NativeSelectOption>
    <NativeSelectOption value="todo">Todo</NativeSelectOption>
    <NativeSelectOption value="in-progress">In Progress</NativeSelectOption>
    <NativeSelectOption value="done">Done</NativeSelectOption>
    <NativeSelectOption value="cancelled">Cancelled</NativeSelectOption>
  </NativeSelect>
</template>
