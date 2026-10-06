<script setup lang="ts">
import { ChevronRightIcon } from "@lucide/vue";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@registry/components/Collapsible/index.ts";

defineProps<{ label: string }>();
</script>

<template>
  <Collapsible default-open as="section">
    <h3>
      <CollapsibleTrigger
        class="group/trigger -mx-1 mb-1 flex w-[calc(100%+0.5rem)] items-center gap-1.5 rounded-md px-1 py-1 font-mono text-[11px] tracking-wider text-muted-foreground uppercase outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <slot name="marker" />
        {{ label }}
        <ChevronRightIcon
          class="ml-auto size-3.5 transition-transform duration-150 group-data-[state=open]/trigger:rotate-90"
        />
      </CollapsibleTrigger>
    </h3>
    <CollapsibleContent>
      <slot />
    </CollapsibleContent>
  </Collapsible>
</template>
