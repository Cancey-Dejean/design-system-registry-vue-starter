<script setup lang="ts">
import { cn } from "@registry/lib/utils.ts";
import { useHighlightedCode } from "~/composables/useHighlightedCode";
import CopyButton from "./CopyButton.vue";

const props = withDefaults(
  defineProps<{
    code: string;
    lang?: string;
    class?: string;
  }>(),
  { lang: "text" },
);

const slots = defineSlots<{ header?: () => unknown }>();
const html = useHighlightedCode(
  () => props.code,
  () => props.lang,
);
</script>

<template>
  <div
    :class="
      cn(
        'group/code-block relative min-w-0 overflow-hidden rounded-lg border bg-muted/40',
        props.class,
      )
    "
  >
    <div v-if="slots.header" class="flex min-h-10 items-center justify-between gap-3 border-b px-3">
      <div class="min-w-0"><slot name="header" /></div>
      <CopyButton
        :value="code"
        copy-label="Copy contents"
        copied-label="Copied"
        :reset-delay="1200"
        variant="ghost"
        size="icon-sm"
      />
    </div>
    <CopyButton
      v-else
      :value="code"
      copy-label="Copy contents"
      copied-label="Copied"
      :reset-delay="1200"
      variant="ghost"
      size="icon-sm"
      class="absolute top-2 right-2 z-10 bg-muted/90 group-hover/code-block:opacity-100 sm:opacity-0"
    />
    <pre
      :class="
        cn(
          'shiki shiki-themes github-light github-dark shiki-numbered overflow-x-auto py-3 pl-4 text-[13px]',
          slots.header ? 'pr-4' : 'pr-12',
        )
      "
    ><code v-if="html" v-html="html" /><code v-else>{{ code }}</code></pre>
  </div>
</template>
