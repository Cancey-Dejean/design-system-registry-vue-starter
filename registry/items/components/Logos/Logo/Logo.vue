<script setup lang="ts">
import type { Component } from "vue";
import { computed } from "vue";
import { cn } from "@/lib/utils";
import { LOGOS } from "../logos";
import type { LogoProps } from "./Logo.types";
import { logoVariants } from "./Logo.variants";

const props = withDefaults(defineProps<LogoProps>(), {
  size: "md",
});

const LogoComponent = computed(() => LOGOS[props.logo] as Component);
</script>

<template>
  <component :is="LogoComponent" :class="cn(logoVariants({ size: props.size }), props.class)" />
</template>
