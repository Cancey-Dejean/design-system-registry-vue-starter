<script setup lang="ts">
import { onMounted, ref, type HTMLAttributes } from "vue";
import { ToggleGroup, ToggleGroupItem } from "@registry/components/ToggleGroup";
import { cn } from "cn";
import {
  themes,
  themeLabels,
  isBrandTheme,
  THEME_STORAGE_KEY,
  type BrandTheme,
} from "./themeToggle";
const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"];
    defaultTheme?: BrandTheme;
    storageKey?: string;
  }>(),
  { defaultTheme: "theme-primary", storageKey: THEME_STORAGE_KEY },
);
const theme = ref<BrandTheme>(props.defaultTheme);
function apply(value: BrandTheme) {
  theme.value = value;
  document.documentElement.setAttribute("data-theme", value);
}
function select(value: unknown) {
  if (!isBrandTheme(value)) return;
  apply(value);
  try {
    localStorage.setItem(props.storageKey, value);
  } catch {
    /* Selection still works without persistence. */
  }
}
onMounted(() => {
  let initial: unknown;
  try {
    initial = localStorage.getItem(props.storageKey);
  } catch {
    /* Use document/default theme. */
  }
  if (!isBrandTheme(initial)) initial = document.documentElement.getAttribute("data-theme");
  apply(isBrandTheme(initial) ? initial : props.defaultTheme);
});
</script>
<template>
  <ToggleGroup
    type="single"
    :model-value="theme"
    variant="outline"
    aria-label="Brand theme"
    data-slot="theme-toggle"
    :class="cn('inline-flex flex-wrap gap-2', props.class)"
    @update:model-value="select"
    ><ToggleGroupItem v-for="option in themes" :key="option" :value="option">{{
      themeLabels[option]
    }}</ToggleGroupItem></ToggleGroup
  >
</template>
