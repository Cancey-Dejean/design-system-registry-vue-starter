<script setup lang="ts">
import { Menu } from "@lucide/vue";
import { Button } from "@registry/components/Button/index.ts";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@registry/components/Sheet/index.ts";
import type { SiteNavigationSection } from "~/lib/navigation";
import { registryConfig } from "~/lib/registry/config";
import { cn } from "~/lib/utils";
import DocsSidebar from "./DocsSidebar.vue";
import SearchDialog from "./SearchDialog.vue";
import ThemeToggle from "./ThemeToggle.vue";

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
        <Button
          variant="ghost"
          size="icon-md"
          as="a"
          :href="registryConfig.repositoryUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 24 24" class="size-4" fill="currentColor" aria-hidden="true">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61c-.546-1.387-1.333-1.756-1.333-1.756c-1.089-.745.083-.729.083-.729c1.205.084 1.839 1.237 1.839 1.237c1.07 1.834 2.807 1.304 3.492.997c.108-.775.418-1.305.762-1.605c-2.665-.305-5.467-1.334-5.467-5.931c0-1.311.469-2.381 1.236-3.221c-.124-.303-.535-1.524.117-3.176c0 0 1.008-.322 3.301 1.23c.957-.266 1.983-.399 3.003-.404c1.02.005 2.047.138 3.006.404c2.291-1.552 3.297-1.23 3.297-1.23c.653 1.653.242 2.874.118 3.176c.77.84 1.235 1.91 1.235 3.221c0 4.609-2.807 5.624-5.479 5.921c.43.372.823 1.102.823 2.222c0 1.606-.014 2.898-.014 3.293c0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            />
          </svg>
          <span class="sr-only">GitHub</span>
        </Button>
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>
