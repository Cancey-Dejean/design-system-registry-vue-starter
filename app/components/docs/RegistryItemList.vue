<script setup lang="ts">
import type { RegistryNavigationItem } from "~/lib/navigation";
import { Card, CardDescription, CardHeader, CardTitle } from "#registry-ui/Card";
import DocsPageHeader from "./DocsPageHeader.vue";

defineProps<{
  catalog: {
    title: string;
    description: string;
    basePath: string;
    items: RegistryNavigationItem[];
  };
}>();
</script>

<template>
  <div class="flex w-full flex-col gap-6">
    <DocsPageHeader
      :title="catalog.title"
      :description="catalog.description"
      :page-path="catalog.basePath"
    />

    <div v-if="catalog.items.length > 0" class="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
      <NuxtLink
        v-for="item in catalog.items"
        :key="item.name"
        :to="item.routePath"
        class="block rounded-xl transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <Card class="h-full transition-colors hover:bg-muted/40">
          <CardHeader>
            <CardTitle>{{ item.title }}</CardTitle>
            <CardDescription>{{ item.description }}</CardDescription>
          </CardHeader>
        </Card>
      </NuxtLink>
    </div>
    <p v-else class="rounded-lg border p-4 text-sm text-muted-foreground">
      Add items under <code>registry/items</code> to publish the registry.
    </p>
  </div>
</template>
