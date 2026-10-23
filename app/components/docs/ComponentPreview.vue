<script setup lang="ts">
import { DotCanvas } from "@registry/lib/DotCanvas";
import { resolvePreview } from "~/lib/registry/preview-map";

const props = defineProps<{ name: string }>();

const loader = computed(() => resolvePreview(props.name));
const resolvedPreview = computed(() =>
  loader.value ? defineAsyncComponent(loader.value) : undefined,
);
</script>

<template>
  <div class="relative isolate flex min-h-40 items-center justify-center rounded-lg border p-8">
    <DotCanvas
      class="rounded-[inherit] mask-[radial-gradient(ellipse_at_center,transparent_20%,black_85%)]"
    />
    <div class="relative z-1 grid w-full place-items-center">
      <Suspense v-if="resolvedPreview">
        <component :is="resolvedPreview" />
        <template #fallback>
          <span class="text-sm text-muted-foreground">Loading preview…</span>
        </template>
      </Suspense>
      <p v-else class="text-sm text-muted-foreground">No preview is available for "{{ name }}".</p>
    </div>
  </div>
</template>
