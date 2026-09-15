<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div
    data-slot="button-cta-group"
    :class="cn('relative flex items-center justify-center gap-2', props.class)"
  >
    <slot />
  </div>
</template>
