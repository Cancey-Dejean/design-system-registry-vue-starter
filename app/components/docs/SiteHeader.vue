<script setup lang="ts">
import { Menu } from "@lucide/vue";
import { Button } from "@registry/components/Button/index.ts";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@registry/components/Sheet/index.ts";
import type { SiteNavigationSection } from "~/lib/navigation";
import { registryConfig } from "~/lib/registry/config";
import { cn } from "~/lib/utils";
import DocsSidebar from "./DocsSidebar.vue";
import HeaderActions from "./HeaderActions.vue";
import SearchDialog from "./SearchDialog.vue";

const open = ref(false);
const { data: sections } = useSiteNavigation();
const route = useRoute();

function isSectionActive(section: SiteNavigationSection): boolean {
  return route.path === section.basePath || route.path.startsWith(`${section.basePath}/`);
}
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
  >
    <div class="mx-auto flex h-14 max-w-screen-2xl items-center gap-4 px-4">
      <Sheet v-model:open="open">
        <SheetTrigger as-child>
          <Button variant="ghost" size="icon-md" class="lg:hidden">
            <Menu />
            <span class="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" class="w-66! bg-background/96 p-0 backdrop-blur-lg">
          <SheetTitle class="sr-only">Navigation</SheetTitle>
          <DocsSidebar
            :sections="sections ?? []"
            class="overflow-y-auto p-4 pt-12"
            @navigate="open = false"
          />
        </SheetContent>
      </Sheet>

      <NuxtLink to="/" class="flex items-center gap-2.5">
        <span class="font-mono text-sm font-semibold tracking-tighter">{{
          registryConfig.name
        }}</span>
      </NuxtLink>

      <nav aria-label="Main" class="hidden items-center gap-1 lg:flex">
        <NuxtLink
          v-for="section in sections ?? []"
          :key="section.id"
          :to="section.basePath"
          :class="
            cn(
              'rounded-md px-3 py-1.5 text-sm transition-colors hover:text-foreground',
              isSectionActive(section) ? 'text-foreground' : 'text-muted-foreground',
            )
          "
        >
          {{ section.title }}
        </NuxtLink>
      </nav>

      <div class="ml-auto flex items-center gap-1">
        <SearchDialog />
        <HeaderActions />
      </div>
    </div>
  </header>
</template>
