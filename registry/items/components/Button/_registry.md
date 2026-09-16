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
    target: components/ui/button/Button.types.ts
  - path: Button.variants.ts
    type: registry:ui
    target: components/ui/button/Button.variants.ts
  - path: Button.vue
    type: registry:ui
    target: components/ui/button/Button.vue
  - path: ButtonCTAGroup.vue
    type: registry:ui
    target: components/ui/button/ButtonCTAGroup.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/button/index.ts
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
