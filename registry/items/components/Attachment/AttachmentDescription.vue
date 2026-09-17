<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <span
    data-slot="attachment-description"
    :class="
      cn(
        'mt-0.5 block max-w-full min-w-0 truncate text-xs text-muted-foreground group-data-[state=error]/attachment:text-destructive/80',
        props.class,
      )
    "
  >
    <slot />
  </span>
</template>
