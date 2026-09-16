<script setup lang="ts">
import NavigationProgress from "~/components/docs/NavigationProgress.vue";
import SiteFooter from "~/components/docs/SiteFooter.vue";
// SiteHeader is temporarily hidden while DocsLayout is being reworked to match the
// sidebar-07 block's full-page layout (no separate top bar). Not deleted — see SiteHeader.vue.
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <NavigationProgress />
    <div class="flex-1">
      <slot />
    </div>
    <SiteFooter />
  </div>
</template>
