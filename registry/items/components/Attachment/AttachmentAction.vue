<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { Button, type ButtonSize, type ButtonVariant } from "../Button";

interface Props extends PrimitiveProps {
  class?: HTMLAttributes["class"];
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "ghost",
  size: "icon-xs",
});
</script>

<template>
  <Button data-slot="attachment-action" :variant="variant" :size="size" :class="props.class">
    <slot />
  </Button>
</template>
