<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import type { PrimitiveProps } from "reka-ui";
import { Primitive } from "reka-ui";
import { cn } from "cn";

const props = withDefaults(
  defineProps<
    PrimitiveProps & {
      class?: HTMLAttributes["class"];
    }
  >(),
  {
    as: "p",
  },
);
</script>

<template>
  <Primitive data-slot="shimmer" :as="as" :as-child="asChild" :class="cn('shimmer', props.class)">
    <slot />
  </Primitive>
</template>
