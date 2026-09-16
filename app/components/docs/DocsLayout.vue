<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@registry/components/Sidebar/index.ts";
import { Separator } from "@registry/components/Separator/index.ts";
import DocsSidebarNav from "./DocsSidebarNav.vue";

const { data: sections } = useSiteNavigation();
</script>

<template>
  <SidebarProvider class="min-h-0 w-full">
    <Sidebar
      collapsible="offcanvas"
      class="sticky top-14 h-[calc(100vh-3.5rem)] overflow-hidden group-data-[collapsible=offcanvas]:left-0 group-data-[collapsible=offcanvas]:w-0"
    >
      <SidebarContent>
        <DocsSidebarNav :sections="sections ?? []" />
      </SidebarContent>
    </Sidebar>
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
        </div>
      </header>
      <div class="mx-auto w-full max-w-screen-2xl flex-1 px-4 pb-8 sm:px-6 lg:px-8">
        <slot />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
