<script setup lang="ts">
import type { SiteNavigationItem, SiteNavigationSection } from "~/lib/navigation";
import { getBlockCategory, getGalleryCategories } from "~/lib/registry/gallery";
import { flowsPage } from "~/lib/registry/flows";
import { Badge } from "@registry/components/Badge";
import { ChevronRight } from "@lucide/vue";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@registry/components/Collapsible/index.ts";
import {
  useSidebar,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@registry/components/Sidebar/index.ts";

defineProps<{
  sections: readonly SiteNavigationSection[];
}>();

const route = useRoute();
const { setOpenMobile } = useSidebar();

// Covers sidebar, search, pager and programmatic navigation while the shell persists.
watch(
  () => route.fullPath,
  () => setOpenMobile(false),
);

function closeMobileSidebar() {
  setOpenMobile(false);
}

function isSectionActive(section: SiteNavigationSection): boolean {
  return route.path === section.basePath || route.path.startsWith(`${section.basePath}/`);
}

function isItemActive(item: SiteNavigationItem): boolean {
  return route.path === item.routePath;
}

function hasActiveItem(section: SiteNavigationSection): boolean {
  return isSectionActive(section);
}

function blockCategories(section: SiteNavigationSection) {
  return getGalleryCategories(section.items.filter((item) => item.kind === "registry"));
}

function isCategoryActive(id: string): boolean {
  return route.path === "/blocks"
    ? route.query.category === id
    : route.path.startsWith("/blocks/") &&
        getBlockCategory(String(route.params.name ?? "")).id === id;
}

function sectionEntryPath(section: SiteNavigationSection): string {
  return section.basePath;
}

function itemKey(item: SiteNavigationItem): string {
  return `${item.kind}:${item.kind === "docs" ? item.slug : item.name}`;
}
</script>

<template>
  <SidebarGroup>
    <SidebarMenu class="gap-1">
      <Collapsible
        v-for="section in sections"
        :key="`${section.id}:${hasActiveItem(section) ? 'open' : 'closed'}`"
        as-child
        :default-open="hasActiveItem(section)"
        class="group/collapsible"
      >
        <SidebarMenuItem>
          <SidebarMenuButton as-child :is-active="isSectionActive(section)">
            <NuxtLink
              :to="sectionEntryPath(section)"
              @click="closeMobileSidebar"
              active-class=""
              exact-active-class=""
              class="font-medium"
            >
              {{ section.title }}
            </NuxtLink>
          </SidebarMenuButton>
          <template v-if="section.items.length">
            <CollapsibleTrigger as-child>
              <SidebarMenuAction class="data-[state=open]:rotate-90">
                <ChevronRight />
                <span class="sr-only">Toggle {{ section.title }}</span>
              </SidebarMenuAction>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub class="mr-0 pr-0">
                <template v-if="section.id === 'blocks'">
                  <SidebarMenuSubItem
                    v-for="category in blockCategories(section)"
                    :key="category.id"
                  >
                    <SidebarMenuSubButton
                      as-child
                      class="w-full"
                      :is-active="isCategoryActive(category.id)"
                    >
                      <NuxtLink
                        :to="{ path: section.basePath, query: { category: category.id } }"
                        @click="closeMobileSidebar"
                      >
                        <span class="truncate">{{ category.title }}</span>
                        <Badge variant="secondary" class="ml-auto">{{ category.count }}</Badge>
                      </NuxtLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </template>
                <template v-else>
                  <SidebarMenuSubItem v-for="item in section.items" :key="itemKey(item)">
                    <SidebarMenuSubButton as-child class="w-full" :is-active="isItemActive(item)">
                      <NuxtLink :to="item.routePath" @click="closeMobileSidebar">
                        <span class="truncate">{{ item.title }}</span>
                        <Badge
                          v-if="item.kind === 'registry' && item.type === 'registry:hook'"
                          title="Hook"
                          aria-label="Hook"
                          class="ml-auto size-4.5 shrink-0 justify-center bg-amber-500/15 px-0 font-mono text-[10px] font-semibold text-amber-700 dark:text-amber-300"
                          >H</Badge
                        >
                        <Badge
                          v-if="item.kind === 'docs' && item.slug !== 'index'"
                          variant="outline"
                          class="ml-auto h-4.5 shrink-0 px-1.5 font-mono text-[10px] font-normal tracking-wide uppercase"
                          :class="
                            item.audience === 'maintainers'
                              ? 'border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300'
                              : 'border-[#42b883]/30 bg-[#42b883]/10 text-[#237a52] dark:text-[#42b883]'
                          "
                          :title="
                            item.audience === 'maintainers'
                              ? 'For registry maintainers, not projects that install from the registry'
                              : 'For developers and consumers of the registry'
                          "
                          >{{ item.audience === "maintainers" ? "MAINTAINERS" : "DEV" }}</Badge
                        >
                      </NuxtLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </template>
              </SidebarMenuSub>
            </CollapsibleContent>
          </template>
        </SidebarMenuItem>
      </Collapsible>
      <SidebarMenuItem>
        <SidebarMenuButton as-child :is-active="route.path === flowsPage.path">
          <NuxtLink
            :to="flowsPage.path"
            @click="closeMobileSidebar"
            active-class=""
            exact-active-class=""
            class="font-medium"
          >
            {{ flowsPage.title }}
          </NuxtLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
