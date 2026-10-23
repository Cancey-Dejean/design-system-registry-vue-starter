<script setup lang="ts">
import {
  CodeBlock,
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockContent,
  CodeBlockLine,
  CodeBlockFooter,
} from ".";
import { useHighlightedCode } from "../../hooks/UseHighlightedCode/useHighlightedCode";
const source = 'const greeting = "hello";\nconsole.log(greeting);';
const lines = useHighlightedCode(source, "typescript");
</script>
<template>
  <CodeBlock class="w-full max-w-xl">
    <CodeBlockHeader
      ><CodeBlockTitle>greeting.ts</CodeBlockTitle
      ><CodeBlockActions><CodeBlockCopyButton :value="source" /></CodeBlockActions
    ></CodeBlockHeader>
    <CodeBlockContent line-numbers
      ><CodeBlockLine
        v-for="(line, index) in lines"
        :key="index"
        :content="line"
        :variant="index === 1 ? 'highlighted' : 'default'"
    /></CodeBlockContent>
    <CodeBlockFooter>TypeScript</CodeBlockFooter>
  </CodeBlock>
</template>
