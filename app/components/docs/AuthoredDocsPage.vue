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
    <div
      class="prose prose-sm max-w-none prose-neutral dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-primary prose-p:text-foreground/90 prose-a:font-medium prose-a:text-primary prose-blockquote:*:before:content-none prose-blockquote:*:after:content-none prose-strong:text-primary prose-code:rounded-sm prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:text-[0.9em] prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none prose-li:text-foreground/80 prose-hr:border-foreground/20 prose-blockquote:[&_p]:text-foreground/75 [&_table]:!border-[color:var(--border)] [&_td]:!border-[color:var(--border)] [&_th]:!border-[color:var(--border)]"
    >
      <ContentRenderer v-if="page.body" :value="{ body: page.body }" />
    </div>
  </article>
</template>
