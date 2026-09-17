---
name: empty
type: registry:ui
title: Empty
description: Displays an empty state placeholder with icon, title, description, and actions.
dependencies:
  - class-variance-authority
files:
  - path: Empty.vue
    type: registry:ui
    target: components/ui/empty/Empty.vue
  - path: EmptyContent.vue
    type: registry:ui
    target: components/ui/empty/EmptyContent.vue
  - path: EmptyDescription.vue
    type: registry:ui
    target: components/ui/empty/EmptyDescription.vue
  - path: EmptyHeader.vue
    type: registry:ui
    target: components/ui/empty/EmptyHeader.vue
  - path: EmptyMedia.vue
    type: registry:ui
    target: components/ui/empty/EmptyMedia.vue
  - path: EmptyTitle.vue
    type: registry:ui
    target: components/ui/empty/EmptyTitle.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/empty/index.ts
---

Use empty for zero-state screens — an empty list, a search with no results, or a feature that
hasn't been set up yet — pairing an icon or illustration with a short explanation and a next step.

```vue
<script setup lang="ts">
import { Folder } from "@lucide/vue";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
</script>

<template>
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <Folder />
      </EmptyMedia>
      <EmptyTitle>No projects yet</EmptyTitle>
      <EmptyDescription>Create your first project to get started.</EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <button class="text-sm underline">Create project</button>
    </EmptyContent>
  </Empty>
</template>
```
