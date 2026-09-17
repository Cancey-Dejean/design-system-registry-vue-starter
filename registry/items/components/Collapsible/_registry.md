---
name: collapsible
type: registry:ui
title: Collapsible
description: An interactive component which expands and collapses a panel of content.
dependencies:
  - reka-ui
files:
  - path: Collapsible.vue
    type: registry:ui
    target: components/ui/collapsible/Collapsible.vue
  - path: CollapsibleContent.vue
    type: registry:ui
    target: components/ui/collapsible/CollapsibleContent.vue
  - path: CollapsibleTrigger.vue
    type: registry:ui
    target: components/ui/collapsible/CollapsibleTrigger.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/collapsible/index.ts
---

Use collapsible to show or hide a single section of content, such as an expandable list or
"show more" panel. Built on reka-ui's Collapsible primitive.

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const open = ref(false);
</script>

<template>
  <Collapsible v-model:open="open" class="w-[350px] space-y-2">
    <CollapsibleTrigger class="text-sm font-medium">
      @peduarte starred 3 repositories
    </CollapsibleTrigger>
    <CollapsibleContent class="space-y-2 text-sm">
      <div class="rounded-md border px-4 py-2">@reka-ui/core</div>
      <div class="rounded-md border px-4 py-2">@reka-ui/colors</div>
    </CollapsibleContent>
  </Collapsible>
</template>
```
