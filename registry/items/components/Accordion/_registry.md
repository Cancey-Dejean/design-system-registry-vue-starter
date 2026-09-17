---
name: accordion
type: registry:ui
title: Accordion
description: A vertically stacked set of interactive headings that each reveal a section of content.
dependencies:
  - reka-ui
  - "@lucide/vue"
  - "@vueuse/core"
files:
  - path: Accordion.vue
    type: registry:ui
    target: components/ui/accordion/Accordion.vue
  - path: AccordionContent.vue
    type: registry:ui
    target: components/ui/accordion/AccordionContent.vue
  - path: AccordionItem.vue
    type: registry:ui
    target: components/ui/accordion/AccordionItem.vue
  - path: AccordionTrigger.vue
    type: registry:ui
    target: components/ui/accordion/AccordionTrigger.vue
  - path: index.ts
    type: registry:ui
    target: components/ui/accordion/index.ts
---

Use accordion to progressively disclose content, such as FAQs or grouped settings, without
navigating away from the page. Each `AccordionItem` needs a unique `value` so the root can track
which panel is expanded.

```vue
<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
</script>

<template>
  <Accordion type="single" collapsible class="max-w-md">
    <AccordionItem value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Is it styled?</AccordionTrigger>
      <AccordionContent>
        Yes. It comes with default styles that match the rest of the design system.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
```

Built on [reka-ui's Accordion](https://reka-ui.com/docs/components/accordion). Set `type="single"`
for one open panel at a time, or `type="multiple"` to allow several panels open at once.
