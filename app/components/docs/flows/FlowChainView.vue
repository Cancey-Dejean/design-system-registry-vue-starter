<script setup lang="ts">
import { ArrowDownIcon, ListTreeIcon, PackageIcon, SlidersHorizontalIcon } from "@lucide/vue";
import { Badge } from "@registry/components/Badge/index.ts";
import { Background } from "@vue-flow/background";
import type { NodeMouseEvent } from "@vue-flow/core";
import { cn } from "cn";
import {
  flowChainHotKey,
  flowPropToggleKey,
  flowSegmentClassName,
  flowSegmentedClassName,
  flowSidebarScrollClassName,
  flowToolbarClassName,
  flowToolbarLabelClassName,
  type FlowViewProps,
} from "~/lib/flows/flow-canvas";
import {
  CHAIN_NPM_ID,
  buildDependentsChain,
  buildInstallChain,
  getPropSpecs,
  layoutChain,
  type ChainMode,
} from "~/lib/flows/flow-chain";
import { getRegistryTypeLabel } from "~/lib/flows/flow-nodes";
import {
  getDependents,
  getInstallOrder,
  getInstallPackages,
  getInstallStepId,
} from "~/lib/registry/flow-graph";
import InstallCommand from "../InstallCommand.vue";
import FlowCanvas from "./FlowCanvas.vue";
import FlowControls from "./FlowControls.vue";
import FlowChainEdge from "./FlowChainEdge.vue";
import FlowChainNode from "./FlowChainNode.vue";
import FlowChainStep from "./FlowChainStep.vue";
import FlowItemPicker from "./FlowItemPicker.vue";
import FlowPropNode from "./FlowPropNode.vue";
import FlowPropsPanel from "./FlowPropsPanel.vue";
import RegistryTypeIcon from "./RegistryTypeIcon.vue";

const props = defineProps<FlowViewProps>();
const emit = defineEmits<{ select: [name: string] }>();

const modeOptions = [
  ["installs", "What it installs"],
  ["dependents", "What depends on it"],
] as const satisfies readonly (readonly [ChainMode, string])[];

const mode = ref<ChainMode>("installs");
const hot = ref<string | null>(null);
// Only canvas hover previews another item's props. Previewing from the
// install list would resize the panel above it and shift the hovered row.
const previewName = ref<string | null>(null);
const showProps = ref(true);
const expandedProps = ref<ReadonlySet<string>>(new Set());

const item = computed(() => props.graph.items.get(props.selected));
const propsItem = computed(
  () => (previewName.value ? props.graph.items.get(previewName.value) : undefined) ?? item.value,
);
const steps = computed(() => getInstallOrder(props.graph, props.selected));
const packages = computed(() => getInstallPackages(props.graph, steps.value));
const model = computed(() =>
  mode.value === "installs"
    ? buildInstallChain(props.graph, props.selected, steps.value, packages.value)
    : buildDependentsChain(props.graph, props.selected),
);
const propSpecs = computed(() => getPropSpecs(props.graph, model.value.layers.keys()));
const allPropSpecs = computed(() => [...propSpecs.value.values()].flat());
const propIds = computed(() => allPropSpecs.value.map((spec) => spec.id));
const optionCount = computed(() =>
  allPropSpecs.value.reduce((total, spec) => total + spec.rows.length, 0),
);
const propsShown = computed(() => showProps.value && propIds.value.length > 0);
const allExpanded = computed(
  () => propIds.value.length > 0 && propIds.value.every((id) => expandedProps.value.has(id)),
);
const chain = computed(() =>
  layoutChain(model.value, propsShown.value ? propSpecs.value : undefined, expandedProps.value),
);

const affected = computed(() =>
  [...model.value.layers]
    .filter(([name]) => name !== props.selected)
    .toSorted(([nameA, layerA], [nameB, layerB]) => layerA - layerB || nameA.localeCompare(nameB)),
);

const totals = computed(() => {
  if (mode.value === "installs") {
    const fileCount = steps.value.reduce(
      (total, step) =>
        step.kind === "item"
          ? total + (props.graph.items.get(step.name)?.files.length ?? 0)
          : total,
      0,
    );

    return [
      ["Items", steps.value.length],
      ["Packages", packages.value.length],
      ["Files", fileCount],
    ] as const;
  }

  return [
    ["Affected", affected.value.length],
    ["Direct", getDependents(props.graph, props.selected).length],
    ["Max depth", Math.max(0, ...model.value.layers.values())],
  ] as const;
});

