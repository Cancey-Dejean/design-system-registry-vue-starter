<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import type { CollapsibleRootEmits, CollapsibleRootProps } from "reka-ui";
import { useForwardPropsEmits } from "reka-ui";
import { cn } from "cn";
import { Collapsible } from "@registry/components/Collapsible";
const props = defineProps<CollapsibleRootProps & { class?: HTMLAttributes["class"] }>();
const emits = defineEmits<CollapsibleRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <Collapsible
    v-bind="forwarded"
    data-slot="trace-collapsible"
    :class="cn('flex w-full min-w-0 flex-col', props.class)"
    ><slot
  /></Collapsible>
</template>
