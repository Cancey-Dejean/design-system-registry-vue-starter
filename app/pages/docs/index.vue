<script setup lang="ts">
import AuthoredDocsPage from "~/components/docs/AuthoredDocsPage.vue";
import DocsLayout from "~/components/docs/DocsLayout.vue";

const { data: page } = await useFetch("/api/docs-pages/index");
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: "Docs page not found." });
}
useHead({ title: computed(() => page.value?.title) });
</script>

<template>
  <DocsLayout v-if="page">
    <AuthoredDocsPage
      :page="{
        title: page.title,
        description: page.description,
        routePath: page.routePath,
        body: page.body,
        toc: page.toc,
      }"
    />
  </DocsLayout>
</template>
