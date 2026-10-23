<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "cn";
const props = defineProps<{ class?: HTMLAttributes["class"] }>();
const base =
  "-my-1 ms-auto -me-1.5 flex shrink-0 items-center gap-1 [[data-slot=code-block]>&]:absolute [[data-slot=code-block]>&]:end-3 [[data-slot=code-block]>&]:top-3 [[data-slot=code-block]>&]:opacity-0 [[data-slot=code-block]>&]:group-focus-within/code-block:opacity-100 [[data-slot=code-block]>&]:group-hover/code-block:opacity-100 [[data-slot=code-block]>&]:pointer-coarse:opacity-100";
</script>
<template>
  <div data-slot="code-block-actions" :class="cn(base, props.class)"><slot /></div>
</template>
