<script setup lang="ts">
import { ChevronRightIcon } from "@lucide/vue";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@registry/components/Collapsible/index.ts";
import type { RegistryFlowItem } from "~/lib/registry/flow-data";
import FlowPropsDialog from "./FlowPropsDialog.vue";

const MAX_VISIBLE_OPTIONS = 8;

const props = defineProps<{
  item: RegistryFlowItem;
  previewing: boolean;
}>();

const isEmpty = computed(
  () => props.item.api.variants.length === 0 && props.item.api.props.length === 0,
);

const countLabel = computed(() => {
  const variantCount = props.item.api.variants.length;
  const propCount = props.item.api.props.length;

  return [
    variantCount > 0 ? `${variantCount} ${variantCount === 1 ? "variant" : "variants"}` : "",
    propCount > 0 ? `${propCount} ${propCount === 1 ? "prop" : "props"}` : "",
  ]
    .filter(Boolean)
    .join(" · ");
});
</script>

<template>
  <section v-if="isEmpty" class="flex flex-col gap-2">
    <div class="flex items-baseline gap-2">
      <h3 class="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">Props</h3>
      <code v-if="item.api.component" class="truncate font-mono text-[11px] text-foreground">{{
        `<${item.api.component}>`
      }}</code>
    </div>
    <p class="rounded-lg border border-dashed px-3 py-2.5 text-xs text-muted-foreground">
      No variants or own props found for {{ item.title }}.
    </p>
  </section>

  <Collapsible v-else default-open as="section" class="flex flex-col">
    <CollapsibleTrigger
      class="group/props -mx-2 flex items-center gap-2 rounded-md px-2 py-1 text-left outline-none hover:bg-muted/60 focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <ChevronRightIcon
        aria-hidden="true"
        class="size-3 shrink-0 text-muted-foreground transition-transform duration-150 group-data-[state=open]/props:rotate-90"
        :stroke-width="1.75"
      />
      <h3 class="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">Props</h3>
      <code v-if="item.api.component" class="truncate font-mono text-[11px] text-foreground">{{
        `<${item.api.component}>`
      }}</code>
      <span class="ml-auto shrink-0 font-mono text-[11px] text-muted-foreground">
        {{ previewing ? `previewing ${item.title}` : countLabel }}
      </span>
    </CollapsibleTrigger>

    <CollapsibleContent class="pt-2">
      <div class="flex flex-col divide-y overflow-hidden rounded-lg border bg-card">
        <div
          v-for="variant in item.api.variants"
          :key="variant.name"
          class="flex flex-col gap-1.5 px-3 py-2.5"
        >
          <div class="flex items-baseline justify-between gap-2 font-mono text-[11.5px]">
            <span class="font-medium">{{ variant.name }}</span>
            <span v-if="variant.defaultValue !== undefined" class="text-muted-foreground">
              default: {{ variant.defaultValue }}
            </span>
          </div>
          <ul class="flex flex-wrap gap-1" :aria-label="`${variant.name} options`">
            <li
              v-for="option in variant.options.slice(0, MAX_VISIBLE_OPTIONS)"
              :key="option"
              :class="[
                'rounded-md border px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground',
                option === variant.defaultValue && 'border-foreground/40 bg-muted text-foreground',
              ]"
            >
              {{ option }}
            </li>
            <li
              v-if="variant.options.length > MAX_VISIBLE_OPTIONS"
              class="px-1 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              +{{ variant.options.length - MAX_VISIBLE_OPTIONS }} more
            </li>
          </ul>
        </div>
        <div v-if="item.api.props.length > 0" class="flex flex-col gap-1.5 px-3 py-2.5">
          <span class="font-mono text-[11.5px] font-medium">props</span>
          <ul class="flex flex-wrap gap-1" aria-label="Own props">
            <li
              v-for="prop in item.api.props"
              :key="prop.name"
              class="rounded-md border px-1.5 py-0.5 font-mono text-[11px] text-foreground"
            >
              {{ prop.name }}<span v-if="prop.optional" class="text-muted-foreground">?</span>
            </li>
          </ul>
        </div>
      </div>
      <FlowPropsDialog :item="item" />
    </CollapsibleContent>
  </Collapsible>
</template>
