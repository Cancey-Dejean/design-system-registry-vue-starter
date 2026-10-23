<script setup lang="ts">
import { Columns3Icon, CrosshairIcon, WorkflowIcon } from "@lucide/vue";
import { Tooltip, TooltipContent, TooltipTrigger } from "@registry/components/Tooltip/index.ts";
import { cn } from "cn";
import type { Component, HTMLAttributes } from "vue";
import type { FlowLayout } from "~/composables/useFlowLayout";

const props = defineProps<{ class?: HTMLAttributes["class"] }>();
const layout = defineModel<FlowLayout>({ required: true });

const flowLayoutOptions = [
  { id: "map", label: "Registry map", icon: WorkflowIcon },
  { id: "lanes", label: "Lineage lanes", icon: Columns3Icon },
  { id: "chain", label: "Install chain", icon: CrosshairIcon },
] as const satisfies readonly { id: FlowLayout; label: string; icon: Component }[];
</script>

<template>
  <fieldset
    :class="
      cn('inline-flex items-center gap-0.5 rounded-lg border bg-card p-0.5 shadow-xs', props.class)
    "
  >
    <legend class="sr-only">Layout</legend>
    <span
      aria-hidden="true"
      class="px-2 font-mono text-[10px] tracking-widest text-muted-foreground uppercase"
    >
      Layout
    </span>
    <span aria-hidden="true" class="mr-0.5 h-4 w-px bg-border" />
    <Tooltip v-for="option in flowLayoutOptions" :key="option.id">
      <TooltipTrigger as-child>
        <label
          class="grid size-7 cursor-pointer place-items-center rounded-md border border-transparent text-muted-foreground transition-colors hover:bg-muted hover:text-foreground has-checked:border-emerald-500/50 has-checked:bg-emerald-500/10 has-checked:text-emerald-700 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-emerald-500 dark:has-checked:text-emerald-400"
        >
          <input
            v-model="layout"
            type="radio"
            name="flow-layout"
            :value="option.id"
            class="sr-only"
          />
          <component :is="option.icon" aria-hidden="true" class="size-3.5" :stroke-width="1.75" />
          <span class="sr-only">{{ option.label }}</span>
        </label>
      </TooltipTrigger>
      <TooltipContent side="bottom">{{ option.label }}</TooltipContent>
    </Tooltip>
  </fieldset>
</template>
