<script setup lang="ts">
import type { Component } from "vue";
import { computed } from "vue";
import { cn } from "cn";
import { ICONS } from "../icons";
import type { IconProps } from "../";
import { iconVariants } from "../";

const props = withDefaults(defineProps<IconProps>(), {
  size: "md",
});

const IconComponent = computed(() => ICONS[props.icon] as Component);
</script>

<template>
  <component :is="IconComponent" :class="cn(iconVariants({ size: props.size }), props.class)" />
</template>
