<script setup lang="ts">
import { Search } from "@lucide/vue";
import { Button } from "@registry/components/Button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@registry/components/Command";
import { useMagicKeys } from "@vueuse/core";
import type { SiteNavigationItem } from "~/lib/navigation";

const open = ref(false);
const { data: sections } = useSiteNavigation();

const sectionOrder: SiteNavigationItem["kind"][] = ["docs"];

const groupedItems = computed(() => {
  const groups = (sections.value ?? []).map((section) => ({
    id: section.id,
    title: section.title,
    items: section.items,
  }));

  // Docs first, then registry sections in the order the API returned them.
  return groups.sort((a, b) => {
    if (a.id === "docs") return -1;
    if (b.id === "docs") return 1;
    return 0;
  });
});

function itemKey(item: SiteNavigationItem): string {
  return item.kind === "docs" ? `docs:${item.slug}` : `registry:${item.name}`;
}

function onSelect(item: SiteNavigationItem) {
  open.value = false;
  navigateTo(item.routePath);
}

const keys = useMagicKeys();
watch(keys["Meta+K"], (pressed) => {
  if (pressed) open.value = !open.value;
});
watch(keys["Ctrl+K"], (pressed) => {
  if (pressed) open.value = !open.value;
});
</script>

<template>
  <Button
    variant="outline"
    class="mr-4 hidden w-56 justify-between text-muted-foreground sm:flex"
    @click="open = true"
  >
    <span class="flex min-w-0 items-center gap-2">
      <Search class="size-4" />
      <span class="truncate">Search docs</span>
    </span>
    <span class="rounded border px-1.5 text-xs text-muted-foreground">⌘K</span>
  </Button>
  <Button
    variant="ghost"
    size="icon-md"
    class="sm:hidden"
    aria-label="Search docs and registry"
    @click="open = true"
  >
    <Search />
  </Button>

  <CommandDialog
    v-model:open="open"
    title="Search Docs"
    description="Search docs and registry items."
  >
    <CommandInput placeholder="Search docs..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup v-for="group in groupedItems" :key="group.id" :heading="group.title">
        <CommandItem
          v-for="item in group.items"
          :key="itemKey(item)"
          :value="`${item.title} ${item.kind === 'registry' ? item.name : item.slug} ${item.description}`"
          @select="onSelect(item)"
        >
          <span class="min-w-0 truncate">{{ item.title }}</span>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
</template>
