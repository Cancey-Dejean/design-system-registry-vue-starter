---
name: drawer
type: registry:ui
title: Drawer
description: A panel that slides in from an edge of the screen, built on Vaul.
dependencies:
  - "@vueuse/core"
  - vaul-vue
  - reka-ui
files:
  - path: Drawer.vue
    type: registry:ui
    target: components/ui/drawer/Drawer.vue
  - path: DrawerClose.vue
    type: registry:ui
    target: components/ui/drawer/DrawerClose.vue
  - path: DrawerContent.vue
    type: registry:ui
    target: components/ui/drawer/DrawerContent.vue
  - path: DrawerDescription.vue
    type: registry:ui
    target: components/ui/drawer/DrawerDescription.vue
  - path: DrawerFooter.vue
    type: registry:ui
    target: components/ui/drawer/DrawerFooter.vue
  - path: DrawerHeader.vue
    type: registry:ui
    target: components/ui/drawer/DrawerHeader.vue
  - path: DrawerOverlay.vue
    type: registry:ui
    target: components/ui/drawer/DrawerOverlay.vue
  - path: DrawerTitle.vue
    type: registry:ui
    target: components/ui/drawer/DrawerTitle.vue
  - path: DrawerTrigger.vue
    type: registry:ui
    target: components/ui/drawer/DrawerTrigger.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/drawer/index.ts
---

Use a drawer instead of a dialog on smaller viewports, or whenever a bottom/side sheet with a
drag handle feels more natural than a centered modal. Direction defaults to bottom; pass
`direction="right"`, `"left"`, or `"top"` to `Drawer` to change the edge it slides in from.

```vue
<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
</script>

<template>
  <Drawer>
    <DrawerTrigger as-child>
      <Button variant="outline">Open Drawer</Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Edit profile</DrawerTitle>
        <DrawerDescription>Make changes to your profile here.</DrawerDescription>
      </DrawerHeader>
      <DrawerFooter>
        <DrawerClose as-child>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
```
