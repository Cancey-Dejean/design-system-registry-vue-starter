<script setup lang="ts">
import { Spinner } from ".";
</script>

<template>
  <div class="flex items-center gap-4">
    <Spinner />
    <Spinner class="size-5" />
    <Spinner class="size-6 text-muted-foreground" />
  </div>
</template>
