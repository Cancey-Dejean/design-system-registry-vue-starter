<script setup lang="ts">
// No dedicated docs landing content is authored yet (Phase 1 only has installation/theming) —
// redirect to the first sorted page instead of rendering an empty shell.
const { data: pages } = await useFetch("/api/docs-pages");

if (pages.value && pages.value.length > 0) {
  await navigateTo(`/docs/${pages.value[0]!.slug}`, { replace: true });
}
</script>

<template>
  <div />
</template>
