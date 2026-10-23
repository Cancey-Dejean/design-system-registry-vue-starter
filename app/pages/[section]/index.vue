<script setup lang="ts">
import DocsLayout from "~/components/docs/DocsLayout.vue";
import RegistryGallery from "~/components/docs/RegistryGallery.vue";
import RegistryItemList from "~/components/docs/RegistryItemList.vue";
import { getRegistrySection, isRegistrySectionId } from "~/lib/registry/sections";

const route = useRoute();
const sectionId = route.params.section as string;

if (!isRegistrySectionId(sectionId)) {
  throw createError({ statusCode: 404, statusMessage: "Registry section not found." });
}

const section = getRegistrySection(sectionId)!;
useHead({ title: section.title });

const { data: sections } = useSiteNavigation();

const catalog = computed(() => ({
  title: section.title,
  description: section.description,
  basePath: section.basePath,
  items:
    (sections.value ?? [])
      .find((s) => s.id === sectionId)
      ?.items.filter(
        (item): item is Extract<typeof item, { kind: "registry" }> => item.kind === "registry",
      ) ?? [],
}));
</script>

<template>
  <DocsLayout>
    <RegistryGallery
      v-if="sectionId === 'components' || sectionId === 'blocks'"
      :catalog="catalog"
    />
    <RegistryItemList v-else :catalog="catalog" />
  </DocsLayout>
</template>
