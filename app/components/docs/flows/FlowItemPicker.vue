<script setup lang="ts">
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxViewport,
} from "@registry/components/Combobox/index.ts";
import { cn } from "cn";
import type { HTMLAttributes } from "vue";
import type { RegistryFlowGraph } from "~/lib/registry/flow-graph";
import RegistryTypeIcon from "./RegistryTypeIcon.vue";

const props = defineProps<{
  graph: RegistryFlowGraph;
  class?: HTMLAttributes["class"];
}>();
const value = defineModel<string>({ required: true });

const query = ref("");
const selectedItem = computed(() => props.graph.items.get(value.value));

function getTitle(name: string): string {
  return props.graph.items.get(name)?.title ?? name;
}

const filteredNames = computed(() => {
  const normalizedQuery = query.value.trim().toLowerCase();

  return normalizedQuery
    ? props.graph.names.filter(
        (name) =>
          name.includes(normalizedQuery) || getTitle(name).toLowerCase().includes(normalizedQuery),
      )
    : props.graph.names;
});

function onPick(name: unknown) {
  if (typeof name === "string" && name) {
    value.value = name;
  }
}

function onOpenChange(open: boolean) {
  if (!open) {
    query.value = "";
  }
}
</script>

<template>
  <!-- The list is filtered here (by name and title), so reka-ui's own text filter is off. -->
  <Combobox
    :model-value="value"
    ignore-filter
    @update:model-value="onPick"
    @update:open="onOpenChange"
  >
    <ComboboxAnchor :class="cn('w-full', props.class)">
      <ComboboxTrigger as-child>
        <button
          type="button"
          aria-label="Registry item"
          class="flex h-9 w-full cursor-pointer items-center gap-2 rounded-lg border border-input bg-transparent px-2.5 text-left text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 data-[state=open]:border-ring dark:bg-input/30"
        >
          <RegistryTypeIcon
            v-if="selectedItem"
            :type="selectedItem.type"
            class="size-4 shrink-0 text-muted-foreground"
            :stroke-width="1.75"
          />
          <span class="min-w-0 flex-1 truncate">{{ getTitle(value) }}</span>
        </button>
      </ComboboxTrigger>
    </ComboboxAnchor>
    <ComboboxList align="start" class="w-(--reka-combobox-trigger-width) min-w-56">
      <!-- reka-ui fills the input with the selected value on open; keep it a blank search. -->
      <ComboboxInput
        v-model="query"
        :display-value="() => ''"
        aria-label="Search registry items"
        placeholder="Search items…"
      />
      <p aria-live="polite" class="px-3 pt-2 pb-1 font-mono text-[11px] text-muted-foreground">
        {{ filteredNames.length }} {{ filteredNames.length === 1 ? "item" : "items" }}
      </p>
      <ComboboxEmpty>No matching items</ComboboxEmpty>
      <ComboboxViewport class="p-1">
        <ComboboxItem v-for="name in filteredNames" :key="name" :value="name">
          <RegistryTypeIcon
            v-if="graph.items.get(name)"
            :type="graph.items.get(name)!.type"
            class="size-4 text-muted-foreground"
            :stroke-width="1.75"
          />
          <span class="truncate">{{ getTitle(name) }}</span>
        </ComboboxItem>
      </ComboboxViewport>
    </ComboboxList>
  </Combobox>
</template>
