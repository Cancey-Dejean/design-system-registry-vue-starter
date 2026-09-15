<script setup lang="ts">
import NavigationProgress from "~/components/docs/NavigationProgress.vue";
import SiteFooter from "~/components/docs/SiteFooter.vue";
import SiteHeader from "~/components/docs/SiteHeader.vue";
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <NavigationProgress />
    <SiteHeader />
    <div class="flex-1">
      <slot />
    </div>
    <SiteFooter />
  </div>
</template>
