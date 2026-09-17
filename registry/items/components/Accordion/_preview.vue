<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from ".";

const faqs = [
  {
    value: "shipping",
    question: "How long does shipping take?",
    answer: "Orders leave the warehouse within two business days.",
  },
  {
    value: "returns",
    question: "What is the return window?",
    answer: "Returns are accepted for 30 days after delivery.",
  },
  {
    value: "support",
    question: "How do I reach support?",
    answer: "Email support and you will hear back within a day.",
  },
];
</script>

<template>
  <Accordion type="single" collapsible default-value="shipping" class="max-w-md">
    <AccordionItem v-for="faq in faqs" :key="faq.value" :value="faq.value">
      <AccordionTrigger>{{ faq.question }}</AccordionTrigger>
      <AccordionContent>{{ faq.answer }}</AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
