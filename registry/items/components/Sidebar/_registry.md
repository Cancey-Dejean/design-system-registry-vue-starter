---
name: sidebar
type: registry:ui
title: Sidebar
description: A composable, themeable sidebar with collapsible, floating, and inset variants.
dependencies:
  - reka-ui
  - "@lucide/vue"
  - "@vueuse/core"
  - class-variance-authority
localRegistryDependencies:
  - button
  - input
  - separator
  - sheet
  - skeleton
  - tooltip
files:
  - path: Sidebar.vue
    type: registry:ui
    target: components/ui/sidebar/Sidebar.vue
  - path: SidebarContent.vue
    type: registry:ui
    target: components/ui/sidebar/SidebarContent.vue
  - path: SidebarFooter.vue
    type: registry:ui
    target: components/ui/sidebar/SidebarFooter.vue
  - path: SidebarGroup.vue
    type: registry:ui
    target: components/ui/sidebar/SidebarGroup.vue
  - path: SidebarGroupAction.vue
    type: registry:ui
    target: components/ui/sidebar/SidebarGroupAction.vue
  - path: SidebarGroupContent.vue
    type: registry:ui
    target: components/ui/sidebar/SidebarGroupContent.vue
  - path: SidebarGroupLabel.vue
    type: registry:ui
    target: components/ui/sidebar/SidebarGroupLabel.vue
  - path: SidebarHeader.vue
    type: registry:ui
    target: components/ui/sidebar/SidebarHeader.vue
  - path: SidebarInput.vue
    type: registry:ui
    target: components/ui/sidebar/SidebarInput.vue
  - path: SidebarInset.vue
    type: registry:ui
    target: components/ui/sidebar/SidebarInset.vue
  - path: SidebarMenu.vue
    type: registry:ui
    target: components/ui/sidebar/SidebarMenu.vue
  - path: SidebarMenuAction.vue
    type: registry:ui
    target: components/ui/sidebar/SidebarMenuAction.vue
  - path: SidebarMenuBadge.vue
    type: registry:ui
    target: components/ui/sidebar/SidebarMenuBadge.vue
  - path: SidebarMenuButton.vue
    type: registry:ui
    target: components/ui/sidebar/SidebarMenuButton.vue
  - path: SidebarMenuButtonChild.vue
    type: registry:ui
    target: components/ui/sidebar/SidebarMenuButtonChild.vue
  - path: SidebarMenuItem.vue
    type: registry:ui
    target: components/ui/sidebar/SidebarMenuItem.vue
  - path: SidebarMenuSkeleton.vue
    type: registry:ui
    target: components/ui/sidebar/SidebarMenuSkeleton.vue
  - path: SidebarMenuSub.vue
    type: registry:ui
    target: components/ui/sidebar/SidebarMenuSub.vue
  - path: SidebarMenuSubButton.vue
    type: registry:ui
    target: components/ui/sidebar/SidebarMenuSubButton.vue
  - path: SidebarMenuSubItem.vue
    type: registry:ui
    target: components/ui/sidebar/SidebarMenuSubItem.vue
  - path: SidebarProvider.vue
    type: registry:ui
    target: components/ui/sidebar/SidebarProvider.vue
  - path: SidebarRail.vue
    type: registry:ui
    target: components/ui/sidebar/SidebarRail.vue
  - path: SidebarSeparator.vue
    type: registry:ui
    target: components/ui/sidebar/SidebarSeparator.vue
  - path: SidebarTrigger.vue
    type: registry:ui
    target: components/ui/sidebar/SidebarTrigger.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/sidebar/index.ts
  - path: utils.ts
    type: registry:ui
    target: components/ui/sidebar/utils.ts
---

Use sidebar for application-level navigation — it handles collapsing to icons or off-canvas,
a mobile sheet fallback, and persists open/closed state in a cookie. Wrap your whole layout in
`SidebarProvider` so `useSidebar()` and the keyboard shortcut (`Cmd/Ctrl+B`) are available to
every part of the sidebar.

```vue
<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
</script>

<template>
  <SidebarProvider>
    <Sidebar>
      <SidebarHeader>My App</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton as-child>
                <a href="/dashboard">Dashboard</a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    <main>
      <SidebarTrigger />
      <slot />
    </main>
  </SidebarProvider>
</template>
```

Installing `sidebar` also installs `button`, `input`, `separator`, `sheet`, `skeleton`, and
`tooltip`, which it composes for the trigger, search input, dividers, mobile drawer, loading
rows, and collapsed-state labels respectively.
