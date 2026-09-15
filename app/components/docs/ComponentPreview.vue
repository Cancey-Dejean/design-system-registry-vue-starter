<script setup lang="ts">
import { resolvePreview } from "~/lib/registry/preview-map";

const props = defineProps<{ name: string }>();

const loader = computed(() => resolvePreview(props.name));
const resolvedPreview = computed(() =>
  loader.value ? defineAsyncComponent(loader.value) : undefined,
);
</script>

<template>
  <div class="flex min-h-40 items-center justify-center rounded-lg border p-8">
    <Suspense v-if="resolvedPreview">
      <component :is="resolvedPreview" />
      <template #fallback>
        <span class="text-sm text-muted-foreground">Loading preview…</span>
      </template>
    </Suspense>
    <p v-else class="text-sm text-muted-foreground">No preview is available for "{{ name }}".</p>
  </div>
</template>
