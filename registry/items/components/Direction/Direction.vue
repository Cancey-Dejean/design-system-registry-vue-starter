<script setup lang="ts">
import { ConfigProvider, injectConfigProviderContext } from "reka-ui";
import { computed } from "vue";
import type { DirectionProviderProps } from "./Direction.types";

withDefaults(defineProps<DirectionProviderProps>(), { direction: "ltr" });

const parentConfiguration = injectConfigProviderContext(null);
// Re-provide only documented ConfigProvider props so changing direction does not
// reset a surrounding locale, CSP nonce, portal target, scroll policy or SSR IDs.
const inheritedConfiguration = computed(() => ({
  locale: parentConfiguration?.locale?.value,
  scrollBody: parentConfiguration?.scrollBody?.value,
  nonce: parentConfiguration?.nonce?.value,
  teleportTo: parentConfiguration?.teleportTo?.value,
  useId: parentConfiguration?.useId,
}));
</script>

<template>
  <ConfigProvider v-bind="inheritedConfiguration" :dir="direction">
    <slot />
  </ConfigProvider>
</template>
