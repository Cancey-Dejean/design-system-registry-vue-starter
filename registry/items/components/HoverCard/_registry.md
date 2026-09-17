---
name: hover-card
type: registry:ui
title: Hover Card
description: Displays content in a popover when a trigger is hovered.
dependencies:
  - reka-ui
  - "@vueuse/core"
files:
  - path: HoverCard.vue
    type: registry:ui
    target: components/ui/hover-card/HoverCard.vue
  - path: HoverCardContent.vue
    type: registry:ui
    target: components/ui/hover-card/HoverCardContent.vue
  - path: HoverCardTrigger.vue
    type: registry:ui
    target: components/ui/hover-card/HoverCardTrigger.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/hover-card/index.ts
---

Use a hover card to give sighted users a quick preview of content behind a link — a user profile,
a linked document — without requiring a click. Not a substitute for accessible link text, since
the preview only appears on hover/focus.

```vue
<script setup lang="ts">
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
</script>

<template>
  <HoverCard>
    <HoverCardTrigger as-child>
      <a href="https://nuxt.com" class="underline">@nuxt</a>
    </HoverCardTrigger>
    <HoverCardContent>
      <p class="text-sm">The Intuitive Vue Framework.</p>
    </HoverCardContent>
  </HoverCard>
</template>
```
