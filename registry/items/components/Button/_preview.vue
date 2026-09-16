<script setup lang="ts">
import { BUTTON_VARIANTS, Button } from ".";
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <Button v-for="variant in BUTTON_VARIANTS" :key="variant" :variant="variant">
      {{ variant.charAt(0).toUpperCase() + variant.slice(1) }}
    </Button>
  </div>
</template>
