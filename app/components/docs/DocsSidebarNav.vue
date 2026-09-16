<script setup lang="ts">
import type { SiteNavigationItem, SiteNavigationSection } from "~/lib/navigation";
import {
  SidebarGroup,
  SidebarMenu,
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

function itemKey(item: SiteNavigationItem): string {
  return `${item.kind}:${item.kind === "docs" ? item.slug : item.name}`;
}
</script>

<template>
  <SidebarGroup>
    <SidebarMenu>
      <SidebarMenuItem v-for="section in sections" :key="section.id">
        <SidebarMenuButton as-child :is-active="isSectionActive(section)">
          <NuxtLink :to="section.basePath" class="font-medium">{{ section.title }}</NuxtLink>
        </SidebarMenuButton>
        <SidebarMenuSub v-if="section.items.length">
          <SidebarMenuSubItem v-for="item in section.items" :key="itemKey(item)">
            <SidebarMenuSubButton as-child :is-active="isItemActive(item)">
              <NuxtLink :to="item.routePath">{{ item.title }}</NuxtLink>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        </SidebarMenuSub>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
