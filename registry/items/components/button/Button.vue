<script setup lang="ts">
import { Primitive } from "reka-ui";
import { cn } from "@/lib/utils";
import { type ButtonProps, buttonVariants } from ".";

// import type { ButtonProps, buttonVariants } from "./Button.types";

const props = withDefaults(defineProps<ButtonProps>(), {
  as: "button",
});
</script>

<template>
  <Primitive
    data-slot="button"
    :data-variant="variant"
    :data-size="size"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size, icon, fullWidth }), props.class)"
  >
    <slot />
  </Primitive>
</template>
