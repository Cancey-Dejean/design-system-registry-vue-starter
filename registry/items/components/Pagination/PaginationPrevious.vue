<script setup lang="ts">
import type { PaginationPrevProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { ChevronLeftIcon } from "@lucide/vue";
import { reactiveOmit } from "@vueuse/core";
import { PaginationPrev, useForwardProps } from "reka-ui";
import { cn } from "@/lib/utils";
import { buttonVariants, type ButtonSize } from "../Button";

const props = withDefaults(
  defineProps<
    PaginationPrevProps & {
      size?: ButtonSize;
      class?: HTMLAttributes["class"];
    }
  >(),
  {
    size: "md",
  },
);

const delegatedProps = reactiveOmit(props, "class", "size");
const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <PaginationPrev
    data-slot="pagination-previous"
    :class="cn(buttonVariants({ variant: 'ghost', size }), 'gap-1 px-2.5 sm:pr-2.5', props.class)"
    v-bind="forwarded"
  >
    <slot>
      <ChevronLeftIcon />
      <span class="hidden sm:block">Previous</span>
    </slot>
  </PaginationPrev>
</template>
