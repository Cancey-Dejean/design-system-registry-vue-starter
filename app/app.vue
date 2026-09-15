<script setup lang="ts">
import { registryConfig } from "~/lib/registry/config";

useHead({
  titleTemplate: (title) => (title ? `${title} — ${registryConfig.name}` : registryConfig.name),
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
