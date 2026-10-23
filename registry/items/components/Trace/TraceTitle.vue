<script setup lang="ts">
import { computed, inject, type HTMLAttributes } from "vue";
import { cn } from "cn";
import { Shimmer } from "@registry/components/Shimmer";
import { traceStatusKey } from "./Trace.types";
const props = defineProps<{ class?: HTMLAttributes["class"] }>();
const status = inject(
  traceStatusKey,
  computed(() => undefined),
);
</script>

<template>
  <Shimmer
    v-if="status === 'running'"
    as="span"
    data-slot="trace-title"
    :class="cn('min-w-0 truncate motion-reduce:shimmer-none', props.class)"
    ><slot
  /></Shimmer>
  <span v-else data-slot="trace-title" :class="cn('min-w-0 truncate', props.class)"><slot /></span>
</template>
