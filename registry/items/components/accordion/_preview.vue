<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from ".";
</script>

<template>
  <Accordion type="single" :default-value="['item-1']" collapsible class="max-w-sm">
    <AccordionItem value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Is it styled?</AccordionTrigger>
      <AccordionContent
        >Yes. It comes with default styles that match the other components.</AccordionContent
      >
    </AccordionItem>
  </Accordion>
</template>
