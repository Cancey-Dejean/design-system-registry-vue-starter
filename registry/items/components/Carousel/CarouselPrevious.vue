<script setup lang="ts">
import type { ButtonSize, ButtonVariant } from "../Button/Button.types";
import type { WithClassAsProps } from "./interface";
import { ArrowLeft } from "@lucide/vue";
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

const { orientation, canScrollPrev, scrollPrev } = useCarousel();
</script>

<template>
  <Button
    data-slot="carousel-previous"
    :disabled="!canScrollPrev"
    :class="
      cn(
        'absolute size-8 rounded-full',
        orientation === 'horizontal'
          ? 'top-1/2 -left-12 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        props.class,
      )
    "
    :variant="variant"
    :size="size"
    :icon="icon"
    @click="scrollPrev"
  >
    <slot>
      <ArrowLeft />
      <span class="sr-only">Previous Slide</span>
    </slot>
  </Button>
</template>
