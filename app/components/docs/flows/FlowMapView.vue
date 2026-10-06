<script setup lang="ts">
import { SearchIcon } from "@lucide/vue";
import { Input } from "@registry/components/Input/index.ts";
import { Background } from "@vue-flow/background";
import type { Edge, GraphNode, NodeMouseEvent } from "@vue-flow/core";
import { MiniMap } from "@vue-flow/minimap";
import {
  flowSegmentClassName,
  flowSegmentedClassName,
  flowToolbarClassName,
  flowToolbarLabelClassName,
  getFlowEdgeStyle,
  type FlowViewProps,
} from "~/lib/flows/flow-canvas";
import { MAP_COLUMN_GAP, getMapLayout, getMapTone, mapColumnNames } from "~/lib/flows/flow-map";
import {
  FLOW_ITEM_HEIGHT,
  FLOW_ITEM_WIDTH,
  flowColors,
  getRegistryTypeIcon,
  getRegistryTypeLabel,
  type FlowItemNode as FlowItemNodeType,
  type FlowLabelNode as FlowLabelNodeType,
} from "~/lib/flows/flow-nodes";
import {
  getDependents,
  getLocalDependencies,
  getTransitiveNeighbors,
} from "~/lib/registry/flow-graph";
import type { RegistryItemType } from "~/lib/registry/item-types";
import FlowCanvas from "./FlowCanvas.vue";
import FlowControls from "./FlowControls.vue";
import FlowInspector from "./FlowInspector.vue";
import FlowItemNode from "./FlowItemNode.vue";
import FlowLabelNode from "./FlowLabelNode.vue";
import RegistryTypeIcon from "./RegistryTypeIcon.vue";

const props = defineProps<FlowViewProps>();
const emit = defineEmits<{ select: [name: string] }>();

const canvas = useTemplateRef("canvas");
const inspectorOpen = ref(true);
const query = ref("");
const hiddenTypes = ref<ReadonlySet<RegistryItemType>>(new Set());

const layout = computed(() => getMapLayout(props.graph));
const active = computed(() => (inspectorOpen.value ? props.selected : null));
const up = computed(() =>
  active.value ? getTransitiveNeighbors(props.graph, active.value, "up") : new Set<string>(),
);
const down = computed(() =>
  active.value ? getTransitiveNeighbors(props.graph, active.value, "down") : new Set<string>(),
);
const normalizedQuery = computed(() => query.value.trim().toLowerCase());

const typeCounts = computed(() => {
  const counts = new Map<RegistryItemType, number>();

  for (const name of layout.value.connected) {
    const type = props.graph.items.get(name)?.type;

    if (type) {
      counts.set(type, (counts.get(type) ?? 0) + 1);
    }
  }

  return [...counts];
});

const visible = computed(() =>
  layout.value.connected.filter((name) => {
    const type = props.graph.items.get(name)?.type;

    return type !== undefined && !hiddenTypes.value.has(type);
  }),
);

const nodes = computed<(FlowItemNodeType | FlowLabelNodeType)[]>(() => [
  ...layout.value.columns.map(
    (column, depth): FlowLabelNodeType => ({
      id: `column-${depth}`,
      type: "label",
      position: { x: depth * MAP_COLUMN_GAP, y: -40 },
      data: { label: `${mapColumnNames[depth] ?? `Depth ${depth}`} · ${column.length}` },
    }),
  ),
  ...visible.value.map((name): FlowItemNodeType => {
    const item = props.graph.items.get(name);
    const dependencyCount = getLocalDependencies(props.graph, name).length;
    const dependentCount = getDependents(props.graph, name).length;

    return {
      id: name,
      type: "item",
      position: layout.value.positions.get(name) ?? { x: 0, y: 0 },
      width: FLOW_ITEM_WIDTH,
      height: FLOW_ITEM_HEIGHT,
      data: {
        label: item?.title ?? name,
        icon: item ? getRegistryTypeIcon(item.type) : undefined,
        meta: `${dependencyCount}↑ ${dependentCount}↓`,
        tone: getMapTone(name, active.value, up.value, down.value, normalizedQuery.value),
        target: name,
        title: `${item?.title ?? name}: depends on ${dependencyCount}, used by ${dependentCount}`,
      },
    };
  }),
]);

