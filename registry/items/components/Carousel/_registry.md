---
name: carousel
type: registry:ui
title: Carousel
description: A carousel of slides with previous/next controls and keyboard navigation.
dependencies:
  - embla-carousel-vue
  - "@vueuse/core"
  - "@lucide/vue"
localRegistryDependencies:
  - button
files:
  - path: Carousel.vue
    type: registry:ui
    target: components/ui/carousel/Carousel.vue
  - path: CarouselContent.vue
    type: registry:ui
    target: components/ui/carousel/CarouselContent.vue
  - path: CarouselItem.vue
    type: registry:ui
    target: components/ui/carousel/CarouselItem.vue
  - path: CarouselNext.vue
    type: registry:ui
    target: components/ui/carousel/CarouselNext.vue
  - path: CarouselPrevious.vue
    type: registry:ui
    target: components/ui/carousel/CarouselPrevious.vue
  - path: interface.ts
    type: registry:ui
    target: components/ui/carousel/interface.ts
  - path: index.ts
    type: registry:ui
    target: components/ui/carousel/index.ts
  - path: useCarousel.ts
    type: registry:ui
    target: components/ui/carousel/useCarousel.ts
---

Use carousel to cycle through a set of slides — images, cards, testimonials — in a constrained
space. Wrap slides in `CarouselContent`/`CarouselItem`, and pass `orientation="vertical"` to stack
slides top-to-bottom instead of side-to-side.

```vue
<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
</script>

<template>
  <Carousel class="w-full max-w-xs">
    <CarouselContent>
      <CarouselItem v-for="i in 5" :key="i">
        <div class="flex aspect-square items-center justify-center rounded-lg border text-3xl">
          {{ i }}
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>
```

Built on [Embla Carousel](https://www.embla-carousel.com/) via `embla-carousel-vue` — that package
is imported directly in `useCarousel.ts` but isn't currently listed in this project's
`package.json`, so install it separately when adding this component.
`CarouselNext`/`CarouselPrevious` reuse `Button`'s variants for their controls.
