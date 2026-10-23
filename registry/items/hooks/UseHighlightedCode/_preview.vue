<script setup lang="ts">
import { ref } from "vue";
import { useHighlightedCode } from "./useHighlightedCode";
import { CodeBlock, CodeBlockContent, CodeBlockLine } from "@registry/components/CodeBlock";
const source = ref('const message = "Reactive Vue highlighting";');
const lines = useHighlightedCode(source, "typescript");
</script>
<template>
  <CodeBlock
    ><CodeBlockContent line-numbers
      ><CodeBlockLine
        v-for="(line, index) in lines"
        :key="index"
        :content="line" /></CodeBlockContent
  ></CodeBlock>
</template>
