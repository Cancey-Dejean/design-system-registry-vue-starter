<script setup lang="ts">
import { DotCanvas } from "@registry/lib/DotCanvas";
import { useEventListener, useIntersectionObserver, useResizeObserver } from "@vueuse/core";
import { Skeleton } from "@registry/components/Skeleton";
import { hasPreview } from "~/lib/registry/preview-map";
import { useAccentTheme } from "~/composables/useAccentTheme";

const props = defineProps<{ name: string; title: string; isComponent: boolean }>();
const container = ref<HTMLElement>();
const frame = ref<HTMLIFrameElement>();
const visible = ref(false);
const width = ref(0);
const ready = ref(false);
const failed = ref(false);
const colorMode = useColorMode();
const accent = useAccentTheme();
// Match the React reference's component and block artboards.
const stageWidth = computed(() => (props.isComponent ? 720 : 1440));
const stageHeight = computed(() => (props.isComponent ? 450 : 900));
const scale = computed(() => Math.min(width.value / stageWidth.value, 1));
const available = computed(() => hasPreview(props.name));
const frameKey = computed(() => `${props.name}:${colorMode.value}:${accent.value}`);
const { stop } = useIntersectionObserver(
  container,
  ([entry]) => {
    if (entry?.isIntersecting) {
      visible.value = true;
      stop();
    }
  },
  { rootMargin: "200px" },
);
useResizeObserver(container, ([entry]) => {
  width.value = entry?.contentRect.width ?? 0;
});
watch(frameKey, () => {
  ready.value = false;
  failed.value = false;
});
useEventListener("message", (event: MessageEvent) => {
  if (
    event.origin !== window.location.origin ||
    event.source !== frame.value?.contentWindow ||
    event.data?.type !== "registry-preview-status" ||
    event.data.name !== props.name
  )
    return;
  ready.value = event.data.status === "ready";
  failed.value = event.data.status === "error";
});
function onLoad() {
  const document = frame.value?.contentDocument;
  ready.value =
    document
      ?.querySelector("[data-registry-preview-ready]")
      ?.getAttribute("data-registry-preview-ready") === props.name;
  failed.value = Boolean(document?.querySelector("[data-registry-preview-error]"));
}
</script>

<template>
  <div
    ref="container"
    class="pointer-events-none relative aspect-[8/5] overflow-hidden rounded-lg border bg-muted/20"
    aria-hidden="true"
    inert
  >
    <DotCanvas class="mask-[radial-gradient(ellipse_at_center,transparent_20%,black_85%)]" />
    <div
      v-if="!available || failed"
      class="flex h-full items-center justify-center p-6 text-sm text-muted-foreground"
    >
      {{ failed ? "Open the item to view its example." : "Preview coming soon" }}
    </div>
    <template v-else>
      <iframe
        v-if="visible"
        :key="frameKey"
        ref="frame"
        :src="`/preview/${encodeURIComponent(name)}`"
        :title="`${title} preview`"
        tabindex="-1"
        class="absolute left-0 top-0 origin-top-left border-0"
        :style="{
          width: `${stageWidth}px`,
          height: `${stageHeight}px`,
          transform: `scale(${scale})`,
          opacity: ready ? 1 : 0,
        }"
        @load="onLoad"
        @error="failed = true"
      />
      <div v-if="!ready" class="absolute inset-0 flex items-center justify-center p-8">
        <Skeleton class="h-24 w-full max-w-xs motion-reduce:animate-none" />
      </div>
    </template>
  </div>
</template>
