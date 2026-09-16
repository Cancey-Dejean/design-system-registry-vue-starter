<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"];
    /** Vertical fades top/bottom; horizontal fades start/end edges. */
    orientation?: "vertical" | "horizontal";
    /** Hide the native scrollbar (recommended with fade masks). */
    hideScrollbar?: boolean;
  }>(),
  {
    orientation: "vertical",
    hideScrollbar: true,
  },
);
</script>

<template>
  <div
    data-slot="scroll-fade"
    :data-orientation="orientation"
    :class="
      cn(
        orientation === 'horizontal'
          ? 'scroll-fade-x overflow-x-auto'
          : 'scroll-fade overflow-y-auto',
        hideScrollbar && 'scrollbar-none',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