const installSteps = computed(() =>
  steps.value.map((step) => {
    const id = getInstallStepId(step);
    const isRequested = id === props.selected;
    const stepItem = step.kind === "item" ? props.graph.items.get(step.name) : undefined;
    let kind = "remote";

    if (step.kind === "item") {
      kind = isRequested ? "requested" : getRegistryTypeLabel(stepItem?.type ?? "registry:item");
    }

    return {
      id,
      isRequested,
      kind,
      label: step.kind === "remote" ? step.dependency.name : (stepItem?.title ?? step.name),
      target: step.kind === "item" ? step.name : undefined,
    };
  }),
);

function toggleProp(id: string) {
  const next = new Set(expandedProps.value);

  if (!next.delete(id)) {
    next.add(id);
  }

  expandedProps.value = next;
}

function setAllExpanded(expanded: boolean) {
  const next = new Set(expandedProps.value);

  for (const id of propIds.value) {
    if (expanded) {
      next.add(id);
    } else {
      next.delete(id);
    }
  }

  expandedProps.value = next;
}

provide(flowChainHotKey, hot);
provide(flowPropToggleKey, toggleProp);

function setHot(id: string | null) {
  hot.value = id;
}

function onNodeMouseEnter({ node }: NodeMouseEvent) {
  const id: string = node.type === "prop" ? node.data.owner : node.id;

  hot.value = id;
  previewName.value = props.graph.items.has(id) ? id : null;
}

function onNodeMouseLeave() {
  hot.value = null;
  previewName.value = null;
}

function onNodeClick({ node }: NodeMouseEvent) {
  if (node.type === "chain" && node.data.target && node.data.target !== props.selected) {
    emit("select", node.data.target);
  }
}
</script>

