<script setup lang="ts">
import storybookStories from "#registry-storybook";
import { Button } from "@registry/components/Button";
import { Logo } from "@registry/components/Logos";
import { registryConfig } from "~/lib/registry/config";
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

const storybookUrl = computed(() => {
  const storyId = props.registryItemName
    ? (storybookStories as Record<string, string>)[props.registryItemName]
    : undefined;
  if (!storyId) return undefined;
  const url = new URL(registryConfig.storybookUrl);
  url.searchParams.set("path", `/story/${storyId}`);
  return url.toString();
});

const markdownPath = computed(() => `${props.pagePath}.md`);
</script>

<template>
  <header :class="cn('flex max-w-full flex-col gap-2', props.class)">
    <div class="flex flex-row flex-wrap items-start justify-between gap-3">
      <h1 class="min-w-0 font-heading text-3xl font-semibold tracking-tight">{{ title }}</h1>
      <div class="flex shrink-0 items-center gap-2">
        <Button
          v-if="storybookUrl"
          as="a"
          variant="ghost"
          size="icon-sm"
          :href="storybookUrl"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Storybook"
          title="View Storybook"
        >
          <Logo logo="storybook" class="size-6" aria-hidden="true" />
        </Button>
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
