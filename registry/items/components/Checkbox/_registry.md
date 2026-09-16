---
name: checkbox
type: registry:ui
title: Checkbox
description: A control that allows the user to toggle between checked and not checked.
dependencies:
  - reka-ui
  - "@lucide/vue"
files:
  - path: Checkbox.vue
    type: registry:ui
    target: components/ui/checkbox/Checkbox.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/checkbox/index.ts
---

Use checkboxes for multi-select options, settings, and form field toggles.

```vue
<script setup lang="ts">
import { Checkbox } from "@/components/ui/checkbox";
</script>

<template>
  <div class="flex items-center gap-2">
    <Checkbox id="terms" />
    <label for="terms">Accept terms and conditions</label>
  </div>
</template>
```

Supports controlled/uncontrolled `checked` state (`v-model:checked`), `disabled`, and
`aria-invalid` styling for form errors. Built on reka-ui's Checkbox primitive.
