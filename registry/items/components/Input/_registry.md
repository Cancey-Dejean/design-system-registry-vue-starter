---
name: input
type: registry:ui
title: Input
description: Displays a form input field or a component that looks like an input field.
files:
  - path: Input.vue
    type: registry:ui
    target: components/ui/input/Input.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/input/index.ts
---

Use inputs for text, email, password, search, file, and other single-line fields.

```vue
<script setup lang="ts">
import { Input } from "@/components/ui/input";
</script>

<template>
  <Input type="email" placeholder="Email" />
</template>
```

Supports native `type` values, `disabled`, and `aria-invalid` for form error styling.
