---
name: navigation-menu
type: registry:ui
title: Navigation Menu
description: A collection of links for site or application navigation, with optional flyout content.
dependencies:
  - reka-ui
  - "@lucide/vue"
  - "@vueuse/core"
  - class-variance-authority
files:
  - path: NavigationMenu.vue
    type: registry:ui
    target: components/ui/navigation-menu/NavigationMenu.vue
  - path: NavigationMenuContent.vue
    type: registry:ui
    target: components/ui/navigation-menu/NavigationMenuContent.vue
  - path: NavigationMenuIndicator.vue
    type: registry:ui
    target: components/ui/navigation-menu/NavigationMenuIndicator.vue
  - path: NavigationMenuItem.vue
    type: registry:ui
    target: components/ui/navigation-menu/NavigationMenuItem.vue
  - path: NavigationMenuLink.vue
    type: registry:ui
    target: components/ui/navigation-menu/NavigationMenuLink.vue
  - path: NavigationMenuList.vue
    type: registry:ui
    target: components/ui/navigation-menu/NavigationMenuList.vue
  - path: NavigationMenuTrigger.vue
    type: registry:ui
    target: components/ui/navigation-menu/NavigationMenuTrigger.vue
  - path: NavigationMenuViewport.vue
    type: registry:ui
    target: components/ui/navigation-menu/NavigationMenuViewport.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/navigation-menu/index.ts
---

Use navigation menu for top-level site navigation that needs dropdown flyouts, such as a marketing
site header with grouped links. For a simple row of links with no flyout content, a plain `nav` with
`NavigationMenuLink`-styled anchors is usually enough.

```vue
<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Products</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink href="/products/one">Product One</NavigationMenuLink>
          <NavigationMenuLink href="/products/two">Product Two</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink href="/pricing">Pricing</NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
```

Set `NavigationMenu`'s `viewport` prop to `false` to render each item's flyout inline instead of in the
shared animated viewport. Built on [reka-ui's Navigation Menu](https://reka-ui.com/docs/components/navigation-menu).
