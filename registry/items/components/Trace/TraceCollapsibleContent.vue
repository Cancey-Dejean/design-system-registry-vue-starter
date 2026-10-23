<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import type { CollapsibleContentProps } from "reka-ui";
import { cn } from "cn";
import { CollapsibleContent } from "@registry/components/Collapsible";
const props = defineProps<CollapsibleContentProps & { class?: HTMLAttributes["class"] }>();
</script>

<template>
  <CollapsibleContent
    v-bind="{ as: props.as, asChild: props.asChild, forceMount: props.forceMount }"
    data-slot="trace-collapsible-content"
    class="min-w-0 overflow-hidden"
  >
    <div
      data-slot="trace-collapsible-content-inner"
      :class="
        cn(
          'ms-[calc(--spacing(2)-1px)] mt-2 mb-1 min-w-0 border-s pe-1 ps-4 leading-relaxed wrap-break-word text-muted-foreground',
          props.class,
        )
      "
    >
      <slot />
    </div>
  </CollapsibleContent>
</template>
