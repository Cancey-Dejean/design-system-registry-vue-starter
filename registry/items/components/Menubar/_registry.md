---
name: menubar
type: registry:ui
title: Menubar
description: A horizontal application menu bar with nested dropdown menus, like native desktop menus.
dependencies:
  - reka-ui
  - "@vueuse/core"
  - "@lucide/vue"
files:
  - path: Menubar.vue
    type: registry:ui
    target: components/ui/menubar/Menubar.vue
  - path: MenubarCheckboxItem.vue
    type: registry:ui
    target: components/ui/menubar/MenubarCheckboxItem.vue
  - path: MenubarContent.vue
    type: registry:ui
    target: components/ui/menubar/MenubarContent.vue
  - path: MenubarGroup.vue
    type: registry:ui
    target: components/ui/menubar/MenubarGroup.vue
  - path: MenubarItem.vue
    type: registry:ui
    target: components/ui/menubar/MenubarItem.vue
  - path: MenubarLabel.vue
    type: registry:ui
    target: components/ui/menubar/MenubarLabel.vue
  - path: MenubarMenu.vue
    type: registry:ui
    target: components/ui/menubar/MenubarMenu.vue
  - path: MenubarRadioGroup.vue
    type: registry:ui
    target: components/ui/menubar/MenubarRadioGroup.vue
  - path: MenubarRadioItem.vue
    type: registry:ui
    target: components/ui/menubar/MenubarRadioItem.vue
  - path: MenubarSeparator.vue
    type: registry:ui
    target: components/ui/menubar/MenubarSeparator.vue
  - path: MenubarShortcut.vue
    type: registry:ui
    target: components/ui/menubar/MenubarShortcut.vue
  - path: MenubarSub.vue
    type: registry:ui
    target: components/ui/menubar/MenubarSub.vue
  - path: MenubarSubContent.vue
    type: registry:ui
    target: components/ui/menubar/MenubarSubContent.vue
  - path: MenubarSubTrigger.vue
    type: registry:ui
    target: components/ui/menubar/MenubarSubTrigger.vue
  - path: MenubarTrigger.vue
    type: registry:ui
    target: components/ui/menubar/MenubarTrigger.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/menubar/index.ts
---

Use `Menubar` for desktop-style application menus (File, Edit, View) with keyboard navigation between
top-level menus and nested submenus. Built on [reka-ui's Menubar](https://reka-ui.com/docs/components/menubar).

```vue
<script setup lang="ts">
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
</script>

<template>
  <Menubar>
    <MenubarMenu>
      <MenubarTrigger>File</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          New Tab
          <MenubarShortcut>⌘T</MenubarShortcut>
        </MenubarItem>
        <MenubarItem>New Window</MenubarItem>
        <MenubarSeparator />
        <MenubarItem>Share</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>
```
