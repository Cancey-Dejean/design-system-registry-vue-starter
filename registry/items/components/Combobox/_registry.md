---
name: combobox
type: registry:ui
title: Combobox
description: An autocomplete input that filters a searchable list of options in a popover.
dependencies:
  - reka-ui
  - "@lucide/vue"
  - "@vueuse/core"
files:
  - path: Combobox.vue
    type: registry:ui
    target: components/ui/combobox/Combobox.vue
  - path: ComboboxAnchor.vue
    type: registry:ui
    target: components/ui/combobox/ComboboxAnchor.vue
  - path: ComboboxEmpty.vue
    type: registry:ui
    target: components/ui/combobox/ComboboxEmpty.vue
  - path: ComboboxGroup.vue
    type: registry:ui
    target: components/ui/combobox/ComboboxGroup.vue
  - path: ComboboxInput.vue
    type: registry:ui
    target: components/ui/combobox/ComboboxInput.vue
  - path: ComboboxItem.vue
    type: registry:ui
    target: components/ui/combobox/ComboboxItem.vue
  - path: ComboboxItemIndicator.vue
    type: registry:ui
    target: components/ui/combobox/ComboboxItemIndicator.vue
  - path: ComboboxList.vue
    type: registry:ui
    target: components/ui/combobox/ComboboxList.vue
  - path: ComboboxSeparator.vue
    type: registry:ui
    target: components/ui/combobox/ComboboxSeparator.vue
  - path: ComboboxTrigger.vue
    type: registry:ui
    target: components/ui/combobox/ComboboxTrigger.vue
  - path: ComboboxViewport.vue
    type: registry:ui
    target: components/ui/combobox/ComboboxViewport.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/combobox/index.ts
---

Use combobox when a user needs to search a long list of options rather than scan a plain select.
Built on [reka-ui's Combobox](https://reka-ui.com/docs/components/combobox); `ComboboxCancel` is
also re-exported directly from `reka-ui` for clearing the current selection.

```vue
<script setup lang="ts">
import { Check } from "@lucide/vue";
import { ref } from "vue";
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxViewport,
} from "@/components/ui/combobox";

const frameworks = ["Next.js", "SvelteKit", "Nuxt", "Remix", "Astro"];
const value = ref("");
</script>

<template>
  <Combobox v-model="value" class="w-[200px]">
    <ComboboxAnchor>
      <ComboboxInput placeholder="Search framework..." />
    </ComboboxAnchor>
    <ComboboxList>
      <ComboboxViewport>
        <ComboboxEmpty>No framework found.</ComboboxEmpty>
        <ComboboxGroup>
          <ComboboxItem v-for="framework in frameworks" :key="framework" :value="framework">
            {{ framework }}
            <ComboboxItemIndicator>
              <Check class="size-4" />
            </ComboboxItemIndicator>
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxViewport>
    </ComboboxList>
  </Combobox>
</template>
```
