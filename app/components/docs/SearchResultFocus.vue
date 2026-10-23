<script setup lang="ts">
import { injectListboxRootContext } from "reka-ui";

const { highlightFirstItem } = injectListboxRootContext();
// Async results replace the previous options. Restore keyboard selection only
// after the new options register, while the search field keeps focus.
onMounted(async () => {
  await nextTick();
  highlightFirstItem();
});
</script>

<template><span class="sr-only" aria-hidden="true" /></template>
