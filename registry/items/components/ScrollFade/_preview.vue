<script setup lang="ts">
import { ScrollFade } from ".";

const items = Array.from({ length: 12 }, (_, index) => `Item ${index + 1}`);
</script>

<template>
  <div class="mx-auto w-full max-w-xs overflow-hidden rounded-2xl border">
    <ScrollFade class="h-72">
      <div class="flex flex-col gap-1.5 p-1.5">
        <div v-for="item in items" :key="item" class="bg-muted rounded-lg px-3 py-2.5 text-sm">
          {{ item }}
        </div>
      </div>
    </ScrollFade>
  </div>
</template>
