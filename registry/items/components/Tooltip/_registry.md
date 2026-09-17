---
name: tooltip
type: registry:ui
title: Tooltip
description: A popup that displays information related to an element when it receives keyboard focus or the mouse hovers over it.
dependencies:
  - reka-ui
  - "@vueuse/core"
files:
  - path: Tooltip.vue
    type: registry:ui
    target: components/ui/tooltip/Tooltip.vue
  - path: TooltipContent.vue
    type: registry:ui
    target: components/ui/tooltip/TooltipContent.vue
  - path: TooltipProvider.vue
    type: registry:ui
    target: components/ui/tooltip/TooltipProvider.vue
  - path: TooltipTrigger.vue
    type: registry:ui
    target: components/ui/tooltip/TooltipTrigger.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/tooltip/index.ts
---

Use tooltip for brief, supplementary hints on icon buttons or truncated content — not for content
that's essential to completing a task. Wrap your app (or a section of it) once in
`TooltipProvider` so nested tooltips share timing behavior.

```vue
<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <button>Hover me</button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
```
