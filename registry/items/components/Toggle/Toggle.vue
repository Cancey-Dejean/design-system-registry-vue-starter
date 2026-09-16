<script setup lang="ts">
import type { ToggleEmits } from "reka-ui";
import { reactiveOmit } from "@vueuse/core";
import { Toggle, useForwardPropsEmits } from "reka-ui";
import { cn } from "@/lib/utils";
import type { ToggleProps } from "./Toggle.types";
import { toggleVariants } from "./";

const props = withDefaults(defineProps<ToggleProps>(), {
  variant: "default",
  size: "default",
  disabled: false,
});

const emits = defineEmits<ToggleEmits>();

const delegatedProps = reactiveOmit(props, "class", "size", "variant");
const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <Toggle
    v-slot="slotProps"
    data-slot="toggle"
    v-bind="forwarded"
    :class="cn(toggleVariants({ variant, size }), props.class)"
  >
    <slot v-bind="slotProps" />
  </Toggle>
</template>
