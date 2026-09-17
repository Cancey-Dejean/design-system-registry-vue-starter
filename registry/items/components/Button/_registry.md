---
name: button
type: registry:ui
title: Button
description: A polymorphic button with variants, sizes, icons, and a CTA group helper.
dependencies:
  - class-variance-authority
files:
  - path: Button.types.ts
    type: registry:ui
    target: components/ui/Button/Button.types.ts
  - path: Button.variants.ts
    type: registry:ui
    target: components/ui/Button/Button.variants.ts
  - path: Button.vue
    type: registry:ui
    target: components/ui/Button/Button.vue
  - path: ButtonCTAGroup.vue
    type: registry:ui
    target: components/ui/Button/ButtonCTAGroup.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/Button/index.ts
---

Use the button for primary actions, secondary actions, links, and icon-only controls. Pair related
actions with `ButtonCTAGroup`.

```vue
<script setup lang="ts">
import { Button, ButtonCTAGroup } from "@/components/ui/button";
</script>

<template>
  <ButtonCTAGroup>
    <Button variant="primary">Save</Button>
    <Button variant="outline">Cancel</Button>
  </ButtonCTAGroup>
</template>
```
