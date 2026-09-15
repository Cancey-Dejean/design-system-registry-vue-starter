<script setup lang="ts">
import { cn } from "cn";
import type { HTMLAttributes } from "vue";

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"];
  }>(),
  {},
);
</script>

<template>
  <section :class="cn('isolate relative', props.class)" v-bind="$attrs">
    <slot />
  </section>
</template>
