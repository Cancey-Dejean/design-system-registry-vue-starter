<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "cn";
const props = defineProps<{ class?: HTMLAttributes["class"] }>();
const base =
  "flex min-w-0 shrink-0 items-center gap-2 px-4 pb-4 text-muted-foreground group-data-[size=sm]/code-block:px-3 group-data-[size=sm]/code-block:pb-3";
</script>
<template>
  <div data-slot="code-block-footer" :class="cn(base, props.class)"><slot /></div>
</template>
