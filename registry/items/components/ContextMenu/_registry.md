---
name: context-menu
type: registry:ui
title: Context Menu
description: Displays a menu at the pointer, triggered by a right click.
dependencies:
  - reka-ui
  - "@lucide/vue"
  - "@vueuse/core"
files:
  - path: ContextMenu.vue
    type: registry:ui
    target: components/ui/context-menu/ContextMenu.vue
  - path: ContextMenuCheckboxItem.vue
    type: registry:ui
    target: components/ui/context-menu/ContextMenuCheckboxItem.vue
  - path: ContextMenuContent.vue
    type: registry:ui
    target: components/ui/context-menu/ContextMenuContent.vue
  - path: ContextMenuGroup.vue
    type: registry:ui
    target: components/ui/context-menu/ContextMenuGroup.vue
  - path: ContextMenuItem.vue
    type: registry:ui
    target: components/ui/context-menu/ContextMenuItem.vue
  - path: ContextMenuLabel.vue
    type: registry:ui
    target: components/ui/context-menu/ContextMenuLabel.vue
  - path: ContextMenuPortal.vue
    type: registry:ui
    target: components/ui/context-menu/ContextMenuPortal.vue
  - path: ContextMenuRadioGroup.vue
    type: registry:ui
    target: components/ui/context-menu/ContextMenuRadioGroup.vue
  - path: ContextMenuRadioItem.vue
    type: registry:ui
    target: components/ui/context-menu/ContextMenuRadioItem.vue
  - path: ContextMenuSeparator.vue
    type: registry:ui
    target: components/ui/context-menu/ContextMenuSeparator.vue
  - path: ContextMenuShortcut.vue
    type: registry:ui
    target: components/ui/context-menu/ContextMenuShortcut.vue
  - path: ContextMenuSub.vue
    type: registry:ui
    target: components/ui/context-menu/ContextMenuSub.vue
  - path: ContextMenuSubContent.vue
    type: registry:ui
    target: components/ui/context-menu/ContextMenuSubContent.vue
  - path: ContextMenuSubTrigger.vue
    type: registry:ui
    target: components/ui/context-menu/ContextMenuSubTrigger.vue
  - path: ContextMenuTrigger.vue
    type: registry:ui
    target: components/ui/context-menu/ContextMenuTrigger.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/context-menu/index.ts
---

Use a context menu to surface actions relevant to an element without cluttering the UI, such as
copy/paste or item-specific commands on right click. Supports nested submenus, checkbox items, and
radio groups via reka-ui's ContextMenu primitive.

```vue
<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger
      class="flex h-32 w-64 items-center justify-center rounded-md border border-dashed text-sm"
    >
      Right click here
    </ContextMenuTrigger>
    <ContextMenuContent class="w-48">
      <ContextMenuItem>Back</ContextMenuItem>
      <ContextMenuItem>Forward</ContextMenuItem>
      <ContextMenuItem>Reload</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
```
