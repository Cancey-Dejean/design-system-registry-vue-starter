<script setup lang="ts">
import type { LinkSpreadProps } from ".";
import { cn } from "cn";

const props = withDefaults(defineProps<LinkSpreadProps>(), {
  external: false,
});
</script>

<template>
  <a
    data-slot="link-spread"
    :href="props.href || '#'"
    :class="
      cn(
        'absolute inset-0 z-10',
        props.href ? 'pointer-events-auto' : 'pointer-events-none',
        props.class,
      )
    "
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
  />
</template>
