<script setup lang="ts">
import type { ButtonSize, ButtonVariant } from "../Button/Button.types";
import type { WithClassAsProps } from "./interface";
import { ArrowRight } from "@lucide/vue";
import { cn } from "cn";
import Button from "../Button/Button.vue";
import { useCarousel } from "./useCarousel";

const props = withDefaults(
  defineProps<
    {
      variant?: ButtonVariant;
      size?: ButtonSize;
      icon?: boolean;
    } & WithClassAsProps
  >(),
  {
    variant: "outline",
    size: "icon-md",
    icon: true,
  },
);

const { orientation, canScrollNext, scrollNext } = useCarousel();
</script>

<template>
  <Button
    data-slot="carousel-next"
    :disabled="!canScrollNext"
    :class="
      cn(
        'absolute size-8 rounded-full',
        orientation === 'horizontal'
          ? 'top-1/2 -right-12 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        props.class,
      )
    "
    :variant="variant"
    :size="size"
    :icon="icon"
    @click="scrollNext"
  >
    <slot>
      <ArrowRight />
      <span class="sr-only">Next Slide</span>
    </slot>
  </Button>
</template>
