---
name: text
type: registry:ui
title: Text
description: A flexible typography component for rendering body text with consistent sizing, weight, and tone.
dependencies:
  - reka-ui
  - class-variance-authority
files:
  - path: Text.types.ts
    type: registry:ui
    target: components/ui/text/Text.types.ts
  - path: Text.variants.ts
    type: registry:ui
    target: components/ui/text/Text.variants.ts
  - path: Text.vue
    type: registry:ui
    target: components/ui/text/Text.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/text/index.ts
---

Use `Text` instead of raw `<p>`/`<span>` tags to keep body copy consistent across the app. Change
the rendered element with `as` (or render as a child via `as-child`) while keeping the same
size/weight/tone/align scale.

```vue
<script setup lang="ts">
import { Text } from "@/components/ui/text";
</script>

<template>
  <Text size="lg" weight="semibold" tone="muted">
    The quick brown fox jumps over the lazy dog.
  </Text>
</template>
```

`size`, `weight`, `tone`, and `align` are driven by `class-variance-authority` variants; import
`TEXT_SIZES`, `TEXT_WEIGHTS`, `TEXT_TONES`, or `TEXT_ALIGNMENTS` from the same module to iterate
over the available options.
