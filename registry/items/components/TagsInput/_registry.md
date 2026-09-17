---
name: tags-input
type: registry:ui
title: Tags Input
description: An input field for creating and managing a list of tags.
dependencies:
  - reka-ui
  - "@vueuse/core"
  - "@lucide/vue"
files:
  - path: TagsInput.vue
    type: registry:ui
    target: components/ui/tags-input/TagsInput.vue
  - path: TagsInputInput.vue
    type: registry:ui
    target: components/ui/tags-input/TagsInputInput.vue
  - path: TagsInputItem.vue
    type: registry:ui
    target: components/ui/tags-input/TagsInputItem.vue
  - path: TagsInputItemDelete.vue
    type: registry:ui
    target: components/ui/tags-input/TagsInputItemDelete.vue
  - path: TagsInputItemText.vue
    type: registry:ui
    target: components/ui/tags-input/TagsInputItemText.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/tags-input/index.ts
---

Use tags input when users need to enter multiple free-form values, such as keywords or emails,
as individually removable chips instead of a single delimited string.

```vue
<script setup lang="ts">
import { ref } from "vue";
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from "@/components/ui/tags-input";

const tags = ref(["Vue", "Nuxt"]);
</script>

<template>
  <TagsInput v-model="tags">
    <TagsInputItem v-for="tag in tags" :key="tag" :value="tag">
      <TagsInputItemText />
      <TagsInputItemDelete />
    </TagsInputItem>
    <TagsInputInput placeholder="Add tag..." />
  </TagsInput>
</template>
```

`TagsInputItemDelete` renders a lucide `X` icon by default; pass a slot to override it. Built on
reka-ui's TagsInput primitive.
