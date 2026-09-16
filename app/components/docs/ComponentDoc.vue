<script setup lang="ts">
import type { TocLink } from "@nuxt/content";
import { AppWindow, Code, Files, Terminal } from "@lucide/vue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#registry-ui/Tabs";
import { getRegistryItemRoutePath } from "~/lib/registry/sections";
import { hasPreview } from "~/lib/registry/preview-map";
import CodeBlock from "./CodeBlock.vue";
import ComponentPreview from "./ComponentPreview.vue";
import DocsPageHeader from "./DocsPageHeader.vue";
import DocsTableOfContents from "./DocsTableOfContents.vue";
import InstallCommand from "./InstallCommand.vue";
import ManualInstall from "./ManualInstall.vue";

interface RegistryItemDocFile {
  path: string;
  content: string;
  target?: string;
}

const props = defineProps<{
  item: {
    name: string;
    type: string;
    title: string;
    description: string;
    dependencies?: string[];
    files: RegistryItemDocFile[];
    hasUsage: boolean;
    body?: unknown;
  };
}>();

const pagePath = computed(() =>
  getRegistryItemRoutePath({ name: props.item.name, type: props.item.type as never }),
);
const itemHasPreview = computed(() => hasPreview(props.item.name));
const previewCodeFile = computed(() => props.item.files[0]);
const previewCodeLang = computed(() => {
  const extension = previewCodeFile.value?.path.split(".").at(-1);
  return extension === "vue" || extension === "ts" || extension === "js" || extension === "css"
    ? extension
    : "vue";
});

// This page's headings aren't markdown-sourced (unlike docs pages), so there's no toc from
// @nuxt/content to read — build the same TocLink shape by hand from the sections actually
// rendered below.
const toc = computed<TocLink[]>(() => [
  { id: "installation", text: "Installation", depth: 2 },
  ...(props.item.hasUsage ? [{ id: "usage", text: "Usage", depth: 2 }] : ([] as TocLink[])),
]);
</script>

<template>
  <div class="flex items-start gap-8">
    <article class="flex min-w-0 flex-1 flex-col gap-8">
      <DocsPageHeader
        :title="item.title"
        :description="item.description"
        :page-path="pagePath"
        :registry-item-name="item.name"
      />

      <Tabs v-if="itemHasPreview" default-value="preview" class="gap-4">
        <TabsList variant="line">
          <TabsTrigger value="preview"><AppWindow />Preview</TabsTrigger>
          <TabsTrigger value="code"><Code />Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          <ComponentPreview :name="item.name" />
        </TabsContent>
        <TabsContent value="code">
          <CodeBlock
            v-if="previewCodeFile"
            :code="previewCodeFile.content"
            :lang="previewCodeLang"
          />
          <p v-else class="text-sm text-muted-foreground">No preview source is available.</p>
        </TabsContent>
      </Tabs>

      <section class="flex flex-col gap-4">
        <h2 id="installation" class="font-heading text-xl font-semibold tracking-tight">
          Installation
        </h2>
        <Tabs default-value="cli" class="gap-4">
          <TabsList variant="line">
            <TabsTrigger value="cli"><Terminal />CLI</TabsTrigger>
            <TabsTrigger value="manual"><Files />Manual</TabsTrigger>
          </TabsList>
          <TabsContent value="cli">
            <InstallCommand :item-name="item.name" />
          </TabsContent>
          <TabsContent value="manual">
            <ManualInstall :dependencies="item.dependencies" :source-files="item.files" />
          </TabsContent>
        </Tabs>
      </section>

      <section v-if="item.hasUsage" class="flex flex-col gap-4">
        <h2 id="usage" class="font-heading text-xl font-semibold tracking-tight">Usage</h2>
        <div class="prose prose-neutral dark:prose-invert max-w-none">
          <ContentRenderer :key="item.name" :value="{ body: item.body }" />
        </div>
      </section>
    </article>
    <aside
      class="sticky top-16 hidden max-h-[calc(100vh-5rem)] w-56 shrink-0 overflow-y-auto py-6 xl:block"
    >
      <DocsTableOfContents :links="toc" />
    </aside>
  </div>
</template>
