---
name: sheet
type: registry:ui
title: Sheet
description: Extends the Dialog component to display content that complements the main content of the screen.
dependencies:
  - "@vueuse/core"
  - reka-ui
  - "@lucide/vue"
localRegistryDependencies:
  - button
files:
  - path: Sheet.vue
    type: registry:ui
    target: components/ui/sheet/Sheet.vue
  - path: SheetClose.vue
    type: registry:ui
    target: components/ui/sheet/SheetClose.vue
  - path: SheetContent.vue
    type: registry:ui
    target: components/ui/sheet/SheetContent.vue
  - path: SheetDescription.vue
    type: registry:ui
    target: components/ui/sheet/SheetDescription.vue
  - path: SheetFooter.vue
    type: registry:ui
    target: components/ui/sheet/SheetFooter.vue
  - path: SheetHeader.vue
    type: registry:ui
    target: components/ui/sheet/SheetHeader.vue
  - path: SheetOverlay.vue
    type: registry:ui
    target: components/ui/sheet/SheetOverlay.vue
  - path: SheetTitle.vue
    type: registry:ui
    target: components/ui/sheet/SheetTitle.vue
  - path: SheetTrigger.vue
    type: registry:ui
    target: components/ui/sheet/SheetTrigger.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/sheet/index.ts
---

Use sheets for side or edge panels. Default side is `right`.

```vue
<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline">Open</Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Edit profile</SheetTitle>
        <SheetDescription>Make changes to your profile here.</SheetDescription>
      </SheetHeader>
      <SheetFooter>
        <SheetClose as-child>
          <Button variant="outline">Close</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
```

Pass `side` (`top` | `right` | `bottom` | `left`) on `SheetContent`. Set
`show-close-button={false}` to hide the corner close control.
