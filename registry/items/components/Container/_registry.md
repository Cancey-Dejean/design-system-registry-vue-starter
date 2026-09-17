---
name: container
type: registry:ui
title: Container
description: Constrains content to a max width and centers it with responsive side padding.
dependencies:
  - class-variance-authority
files:
  - path: Container.types.ts
    type: registry:ui
    target: components/ui/container/Container.types.ts
  - path: Container.variants.ts
    type: registry:ui
    target: components/ui/container/Container.variants.ts
  - path: Container.vue
    type: registry:ui
    target: components/ui/container/Container.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/container/index.ts
---

Wrap page sections in a container to keep line lengths and layout width consistent. Choose a
`size` variant (`base`, `contained`, `thin`, `full`) to match how wide the section should read.

```vue
<script setup lang="ts">
import { Container } from "@/components/ui/container";
</script>

<template>
  <Container size="thin">
    <p>Centered content with responsive gutters.</p>
  </Container>
</template>
```
