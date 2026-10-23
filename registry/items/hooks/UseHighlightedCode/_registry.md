---
name: use-highlighted-code
type: registry:hook
title: Highlighted Code
description: Incremental Shiki highlighting for reactive Vue source strings.
dependencies:
  - vue
localRegistryDependencies:
  - code-block
files:
  - path: useHighlightedCode.ts
    type: registry:hook
    target: composables/useHighlightedCode.ts
---

Pass refs or getters for the source and language. The returned shallow ref contains one string or array of Vue token nodes per line. Complete lines are cached while appended text streams; replacing the source or changing language resets the grammar state. Stale async grammar loads are ignored.

```vue
<script setup lang="ts">
import { ref } from "vue";
import { CodeBlock, CodeBlockContent, CodeBlockLine } from "@/components/ui/code-block";
import { useHighlightedCode } from "@/composables/useHighlightedCode";
const source = ref('const greeting = "hello";\nconsole.log(greeting);');
const lines = useHighlightedCode(source, "typescript");
</script>

<template>
  <CodeBlock>
    <CodeBlockContent line-numbers>
      <CodeBlockLine v-for="(line, index) in lines" :key="index" :content="line" />
    </CodeBlockContent>
  </CodeBlock>
</template>
```

While a grammar loads, or when a language is unsupported, the source remains readable as plain text. The JavaScript regular-expression engine avoids a WASM dependency.
