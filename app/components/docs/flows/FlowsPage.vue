<script setup lang="ts">
import { cn } from "cn";
import type { Component } from "vue";
import type { FlowLayout } from "~/composables/useFlowLayout";
import {
  getDependents,
  getLocalDependencies,
  type RegistryFlowGraph,
} from "~/lib/registry/flow-graph";
import FlowChainView from "./FlowChainView.vue";
import FlowLanesView from "./FlowLanesView.vue";
import FlowsHeader from "./FlowsHeader.vue";
import FlowMapView from "./FlowMapView.vue";

const props = defineProps<{
  graph: RegistryFlowGraph;
  title: string;
  description: string;
}>();

const flowViews: Record<FlowLayout, Component> = {
  map: FlowMapView,
  lanes: FlowLanesView,
  chain: FlowChainView,
};

function getInitialSelection(graph: RegistryFlowGraph): string {
  const connectionCount = (name: string) =>
    getLocalDependencies(graph, name).length + getDependents(graph, name).length;

  return graph.names.reduce<string>(
    (best, name) => (best === "" || connectionCount(name) > connectionCount(best) ? name : best),
    "",
  );
}

const layout = useFlowLayout();
const selected = ref(getInitialSelection(props.graph));
const viewOwnsHeader = computed(() => layout.value !== "map");
</script>

<template>
  <div :class="cn('flex flex-col gap-6', !viewOwnsHeader && 'pb-6')">
    <FlowsHeader
      v-if="!selected || !viewOwnsHeader"
      v-model:layout="layout"
      :graph="graph"
      :title="title"
      :description="description"
    />

    <component
      :is="flowViews[layout]"
      v-if="selected"
      :graph="graph"
      :selected="selected"
      @select="selected = $event"
    >
      <template v-if="viewOwnsHeader" #header>
        <FlowsHeader
          v-model:layout="layout"
          :graph="graph"
          :title="title"
          :description="description"
        />
      </template>
    </component>
    <p v-else class="text-sm text-muted-foreground">No registry items yet.</p>
  </div>
</template>
