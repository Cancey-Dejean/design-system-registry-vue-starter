<script setup lang="ts">
import AuthoredDocsPage from "~/components/docs/AuthoredDocsPage.vue";
import ContentSkeleton from "~/components/docs/ContentSkeleton.vue";
import DocsLayout from "~/components/docs/DocsLayout.vue";

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const { data: page, pending } = await useFetch(() => `/api/docs-pages/${slug.value}`, {
  key: () => `docs-page-${slug.value}`,
});

if (!pending.value && !page.value) {
  throw createError({ statusCode: 404, statusMessage: "Docs page not found." });
}

useHead({ title: computed(() => page.value?.title) });
</script>

<template>
  <ContentSkeleton v-if="pending" variant="docs" />
  <DocsLayout v-else-if="page">
    <AuthoredDocsPage
      :page="{
        title: page.title,
        description: page.description,
        routePath: `/docs/${page.slug}`,
        body: page.body,
        toc: page.toc,
      }"
    />
  </DocsLayout>
</template>
