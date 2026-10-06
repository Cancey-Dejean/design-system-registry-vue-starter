<script setup lang="ts">
import { MaximizeIcon, MinusIcon, PlusIcon } from "@lucide/vue";
import { ControlButton, Controls } from "@vue-flow/controls";
import { useVueFlow, type PanelPositionType } from "@vue-flow/core";

defineProps<{ position?: PanelPositionType }>();

// Rendered inside <VueFlow>, so this resolves to that canvas's own store.
const { zoomIn, zoomOut, fitView } = useVueFlow();
</script>

<template>
  <!-- Vue Flow's own control buttons have no accessible name, so they are replaced here. -->
  <Controls :position="position" :show-interactive="false">
    <template #control-zoom-in>
      <ControlButton aria-label="Zoom in" title="Zoom in" @click="zoomIn()">
        <PlusIcon />
      </ControlButton>
    </template>
    <template #control-zoom-out>
      <ControlButton aria-label="Zoom out" title="Zoom out" @click="zoomOut()">
        <MinusIcon />
      </ControlButton>
    </template>
    <template #control-fit-view>
      <ControlButton aria-label="Fit view" title="Fit view" @click="fitView()">
        <MaximizeIcon />
      </ControlButton>
    </template>
  </Controls>
</template>
