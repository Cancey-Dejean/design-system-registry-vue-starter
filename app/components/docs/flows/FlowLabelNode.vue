<script setup lang="ts">
import { FLOW_ITEM_WIDTH, type FlowLabelNodeData } from "~/lib/flows/flow-nodes";

defineProps<{ data: FlowLabelNodeData }>();
</script>

<template>
  <div
    :style="{ width: `${data.width ?? FLOW_ITEM_WIDTH}px` }"
    class="pointer-events-none font-mono text-[11px] tracking-wider text-muted-foreground uppercase"
  >
    {{ data.label }}
  </div>
</template>
