<script setup lang="ts">
import type { ImgHTMLAttributes } from "vue";
import { cn } from "cn";

const props = withDefaults(
  defineProps<{
    class?: ImgHTMLAttributes["class"];
    src?: string;
    alt?: string;
  }>(),
  {
    src: "/images/logo.png",
    alt: "Main Logo",
  },
);
</script>

<template>
  <img :src="src" :alt="alt" :class="cn('h-4', props.class)" />
</template>
