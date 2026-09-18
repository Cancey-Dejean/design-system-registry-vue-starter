<script setup lang="ts">
import type { HTMLAttributes } from "vue";

import { cn } from "cn";
import { Button, type ButtonProps } from "@registry/components/Button";

import {
  inputGroupButtonVariants,
  type InputGroupButtonVariants,
} from "@registry/components/InputGroup";

interface InputGroupButtonProps {
  variant?: ButtonProps["variant"];
  size?: InputGroupButtonVariants["size"];
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<InputGroupButtonProps>(), {
  size: "xs",
  variant: "ghost",
});
</script>

<template>
  <Button
    :data-size="props.size"
    :variant="props.variant"
    :class="cn(inputGroupButtonVariants({ size: props.size }), props.class)"
  >
    <slot />
  </Button>
</template>
