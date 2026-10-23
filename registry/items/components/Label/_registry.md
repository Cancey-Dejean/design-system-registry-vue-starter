---
name: label
type: registry:ui
title: Label
description: Renders an accessible label associated with controls.
dependencies:
  - "@vueuse/core"
  - reka-ui
files:
  - path: Label.vue
    type: registry:ui
    target: components/ui/label/Label.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/label/index.ts
---

Use labels with form controls via `for` matching the control `id`.

```vue
<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
</script>

<template>
  <div class="grid gap-2">
    <Label for="email">Email</Label>
    <Input id="email" type="email" placeholder="you@example.com" />
  </div>
</template>
```

Disabled styling is driven by `group-data-[disabled=true]` on an ancestor, or `peer-disabled` when
the control is a peer sibling.
