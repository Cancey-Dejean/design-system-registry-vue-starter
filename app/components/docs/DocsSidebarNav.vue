<script setup lang="ts">
import type { SiteNavigationItem, SiteNavigationSection } from "~/lib/navigation";
import { ChevronRight } from "@lucide/vue";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@registry/components/Collapsible/index.ts";
import {
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

function isSectionActive(section: SiteNavigationSection): boolean {
  return route.path === section.basePath;
}

function isItemActive(item: SiteNavigationItem): boolean {
  return route.path === item.routePath;
}

function hasActiveItem(section: SiteNavigationSection): boolean {
  return section.items.some(isItemActive);
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
        :key="section.id"
        as-child
        :default-open="hasActiveItem(section)"
        class="group/collapsible"
      >
        <SidebarMenuItem>
          <SidebarMenuButton as-child :is-active="isSectionActive(section)">
            <NuxtLink :to="section.basePath" class="font-medium">{{ section.title }}</NuxtLink>
          </SidebarMenuButton>
          <template v-if="section.items.length">
            <CollapsibleTrigger as-child>
              <SidebarMenuAction class="data-[state=open]:rotate-90">
                <ChevronRight />
                <span class="sr-only">Toggle {{ section.title }}</span>
              </SidebarMenuAction>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem v-for="item in section.items" :key="itemKey(item)">
                  <SidebarMenuSubButton as-child :is-active="isItemActive(item)">
                    <NuxtLink :to="item.routePath">{{ item.title }}</NuxtLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </template>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  </SidebarGroup>
</template>
