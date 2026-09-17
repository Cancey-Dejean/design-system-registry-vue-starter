<script setup lang="ts">
import { Container } from ".";
</script>

<template>
  <Container
    size="thin"
    class="bg-background flex items-center justify-center rounded-2xl border border-dashed p-8 text-center"
  >
    <p class="text-muted-foreground text-sm">
      Centered content that stays readable at 980px, no matter how wide the viewport gets.
    </p>
  </Container>
</template>
