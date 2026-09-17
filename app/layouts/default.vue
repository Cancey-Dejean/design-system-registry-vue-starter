<script setup lang="ts">
import NavigationProgress from "~/components/docs/NavigationProgress.vue";
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <NavigationProgress />
    <div class="flex-1">
      <slot />
    </div>
  </div>
</template>
