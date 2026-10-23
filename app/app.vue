<script setup lang="ts">
import { ACCENT_THEME_STORAGE_KEY } from "~/composables/useAccentTheme";
import { registryConfig } from "~/lib/registry/config";
import { getRouteSeo } from "~/lib/seo";

const route = useRoute();
const { data: sections } = await useSiteNavigation();
const seo = computed(() => getRouteSeo(route.path, sections.value ?? []));

useSeoMeta({
  description: () => seo.value.description,
  ogTitle: () => seo.value.title,
  ogDescription: () => seo.value.description,
  ogSiteName: registryConfig.name,
  ogType: () => seo.value.ogType,
  ogUrl: () => seo.value.canonical,
  twitterCard: "summary",
  twitterTitle: () => seo.value.title,
  twitterDescription: () => seo.value.description,
  robots: () => seo.value.robots,
});
useHead(() => ({
  link: [
    { rel: "canonical" as const, href: seo.value.canonical },
    ...(seo.value.markdownUrl
      ? [
          {
            rel: "alternate" as const,
            type: "text/markdown",
            href: seo.value.markdownUrl,
            title: `${seo.value.title} as Markdown`,
          },
        ]
      : []),
  ],
}));

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
