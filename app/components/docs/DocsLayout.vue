<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@registry/components/Breadcrumb/index.ts";
import { Separator } from "@registry/components/Separator/index.ts";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@registry/components/Sidebar/index.ts";
import DocsAppSidebar from "./DocsAppSidebar.vue";
import HeaderActions from "./HeaderActions.vue";
import SiteFooter from "./SiteFooter.vue";

withDefaults(defineProps<{ showFooter?: boolean }>(), { showFooter: true });

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
    <SidebarInset class="min-w-0">
      <header
        class="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background"
      >
        <div class="flex w-full items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            class="mx-2 data-[orientation=vertical]:h-4 data-[orientation=vertical]:self-center"
          />
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
          <HeaderActions class="ml-auto" />
        </div>
      </header>
      <div class="flex min-w-0 flex-1 flex-col gap-4 pl-6 pr-4 pt-6">
        <slot />
      </div>
      <template v-if="showFooter" #footer>
        <SiteFooter />
      </template>
    </SidebarInset>
  </SidebarProvider>
</template>

<style>
/* The "On This Page" nav (DocsTableOfContents.vue) links straight to these ids, and the
   browser's native anchor scroll otherwise lands the heading right under the sticky header
   above (h-16) with no room to read it. Applies globally since headings render either as plain
   h2s (ComponentDoc.vue) or through @nuxtjs/mdc's prose components (markdown docs pages). */
h2[id],
h3[id] {
  scroll-margin-top: 5rem;
}
</style>
