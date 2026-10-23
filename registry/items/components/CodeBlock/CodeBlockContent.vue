<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "cn";
import { splitCodeLines } from "./lines";
import CodeBlockLine from "./CodeBlockLine.vue";
const props = withDefaults(
  defineProps<{
    code?: string;
    wrap?: boolean;
    lineNumbers?: boolean;
    startLine?: number;
    class?: HTMLAttributes["class"];
  }>(),
  { wrap: false, lineNumbers: false, startLine: 1 },
);
</script>
<template>
  <pre
    data-slot="code-block-content"
    :data-wrap="wrap || undefined"
    :data-numbered="lineNumbers || undefined"
    dir="ltr"
    tabindex="0"
    :style="{ counterReset: `line ${startLine - 1}` }"
    :class="
      cn(
        'scrollbar-thin min-h-0 min-w-0 scroll-fade-x overflow-auto px-4 py-4 text-start font-mono leading-relaxed outline-none group-has-data-[slot=code-block-footer]/code-block:pb-2 group-has-data-[slot=code-block-header]/code-block:pt-2 group-data-[size=sm]/code-block:px-3 group-data-[size=sm]/code-block:py-3 data-wrap:wrap-break-word data-wrap:whitespace-pre-wrap',
        props.class,
      )
    "
  ><code data-slot="code-block-code" class="grid min-h-lh min-w-max content-start in-data-numbered:grid-cols-[auto_1fr] in-data-wrap:min-w-0"><slot><template v-if="lineNumbers && code !== undefined"><CodeBlockLine v-for="(line, index) in splitCodeLines(code)" :key="index" :content="line" /></template><template v-else>{{ code }}</template></slot></code></pre>
</template>
