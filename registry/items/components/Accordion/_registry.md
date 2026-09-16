---
name: accordion
type: registry:ui
title: Accordion
description: A vertically stacked set of interactive headings that each reveal a section of content.
dependencies:
  - reka-ui
  - "@lucide/vue"
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

Use the accordion for FAQs, settings sections, and other progressive disclosure patterns.

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
  <Accordion type="single" :default-value="['item-1']" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent> Yes. It adheres to the WAI-ARIA design pattern. </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Is it styled?</AccordionTrigger>
      <AccordionContent>
        Yes. It comes with default styles that match the other components.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
```

Open multiple sections with `type="multiple"`. Built on reka-ui's Accordion primitive.
