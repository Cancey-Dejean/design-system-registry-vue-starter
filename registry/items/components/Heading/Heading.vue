<script setup lang="ts">
import { cn } from "@/lib/utils";
import { headingVariants, type HeadingProps } from "./";

const props = withDefaults(defineProps<HeadingProps>(), {
  level: 1,
  weight: "semibold",
  tone: "default",
});

const tag = `h${props.level}` as `h${typeof props.level}`;
</script>

<template>
  <component
    :is="tag"
    data-slot="heading"
    :data-size="level"
    :class="cn(headingVariants({ size, weight, tone }), props.class)"
  >
    <slot />
  </component>
</template>
