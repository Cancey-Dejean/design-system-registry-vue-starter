<script setup lang="ts">
import { computed, onScopeDispose, ref, useSlots, watch, type HTMLAttributes } from "vue";
import emblaCarouselVue from "embla-carousel-vue";
import { ChevronLeft, ChevronRight } from "@lucide/vue";
import { Button } from "@registry/components/Button";
import { cn } from "cn";
import { announcementBarVariants } from "./AnnouncementBar.variants";
import { getAnnouncementSlides } from "./slides";
import SlideContent from "./SlideContent";
import type { AnnouncementTheme } from "./types";
const props = withDefaults(
  defineProps<{
    theme?: AnnouncementTheme;
    class?: HTMLAttributes["class"];
    opts?: Parameters<typeof emblaCarouselVue>[0];
  }>(),
  { theme: "light" },
);
const slots = useSlots();
const slides = () => getAnnouncementSlides(slots.default?.() ?? []);
const [viewport, api] = emblaCarouselVue(
  computed(() => ({ loop: true, align: "center" as const, ...props.opts })),
);
const canPrev = ref(false);
const canNext = ref(false);
const update = () => {
  canPrev.value = api.value?.canScrollPrev() ?? false;
  canNext.value = api.value?.canScrollNext() ?? false;
};
watch(api, (current, previous) => {
  previous?.off("select", update).off("reInit", update);
  current?.on("select", update).on("reInit", update);
  update();
});
onScopeDispose(() => api.value?.off("select", update).off("reInit", update));
</script>
<template>
  <div
    role="region"
    aria-roledescription="carousel"
    aria-label="Announcements"
    data-slot="announcement-bar-slider"
    :data-theme="theme"
    :class="cn(announcementBarVariants({ theme }), props.class)"
  >
    <div class="mx-auto flex max-w-7xl items-center justify-center gap-3 px-6 sm:gap-5">
      <Button
        v-if="slides().length > 1"
        variant="ghost"
        size="icon-sm"
        :disabled="!canPrev"
        aria-label="Previous announcement"
        @click="api?.scrollPrev()"
        ><ChevronLeft
      /></Button>
      <div ref="viewport" class="min-w-0 flex-1 overflow-hidden">
        <div class="flex touch-pan-y">
          <div
            v-for="(slide, index) in slides()"
            :key="slide.key ?? index"
            role="group"
            aria-roledescription="slide"
            :aria-label="`${index + 1} of ${slides().length}`"
            class="min-w-0 shrink-0 grow-0 basis-full text-center text-sm"
          >
            <SlideContent :node="slide" />
          </div>
        </div>
      </div>
      <Button
        v-if="slides().length > 1"
        variant="ghost"
        size="icon-sm"
        :disabled="!canNext"
        aria-label="Next announcement"
        @click="api?.scrollNext()"
        ><ChevronRight
      /></Button>
    </div>
  </div>
</template>
