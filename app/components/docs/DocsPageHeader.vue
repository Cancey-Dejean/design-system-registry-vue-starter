<script setup lang="ts">
import { cn } from "@registry/lib/utils.ts";
import { getCanonicalDocsUrl, getCanonicalRegistryItemUrl } from "~/lib/site-config";
import DocsPageActions from "./DocsPageActions.vue";
import DocsPageNav from "./DocsPageNav.vue";

const props = defineProps<{
  title: string;
  description: string;
  pagePath: string;
  registryItemName?: string;
  class?: string;
}>();

const markdownPath = computed(() => `${props.pagePath}.md`);
</script>

<template>
  <header :class="cn('flex max-w-full flex-col gap-2', props.class)">
    <div class="flex flex-row flex-wrap items-start justify-between gap-3">
      <h1 class="min-w-0 font-heading text-3xl font-semibold tracking-tight">{{ title }}</h1>
      <div class="flex shrink-0 items-center gap-2">
        <DocsPageActions
          :markdown-path="markdownPath"
          :page-description="description"
          :page-title="title"
          :page-url="getCanonicalDocsUrl(pagePath)"
          :registry-item-json-url="
            registryItemName ? getCanonicalRegistryItemUrl(registryItemName) : undefined
          "
        />
        <DocsPageNav />
      </div>
    </div>
    <p class="text-base text-muted-foreground">{{ description }}</p>
  </header>
</template>
