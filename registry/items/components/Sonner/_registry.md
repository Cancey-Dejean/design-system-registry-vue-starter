---
name: sonner
type: registry:ui
title: Sonner
description: An opinionated toast component, themed to match the design system.
dependencies:
  - vue-sonner
  - "@lucide/vue"
files:
  - path: Sonner.vue
    type: registry:ui
    target: components/ui/sonner/Sonner.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/sonner/index.ts
---

Mount `Toaster` once near the root of your app, then call vue-sonner's `toast()` function from
anywhere to show a toast — useful for confirmations, background task results, and non-blocking
error messages.

```vue
<script setup lang="ts">
import { toast } from "vue-sonner";
import { Toaster } from "@/components/ui/sonner";
</script>

<template>
  <Toaster />
  <button @click="toast('Event has been created.')">Show toast</button>
</template>
```

Wraps [vue-sonner](https://vue-sonner.vercel.app/)'s `Toaster`, mapping its icon slots to
`@lucide/vue` icons and its CSS variables to this design system's theme tokens.
