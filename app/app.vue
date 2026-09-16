<script setup lang="ts">
import { ACCENT_THEME_STORAGE_KEY } from "~/composables/useAccentTheme";
import { registryConfig } from "~/lib/registry/config";

useHead({
  titleTemplate: (title) => (title ? `${title} — ${registryConfig.name}` : registryConfig.name),
  script: [
    {
      // Runs before first paint so a returning visitor's saved accent (read from localStorage,
      // which SSR can't see) applies immediately instead of flashing the default accent and then
      // jumping to the real one once useAccentTheme's watcher runs after hydration.
      innerHTML: `(function(){try{var v=localStorage.getItem(${JSON.stringify(
        ACCENT_THEME_STORAGE_KEY,
      )});if(v&&v!=="default"){document.documentElement.setAttribute("data-theme",v);}}catch(e){}})();`,
      tagPosition: "head",
    },
  ],
});
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
