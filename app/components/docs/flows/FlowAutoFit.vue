<script setup lang="ts">
import { useVueFlow, type FitViewParams } from "@vue-flow/core";

const props = defineProps<{ options?: FitViewParams }>();
const emit = defineEmits<{ fitted: [] }>();

// Rendered inside <VueFlow>, so this resolves to that canvas's own store.
const { fitView, onNodesInitialized } = useVueFlow();
let hasFitted = false;

onNodesInitialized(() => {
  if (hasFitted) {
    return;
  }

  hasFitted = true;
  void fitView(props.options).then(() => emit("fitted"));
});
</script>

<template>
  <slot />
</template>
