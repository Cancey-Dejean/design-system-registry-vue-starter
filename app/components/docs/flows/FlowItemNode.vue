<script setup lang="ts">
import { Handle, Position } from "@vue-flow/core";
import { cn } from "cn";
import {
  FLOW_ITEM_WIDTH,
  flowToneClassNames,
  hiddenHandleStyle,
  type FlowItemNodeData,
} from "~/lib/flows/flow-nodes";

defineProps<{ data: FlowItemNodeData }>();
</script>

<template>
  <div
    :title="data.title"
    :style="{ width: `${FLOW_ITEM_WIDTH}px` }"
    :class="
      cn(
        'flex h-9.5 items-center gap-2 rounded-lg border px-3 text-[13px] shadow-xs transition-[opacity,background-color,border-color,translate] duration-150',
        flowToneClassNames[data.tone],
        data.target && 'cursor-pointer hover:-translate-y-px hover:border-ring',
      )
    "
  >
    <Handle type="target" :position="Position.Left" :style="hiddenHandleStyle" />
    <component :is="data.icon" v-if="data.icon" class="size-3.5 shrink-0" :stroke-width="1.75" />
    <span class="truncate">{{ data.label }}</span>
    <span
      v-if="data.meta"
      :class="
        cn(
          'ml-auto shrink-0 font-mono text-[11px]',
          data.tone === 'focus' ? 'text-primary-foreground/60' : 'text-muted-foreground',
        )
      "
    >
      {{ data.meta }}
    </span>
    <Handle type="source" :position="Position.Right" :style="hiddenHandleStyle" />
  </div>
</template>
