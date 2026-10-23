<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "cn";
const props = defineProps<{ class?: HTMLAttributes["class"] }>();
const base =
  "flex min-w-0 shrink-0 items-center gap-2 px-4 pt-4 text-muted-foreground group-data-[size=sm]/code-block:px-3 group-data-[size=sm]/code-block:pt-3 group-data-[variant=destructive]/code-block:text-destructive";
</script>
<template>
  <div data-slot="code-block-header" :class="cn(base, props.class)"><slot /></div>
</template>
