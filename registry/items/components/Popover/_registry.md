---
name: popover
type: registry:ui
title: Popover
description: Displays rich content in a portal, anchored to a trigger element.
dependencies:
  - reka-ui
  - "@vueuse/core"
files:
  - path: Popover.vue
    type: registry:ui
    target: components/ui/popover/Popover.vue
  - path: PopoverAnchor.vue
    type: registry:ui
    target: components/ui/popover/PopoverAnchor.vue
  - path: PopoverContent.vue
    type: registry:ui
    target: components/ui/popover/PopoverContent.vue
  - path: PopoverTrigger.vue
    type: registry:ui
    target: components/ui/popover/PopoverTrigger.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/popover/index.ts
---

Use popover for non-modal content triggered by a click — filters, inline forms, or extra detail —
that should close on outside click or Escape. For a hover-triggered hint, use `HoverCard` instead.

```vue
<script setup lang="ts">
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline">Open popover</Button>
    </PopoverTrigger>
    <PopoverContent>
      <p class="text-sm">Place any content here — forms, settings, or details.</p>
    </PopoverContent>
  </Popover>
</template>
```

`PopoverAnchor` lets you anchor the content to an element other than the trigger. Built on
[reka-ui's Popover](https://reka-ui.com/docs/components/popover), which handles focus trapping and
collision-aware positioning.
