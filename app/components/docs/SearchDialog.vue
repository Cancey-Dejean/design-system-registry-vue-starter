<script setup lang="ts">
import type { LucideIcon } from "@lucide/vue";
import { Blocks, Component, FileText, Folder, Search, Wrench } from "@lucide/vue";
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
import type { HTMLAttributes } from "vue";
import type { SiteNavigationItem, SiteNavigationSectionId } from "~/lib/navigation";
import { cn } from "~/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const open = ref(false);
const { data: sections } = useSiteNavigation();

// One icon per navigation section so results stay scannable. A new registry section
// (added to `registrySections`) falls back to `Folder` instead of needing a code change here.
const sectionIcons: Partial<Record<SiteNavigationSectionId, LucideIcon>> = {
  docs: FileText,
  components: Component,
  blocks: Blocks,
  utilities: Wrench,
};

function itemIcon(item: SiteNavigationItem): LucideIcon {
  const sectionId: SiteNavigationSectionId = item.kind === "docs" ? "docs" : item.sectionId;
  return sectionIcons[sectionId] ?? Folder;
}

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
    :class="cn('w-full justify-between text-muted-foreground', props.class)"
    @click="open = true"
  >
    <span class="flex min-w-0 items-center gap-2">
      <Search class="size-4" />
      <span class="truncate">Search docs</span>
    </span>
    <span class="rounded border px-1.5 text-xs text-muted-foreground">⌘K</span>
  </Button>

  <CommandDialog
    v-model:open="open"
    title="Search Docs"
    description="Search docs and registry items."
  >
    <CommandInput placeholder="Search docs..." />
    <CommandList class="py-2">
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup v-for="group in groupedItems" :key="group.id" :heading="group.title">
        <CommandItem
          v-for="item in group.items"
          :key="itemKey(item)"
          :value="`${item.title} ${item.kind === 'registry' ? item.name : item.slug} ${item.description}`"
          @select="onSelect(item)"
        >
          <component :is="itemIcon(item)" />
          <span class="min-w-0 truncate">{{ item.title }}</span>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
</template>
