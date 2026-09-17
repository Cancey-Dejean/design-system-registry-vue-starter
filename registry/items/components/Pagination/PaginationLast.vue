<script setup lang="ts">
import type { PaginationLastProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { ChevronRightIcon } from "@lucide/vue";
import { reactiveOmit } from "@vueuse/core";
import { PaginationLast, useForwardProps } from "reka-ui";
import { cn } from "@/lib/utils";
import { buttonVariants, type ButtonSize } from "../Button";


const props = withDefaults(
  defineProps<
    PaginationLastProps & {
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
  <PaginationLast
    data-slot="pagination-last"
    :class="cn(buttonVariants({ variant: 'ghost', size }), 'gap-1 px-2.5 sm:pl-2.5', props.class)"
    v-bind="forwarded"
  >
    <slot>
      <span class="hidden sm:block">Last</span>
      <ChevronRightIcon />
    </slot>
  </PaginationLast>
</template>
