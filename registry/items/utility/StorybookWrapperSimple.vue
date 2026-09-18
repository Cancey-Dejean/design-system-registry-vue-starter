<script setup lang="ts">
import { cn } from "cn";

const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <div :class="cn('mx-auto flex min-h-50 w-full items-center justify-center', props.class)">
    <slot />
  </div>
</template>
