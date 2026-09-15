<script setup lang="ts">
import { Separator } from ".";
</script>

<template>
  <div>
    <div class="text-sm">Section one</div>
    <Separator class="my-4" />
    <div class="text-sm">Section two</div>
    <div class="mt-4 flex h-5 items-center gap-4 text-sm">
      <span>Left</span>
      <Separator orientation="vertical" />
      <span>Right</span>
    </div>
  </div>
</template>
