<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@registry/components/Breadcrumb/index.ts";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@registry/components/Sidebar/index.ts";
import { Button } from "@registry/components/button/index.ts";
import { Separator } from "@registry/components/Separator/index.ts";
import { registryConfig } from "~/lib/registry/config";
import DocsAppSidebar from "./DocsAppSidebar.vue";

// No `collapsible` prop is passed to DocsAppSidebar on purpose: the nav has no icons, so it
// relies on Sidebar's own default ("offcanvas") — the sidebar fully hides instead of shrinking
// to an icon rail.
const { data: sections } = useSiteNavigation();
const route = useRoute();

const activeSection = computed(() =>
  (sections.value ?? []).find(
    (section) => route.path === section.basePath || route.path.startsWith(`${section.basePath}/`),
  ),
);

const activeItem = computed(() =>
  activeSection.value?.items.find((item) => item.routePath === route.path),
);
</script>

<template>
  <SidebarProvider>
    <DocsAppSidebar />
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 border-b">
        <div class="flex w-full items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb v-if="activeSection">
            <BreadcrumbList>
              <template v-if="activeItem">
                <BreadcrumbItem class="hidden md:block">
                  <BreadcrumbLink as-child>
                    <NuxtLink :to="activeSection.basePath">{{ activeSection.title }}</NuxtLink>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator class="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{{ activeItem.title }}</BreadcrumbPage>
                </BreadcrumbItem>
              </template>
              <BreadcrumbItem v-else>
                <BreadcrumbPage>{{ activeSection.title }}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div class="ml-auto flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              as="a"
              :href="registryConfig.repositoryUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Button>
          </div>
        </div>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <slot />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
