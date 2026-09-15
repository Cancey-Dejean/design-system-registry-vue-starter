<script setup lang="ts">
import { Separator } from ".";
import PreviewWrapper from "../../../../app/components/docs/PreviewWrapper.vue";
</script>

<template>
  <PreviewWrapper>
    <div class="text-sm">Section one</div>
    <Separator class="my-4" />
    <div class="text-sm">Section two</div>
    <div class="mt-4 flex h-5 items-center gap-4 text-sm">
      <span>Left</span>
      <Separator orientation="vertical" />
      <span>Right</span>
    </div>
  </PreviewWrapper>
</template>
