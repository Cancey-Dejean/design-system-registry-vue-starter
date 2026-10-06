<script setup lang="ts">
import { ArrowRightIcon, FileCodeIcon, GlobeIcon, PackageIcon, XIcon } from "@lucide/vue";
import { Badge } from "@registry/components/Badge/index.ts";
import { flowColors, getRegistryTypeLabel, splitFilePath } from "~/lib/flows/flow-nodes";
import {
  getTransitiveNeighbors,
  getVia,
  type RegistryFlowDirection,
  type RegistryFlowGraph,
} from "~/lib/registry/flow-graph";
import { getRegistryItemRoutePath } from "~/lib/registry/sections";
import InstallCommand from "../InstallCommand.vue";
import FlowInspectorGroup from "./FlowInspectorGroup.vue";
import RegistryTypeIcon from "./RegistryTypeIcon.vue";

const props = defineProps<{
  graph: RegistryFlowGraph;
  name: string;
}>();
const emit = defineEmits<{ select: [name: string]; close: [] }>();

const item = computed(() => props.graph.items.get(props.name));

function getLinks(direction: RegistryFlowDirection) {
  return [...getTransitiveNeighbors(props.graph, props.name, direction)]
    .toSorted()
    .map((target) => ({
      target,
      item: props.graph.items.get(target),
      via: getVia(props.graph, props.name, target, direction),
    }));
}

const groups = computed(() => [
  { direction: "up" as const, label: "Depends on", links: getLinks("up") },
  { direction: "down" as const, label: "Used by", links: getLinks("down") },
]);
</script>

<template>
  <aside
    v-if="item"
    :aria-label="`${item.title} details`"
    class="absolute inset-x-3 bottom-3 z-20 flex max-h-[55%] animate-in flex-col overflow-hidden rounded-xl border bg-card shadow-xl duration-200 fade-in slide-in-from-right-2 md:inset-x-auto md:top-3 md:right-3 md:max-h-none md:w-80"
  >
    <div class="flex flex-col gap-3 border-b p-4">
      <div class="flex items-start justify-between gap-2">
        <Badge variant="outline" class="font-mono">
          <RegistryTypeIcon :type="item.type" :stroke-width="1.75" />
          registry:{{ getRegistryTypeLabel(item.type) }}
        </Badge>
        <button
          type="button"
          aria-label="Close details"
          class="rounded-md p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          @click="emit('close')"
        >
          <XIcon class="size-4" />
        </button>
      </div>
      <h2 class="text-lg font-semibold tracking-tight">{{ item.title }}</h2>
      <InstallCommand :item-name="name" class="my-0" />
    </div>
    <div class="flex flex-col gap-5 overflow-y-auto p-4">
      <FlowInspectorGroup
        v-for="group in groups"
        :key="group.direction"
        :label="`${group.label} · ${group.links.length + (group.direction === 'up' ? item.remoteDependencies.length : 0)}`"
      >
        <template #marker>
          <span
            class="h-0.5 w-4 rounded-full"
            :style="{ background: flowColors[group.direction] }"
          />
        </template>
        <button
          v-for="link in group.links"
          :key="link.target"
          type="button"
          class="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted"
          @click="emit('select', link.target)"
        >
          <RegistryTypeIcon
            v-if="link.item"
            :type="link.item.type"
            class="size-3.5 shrink-0"
            :stroke-width="1.75"
          />
          <FileCodeIcon v-else class="size-3.5 shrink-0" :stroke-width="1.75" />
          <span class="truncate">{{ link.item?.title ?? link.target }}</span>
          <span class="ml-auto shrink-0 text-[11px] text-muted-foreground">
            {{ link.via ? `via ${link.via}` : "direct" }}
          </span>
        </button>
        <template v-if="group.direction === 'up'">
          <div
            v-for="dependency in item.remoteDependencies"
            :key="dependency.id"
            class="flex items-center gap-2 px-2 py-1.5 text-sm"
          >
            <GlobeIcon class="size-3.5 shrink-0" :stroke-width="1.75" />
            <span class="truncate">{{ dependency.name }}</span>
            <span class="ml-auto shrink-0 text-[11px] text-muted-foreground">
              {{ dependency.source }}
            </span>
          </div>
          <p
            v-if="group.links.length + item.remoteDependencies.length === 0"
            class="px-2 py-0.5 text-xs text-muted-foreground"
          >
            Nothing — this is a foundation.
          </p>
        </template>
        <p v-else-if="group.links.length === 0" class="px-2 py-0.5 text-xs text-muted-foreground">
          No other registry item uses this yet.
        </p>
      </FlowInspectorGroup>
      <FlowInspectorGroup :label="`npm · ${item.dependencies.length}`">
        <template #marker><PackageIcon class="size-3" /></template>
        <div class="flex flex-wrap gap-1.5 px-2">
          <Badge
            v-for="dependency in item.dependencies"
            :key="dependency"
            variant="outline"
            class="font-mono"
          >
            {{ dependency }}
          </Badge>
        </div>
        <p v-if="item.dependencies.length === 0" class="px-2 py-0.5 text-xs text-muted-foreground">
          No packages.
        </p>
      </FlowInspectorGroup>
      <FlowInspectorGroup :label="`Files · ${item.files.length}`">
        <template #marker><FileCodeIcon class="size-3" /></template>
        <div v-for="file in item.files" :key="file" class="px-2 py-0.5 font-mono text-xs break-all">
          <span class="text-muted-foreground">{{ splitFilePath(file).directory }}</span
          >{{ splitFilePath(file).base }}
        </div>
      </FlowInspectorGroup>
      <NuxtLink
        :to="getRegistryItemRoutePath(item)"
        class="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
      >
        Open {{ item.title }} docs
        <ArrowRightIcon class="size-3.5" />
      </NuxtLink>
    </div>
  </aside>
</template>
