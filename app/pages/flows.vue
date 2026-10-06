<script setup lang="ts">
import DocsLayout from "~/components/docs/DocsLayout.vue";
import FlowsPage from "~/components/docs/flows/FlowsPage.vue";
import type { RegistryFlowItem } from "~/lib/registry/flow-data";
import { createRegistryFlowGraph } from "~/lib/registry/flow-graph";
import { flowsPage } from "~/lib/registry/flows";

const { data: items } = await useFetch<RegistryFlowItem[]>("/api/registry-flows", {
  default: () => [],
});

useSeoMeta({ title: flowsPage.title, description: flowsPage.description });

const graph = computed(() => createRegistryFlowGraph(items.value));
</script>

<template>
  <DocsLayout :show-footer="false">
    <!-- The canvases measure the DOM and the layout comes from sessionStorage, neither of
         which exists during SSR — the server renders the heading and the client takes over. -->
    <ClientOnly>
      <FlowsPage :graph="graph" :title="flowsPage.title" :description="flowsPage.description" />
      <template #fallback>
        <header class="flex flex-col gap-1.5">
          <h1 class="text-3xl font-semibold tracking-tight">{{ flowsPage.title }}</h1>
          <p class="max-w-2xl text-sm text-muted-foreground">{{ flowsPage.description }}</p>
        </header>
      </template>
    </ClientOnly>
  </DocsLayout>
</template>
