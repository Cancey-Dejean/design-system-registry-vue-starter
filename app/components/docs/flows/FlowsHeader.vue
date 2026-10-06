<script setup lang="ts">
import type { FlowLayout } from "~/composables/useFlowLayout";
import { registryConfig } from "~/lib/registry/config";
import type { RegistryFlowGraph } from "~/lib/registry/flow-graph";
import FlowLayoutSelector from "./FlowLayoutSelector.vue";

defineProps<{
  graph: RegistryFlowGraph;
  title: string;
  description: string;
}>();
const layout = defineModel<FlowLayout>("layout", { required: true });
</script>

<template>
  <header class="flex flex-wrap items-end justify-between gap-4">
    <div class="flex flex-col gap-1.5">
      <h1 class="text-3xl font-semibold tracking-tight">{{ title }}</h1>
      <p class="max-w-2xl text-sm text-muted-foreground">{{ description }}</p>
      <p class="text-sm text-muted-foreground">
        <span class="font-medium text-foreground">{{ registryConfig.namespace }}</span> ·
        {{ graph.names.length }} items · {{ graph.dependents.size }} shared
      </p>
    </div>
    <FlowLayoutSelector v-model="layout" />
  </header>
</template>
