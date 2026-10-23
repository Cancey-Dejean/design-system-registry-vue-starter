<script setup lang="ts">
import { computed, onMounted, onScopeDispose, ref, type HTMLAttributes } from "vue";
import { Monitor, Moon, Sun } from "@lucide/vue";
import { Button } from "@registry/components/Button";
import { isThemeMode, nextThemeMode, resolveThemeMode, type ThemeMode } from "./modeToggle";
const props = withDefaults(
  defineProps<{ class?: HTMLAttributes["class"]; defaultMode?: ThemeMode; storageKey?: string }>(),
  { defaultMode: "auto", storageKey: "theme" },
);
const mode = ref<ThemeMode>(props.defaultMode);
let media: MediaQueryList | undefined;
function apply() {
  const resolved = resolveThemeMode(mode.value, media?.matches ?? false);
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(resolved);
  document.documentElement.style.colorScheme = resolved;
}
function selectNext() {
  mode.value = nextThemeMode(mode.value);
  apply();
  try {
    localStorage.setItem(props.storageKey, mode.value);
  } catch {
    /* Private storage can be unavailable. */
  }
}
const onSystemChange = () => {
  if (mode.value === "auto") apply();
};
onMounted(() => {
  media = window.matchMedia("(prefers-color-scheme: dark)");
  try {
    const stored = localStorage.getItem(props.storageKey);
    if (isThemeMode(stored)) mode.value = stored;
  } catch {
    /* Keep the default. */
  }
  apply();
  media.addEventListener("change", onSystemChange);
});
onScopeDispose(() => media?.removeEventListener("change", onSystemChange));
const label = computed(
  () =>
    `Theme mode: ${mode.value === "auto" ? "auto (system)" : mode.value}. Switch to ${nextThemeMode(mode.value)} mode.`,
);
</script>
<template>
  <Button
    type="button"
    variant="outline"
    size="icon-md"
    data-slot="mode-toggle"
    :data-mode="mode"
    :class="props.class"
    :aria-label="label"
    :title="label"
    @click="selectNext"
    ><component :is="mode === 'auto' ? Monitor : mode === 'dark' ? Moon : Sun" aria-hidden="true"
  /></Button>
</template>
