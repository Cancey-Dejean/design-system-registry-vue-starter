<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <svg aria-hidden="true" :class="cn(props.class)" viewBox="0 0 13 13" width="10" height="10">
    <path d="M1 12L12.5 0.499965" stroke="currentColor" stroke-width="1" fill="none" />
    <path d="M1 0.5H12.5V12" stroke="currentColor" stroke-width="1" fill="none" />
  </svg>
</template>
