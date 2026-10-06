<script setup lang="ts">
import {
  VueFlow,
  type Edge,
  type FitViewParams,
  type Node,
  type VueFlowStore,
} from "@vue-flow/core";
import { cn } from "cn";
import { flowCanvasDefaults } from "~/lib/flows/flow-canvas";
import FlowAutoFit from "./FlowAutoFit.vue";

import "@vue-flow/core/dist/style.css";
import "@vue-flow/controls/dist/style.css";
import "@vue-flow/minimap/dist/style.css";

const props = defineProps<{
  nodes: Node[];
  edges: Edge[];
  fitViewOptions?: FitViewParams;
}>();

const slots = useSlots();
const templateSlotNames = computed(() => Object.keys(slots).filter((name) => name !== "default"));

// Nodes paint at the origin before they are measured, so the canvas stays
// hidden until the first fit has framed them.
const fitted = ref(props.nodes.length === 0);
const instance = shallowRef<VueFlowStore>();

defineExpose({ instance });
</script>

<template>
  <VueFlow
    v-bind="flowCanvasDefaults"
    :nodes="nodes"
    :edges="edges"
    :class="cn('registry-flow transition-opacity duration-150', !fitted && 'opacity-0')"
    @pane-ready="instance = $event"
  >
    <template v-for="name in templateSlotNames" :key="name" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
    <FlowAutoFit :options="fitViewOptions" @fitted="fitted = true" />
    <slot />
  </VueFlow>
</template>

<style>
.registry-flow .vue-flow__controls {
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-xs);
}

.registry-flow .vue-flow__controls-button {
  border-bottom-color: var(--border);
  background: var(--card);
  color: var(--foreground);
}

.registry-flow .vue-flow__controls-button:last-child {
  border-bottom: none;
}

.registry-flow .vue-flow__controls-button:hover {
  background: var(--muted);
}

.registry-flow .vue-flow__controls-button svg {
  fill: none;
}

.registry-flow .vue-flow__minimap {
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background-color: var(--card);
  box-shadow: var(--shadow-xs);
}
</style>
