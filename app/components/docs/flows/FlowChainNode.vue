<script setup lang="ts">
import { SlidersHorizontalIcon } from "@lucide/vue";
import { Handle, Position } from "@vue-flow/core";
import { cn } from "cn";
import { flowChainHotKey } from "~/lib/flows/flow-canvas";
import {
  FLOW_CHAIN_TITLE_CENTER,
  FLOW_CHAIN_WIDTH,
  hiddenHandleStyle,
  splitFilePath,
  type FlowChainNodeData,
} from "~/lib/flows/flow-nodes";

const props = defineProps<{ id: string; data: FlowChainNodeData }>();

const hot = inject(flowChainHotKey, null);
const isRoot = computed(() => props.data.variant === "root");
const isHot = computed(() => hot?.value === props.id);
</script>

<template>
  <div
    :style="{ width: `${FLOW_CHAIN_WIDTH}px` }"
    :class="
      cn(
        'rounded-xl border bg-card text-[13px] shadow-xs transition-[box-shadow,border-color] duration-150',
        isRoot && 'border-primary bg-primary font-mono text-xs text-primary-foreground',
        data.variant === 'remote' && 'border-dashed',
        data.variant === 'sink' && 'bg-muted',
        data.target && 'cursor-pointer',
        isHot && 'border-foreground ring-3 ring-foreground/10',
      )
    "
  >
    <Handle type="target" :position="Position.Top" :style="hiddenHandleStyle" />
    <div
      :class="
        cn(
          'px-3 pt-2 font-mono text-[10.5px] tracking-wider uppercase',
          isRoot ? 'text-primary-foreground/55' : 'text-muted-foreground',
        )
      "
    >
      {{ data.kind }}
    </div>
    <div class="flex items-center gap-2 px-3 pt-1 pb-2.5">
      <component :is="data.icon" class="size-3.5 shrink-0" :stroke-width="1.75" />
      <strong class="truncate font-semibold">{{ data.label }}</strong>
      <span
        v-if="data.step !== undefined"
        :class="
          cn(
            'ml-auto font-mono text-[11px]',
            isRoot ? 'text-primary-foreground/55' : 'text-muted-foreground',
          )
        "
      >
        #{{ data.step }}
      </span>
    </div>
    <ul
      v-if="data.lines.length > 0"
      class="flex flex-col gap-0.5 border-t px-3 pt-2 pb-2.5 font-mono text-[11.5px] text-muted-foreground"
    >
      <li v-for="line in data.lines" :key="line" :title="line" class="truncate">
        <template v-if="data.linesArePaths && line.includes('/')">…/</template
        ><span class="font-medium text-foreground">{{
          data.linesArePaths ? splitFilePath(line).base : line
        }}</span>
      </li>
    </ul>
    <div
      v-if="data.apiSummary"
      :title="data.apiSummary"
      :class="
        cn(
          'flex items-center gap-1.5 border-t px-3 py-1.5 font-mono text-[11px]',
          isRoot
            ? 'border-primary-foreground/15 text-primary-foreground/70'
            : 'text-muted-foreground',
        )
      "
    >
      <SlidersHorizontalIcon class="size-3 shrink-0" :stroke-width="1.75" />
      <span class="truncate">{{ data.apiSummary }}</span>
    </div>
    <Handle type="source" :position="Position.Bottom" :style="hiddenHandleStyle" />
    <Handle
      id="props"
      type="source"
      :position="Position.Right"
      :style="{ ...hiddenHandleStyle, top: `${FLOW_CHAIN_TITLE_CENTER}px` }"
    />
  </div>
</template>
