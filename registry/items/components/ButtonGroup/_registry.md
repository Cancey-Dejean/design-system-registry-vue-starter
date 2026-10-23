---
name: button-group
type: registry:ui
title: Button Group
description: Groups related buttons together with consistent styling, orientation, and separators.
dependencies:
  - "@vueuse/core"
  - reka-ui
  - class-variance-authority
localRegistryDependencies:
  - separator
files:
  - path: ButtonGroup.vue
    type: registry:ui
    target: components/ui/button-group/ButtonGroup.vue
  - path: ButtonGroupSeparator.vue
    type: registry:ui
    target: components/ui/button-group/ButtonGroupSeparator.vue
  - path: ButtonGroupText.vue
    type: registry:ui
    target: components/ui/button-group/ButtonGroupText.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/button-group/index.ts
---

Use `ButtonGroup` to combine related buttons — a split action, pagination controls, or a button
paired with a dropdown menu — into one visually connected control. Nest `ButtonGroup`s to add
spacing between clusters, and use `ButtonGroupSeparator` to divide buttons that share a variant
without a border (e.g. `secondary` or `ghost`).

```vue
<script setup lang="ts">
import { ChevronDownIcon } from "@lucide/vue";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
</script>

<template>
  <ButtonGroup>
    <Button variant="outline">Copy Page</Button>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button size="icon-md" variant="outline">
          <ChevronDownIcon aria-hidden="true" />
          <span class="sr-only">Open page actions menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>View as Markdown</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </ButtonGroup>
</template>
```

Pass `orientation="vertical"` to stack buttons instead of row them.
