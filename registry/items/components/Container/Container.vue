<script setup lang="ts">
import { cn } from "cn";
import { containerVariants, type ContainerProps } from "./";

const props = withDefaults(defineProps<ContainerProps>(), {
  size: "base",
});
</script>

<template>
  <div
    data-slot="container"
    :data-size="size"
    :class="cn(containerVariants({ size }), props.class)"
  >
    <slot />
  </div>
</template>
