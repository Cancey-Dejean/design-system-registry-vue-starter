---
name: dialog
type: registry:ui
title: Dialog
description: A window overlaid on either the primary window or another dialog window.
dependencies:
  - reka-ui
  - "@lucide/vue"
files:
  - path: Dialog.vue
    type: registry:ui
    target: components/ui/dialog/Dialog.vue
  - path: DialogClose.vue
    type: registry:ui
    target: components/ui/dialog/DialogClose.vue
  - path: DialogContent.vue
    type: registry:ui
    target: components/ui/dialog/DialogContent.vue
  - path: DialogDescription.vue
    type: registry:ui
    target: components/ui/dialog/DialogDescription.vue
  - path: DialogFooter.vue
    type: registry:ui
    target: components/ui/dialog/DialogFooter.vue
  - path: DialogHeader.vue
    type: registry:ui
    target: components/ui/dialog/DialogHeader.vue
  - path: DialogOverlay.vue
    type: registry:ui
    target: components/ui/dialog/DialogOverlay.vue
  - path: DialogScrollContent.vue
    type: registry:ui
    target: components/ui/dialog/DialogScrollContent.vue
  - path: DialogTitle.vue
    type: registry:ui
    target: components/ui/dialog/DialogTitle.vue
  - path: DialogTrigger.vue
    type: registry:ui
    target: components/ui/dialog/DialogTrigger.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/dialog/index.ts
---

Use dialogs for focused tasks that keep the user in context.

```vue
<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">Open Dialog</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you are done.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose as-child>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
```

Set `show-close-button={false}` on `DialogContent` to hide the corner X. Built on reka-ui's Dialog
primitive.
