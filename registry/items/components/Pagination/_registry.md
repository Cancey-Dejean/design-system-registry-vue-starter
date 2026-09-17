---
name: pagination
type: registry:ui
title: Pagination
description: Navigation for paged content, with first, previous, next, last, and page-number controls.
dependencies:
  - reka-ui
  - "@lucide/vue"
  - "@vueuse/core"
localRegistryDependencies:
  - button
files:
  - path: Pagination.vue
    type: registry:ui
    target: components/ui/pagination/Pagination.vue
  - path: PaginationContent.vue
    type: registry:ui
    target: components/ui/pagination/PaginationContent.vue
  - path: PaginationEllipsis.vue
    type: registry:ui
    target: components/ui/pagination/PaginationEllipsis.vue
  - path: PaginationFirst.vue
    type: registry:ui
    target: components/ui/pagination/PaginationFirst.vue
  - path: PaginationItem.vue
    type: registry:ui
    target: components/ui/pagination/PaginationItem.vue
  - path: PaginationLast.vue
    type: registry:ui
    target: components/ui/pagination/PaginationLast.vue
  - path: PaginationNext.vue
    type: registry:ui
    target: components/ui/pagination/PaginationNext.vue
  - path: PaginationPrevious.vue
    type: registry:ui
    target: components/ui/pagination/PaginationPrevious.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/pagination/index.ts
---

Use pagination for splitting long lists or tables across pages. `Pagination` computes the page-item
list for you — render `PaginationItem` for each entry with `v-slot` and let it hand you the page number.

```vue
<script setup lang="ts">
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
</script>

<template>
  <Pagination v-slot="{ page }" :total="100" :items-per-page="10" :sibling-count="1" show-edges>
    <PaginationContent>
      <PaginationPrevious />
      <PaginationItem :value="1" :is-active="page === 1">1</PaginationItem>
      <PaginationEllipsis />
      <PaginationItem :value="10" :is-active="page === 10">10</PaginationItem>
      <PaginationNext />
    </PaginationContent>
  </Pagination>
</template>
```

Built on [reka-ui's Pagination](https://reka-ui.com/docs/components/pagination), which drives page
math off `total` and `items-per-page`. `PaginationFirst`/`PaginationLast` are also available for
jump-to-start/end controls, and `PaginationItem`/`PaginationFirst`/`PaginationLast`/`PaginationNext`/
`PaginationPrevious` all accept a `size` prop shared with `Button`.
