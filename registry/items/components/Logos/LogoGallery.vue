<script setup lang="ts">
import { Check, Search } from "@lucide/vue";
import { refDebounced } from "@vueuse/core";
import { computed, ref } from "vue";
import { type LogoKey, Logo, LOGOS, LogoGrid } from "./";

const LOGO_LIST = Object.keys(LOGOS) as LogoKey[];

const query = ref("");
const debouncedQuery = refDebounced(query, 200);

const filtered = computed(() =>
  LOGO_LIST.filter((name) => name.toLowerCase().includes(debouncedQuery.value.toLowerCase())),
);

const feedback = ref<{ name: LogoKey; kind: "copied" | "downloaded" } | null>(null);
let clearFeedbackTimer: ReturnType<typeof setTimeout> | undefined;

function setFeedback(name: LogoKey, kind: "copied" | "downloaded") {
  feedback.value = { name, kind };
  if (clearFeedbackTimer) clearTimeout(clearFeedbackTimer);
  clearFeedbackTimer = setTimeout(() => {
    feedback.value = null;
  }, 1500);
}

function handleClick(name: LogoKey, event: MouseEvent) {
  const button = event.currentTarget as HTMLElement | null;
  const el = button?.querySelector("svg, img");
  if (!el) return;

  if (el instanceof HTMLImageElement) {
    const src = el.currentSrc || el.getAttribute("src");
    if (!src) return;

    void fetch(src)
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = src.split("/").pop() ?? "logo.png";
        a.click();
        URL.revokeObjectURL(url);
        setFeedback(name, "downloaded");
      })
      .catch(() => {
        /* fetch may fail for non-CORS or invalid URLs */
      });
    return;
  }

  void navigator.clipboard.writeText(el.outerHTML).then(
    () => {
      setFeedback(name, "copied");
    },
    () => {
      /* clipboard API may not be available in all storybook envs */
    },
  );
}

function clearQuery() {
  query.value = "";
}

function isImageLogo(name: LogoKey) {
  return name === "main-logo";
}
</script>

<template>
  <div class="flex w-full flex-col gap-6">
    <div class="relative">
      <Search
        class="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <input
        v-model="query"
        type="text"
        placeholder="Search logos..."
        class="h-11 w-full rounded-xl border border-border bg-background pr-4 pl-10 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
      />
      <button
        v-if="query"
        type="button"
        class="absolute top-1/2 right-3.5 -translate-y-1/2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        @click="clearQuery"
      >
        Clear
      </button>
    </div>

    <div class="flex items-center justify-between">
      <span class="text-xs font-medium text-muted-foreground">
        {{ filtered.length }} logo{{ filtered.length !== 1 ? "s" : ""
        }}<template v-if="debouncedQuery">
          <span class="text-foreground"> matching "{{ debouncedQuery }}"</span>
        </template>
      </span>
      <span class="text-[10px] font-medium tracking-widest text-muted-foreground/60 uppercase">
        Click to copy SVG or download image
      </span>
    </div>

    <LogoGrid
      v-if="filtered.length > 0"
      class="grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4"
    >
      <button
        v-for="name in filtered"
        :key="name"
        type="button"
        class="group relative flex cursor-pointer flex-col items-center gap-3 rounded-xl border border-border bg-background p-5 transition-all duration-200 hover:border-primary/30 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] active:scale-[0.97]"
        @click="handleClick(name, $event)"
      >
        <div
          class="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-primary/95 transition-all duration-200"
          :class="feedback?.name === name ? 'scale-100 opacity-100' : 'scale-95 opacity-0'"
        >
          <div class="flex items-center gap-1.5 text-primary-foreground">
            <Check class="size-3.5" :stroke-width="2.5" />
            <span class="text-xs font-semibold tracking-wide">
              {{ feedback?.kind === "downloaded" ? "Downloaded" : "Copied" }}
            </span>
          </div>
        </div>

        <div
          class="flex items-center justify-center text-foreground transition-colors duration-200 group-hover:text-primary [&_img]:max-h-8 [&_img]:w-auto [&_svg]:max-h-12 [&_svg]:min-w-auto"
        >
          <Logo :logo="name" size="lg" class="size-full object-contain" />
        </div>

        <span
          class="w-full truncate text-center text-[11px] font-medium tracking-tight text-muted-foreground transition-colors duration-200 group-hover:text-foreground"
        >
          {{ name }}
        </span>

        <span
          class="absolute top-2 right-2 text-[9px] font-medium tracking-widest text-muted-foreground uppercase opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        >
          {{ isImageLogo(name) ? "Download" : "SVG" }}
        </span>
      </button>
    </LogoGrid>

    <div
      v-else
      class="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border py-16"
    >
      <Search class="size-6 text-muted-foreground/40" />
      <p class="text-sm text-muted-foreground">No logos match "{{ debouncedQuery }}"</p>
    </div>
  </div>
</template>
