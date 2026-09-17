---
name: toggle
type: registry:ui
title: Toggle
description: A two-state button that can be either on or off.
dependencies:
  - reka-ui
  - "@vueuse/core"
  - class-variance-authority
files:
  - path: Toggle.types.ts
    type: registry:ui
    target: components/ui/toggle/Toggle.types.ts
  - path: Toggle.variants.ts
    type: registry:ui
    target: components/ui/toggle/Toggle.variants.ts
  - path: Toggle.vue
    type: registry:ui
    target: components/ui/toggle/Toggle.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/toggle/index.ts
---

Use toggle for a single on/off control, such as a formatting button in a toolbar. For a set of
related, mutually exclusive or multi-select toggles, use `ToggleGroup` instead.

```vue
<script setup lang="ts">
import { Toggle } from "@/components/ui/toggle";
</script>

<template>
  <Toggle aria-label="Toggle italic">
    <em>Italic</em>
  </Toggle>
</template>
```

Supports `variant` (`default` | `outline`) and `size` (`default` | `sm` | `lg`) props. Built on
reka-ui's Toggle primitive.
