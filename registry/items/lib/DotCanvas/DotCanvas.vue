<script setup lang="ts">
import { cn } from "cn";
import type { HTMLAttributes } from "vue";
import { DOT_CANVAS_PITCH, type DotCanvasSize } from "./dotCanvas";
const props = withDefaults(
  defineProps<{ size?: DotCanvasSize; class?: HTMLAttributes["class"] }>(),
  { size: 24 },
);
</script>
<template>
  <div
    aria-hidden="true"
    data-slot="dot-canvas"
    :class="
      cn(
        'pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--color-border)_1px,transparent_0)]',
        DOT_CANVAS_PITCH[size],
        props.class,
      )
    "
  />
</template>
