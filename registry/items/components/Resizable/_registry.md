---
name: resizable
type: registry:ui
title: Resizable
description: Accessible resizable panel groups and layouts.
dependencies:
  - reka-ui
  - "@lucide/vue"
  - "@vueuse/core"
files:
  - path: ResizableHandle.vue
    type: registry:ui
    target: components/ui/resizable/ResizableHandle.vue
  - path: ResizablePanel.vue
    type: registry:ui
    target: components/ui/resizable/ResizablePanel.vue
  - path: ResizablePanelGroup.vue
    type: registry:ui
    target: components/ui/resizable/ResizablePanelGroup.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/resizable/index.ts
---

Use resizable panels for split views like code editors or file browsers, where users need to
adjust the space given to adjacent panels. Set `direction="horizontal"` or `"vertical"` on the
group and give each panel a `default-size`.

```vue
<script setup lang="ts">
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
</script>

<template>
  <ResizablePanelGroup direction="horizontal" class="max-w-md rounded-lg border">
    <ResizablePanel :default-size="50">
      <div class="flex h-40 items-center justify-center p-6">
        <span class="font-semibold">One</span>
      </div>
    </ResizablePanel>
    <ResizableHandle with-handle />
    <ResizablePanel :default-size="50">
      <div class="flex h-40 items-center justify-center p-6">
        <span class="font-semibold">Two</span>
      </div>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>
```

Built on [reka-ui's Splitter](https://reka-ui.com/docs/components/splitter) primitives.
