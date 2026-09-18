<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "cn";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div
    data-slot="attachment-group"
    :class="
      cn(
        'flex min-w-0 snap-x snap-mandatory scroll-px-1 gap-3 overflow-x-auto overscroll-x-contain scroll-fade-x py-1 scrollbar-none *:data-[slot=attachment]:flex-none *:data-[slot=attachment]:snap-start',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
