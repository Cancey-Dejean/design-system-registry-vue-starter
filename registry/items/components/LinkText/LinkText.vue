<script setup lang="ts">
import { Primitive } from "reka-ui";
import { cn } from "cn";
import { linkVariants, type LinkProps } from ".";

const props = withDefaults(defineProps<LinkProps>(), {
  as: "a",
  tone: "default",
  underline: "hover",
  size: "md",
  external: false,
});
</script>

<template>
  <Primitive
    data-slot="link-text"
    :as="as"
    :as-child="asChild"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :class="cn(linkVariants({ tone, underline, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>