<template>
  <div
    v-if="item"
    class="grid grid-cols-[minmax(0,1fr)] gap-6 pb-6 lg:-mt-6 lg:-ml-6 lg:grid-cols-[22rem_minmax(0,1fr)] lg:pb-0"
  >
    <aside
      :class="
        cn(
          'flex flex-col gap-5 rounded-xl border p-5 *:shrink-0 lg:sticky lg:top-16 lg:h-[calc(100svh-4rem)] lg:self-start lg:overflow-y-auto lg:rounded-none lg:border-0 lg:border-r lg:bg-muted/30',
          flowSidebarScrollClassName,
        )
      "
    >
      <div class="flex flex-col gap-2">
        <span class="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
          Registry item
        </span>
        <FlowItemPicker
          :model-value="selected"
          :graph="graph"
          @update:model-value="emit('select', $event)"
        />
      </div>

      <div class="flex flex-col items-start gap-2">
        <Badge variant="outline" class="font-mono">
          <RegistryTypeIcon :type="item.type" :stroke-width="1.75" />
          registry:{{ getRegistryTypeLabel(item.type) }}
        </Badge>
        <h2 class="text-4xl leading-none font-semibold tracking-tighter">{{ item.title }}</h2>
        <p class="text-sm text-muted-foreground">
          {{
            mode === "installs"
              ? `Everything the CLI pulls in when someone installs ${item.title}, in order.`
              : `Every registry item affected when you change ${item.title}.`
          }}
        </p>
      </div>

      <InstallCommand v-if="mode === 'installs'" :item-name="selected" class="my-0" />

      <dl class="grid grid-cols-3 divide-x overflow-hidden rounded-lg border">
        <div
          v-for="[label, value] in totals"
          :key="label"
          class="flex flex-col-reverse px-3 py-2.5"
        >
          <dt class="text-xs text-muted-foreground">{{ label }}</dt>
          <dd class="font-mono text-xl">{{ value }}</dd>
        </div>
      </dl>

      <FlowPropsPanel
        v-if="propsItem"
        :item="propsItem"
        :previewing="propsItem.name !== selected"
      />

      <div>
        <h3 class="mb-1.5 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
          {{ mode === "installs" ? "Install order" : "Impact" }}
        </h3>
        <ol v-if="mode === 'installs'" class="flex flex-col">
          <FlowChainStep
            v-for="(step, index) in installSteps"
            :id="step.id"
            :key="step.id"
            :hot="hot"
            :emphasized="step.isRequested"
            :selectable="step.target !== undefined"
            :label="step.label"
            :kind="step.kind"
            @hot="setHot"
            @select="step.target && emit('select', step.target)"
          >
            <template #number>{{ index + 1 }}</template>
          </FlowChainStep>
          <FlowChainStep
            v-if="packages.length > 0"
            :id="CHAIN_NPM_ID"
            :hot="hot"
            label="npm install"
            :kind="`${packages.length} ${packages.length === 1 ? 'pkg' : 'pkgs'}`"
          >
            <template #number><PackageIcon class="size-3" /></template>
          </FlowChainStep>
        </ol>
        <ol v-else class="flex flex-col">
          <FlowChainStep :id="selected" :hot="hot" emphasized :label="item.title" kind="source">
            <template #number>0</template>
          </FlowChainStep>
          <FlowChainStep
            v-for="([name], index) in affected"
            :id="name"
            :key="name"
            :hot="hot"
            selectable
            :label="graph.items.get(name)?.title ?? name"
            :kind="getRegistryTypeLabel(graph.items.get(name)?.type ?? 'registry:item')"
            @hot="setHot"
            @select="emit('select', name)"
          >
            <template #number>{{ index + 1 }}</template>
          </FlowChainStep>
        </ol>
        <p
          v-if="mode === 'dependents' && affected.length === 0"
          class="mt-1 px-2 text-xs text-muted-foreground"
        >
          Safe to change — nothing else in the registry uses {{ item.title }}.
        </p>
      </div>
    </aside>

    <div class="contents lg:flex lg:h-[calc(100svh-4rem)] lg:min-w-0 lg:flex-col lg:gap-6 lg:py-6">
      <div v-if="$slots.header" class="order-first lg:order-none">
        <slot name="header" />
      </div>
      <section
        class="flex h-[min(780px,calc(100svh-13rem))] min-h-120 flex-col overflow-hidden rounded-xl border bg-card lg:h-auto lg:min-h-0 lg:flex-1"
      >
        <div :class="flowToolbarClassName">
          <span :class="cn(flowToolbarLabelClassName, 'inline-flex items-center gap-1.5')">
            <ArrowDownIcon class="size-3" />
            {{ mode === "installs" ? "Install order" : "Impact" }} ·
            <span class="normal-case">
              {{
                mode === "installs" ? "top → bottom: resolve order" : "top → bottom: blast radius"
              }}
            </span>
          </span>
          <div class="flex flex-wrap items-center gap-2">
            <fieldset :class="flowSegmentedClassName">
              <legend class="sr-only">Flow direction</legend>
              <button
                v-for="[value, label] in modeOptions"
                :key="value"
                type="button"
                :aria-pressed="mode === value"
                :class="flowSegmentClassName"
                @click="mode = value"
              >
                {{ label }}
              </button>
            </fieldset>
            <fieldset v-if="propIds.length > 0" :class="flowSegmentedClassName">
              <legend class="sr-only">Canvas details</legend>
              <button
                type="button"
                :aria-pressed="showProps"
                :class="flowSegmentClassName"
                @click="showProps = !showProps"
              >
                <SlidersHorizontalIcon class="size-3" :stroke-width="1.75" />
                Props
                <span class="font-mono font-normal text-muted-foreground">{{
                  propIds.length
                }}</span>
              </button>
              <button
                type="button"
                :aria-pressed="allExpanded && showProps"
                :disabled="!showProps"
                :class="flowSegmentClassName"
                @click="setAllExpanded(!allExpanded)"
              >
                <ListTreeIcon class="size-3" :stroke-width="1.75" />
                Options
                <span class="font-mono font-normal text-muted-foreground">{{ optionCount }}</span>
              </button>
            </fieldset>
          </div>
        </div>
        <div class="min-h-0 flex-1 bg-muted/30">
          <FlowCanvas
            :key="`${selected}-${mode}-${propsShown}`"
            :nodes="chain.nodes"
            :edges="chain.edges"
            :fit-view-options="{ padding: { top: '24px', bottom: '24px', x: '24px' }, maxZoom: 1 }"
            @node-mouse-enter="onNodeMouseEnter"
            @node-mouse-leave="onNodeMouseLeave"
            @node-click="onNodeClick"
          >
            <template #node-chain="nodeProps">
              <FlowChainNode :id="nodeProps.id" :data="nodeProps.data" />
            </template>
            <template #node-prop="nodeProps">
              <FlowPropNode :id="nodeProps.id" :data="nodeProps.data" />
            </template>
            <template #edge-chain="edgeProps">
              <FlowChainEdge v-bind="edgeProps" />
            </template>
            <Background :gap="20" :size="1.2" color="var(--border)" />
            <FlowControls position="bottom-right" />
          </FlowCanvas>
        </div>
      </section>
    </div>
  </div>
</template>
