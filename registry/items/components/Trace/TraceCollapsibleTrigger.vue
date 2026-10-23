<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import type { CollapsibleTriggerProps } from "reka-ui";
import { ChevronRight } from "@lucide/vue";
import { cn } from "cn";
import { CollapsibleTrigger } from "@registry/components/Collapsible";
import TraceIcon from "./TraceIcon.vue";
const props = defineProps<
  Omit<CollapsibleTriggerProps, "asChild"> & { class?: HTMLAttributes["class"] }
>();
</script>

<template>
  <CollapsibleTrigger
    v-bind="props"
    data-slot="trace-collapsible-trigger"
    :class="
      cn(
        'group/trace-trigger flex w-fit max-w-full min-w-0 cursor-pointer items-center gap-1 rounded-lg text-start text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/30 has-[[data-status=error]]:text-destructive',
        props.class,
      )
    "
  >
    <slot />
    <TraceIcon
      class="transition-transform group-data-[state=open]/trace-trigger:rotate-90 motion-reduce:transition-none"
      ><ChevronRight
    /></TraceIcon>
  </CollapsibleTrigger>
</template>
