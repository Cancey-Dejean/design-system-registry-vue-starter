---
name: trace
type: registry:ui
title: Trace
description: Composable agent steps with status, icons, and expandable details.
dependencies:
  - "reka-ui"
  - "@lucide/vue"
localRegistryDependencies:
  - collapsible
  - shimmer
files:
  - path: Trace.types.ts
    type: registry:ui
    target: components/ui/trace/Trace.types.ts
  - path: Trace.vue
    type: registry:ui
    target: components/ui/trace/Trace.vue
  - path: TraceCollapsible.vue
    type: registry:ui
    target: components/ui/trace/TraceCollapsible.vue
  - path: TraceCollapsibleContent.vue
    type: registry:ui
    target: components/ui/trace/TraceCollapsibleContent.vue
  - path: TraceCollapsibleTrigger.vue
    type: registry:ui
    target: components/ui/trace/TraceCollapsibleTrigger.vue
  - path: TraceDescription.vue
    type: registry:ui
    target: components/ui/trace/TraceDescription.vue
  - path: TraceIcon.vue
    type: registry:ui
    target: components/ui/trace/TraceIcon.vue
  - path: TraceLine.vue
    type: registry:ui
    target: components/ui/trace/TraceLine.vue
  - path: TraceTitle.vue
    type: registry:ui
    target: components/ui/trace/TraceTitle.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/trace/index.ts
---

Compose agent activity from `TraceLine`, `TraceIcon`, `TraceTitle`, and optional `TraceDescription`. Add `TraceCollapsible` to make a step expandable.

```vue
<script setup lang="ts">
import { Search } from "@lucide/vue";
import {
  Trace,
  TraceLine,
  TraceIcon,
  TraceTitle,
  TraceCollapsible,
  TraceCollapsibleTrigger,
  TraceCollapsibleContent,
} from "@/components/ui/trace";
</script>

<template>
  <Trace>
    <TraceLine status="running">
      <TraceIcon><Search /></TraceIcon>
      <TraceTitle>Searching project files</TraceTitle>
    </TraceLine>
    <TraceCollapsible>
      <TraceCollapsibleTrigger>
        <TraceLine><TraceTitle>Read configuration</TraceTitle></TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>Found the registry configuration.</TraceCollapsibleContent>
    </TraceCollapsible>
  </Trace>
</template>
```

`TraceLine` accepts `status="running"`, `"error"`, or `"pending"`; omit it for a completed or neutral step. Running titles use Shimmer and respect reduced motion; error steps use destructive text and pending steps are subdued. Icons are decorative. Use descriptive titles so the step remains understandable without its icon.

`TraceCollapsible` supports `v-model:open`, `default-open`, and `disabled`. The trigger is a button with Reka's expanded-state and keyboard behavior, plus a rotating chevron. The content indents behind an inline-start border so it also fits RTL layouts.
