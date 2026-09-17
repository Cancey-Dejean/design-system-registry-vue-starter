---
name: scroll-fade
type: registry:ui
title: Scroll Fade
description: A scrollable container that fades its edges to hint at overflowing content.
files:
  - path: ScrollFade.vue
    type: registry:ui
    target: components/ui/scroll-fade/ScrollFade.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/scroll-fade/index.ts
---

Reach for `ScrollFade` instead of a plain `overflow-auto` div when you want a subtle visual cue
that more content is scrollable, without adding visible scrollbar chrome. Put backgrounds and
borders on an outer wrapper so the fade dissolves the content rather than the card edge.

```vue
<script setup lang="ts">
import { ScrollFade } from "@/components/ui/scroll-fade";

const items = Array.from({ length: 12 }, (_, index) => `Item ${index + 1}`);
</script>

<template>
  <div class="mx-auto w-full max-w-xs overflow-hidden rounded-2xl border">
    <ScrollFade class="h-72">
      <div class="flex flex-col gap-1.5 p-1.5">
        <div v-for="item in items" :key="item" class="bg-muted rounded-lg px-3 py-2.5 text-sm">
          {{ item }}
        </div>
      </div>
    </ScrollFade>
  </div>
</template>
```

Set `orientation="horizontal"` to fade the start/end edges instead of top/bottom, and
`hide-scrollbar="false"` to keep the native scrollbar visible alongside the fade.
