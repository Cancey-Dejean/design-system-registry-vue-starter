---
name: code-block
type: registry:ui
title: Code Block
description: A composable code panel with header, copy action, line variants, and optional Shiki highlighting.
dependencies:
  - class-variance-authority
  - cn
  - "@lucide/vue"
  - shiki
localRegistryDependencies:
  - button
  - scroll-fade
files:
  - path: CodeBlock.vue
    type: registry:ui
    target: components/ui/code-block/CodeBlock.vue
  - path: CodeBlockHeader.vue
    type: registry:ui
    target: components/ui/code-block/CodeBlockHeader.vue
  - path: CodeBlockTitle.vue
    type: registry:ui
    target: components/ui/code-block/CodeBlockTitle.vue
  - path: CodeBlockActions.vue
    type: registry:ui
    target: components/ui/code-block/CodeBlockActions.vue
  - path: CodeBlockCopyButton.vue
    type: registry:ui
    target: components/ui/code-block/CodeBlockCopyButton.vue
  - path: CodeBlockContent.vue
    type: registry:ui
    target: components/ui/code-block/CodeBlockContent.vue
  - path: CodeBlockLine.vue
    type: registry:ui
    target: components/ui/code-block/CodeBlockLine.vue
  - path: CodeBlockFooter.vue
    type: registry:ui
    target: components/ui/code-block/CodeBlockFooter.vue
  - path: CodeBlock.variants.ts
    type: registry:ui
    target: components/ui/code-block/CodeBlock.variants.ts
  - path: highlighter.ts
    type: registry:ui
    target: components/ui/code-block/highlighter.ts
  - path: lines.ts
    type: registry:ui
    target: components/ui/code-block/lines.ts
  - path: index.ts
    type: registry:ui
    target: components/ui/code-block/index.ts
---

Compose a source or terminal panel from the individual parts. Pass plain text through the `code` prop on `CodeBlockContent`; set `line-numbers`, `start-line`, or `wrap` as needed.

```vue
<script setup lang="ts">
import {
  CodeBlock,
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockContent,
} from "@/components/ui/code-block";
const source = "$ npm install\n$ npm run build";
</script>

<template>
  <CodeBlock>
    <CodeBlockHeader>
      <CodeBlockTitle>Terminal</CodeBlockTitle>
      <CodeBlockActions><CodeBlockCopyButton :value="source" /></CodeBlockActions>
    </CodeBlockHeader>
    <CodeBlockContent :code="source" line-numbers />
  </CodeBlock>
</template>
```

Use `variant="destructive"` for error output and `size="sm"` for compact panels. Compose `CodeBlockLine` with `variant="added"`, `"removed"`, or `"highlighted"` for diffs and emphasized lines. `CodeBlockFooter` holds optional status text.

Install [Use Highlighted Code](/utilities/use-highlighted-code) for reactive Shiki tokens. Pass each returned line to `CodeBlockLine`'s `content` prop. Unknown languages remain plain text; supported aliases include `js`, `ts`, `sh`, `md`, `py`, and `yml`. Vue and ANSI output are supported. Source is rendered as text nodes, never injected as HTML.
