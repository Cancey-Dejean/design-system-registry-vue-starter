<script setup lang="ts">
import { BaseEdge, getSmoothStepPath, type Position } from "@vue-flow/core";
import type { CSSProperties } from "vue";

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition: Position;
  targetPosition: Position;
  style?: CSSProperties;
  markerEnd?: string;
  data?: { turnY?: number };
}>();

const path = computed(() => {
  const turnY = props.data?.turnY;

  return getSmoothStepPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    targetX: props.targetX,
    targetY: props.targetY,
    sourcePosition: props.sourcePosition,
    targetPosition: props.targetPosition,
    borderRadius: 12,
    centerY: turnY !== undefined && turnY > props.sourceY ? turnY : undefined,
  })[0];
});
</script>

<template>
  <BaseEdge :path="path" :style="style" :marker-end="markerEnd" />
</template>
