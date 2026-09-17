---
name: kbd
type: registry:ui
title: Kbd
description: Displays a keyboard key or shortcut.
files:
  - path: Kbd.vue
    type: registry:ui
    target: components/ui/kbd/Kbd.vue
  - path: KbdGroup.vue
    type: registry:ui
    target: components/ui/kbd/KbdGroup.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/kbd/index.ts
---

Use `Kbd` to represent individual keyboard keys in shortcuts, tooltips, or command menus, and
`KbdGroup` to combine several keys into a single shortcut sequence.

```vue
<script setup lang="ts">
import { Kbd, KbdGroup } from "@/components/ui/kbd";
</script>

<template>
  <KbdGroup>
    <Kbd>⌘</Kbd>
    <Kbd>K</Kbd>
  </KbdGroup>
</template>
```

`Kbd` automatically adapts its colors when nested inside a `TooltipContent`.
