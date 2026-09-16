<script setup lang="ts">
import type { SiteNavigationItem, SiteNavigationSection } from "~/lib/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@registry/components/Sidebar/index.ts";

defineProps<{
  sections: readonly SiteNavigationSection[];
}>();

const route = useRoute();

function isSectionActive(section: SiteNavigationSection): boolean {
  return route.path === section.basePath || route.path.startsWith(`${section.basePath}/`);
}

function isItemActive(item: SiteNavigationItem): boolean {
  return route.path === item.routePath;
}
</script>

<template>
  <SidebarGroup v-for="section in sections" :key="section.id">
    <SidebarGroupLabel as-child>
      <NuxtLink
        :to="section.basePath"
        :class="isSectionActive(section) ? 'text-sidebar-foreground' : ''"
      >
        {{ section.title }}
      </NuxtLink>
    </SidebarGroupLabel>
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem
          v-for="item in section.items"
          :key="`${item.kind}:${item.kind === 'docs' ? item.slug : item.name}`"
        >
          <SidebarMenuButton as-child :is-active="isItemActive(item)">
            <NuxtLink :to="item.routePath">{{ item.title }}</NuxtLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>
