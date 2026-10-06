<script setup lang="ts">
import { ChevronRightIcon, SlidersHorizontalIcon } from "@lucide/vue";
import { Handle, Position } from "@vue-flow/core";
import { cn } from "cn";
import { flowChainHotKey, flowPropToggleKey } from "~/lib/flows/flow-canvas";
import {
  FLOW_PROP_HEADER_HEIGHT,
  FLOW_PROP_ROW_HEIGHT,
  FLOW_PROP_WIDTH,
  hiddenHandleStyle,
  type FlowPropNodeData,
} from "~/lib/flows/flow-nodes";

const props = defineProps<{ id: string; data: FlowPropNodeData }>();

const hot = inject(flowChainHotKey, null);
const toggle = inject(flowPropToggleKey, null);
const isHot = computed(() => hot?.value === props.data.owner);
</script>

<template>
  <div
    :style="{ width: `${FLOW_PROP_WIDTH}px` }"
    :class="
      cn(
        'rounded-lg border bg-card font-mono text-[11.5px] shadow-xs transition-[box-shadow,border-color] duration-150',
        isHot && 'border-foreground/40 ring-3 ring-foreground/5',
      )
    "
  >
    <Handle
      type="target"
      :position="Position.Left"
      :style="{ ...hiddenHandleStyle, top: `${FLOW_PROP_HEADER_HEIGHT / 2}px` }"
    />
    <button
      type="button"
      :aria-expanded="data.expanded"
      :aria-controls="`${id}-options`"
      :aria-label="`${data.expanded ? 'Collapse' : 'Expand'} ${data.label} options`"
      :style="{ height: `${FLOW_PROP_HEADER_HEIGHT}px` }"
      class="nodrag flex w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 text-left outline-none hover:bg-muted/50 focus-visible:ring-3 focus-visible:ring-ring/50"
      @click="toggle?.(id)"
    >
      <SlidersHorizontalIcon class="size-3 shrink-0 text-muted-foreground" :stroke-width="1.75" />
      <span class="truncate font-medium">{{ data.label }}</span>
      <span
        class="ml-auto rounded-full bg-muted px-1.5 text-[10.5px] text-muted-foreground tabular-nums"
      >
        {{ data.rows.length }}
      </span>
      <ChevronRightIcon
        aria-hidden="true"
        :class="
          cn(
            'size-3 shrink-0 text-muted-foreground transition-transform duration-150',
            data.expanded && 'rotate-90',
          )
        "
        :stroke-width="1.75"
      />
    </button>
    <ul v-if="data.expanded" :id="`${id}-options`" class="pb-2">
      <li
        v-for="(row, index) in data.rows"
        :key="row.label"
        :title="row.detail ? `${row.label}: ${row.detail}` : row.label"
        :style="{ height: `${FLOW_PROP_ROW_HEIGHT}px` }"
        :class="
          cn(
            'relative flex items-center gap-1.5 pr-2.5 pl-8 text-muted-foreground',
            row.isDefault && 'text-foreground',
          )
        "
      >
        <span
          aria-hidden="true"
          class="absolute top-0 left-4 h-1/2 w-2.5 rounded-bl-md border-b border-l border-muted-foreground/35"
        />
        <span
          v-if="index < data.rows.length - 1"
          aria-hidden="true"
          class="absolute top-1/2 bottom-0 left-4 border-l border-muted-foreground/35"
        />
        <span
          :class="
            cn(
              'shrink-0',
              row.isDefault &&
                '-ml-1.5 rounded-sm bg-foreground px-1.5 font-medium text-background',
            )
          "
        >
          {{ row.label }}
        </span>
        <span v-if="row.detail" class="truncate opacity-70">{{ row.detail }}</span>
        <span
          v-if="row.isDefault"
          class="ml-auto shrink-0 text-[10px] tracking-wide text-muted-foreground"
        >
          default
        </span>
      </li>
    </ul>
  </div>
</template>
