<script setup lang="ts">
import type { HTMLAttributes, VNodeChild } from "vue";
import type { VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { codeBlockLineVariants } from "./CodeBlock.variants";
const props = withDefaults(
  defineProps<{
    variant?: VariantProps<typeof codeBlockLineVariants>["variant"];
    content?: VNodeChild;
    class?: HTMLAttributes["class"];
  }>(),
  { variant: "default" },
);
const renderContent = () =>
  props.content === "" ||
  props.content == null ||
  (Array.isArray(props.content) && props.content.length === 0)
    ? "\n"
    : props.content;
</script>
<template>
  <span
    data-slot="code-block-line"
    :data-variant="variant"
    :class="cn(codeBlockLineVariants({ variant }), props.class)"
  >
    <span data-slot="code-block-line-content" class="min-w-0"
      ><slot><component :is="renderContent" /></slot
    ></span>
  </span>
</template>
