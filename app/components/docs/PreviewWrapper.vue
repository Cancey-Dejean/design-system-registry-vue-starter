<script setup lang="ts">
import { cn } from "cn";
import type { HTMLAttributes } from "vue";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div  :class="
      cn(
        'max-w-sm w-full p-4 rounded-md',
        props.class,
      )
    " >
    <slot />
  </div>
</template>