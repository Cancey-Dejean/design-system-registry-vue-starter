<script setup lang="ts">
import type { SidebarProps } from "@registry/components/Sidebar/index.ts";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@registry/components/Sidebar/index.ts";
import { registryConfig } from "~/lib/registry/config";
import DocsSidebarNav from "./DocsSidebarNav.vue";
import SearchDialog from "./SearchDialog.vue";

const props = defineProps<SidebarProps>();

const { data: sections } = useSiteNavigation();
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" as-child>
            <NuxtLink to="/">
              <span class="font-mono text-sm font-semibold tracking-tighter">{{
                registryConfig.name
              }}</span>
            </NuxtLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      <SearchDialog />
    </SidebarHeader>
    <SidebarContent>
      <DocsSidebarNav :sections="sections ?? []" />
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
</template>
