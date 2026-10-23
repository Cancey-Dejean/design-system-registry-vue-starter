<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "cn";
const props = defineProps<{ class?: HTMLAttributes["class"] }>();
const base =
  "min-w-0 truncate font-sans text-sm font-medium text-foreground group-data-[size=sm]/code-block:text-xs group-data-[variant=destructive]/code-block:text-destructive [&_svg]:pointer-events-none [&_svg]:inline-block [&_svg]:align-middle [&_svg:not([class*='size-'])]:size-4";
</script>
<template>
  <div data-slot="code-block-title" :class="cn(base, props.class)"><slot /></div>
</template>
