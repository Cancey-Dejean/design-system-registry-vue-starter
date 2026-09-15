<script setup lang="ts">
import DocsPageHeader from "./DocsPageHeader.vue";

defineProps<{
  page: {
    title: string;
    description: string;
    routePath: string;
    body?: unknown;
  };
}>();
</script>

<template>
  <article class="flex min-w-0 flex-col gap-8">
    <DocsPageHeader
      :title="page.title"
      :description="page.description"
      :page-path="page.routePath"
    />
    <div class="prose prose-neutral dark:prose-invert max-w-none">
      <ContentRenderer v-if="page.body" :value="{ body: page.body }" />
    </div>
  </article>
</template>
