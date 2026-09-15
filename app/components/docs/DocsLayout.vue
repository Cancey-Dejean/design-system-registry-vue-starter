<script setup lang="ts">
import DocsSidebar from "./DocsSidebar.vue";

const { data: sections } = useSiteNavigation();
</script>

<template>
  <div class="mx-auto flex w-full max-w-screen-2xl gap-8 px-4 sm:px-6 lg:px-8">
    <aside
      class="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto py-8 lg:block"
    >
      <DocsSidebar :sections="sections ?? []" class="[&_[data-sidebar-home]]:hidden" />
    </aside>
    <main class="min-w-0 flex-1 py-8">
      <div class="mx-auto max-w-full">
        <slot />
      </div>
    </main>
  </div>
</template>
