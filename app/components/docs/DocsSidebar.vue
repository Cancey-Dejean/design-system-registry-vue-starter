<script setup lang="ts">
import type { SiteNavigationItem, SiteNavigationSection } from "~/lib/navigation";
import { cn } from "~/lib/utils";

const props = defineProps<{
  sections: readonly SiteNavigationSection[];
  class?: string;
}>();

const emit = defineEmits<{ navigate: [] }>();

const route = useRoute();

function isSectionActive(section: SiteNavigationSection): boolean {
  return route.path === section.basePath || route.path.startsWith(`${section.basePath}/`);
}

function isItemActive(item: SiteNavigationItem): boolean {
  return route.path === item.routePath;
}

function onNavigate() {
  emit("navigate");
}
</script>

<template>
  <nav aria-label="Docs" :class="cn('flex flex-col gap-4', props.class)">
    <div data-sidebar-home class="flex flex-col gap-1">
      <NuxtLink
        to="/"
        class="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        @click="onNavigate"
      >
        Home
      </NuxtLink>
    </div>

    <div v-for="section in sections" :key="section.id" class="flex flex-col gap-1">
      <NuxtLink
        :to="section.basePath"
        class="rounded-md px-3 py-1 text-[13px] font-medium"
        :class="isSectionActive(section) ? 'text-foreground' : 'text-muted-foreground'"
        @click="onNavigate"
      >
        {{ section.title }}
      </NuxtLink>

      <ul class="flex flex-col gap-0.5">
        <li
          v-for="item in section.items"
          :key="`${item.kind}:${item.kind === 'docs' ? item.slug : item.name}`"
        >
          <NuxtLink
            :to="item.routePath"
            class="block truncate rounded-md px-3 py-1.5 text-sm transition-colors"
            :class="
              isItemActive(item)
                ? 'bg-accent font-medium text-accent-foreground'
                : 'text-muted-foreground hover:text-foreground'
            "
            @click="onNavigate"
          >
            {{ item.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
