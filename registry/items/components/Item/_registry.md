---
name: item
type: registry:ui
title: Item
description: A flexible layout primitive for rows of content with media, title, description, and actions.
dependencies:
  - reka-ui
  - class-variance-authority
localRegistryDependencies:
  - separator
files:
  - path: Item.vue
    type: registry:ui
    target: components/ui/item/Item.vue
  - path: ItemActions.vue
    type: registry:ui
    target: components/ui/item/ItemActions.vue
  - path: ItemContent.vue
    type: registry:ui
    target: components/ui/item/ItemContent.vue
  - path: ItemDescription.vue
    type: registry:ui
    target: components/ui/item/ItemDescription.vue
  - path: ItemFooter.vue
    type: registry:ui
    target: components/ui/item/ItemFooter.vue
  - path: ItemGroup.vue
    type: registry:ui
    target: components/ui/item/ItemGroup.vue
  - path: ItemHeader.vue
    type: registry:ui
    target: components/ui/item/ItemHeader.vue
  - path: ItemMedia.vue
    type: registry:ui
    target: components/ui/item/ItemMedia.vue
  - path: ItemSeparator.vue
    type: registry:ui
    target: components/ui/item/ItemSeparator.vue
  - path: ItemTitle.vue
    type: registry:ui
    target: components/ui/item/ItemTitle.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/item/index.ts
---

Use `Item` for rows of content that pair an icon or image with a title, description, and actions —
settings rows, file lists, notification entries. Compose multiple items inside `ItemGroup`, separated
by `ItemSeparator`, and use `variant`/`size` to fit dense or spacious layouts.

```vue
<script setup lang="ts">
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons";
</script>

<template>
  <ItemGroup>
    <Item variant="outline">
      <ItemMedia variant="icon">
        <Icon icon="shield-check" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Two-factor authentication</ItemTitle>
        <ItemDescription>Add an extra layer of security to your account.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="outline">Enable</Button>
      </ItemActions>
    </Item>
    <ItemSeparator />
  </ItemGroup>
</template>
```
