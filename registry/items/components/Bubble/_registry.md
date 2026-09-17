---
name: bubble
type: registry:ui
title: Bubble
description: A chat message bubble with alignment, color variants, and an optional reactions badge.
dependencies:
  - reka-ui
  - class-variance-authority
files:
  - path: Bubble.variants.ts
    type: registry:ui
    target: components/ui/bubble/Bubble.variants.ts
  - path: Bubble.vue
    type: registry:ui
    target: components/ui/bubble/Bubble.vue
  - path: BubbleContent.vue
    type: registry:ui
    target: components/ui/bubble/BubbleContent.vue
  - path: BubbleGroup.vue
    type: registry:ui
    target: components/ui/bubble/BubbleGroup.vue
  - path: BubbleReactions.vue
    type: registry:ui
    target: components/ui/bubble/BubbleReactions.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/bubble/index.ts
---

Use bubble to render chat messages, aligning your own messages to the end and incoming ones to
the start. `BubbleGroup` stacks consecutive bubbles from the same sender, and `BubbleReactions`
overlays a small badge of emoji reactions on a corner of the bubble.

```vue
<script setup lang="ts">
import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@/components/ui/bubble";
</script>

<template>
  <BubbleGroup>
    <Bubble align="start" variant="muted">
      <BubbleContent>Hey, how's the launch going?</BubbleContent>
    </Bubble>
    <Bubble align="end" variant="default">
      <BubbleContent>Smoothly — shipping the last components now.</BubbleContent>
      <BubbleReactions>👍</BubbleReactions>
    </Bubble>
  </BubbleGroup>
</template>
```

Use `variant="ghost"` for plain text bubbles without a background, or `variant="destructive"` to
flag a failed or deleted message.
