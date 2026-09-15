<script setup lang="ts">
import { cn } from "~/lib/utils";
import DocsLayout from "./DocsLayout.vue";

withDefaults(
  defineProps<{
    variant?: "docs" | "registry-item";
  }>(),
  { variant: "docs" },
);

function skeletonClass(extra: string): string {
  return cn("animate-pulse rounded-md bg-muted", extra);
}
</script>

<template>
  <DocsLayout>
    <article class="flex min-w-0 flex-col gap-8" aria-busy="true" aria-label="Loading page">
      <header class="flex max-w-3xl flex-col gap-2">
        <div class="flex flex-row flex-wrap items-start justify-between gap-3">
          <div :class="skeletonClass('h-9 w-52 max-w-full')" />
          <div :class="skeletonClass('h-9 w-28')" />
        </div>
        <div :class="skeletonClass('h-5 w-full max-w-xl')" />
      </header>

      <template v-if="variant === 'registry-item'">
        <div :class="skeletonClass('h-72 w-full')" />
        <section class="flex flex-col gap-4">
          <div :class="skeletonClass('h-7 w-32')" />
          <div :class="skeletonClass('h-12 w-full')" />
          <div :class="skeletonClass('h-32 w-full')" />
        </section>
      </template>
      <div v-else class="flex flex-col gap-4">
        <div :class="skeletonClass('h-5 w-40')" />
        <div :class="skeletonClass('h-4 w-full')" />
        <div :class="skeletonClass('h-4 w-11/12')" />
        <div :class="skeletonClass('h-4 w-4/5')" />
        <div :class="skeletonClass('mt-4 h-40 w-full')" />
      </div>
    </article>
  </DocsLayout>
</template>
