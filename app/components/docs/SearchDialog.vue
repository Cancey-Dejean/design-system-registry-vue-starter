<script setup lang="ts">
import type { LucideIcon } from "@lucide/vue";
import {
  Blocks,
  Component,
  FileText,
  Folder,
  Search,
  Wrench,
  ArrowUp,
  ArrowDown,
  CornerDownLeft,
} from "@lucide/vue";
import { ListboxFilter } from "reka-ui";
import { Button } from "@registry/components/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@registry/components/Dialog";
import { Command, CommandGroup, CommandItem, CommandList } from "@registry/components/Command";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@registry/components/InputGroup";
import { Skeleton } from "@registry/components/Skeleton";
import { useSidebar } from "@registry/components/Sidebar";
import { useDebounceFn } from "@vueuse/core";
import type { HTMLAttributes } from "vue";
import type { SiteNavigationSectionId } from "~/lib/navigation";
import type { SearchRecord } from "~/lib/search/registry-search";
import { cn } from "@registry/lib/utils";

import SearchResultFocus from "./SearchResultFocus.vue";

const props = defineProps<{ class?: HTMLAttributes["class"] }>();
const open = ref(false);
const query = ref("");
const { setOpenMobile } = useSidebar();
const { data, pending, error, execute } = await useFetch<{
  count: number;
  results: SearchRecord[];
}>("/api/search", {
  query: { q: query },
  immediate: false,
  watch: false,
  server: false,
  dedupe: "cancel",
});
const loadResults = useDebounceFn(() => {
  if (open.value) void execute();
}, 150);
watch(query, () => loadResults());
watch(open, (value) => {
  if (value) {
    query.value = "";
    void execute();
  }
});
const sectionIcons: Partial<Record<SiteNavigationSectionId, LucideIcon>> = {
  docs: FileText,
  components: Component,
  blocks: Blocks,
  utilities: Wrench,
};
async function onSelect(item: SearchRecord) {
  open.value = false;
  setOpenMobile(false);
  await navigateTo(item.routePath);
}
function onShortcut(event: KeyboardEvent) {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    open.value = !open.value;
  }
}
onMounted(() => window.addEventListener("keydown", onShortcut));
onUnmounted(() => window.removeEventListener("keydown", onShortcut));
</script>

<template>
  <Button variant="outline" :class="cn('w-full justify-between', props.class)" @click="open = true">
    <span class="flex min-w-0 items-center gap-2"
      ><Search /><span class="truncate">Search docs</span></span
    >
    <kbd class="rounded border px-1.5 text-xs text-muted-foreground">⌘K</kbd>
  </Button>
  <Dialog v-model:open="open">
    <DialogContent class="gap-0 p-1 sm:max-w-xl" :show-close-button="false">
      <DialogHeader class="sr-only">
        <DialogTitle>Search docs</DialogTitle>
        <DialogDescription
          >Search documentation, components, categories, dependencies, and source
          files.</DialogDescription
        >
      </DialogHeader>
      <Command>
        <InputGroup>
          <InputGroupAddon><Search aria-hidden="true" /></InputGroupAddon>
          <ListboxFilter v-model="query" as-child>
            <InputGroupInput
              v-model="query"
              placeholder="Search docs…"
              aria-label="Search docs and registry"
              autocomplete="off"
            />
          </ListboxFilter>
        </InputGroup>
        <CommandList class="max-h-[min(60dvh,28rem)] py-2" :aria-busy="pending">
          <div v-if="pending" role="status" class="flex flex-col gap-2 p-3">
            <span class="sr-only">Searching…</span>
            <Skeleton v-for="n in 3" :key="n" class="h-10 w-full motion-reduce:animate-none" />
          </div>
          <div v-else-if="error" role="alert" class="flex flex-col items-start gap-3 p-4">
            <p>Search could not load. Please try again.</p>
            <Button variant="outline" size="sm" @click="execute()">Retry</Button>
          </div>
          <p
            v-else-if="!data?.results.length"
            role="status"
            class="p-6 text-center text-sm text-muted-foreground"
          >
            No results found.
          </p>
          <CommandGroup v-else :heading="query.trim() ? 'Search results' : 'Pages and components'">
            <SearchResultFocus />
            <CommandItem
              v-for="item in data.results"
              :key="item.id"
              :value="item.id"
              @select="onSelect(item)"
            >
              <component :is="sectionIcons[item.section] ?? Folder" />
              <span class="flex min-w-0 flex-1 flex-col gap-0.5">
                <span class="truncate">{{ item.title }}</span>
                <span class="truncate text-xs text-muted-foreground">{{ item.description }}</span>
              </span>
              <span class="shrink-0 text-xs text-muted-foreground">{{ item.sectionTitle }}</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
      <footer
        class="flex flex-wrap items-center justify-between gap-3 border-t px-3 py-2 text-xs text-muted-foreground"
      >
        <span aria-live="polite">{{ pending ? "Searching…" : `${data?.count ?? 0} results` }}</span>
        <span class="flex items-center gap-1"
          ><ArrowUp class="size-3" /><ArrowDown class="size-3" /> Navigate
          <CornerDownLeft class="ml-2 size-3" /> Go to page</span
        >
      </footer>
    </DialogContent>
  </Dialog>
</template>
