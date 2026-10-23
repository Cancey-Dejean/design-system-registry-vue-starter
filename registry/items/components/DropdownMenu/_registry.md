---
name: dropdown-menu
type: registry:ui
title: Dropdown Menu
description: Displays a menu of actions or options triggered by a button.
dependencies:
  - "@vueuse/core"
  - reka-ui
  - "@lucide/vue"
files:
  - path: DropdownMenu.vue
    type: registry:ui
    target: components/ui/dropdown-menu/DropdownMenu.vue
  - path: DropdownMenuCheckboxItem.vue
    type: registry:ui
    target: components/ui/dropdown-menu/DropdownMenuCheckboxItem.vue
  - path: DropdownMenuContent.vue
    type: registry:ui
    target: components/ui/dropdown-menu/DropdownMenuContent.vue
  - path: DropdownMenuGroup.vue
    type: registry:ui
    target: components/ui/dropdown-menu/DropdownMenuGroup.vue
  - path: DropdownMenuItem.vue
    type: registry:ui
    target: components/ui/dropdown-menu/DropdownMenuItem.vue
  - path: DropdownMenuLabel.vue
    type: registry:ui
    target: components/ui/dropdown-menu/DropdownMenuLabel.vue
  - path: DropdownMenuRadioGroup.vue
    type: registry:ui
    target: components/ui/dropdown-menu/DropdownMenuRadioGroup.vue
  - path: DropdownMenuRadioItem.vue
    type: registry:ui
    target: components/ui/dropdown-menu/DropdownMenuRadioItem.vue
  - path: DropdownMenuSeparator.vue
    type: registry:ui
    target: components/ui/dropdown-menu/DropdownMenuSeparator.vue
  - path: DropdownMenuShortcut.vue
    type: registry:ui
    target: components/ui/dropdown-menu/DropdownMenuShortcut.vue
  - path: DropdownMenuSub.vue
    type: registry:ui
    target: components/ui/dropdown-menu/DropdownMenuSub.vue
  - path: DropdownMenuSubContent.vue
    type: registry:ui
    target: components/ui/dropdown-menu/DropdownMenuSubContent.vue
  - path: DropdownMenuSubTrigger.vue
    type: registry:ui
    target: components/ui/dropdown-menu/DropdownMenuSubTrigger.vue
  - path: DropdownMenuTrigger.vue
    type: registry:ui
    target: components/ui/dropdown-menu/DropdownMenuTrigger.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/dropdown-menu/index.ts
---

Use a dropdown menu for actions attached to a button or other click trigger. Built on
[reka-ui's DropdownMenu](https://reka-ui.com/docs/components/dropdown-menu).

```vue
<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">Open</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Billing</DropdownMenuItem>
      <DropdownMenuItem>Team</DropdownMenuItem>
      <DropdownMenuItem>Subscription</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

Compose checkboxes, radio groups, submenus, separators, and shortcuts. Mark destructive actions
with `variant="destructive"` on `DropdownMenuItem`.
