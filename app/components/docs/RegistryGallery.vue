<script setup lang="ts">
import { ArrowUpRight, LayoutGrid, List, Search as SearchIcon } from "@lucide/vue";
import { Badge } from "@registry/components/Badge";
import { Button } from "@registry/components/Button";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@registry/components/Empty";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@registry/components/InputGroup";
import { Tabs, TabsList, TabsTrigger } from "@registry/components/Tabs";
import type { RegistryNavigationItem } from "~/lib/navigation";
import { filterGalleryItems, getBlockCategory, getGalleryCategories } from "~/lib/registry/gallery";
import { cn } from "@registry/lib/utils";
import GalleryPreview from "./GalleryPreview.vue";

const props = defineProps<{
  catalog: {
    title: string;
    description: string;
    basePath: string;
    items: RegistryNavigationItem[];
  };
}>();
const route = useRoute();
const query = ref("");
const view = ref("grid");
const isComponents = computed(() => props.catalog.basePath === "/components");
const category = computed(() =>
  isComponents.value || typeof route.query.category !== "string" ? "all" : route.query.category,
);
const categories = computed(() => getGalleryCategories(props.catalog.items));
const visible = computed(() =>
  filterGalleryItems(props.catalog.items, category.value, query.value),
);
const noun = computed(() => (isComponents.value ? "components" : "blocks"));

async function selectCategory(value: string | number) {
  await navigateTo({
    path: props.catalog.basePath,
    query: { ...route.query, category: value === "all" ? undefined : String(value) },
  });
}
async function resetFilters() {
  query.value = "";
  await selectCategory("all");
}
</script>

<template>
  <section
    class="flex min-w-0 flex-col gap-6 pb-8"
    :aria-label="`${isComponents ? 'Component' : 'Block'} gallery`"
  >
    <header class="flex flex-col gap-2">
      <h1 class="font-heading text-3xl font-semibold tracking-tight">{{ catalog.title }}</h1>
      <p class="text-base text-muted-foreground">{{ catalog.description }}</p>
    </header>

    <Tabs v-if="!isComponents" :model-value="category" @update:model-value="selectCategory">
      <div class="overflow-x-auto border-b pb-1">
        <TabsList variant="line" aria-label="Block categories">
          <TabsTrigger value="all"
            >All blocks <Badge variant="secondary">{{ catalog.items.length }}</Badge></TabsTrigger
          >
          <TabsTrigger v-for="group in categories" :key="group.id" :value="group.id">
            {{ group.title }} <Badge variant="secondary">{{ group.count }}</Badge>
          </TabsTrigger>
        </TabsList>
      </div>
    </Tabs>

    <div class="flex items-center justify-between gap-3">
      <form role="search" class="w-full max-w-xs" @submit.prevent>
        <InputGroup>
          <InputGroupAddon><SearchIcon aria-hidden="true" /></InputGroupAddon>
          <InputGroupInput
            v-model="query"
            type="search"
            :aria-label="`Search ${noun}`"
            :placeholder="`Search ${noun}…`"
          />
        </InputGroup>
      </form>
      <Tabs v-model="view">
        <TabsList aria-label="Gallery layout">
          <TabsTrigger value="grid" aria-label="Grid view"
            ><LayoutGrid aria-hidden="true"
          /></TabsTrigger>
          <TabsTrigger value="list" aria-label="List view"><List aria-hidden="true" /></TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
    <output class="sr-only" aria-live="polite">{{ visible.length }} {{ noun }}</output>

    <ul
      :class="
        cn(
          'grid min-w-0 gap-5',
          view === 'grid' ? 'sm:grid-cols-2 min-[92.5rem]:grid-cols-3' : 'gap-10',
        )
      "
    >
      <li
        v-for="item in visible"
        :key="item.name"
        :class="cn('flex min-w-0 flex-col gap-3', view === 'grid' && 'rounded-xl border p-1')"
      >
        <GalleryPreview
          v-if="view === 'grid'"
          :name="item.name"
          :title="item.title"
          :is-component="isComponents"
        />
        <NuxtLink
          :to="item.routePath"
          :aria-label="`View ${item.title}`"
          :class="
            cn(
              'group flex items-center justify-between gap-4 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
              view === 'grid' ? 'px-3 py-3' : 'py-1',
            )
          "
        >
          <div class="flex min-w-0 flex-col items-start gap-2">
            <h2 class="text-lg font-semibold tracking-tight">{{ item.title }}</h2>
            <Badge variant="outline">{{
              isComponents ? "Component" : getBlockCategory(item.name).title
            }}</Badge>
          </div>
          <Button variant="outline" size="icon-md" as="span" aria-hidden="true" tabindex="-1"
            ><ArrowUpRight
          /></Button>
        </NuxtLink>
        <GalleryPreview
          v-if="view === 'list'"
          :name="item.name"
          :title="item.title"
          :is-component="isComponents"
        />
      </li>
    </ul>

    <Empty v-if="visible.length === 0" class="border border-dashed">
      <EmptyHeader>
        <EmptyTitle>No {{ noun }} found</EmptyTitle>
        <EmptyDescription>Try another search or category.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent
        ><Button variant="outline" @click="resetFilters">Reset filters</Button></EmptyContent
      >
    </Empty>
  </section>
</template>
