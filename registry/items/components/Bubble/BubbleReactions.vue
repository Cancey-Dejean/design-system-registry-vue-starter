<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { bubbleReactionsVariants, type BubbleReactionsVariants } from "./";
import { Primitive } from "reka-ui";
import { cn } from "@/lib/utils";

interface Props extends PrimitiveProps {
  side?: BubbleReactionsVariants["side"];
  align?: BubbleReactionsVariants["align"];
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  side: "bottom",
  align: "end",
  as: "div",
});
</script>

<template>
  <Primitive
    data-slot="bubble-reactions"
    :data-side="side"
    :data-align="align"
    :as="as"
    :as-child="asChild"
    :class="cn(bubbleReactionsVariants({ side, align }), props.class)"
  >
    <slot />
  </Primitive>
</template>