const edges = computed<Edge[]>(() => {
  const visibleSet = new Set(visible.value);

  return visible.value.flatMap((name) =>
    getLocalDependencies(props.graph, name)
      .filter((dependency) => visibleSet.has(dependency))
      .map((dependency): Edge => {
        const inUp = (name === active.value || up.value.has(name)) && up.value.has(dependency);
        const inDown =
          (dependency === active.value || down.value.has(dependency)) && down.value.has(name);
        let style = getFlowEdgeStyle(flowColors.faint, { opacity: active.value ? 0.5 : 1 });

        if (inUp) {
          style = getFlowEdgeStyle(flowColors.up, { strokeWidth: 2 });
        } else if (inDown) {
          style = getFlowEdgeStyle(flowColors.down, { strokeWidth: 2 });
        }

        return {
          id: `${dependency}->${name}`,
          source: dependency,
          target: name,
          animated: inUp || inDown,
          zIndex: inUp || inDown ? 1 : 0,
          style,
        };
      }),
  );
});

function select(name: string) {
  emit("select", name);
  inspectorOpen.value = true;

  const position = layout.value.positions.get(name);
  const flow = canvas.value?.instance;

  if (position && flow) {
    void flow.setCenter(position.x + FLOW_ITEM_WIDTH / 2 + 80, position.y + FLOW_ITEM_HEIGHT / 2, {
      zoom: flow.getViewport().zoom,
      duration: 450,
    });
  }
}

function toggleType(type: RegistryItemType) {
  const next = new Set(hiddenTypes.value);

  if (!next.delete(type)) {
    next.add(type);
  }

  hiddenTypes.value = next;
}

function onNodeClick({ node }: NodeMouseEvent) {
  if (node.type === "item" && node.data.target) {
    select(node.data.target);
  }
}

function getMiniMapNodeColor(node: GraphNode): string {
  if (node.id === active.value) {
    return "var(--foreground)";
  }

  if (up.value.has(node.id)) {
    return flowColors.up;
  }

  return down.value.has(node.id) ? flowColors.down : "var(--border)";
}
</script>

<template>
  <section
    class="flex h-[min(780px,calc(100svh-13rem))] min-h-120 flex-col overflow-hidden rounded-xl border bg-card"
  >
    <div :class="flowToolbarClassName">
      <span :class="flowToolbarLabelClassName">
        How it connects ·
        <span class="normal-case">
          {{ layout.connected.length }} connected ·
          {{ graph.names.length - layout.connected.length }} standalone hidden
        </span>
      </span>
      <div class="flex flex-wrap items-center gap-2">
        <div class="relative w-full sm:w-48">
          <SearchIcon
            class="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            v-model="query"
            placeholder="Find an item…"
            aria-label="Find a registry item"
            class="h-8 pl-8"
          />
        </div>
        <fieldset :class="flowSegmentedClassName">
          <legend class="sr-only">Item types</legend>
          <button
            v-for="[type, count] in typeCounts"
            :key="type"
            type="button"
            :aria-pressed="!hiddenTypes.has(type)"
            :class="flowSegmentClassName"
            @click="toggleType(type)"
          >
            <RegistryTypeIcon :type="type" class="size-3" :stroke-width="1.75" />
            {{ getRegistryTypeLabel(type) }}
            <span class="font-mono font-normal text-muted-foreground">{{ count }}</span>
          </button>
        </fieldset>
      </div>
    </div>

    <div class="relative min-h-0 flex-1 bg-muted/30">
      <FlowCanvas
        ref="canvas"
        :nodes="nodes"
        :edges="edges"
        :fit-view-options="{ padding: { top: '20%', left: '8%', right: '35%', bottom: '10%' } }"
        @node-click="onNodeClick"
        @pane-click="inspectorOpen = false"
      >
        <template #node-item="nodeProps">
          <FlowItemNode :data="nodeProps.data" />
        </template>
        <template #node-label="nodeProps">
          <FlowLabelNode :data="nodeProps.data" />
        </template>
        <Background :gap="18" :size="1.2" color="var(--border)" />
        <FlowControls position="bottom-left" />
        <MiniMap
          position="bottom-left"
          :width="160"
          :height="100"
          class="ml-14! hidden sm:block"
          pannable
          zoomable
          :node-border-radius="4"
          :node-color="getMiniMapNodeColor"
          mask-color="color-mix(in oklab, var(--muted) 65%, transparent)"
        />
      </FlowCanvas>

      <FlowInspector
        v-if="active"
        :graph="graph"
        :name="active"
        @select="select"
        @close="inspectorOpen = false"
      />
      <div
        v-else
        class="absolute top-3 right-3 z-10 hidden gap-3 rounded-lg border bg-card px-3 py-2 text-xs shadow-xs lg:flex"
      >
        <span class="inline-flex items-center gap-1.5">
          <span class="h-0.5 w-4 rounded-full" :style="{ background: flowColors.up }" />
          Depends on
        </span>
        <span class="inline-flex items-center gap-1.5">
          <span class="h-0.5 w-4 rounded-full" :style="{ background: flowColors.down }" />
          Used by
        </span>
      </div>
    </div>
  </section>
</template>
