<script setup lang="ts">
// Overrides @nuxtjs/mdc's default ProsePre (app/components/content/** takes priority over the
// module's own prose components) so fenced code blocks in markdown-rendered Usage docs get the
// same rounded/bordered chrome, copy button, and line-number gutter as CodeBlock.vue — the
// module already runs Shiki server-side and hands the highlighted <code> through the default
// slot; this component only supplies the outer <pre> and its chrome.
import { cn } from "~/lib/utils";
import CopyButton from "~/components/docs/CopyButton.vue";

const props = defineProps<{
  code?: string;
  language?: string | null;
  filename?: string | null;
  highlights?: number[];
  meta?: string | null;
  class?: string | null;
}>();
</script>

<template>
  <div
    class="not-prose group/code-block relative my-4 min-w-0 overflow-hidden rounded-lg border bg-muted/40"
  >
    <CopyButton
      v-if="code"
      :value="code"
      copy-label="Copy contents"
      copied-label="Copied"
      :reset-delay="1200"
      variant="ghost"
      size="icon-sm"
      class="absolute top-2 right-2 z-10 bg-muted/90 group-hover/code-block:opacity-100 sm:opacity-0"
    />
    <pre
      :class="cn('shiki-numbered overflow-x-auto py-3 pr-12 pl-4 text-[13px]', props.class)"
    ><slot /></pre>
  </div>
</template>
