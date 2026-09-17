<script setup lang="ts">
import { FolderIcon, HomeIcon, SettingsIcon } from "@lucide/vue";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from ".";
</script>

<template>
  <div
    class="relative isolate h-96 w-full max-w-2xl transform-gpu overflow-hidden rounded-lg border"
  >
    <SidebarProvider class="h-full min-h-0">
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <span class="px-2 text-sm font-semibold group-data-[collapsible=icon]:hidden"
            >Acme Inc.</span
          >
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Home" is-active>
                <HomeIcon />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Projects">
                <FolderIcon />
                <span>Projects</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings">
                <SettingsIcon />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <div class="flex flex-1 flex-col">
        <div class="flex items-center gap-2 border-b p-3">
          <SidebarTrigger />
          <span class="text-sm font-medium">Dashboard</span>
        </div>
      </div>
    </SidebarProvider>
  </div>
</template>
