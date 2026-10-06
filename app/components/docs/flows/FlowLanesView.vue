<script setup lang="ts">
import { SearchIcon } from "@lucide/vue";
import { Input } from "@registry/components/Input/index.ts";
import type { NodeMouseEvent } from "@vue-flow/core";
import { cn } from "cn";
import {
  flowSegmentClassName,
  flowSegmentedClassName,
  flowSidebarScrollClassName,
  flowToolbarClassName,
  flowToolbarLabelClassName,
  type FlowViewProps,
} from "~/lib/flows/flow-canvas";
import { buildLanes, type LanesDirection } from "~/lib/flows/flow-lanes";
import { getRegistryTypeLabel } from "~/lib/flows/flow-nodes";
import {
  getDependents,
  getFlowRole,
  getLocalDependencies,
  type RegistryFlowRole,
} from "~/lib/registry/flow-graph";
import FlowCanvas from "./FlowCanvas.vue";
import FlowFocusNode from "./FlowFocusNode.vue";
import FlowItemNode from "./FlowItemNode.vue";
import FlowItemPicker from "./FlowItemPicker.vue";
import FlowLabelNode from "./FlowLabelNode.vue";

const props = defineProps<FlowViewProps>();
const emit = defineEmits<{ select: [name: string] }>();

const directionOptions = [
  { value: "up", label: "Depends on" },
  { value: "both", label: "Both" },
  { value: "down", label: "Used by" },
] as const satisfies readonly { value: LanesDirection; label: string }[];

const flowRoles = ["shared", "composite", "standalone"] as const;

const roleDotClassNames: Record<RegistryFlowRole, string> = {
  shared: "bg-emerald-500",
  composite: "bg-amber-500",
  standalone: "bg-muted-foreground/40",
};

const query = ref("");
const direction = ref<LanesDirection>("both");

const item = computed(() => props.graph.items.get(props.selected));
const lanes = computed(() => buildLanes(props.graph, props.selected, direction.value));

const visibleNames = computed(() => {
  const normalizedQuery = query.value.trim().toLowerCase();

  return props.graph.names.filter((name) => {
    const title = props.graph.items.get(name)?.title.toLowerCase() ?? "";

    return name.includes(normalizedQuery) || title.includes(normalizedQuery);
  });
});

const stats = computed(() =>
  item.value
    ? ([
        [
          "Depends on",
          getLocalDependencies(props.graph, props.selected).length +
            item.value.remoteDependencies.length,
        ],
        ["Used by", getDependents(props.graph, props.selected).length],
        ["Packages", item.value.dependencies.length],
        ["Files", item.value.files.length],
      ] as const)
    : [],
);

function getConnectionCount(name: string): number {
  return getLocalDependencies(props.graph, name).length + getDependents(props.graph, name).length;
}

function onNodeClick({ node }: NodeMouseEvent) {
  if (node.type === "item" && node.data.target) {
    emit("select", node.data.target);
  }
}
</script>

<template>
  <div
    v-if="item"
    class="grid grid-cols-[minmax(0,1fr)] gap-6 md:-mt-6 md:-ml-6 md:grid-cols-[15rem_minmax(0,1fr)]"
  >
    <aside
      class="hidden flex-col gap-3 border-r bg-muted/30 p-3 md:sticky md:top-16 md:flex md:h-[calc(100svh-4rem)] md:self-start"
    >
      <div class="relative">
        <SearchIcon
          class="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          v-model="query"
          placeholder="Search items"
          aria-label="Search registry items"
          class="pl-8"
        />
      </div>
      <div
        class="flex items-center justify-between px-1 font-mono text-[11px] tracking-wider text-muted-foreground uppercase"
      >
        <span>Registry items</span>
        <span>{{ visibleNames.length }}</span>
      </div>
      <div
        class="scrollbar-none flex min-w-0 shrink-0 scroll-fade-x gap-3 overflow-x-auto overscroll-x-contain px-1 text-xs whitespace-nowrap text-muted-foreground [--scroll-fade-reveal:1px]"
      >
        <span
          v-for="role in flowRoles"
          :key="role"
          class="inline-flex flex-none items-center gap-1.5 capitalize"
        >
          <span :class="cn('size-1.5 rounded-full', roleDotClassNames[role])" />
          {{ role }}
        </span>
      </div>
      <nav
        aria-label="Registry items"
        :class="
          cn('-mx-1 flex min-h-0 flex-col gap-px overflow-y-auto px-1', flowSidebarScrollClassName)
        "
      >
        <button
          v-for="name in visibleNames"
          :key="name"
          type="button"
          :aria-current="name === selected"
          :class="
            cn(
              'flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-1.5 text-left text-sm transition-colors hover:bg-muted',
              name === selected && 'border-border bg-card font-medium shadow-xs hover:bg-card',
            )
          "
          @click="emit('select', name)"
        >
          <span
            :class="
              cn('size-1.5 shrink-0 rounded-full', roleDotClassNames[getFlowRole(graph, name)])
            "
          />
          <span class="truncate">{{ graph.items.get(name)?.title ?? name }}</span>
          <span class="ml-auto font-mono text-[11px] text-muted-foreground">
            {{ getConnectionCount(name) }}
          </span>
        </button>
      </nav>
    </aside>

    <div class="flex min-w-0 flex-col gap-4 pb-6 md:pt-6">
      <div v-if="$slots.header" class="mb-2">
        <slot name="header" />
      </div>
      <FlowItemPicker
        :model-value="selected"
        :graph="graph"
        class="md:hidden"
        @update:model-value="emit('select', $event)"
      />

      <section
        class="flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-card px-5 py-4"
      >
        <div>
          <div class="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
            registry:{{ getRegistryTypeLabel(item.type) }}
          </div>
          <h2 class="mt-1 text-xl font-semibold tracking-tight">{{ item.title }}</h2>
        </div>
        <dl class="flex gap-6 sm:gap-8">
          <div v-for="[label, value] in stats" :key="label" class="text-right">
            <dt class="text-xs text-muted-foreground">{{ label }}</dt>
            <dd class="font-mono text-2xl leading-tight">{{ value }}</dd>
          </div>
        </dl>
      </section>

      <section class="overflow-hidden rounded-xl border bg-card">
        <div :class="flowToolbarClassName">
          <span :class="flowToolbarLabelClassName">
            How it flows · <span class="normal-case">click an item to trace it</span>
          </span>
          <fieldset :class="flowSegmentedClassName">
            <legend class="sr-only">Direction</legend>
            <button
              v-for="option in directionOptions"
              :key="option.value"
              type="button"
              :aria-pressed="direction === option.value"
              :class="flowSegmentClassName"
              @click="direction = option.value"
            >
              {{ option.label }}
            </button>
          </fieldset>
        </div>
        <div class="bg-muted/30" :style="{ height: `${lanes.height}px` }">
          <FlowCanvas
            :key="`${selected}-${direction}`"
            :nodes="lanes.nodes"
            :edges="lanes.edges"
            :fit-view-options="{ padding: 0.15, maxZoom: 1 }"
            :zoom-on-scroll="false"
            :prevent-scrolling="false"
            @node-click="onNodeClick"
          >
            <template #node-item="nodeProps">
              <FlowItemNode :data="nodeProps.data" />
            </template>
            <template #node-label="nodeProps">
              <FlowLabelNode :data="nodeProps.data" />
            </template>
            <template #node-focus="nodeProps">
              <FlowFocusNode :data="nodeProps.data" />
            </template>
          </FlowCanvas>
        </div>
      </section>
    </div>
  </div>
</template>
