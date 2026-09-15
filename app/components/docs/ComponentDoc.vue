<script setup lang="ts">
import { AppWindow, Code, Files, Terminal } from "@lucide/vue";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "#registry-ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#registry-ui/tabs";
import { getRegistryItemRoutePath, getRegistrySectionForType } from "~/lib/registry/sections";
import { hasPreview } from "~/lib/registry/preview-map";
import CodeBlock from "./CodeBlock.vue";
import ComponentPreview from "./ComponentPreview.vue";
import DocsPageHeader from "./DocsPageHeader.vue";
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

const section = computed(() => getRegistrySectionForType(props.item.type as never));
const pagePath = computed(() =>
  getRegistryItemRoutePath({ name: props.item.name, type: props.item.type as never }),
);
const itemHasPreview = computed(() => hasPreview(props.item.name));
const previewCodeFile = computed(() => props.item.files[0]);
</script>

<template>
  <article class="flex min-w-0 flex-col gap-8">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink as-child>
            <NuxtLink :to="section.basePath">{{ section.title }}</NuxtLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{{ item.title }}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>

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
        <CodeBlock v-if="previewCodeFile" :code="previewCodeFile.content" lang="vue" />
        <p v-else class="text-sm text-muted-foreground">No preview source is available.</p>
      </TabsContent>
    </Tabs>

    <section class="flex flex-col gap-4">
      <h2 class="font-heading text-xl font-semibold tracking-tight">Installation</h2>
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
      <h2 class="font-heading text-xl font-semibold tracking-tight">Usage</h2>
      <div class="prose prose-neutral dark:prose-invert max-w-none">
        <ContentRenderer :value="{ body: item.body }" />
      </div>
    </section>
  </article>
</template>
