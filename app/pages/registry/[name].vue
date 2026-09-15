<script setup lang="ts">
import ComponentDoc from "~/components/docs/ComponentDoc.vue";
import ContentSkeleton from "~/components/docs/ContentSkeleton.vue";
import DocsLayout from "~/components/docs/DocsLayout.vue";

const route = useRoute();
const name = computed(() => route.params.name as string);

const { data: item, pending } = await useFetch(() => `/api/registry-items/${name.value}`, {
  key: () => `registry-item-${name.value}`,
});

if (!pending.value && !item.value) {
  throw createError({ statusCode: 404, statusMessage: "Registry item not found." });
}

useHead({ title: computed(() => item.value?.title) });
</script>

<template>
  <ContentSkeleton v-if="pending" variant="registry-item" />
  <DocsLayout v-else-if="item">
    <ComponentDoc :item="item as never" />
  </DocsLayout>
</template>
