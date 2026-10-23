<script setup lang="ts">
import { computed, provide, type HTMLAttributes } from "vue";
import { cn } from "cn";
import { traceStatusKey, type TraceStatus } from "./Trace.types";
const props = defineProps<{ status?: TraceStatus; class?: HTMLAttributes["class"] }>();
provide(
  traceStatusKey,
  computed(() => props.status),
);
</script>

<template>
  <span
    data-slot="trace-line"
    :data-status="status"
    :aria-busy="status === 'running' || undefined"
    :class="
      cn(
        'flex w-fit max-w-full min-w-0 items-center gap-2 text-sm text-muted-foreground transition-colors in-[a,button]:cursor-pointer in-[a:hover,button:hover]:text-foreground data-[status=error]:text-destructive data-[status=pending]:opacity-60',
        props.class,
      )
    "
  >
    <slot />
  </span>
</template>
