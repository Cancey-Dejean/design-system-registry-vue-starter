<script setup lang="ts">
import { DotCanvas } from "@registry/lib/DotCanvas";
import { useAccentTheme } from "~/composables/useAccentTheme";
import { resolvePreview } from "~/lib/registry/preview-map";

// Gallery documents own their viewport, portals and global keyboard listeners.
definePageMeta({ layout: false });
const route = useRoute();
const name = computed(() => String(route.params.name));
const loader = computed(() => resolvePreview(name.value));
const preview = computed(() => (loader.value ? defineAsyncComponent(loader.value) : undefined));
const failed = ref(false);
const ready = ref(false);
useAccentTheme();
useSeoMeta({ robots: "noindex, nofollow" });
useHead({
  title: "Component preview",
  bodyAttrs: { "data-registry-preview": "", style: "margin:0;overflow:hidden" },
  script: [{ innerHTML: "window.__NUXT_DEVTOOLS_DISABLE__=true", tagPosition: "head" }],
});

async function notifyParent(status: "ready" | "error") {
  await nextTick();
  if (import.meta.client && window.parent !== window) {
    window.parent.postMessage(
      { type: "registry-preview-status", name: name.value, status },
      window.location.origin,
    );
  }
}
function onReady() {
  if (failed.value) return;
  ready.value = true;
  void notifyParent("ready");
}
onErrorCaptured(() => {
  failed.value = true;
  void notifyParent("error");
  return false;
});
</script>

<template>
  <div
    class="relative isolate flex min-h-screen w-full items-center justify-center p-8"
    :data-registry-preview-ready="ready && !failed ? name : undefined"
    :data-registry-preview-error="failed || !preview ? name : undefined"
  >
    <DotCanvas
      class="rounded-[inherit] mask-[radial-gradient(ellipse_at_center,transparent_20%,black_85%)]"
    />
    <div class="relative z-1 grid w-full place-items-center">
      <p v-if="failed || !preview" class="text-sm text-muted-foreground">
        Preview unavailable. Open the item to view its example.
      </p>
      <Suspense v-else @resolve="onReady">
        <component :is="preview" />
        <template #fallback><p class="text-sm text-muted-foreground">Loading preview…</p></template>
      </Suspense>
    </div>
  </div>
</template>
