---
name: section
type: registry:ui
title: Section
description: A semantic section with responsive vertical padding variants.
dependencies:
  - "class-variance-authority"
files:
  - path: Section.types.ts
    type: registry:ui
    target: components/ui/section/Section.types.ts
  - path: Section.variants.ts
    type: registry:ui
    target: components/ui/section/Section.variants.ts
  - path: Section.vue
    type: registry:ui
    target: components/ui/section/Section.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/section/index.ts
---

Use `Section` for consistent horizontal padding and responsive vertical rhythm around page content. It renders a native `section` and forwards attributes such as `aria-labelledby`.

```vue
<script setup lang="ts">
import { Section } from "@/components/ui/section";
</script>

<template>
  <Section padding="sm" aria-labelledby="features-title">
    <h2 id="features-title">Features</h2>
    <p>Content goes here.</p>
  </Section>
</template>
```

`padding` supports `sm`, `md` (default), and `lg`. Each increases vertical spacing at the medium breakpoint. All variants use `mx-auto w-full px-6` for horizontal layout. Variant helpers and `SECTION_PADDINGS` are exported for composition and controls.
