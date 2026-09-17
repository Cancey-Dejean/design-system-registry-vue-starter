---
name: select
type: registry:ui
title: Select
description: Displays a list of options for the user to pick from, triggered by a button.
dependencies:
  - reka-ui
  - "@lucide/vue"
  - "@vueuse/core"
files:
  - path: Select.vue
    type: registry:ui
    target: components/ui/select/Select.vue
  - path: SelectContent.vue
    type: registry:ui
    target: components/ui/select/SelectContent.vue
  - path: SelectGroup.vue
    type: registry:ui
    target: components/ui/select/SelectGroup.vue
  - path: SelectItem.vue
    type: registry:ui
    target: components/ui/select/SelectItem.vue
  - path: SelectItemText.vue
    type: registry:ui
    target: components/ui/select/SelectItemText.vue
  - path: SelectLabel.vue
    type: registry:ui
    target: components/ui/select/SelectLabel.vue
  - path: SelectScrollDownButton.vue
    type: registry:ui
    target: components/ui/select/SelectScrollDownButton.vue
  - path: SelectScrollUpButton.vue
    type: registry:ui
    target: components/ui/select/SelectScrollUpButton.vue
  - path: SelectSeparator.vue
    type: registry:ui
    target: components/ui/select/SelectSeparator.vue
  - path: SelectTrigger.vue
    type: registry:ui
    target: components/ui/select/SelectTrigger.vue
  - path: SelectValue.vue
    type: registry:ui
    target: components/ui/select/SelectValue.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/select/index.ts
---

Use select for a single choice from a list of options when a native `<select>` would be too
limited to style, or when you need grouped options, labels, and separators.

```vue
<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
</script>

<template>
  <Select>
    <SelectTrigger class="w-[180px]">
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Fruits</SelectLabel>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
```

Built on [reka-ui's Select](https://reka-ui.com/docs/components/select) primitive; `SelectTrigger`
accepts `size="sm"` for a denser control.
