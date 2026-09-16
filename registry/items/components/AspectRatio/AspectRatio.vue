<script setup lang="ts">
import type { AspectRatioProps } from "reka-ui";
import { AspectRatio as AspectRatioRoot } from "reka-ui";

const props = defineProps<AspectRatioProps>();
</script>

<template>
  <AspectRatioRoot v-slot="slotProps" data-slot="aspect-ratio" v-bind="props">
    <slot v-bind="slotProps" />
  </AspectRatioRoot>
</template>
