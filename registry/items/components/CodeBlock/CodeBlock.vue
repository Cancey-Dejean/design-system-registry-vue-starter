<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import type { VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { codeBlockVariants } from "./CodeBlock.variants";
const props = withDefaults(
  defineProps<{
    variant?: VariantProps<typeof codeBlockVariants>["variant"];
    size?: VariantProps<typeof codeBlockVariants>["size"];
    class?: HTMLAttributes["class"];
  }>(),
  { variant: "default", size: "default" },
);
</script>
<template>
  <div
    data-slot="code-block"
    :data-variant="variant"
    :data-size="size"
    :class="cn(codeBlockVariants({ variant, size }), props.class)"
  >
    <slot />
  </div>
</template>
