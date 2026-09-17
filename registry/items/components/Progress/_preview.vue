<script setup lang="ts">
import { Progress } from ".";
</script>

<template>
  <div class="w-full max-w-sm space-y-2">
    <div class="flex items-center justify-between text-sm">
      <span>Uploading dataset.csv</span>
      <span class="text-muted-foreground">64%</span>
    </div>
    <Progress :model-value="64" />
  </div>
</template>
