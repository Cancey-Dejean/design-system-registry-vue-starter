<script setup lang="ts">
import { cn } from "cn";

const props = defineProps<{
  class?: string;
}>();
</script>

<template>
  <div
    data-slot="story-wrapper"
    :class="cn('mx-auto flex h-dvh w-full items-center justify-center', props.class)"
  >
    <slot />
  </div>
</template>
