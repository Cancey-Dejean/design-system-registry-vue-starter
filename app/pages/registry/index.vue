<script setup lang="ts">
import DocsLayout from "~/components/docs/DocsLayout.vue";
import RegistryItemList from "~/components/docs/RegistryItemList.vue";
import { getRegistryItemRoutePath, getRegistrySectionIdForType } from "~/lib/registry/sections";
import type { RegistryItemType } from "~/lib/registry/item-types";

interface RegistryItemsApiRow {
  name: string;
  type: RegistryItemType;
  title: string;
  description: string;
}

const { data: items } = await useFetch<RegistryItemsApiRow[]>("/api/registry-items");
useHead({ title: "Registry" });

const catalog = computed(() => ({
  title: "Registry",
  description: "Installable shadcn-compatible registry items.",
  basePath: "/registry",
  items: (items.value ?? []).map((item) => ({
    kind: "registry" as const,
    title: item.title,
    name: item.name,
    description: item.description,
    sectionId: getRegistrySectionIdForType(item.type),
    routePath: getRegistryItemRoutePath(item),
  })),
}));
</script>

<template>
  <DocsLayout>
    <RegistryItemList :catalog="catalog" />
  </DocsLayout>
</template>
