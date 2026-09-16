---
name: card
type: registry:ui
title: Card
description: Displays a card with header, content, and footer.
files:
  - path: Card.vue
    type: registry:ui
    target: components/ui/card/Card.vue
  - path: CardAction.vue
    type: registry:ui
    target: components/ui/card/CardAction.vue
  - path: CardContent.vue
    type: registry:ui
    target: components/ui/card/CardContent.vue
  - path: CardDescription.vue
    type: registry:ui
    target: components/ui/card/CardDescription.vue
  - path: CardFooter.vue
    type: registry:ui
    target: components/ui/card/CardFooter.vue
  - path: CardHeader.vue
    type: registry:ui
    target: components/ui/card/CardHeader.vue
  - path: CardTitle.vue
    type: registry:ui
    target: components/ui/card/CardTitle.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/card/index.ts
---

Compose a card with optional header, content, and footer slots. Use `size="sm"` for denser spacing.

```vue
<script setup lang="ts">
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>Card Description</CardDescription>
      <CardAction>Card Action</CardAction>
    </CardHeader>
    <CardContent>
      <p>Card Content</p>
    </CardContent>
    <CardFooter>
      <p>Card Footer</p>
    </CardFooter>
  </Card>
</template>
```
