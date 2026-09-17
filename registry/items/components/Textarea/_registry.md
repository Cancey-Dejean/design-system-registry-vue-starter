---
name: textarea
type: registry:ui
title: Textarea
description: Displays a form textarea or a component that looks like a textarea.
dependencies:
  - "@vueuse/core"
files:
  - path: Textarea.vue
    type: registry:ui
    target: components/ui/textarea/Textarea.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/textarea/index.ts
---

Use the native `placeholder`, `disabled`, and `v-model` props. Pair with `Label` for accessible
forms.

```vue
<script setup lang="ts">
import { Textarea } from "@/components/ui/textarea";
</script>

<template>
  <Textarea placeholder="Type your message here." />
</template>
```
