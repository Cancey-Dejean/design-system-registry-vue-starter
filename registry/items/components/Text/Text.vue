<script setup lang="ts">
import { cn } from "cn";
import { textVariants, type TextProps } from "./";
import { Primitive } from "reka-ui";

const props = withDefaults(defineProps<TextProps>(), {
  as: "p",
  size: "md",
  weight: "regular",
  tone: "default",
  align: "left",
});
</script>

<template>
  <Primitive
    data-slot="text"
    :as="as"
    :as-child="asChild"
    :class="cn(textVariants({ size, weight, tone, align }), props.class)"
  >
    <slot />
  </Primitive>
</template>
