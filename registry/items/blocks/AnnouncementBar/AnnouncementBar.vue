<script setup lang="ts">
import { cn } from "cn";
import type { HTMLAttributes } from "vue";
import { announcementBarVariants } from "./AnnouncementBar.variants";
import type { AnnouncementTheme } from "./types";
const props = withDefaults(
  defineProps<{ theme?: AnnouncementTheme; class?: HTMLAttributes["class"] }>(),
  { theme: "light" },
);
</script>
<template>
  <div
    data-slot="announcement-bar"
    :data-theme="theme"
    :class="cn(announcementBarVariants({ theme }), props.class)"
  >
    <slot />
  </div>
</template>
