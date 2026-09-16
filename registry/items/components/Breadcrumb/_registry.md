---
name: breadcrumb
type: registry:ui
title: Breadcrumb
description: Displays the path to the current resource using a hierarchy of links.
dependencies:
  - "@lucide/vue"
files:
  - path: Breadcrumb.vue
    type: registry:ui
    target: components/ui/breadcrumb/Breadcrumb.vue
  - path: BreadcrumbEllipsis.vue
    type: registry:ui
    target: components/ui/breadcrumb/BreadcrumbEllipsis.vue
  - path: BreadcrumbItem.vue
    type: registry:ui
    target: components/ui/breadcrumb/BreadcrumbItem.vue
  - path: BreadcrumbLink.vue
    type: registry:ui
    target: components/ui/breadcrumb/BreadcrumbLink.vue
  - path: BreadcrumbList.vue
    type: registry:ui
    target: components/ui/breadcrumb/BreadcrumbList.vue
  - path: BreadcrumbPage.vue
    type: registry:ui
    target: components/ui/breadcrumb/BreadcrumbPage.vue
  - path: BreadcrumbSeparator.vue
    type: registry:ui
    target: components/ui/breadcrumb/BreadcrumbSeparator.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/breadcrumb/index.ts
---

Use breadcrumbs to show navigation context within nested pages.

```vue
<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/components">Components</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
```

Compose `BreadcrumbEllipsis` for collapsed middle segments. Pass a custom child to
`BreadcrumbSeparator` for an alternate divider, or use Nuxt's `<NuxtLink>` inside `BreadcrumbLink`
for router links.
