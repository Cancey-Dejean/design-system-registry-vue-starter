<script setup lang="ts">
import { Card, CardDescription, CardHeader, CardTitle } from "../Card";
import { LinkSpread } from ".";
</script>

<template>
  <Card class="relative w-full max-w-sm transition-colors hover:bg-accent/50">
    <LinkSpread href="#" aria-label="Read Designing consistent focus states" />
    <CardHeader>
      <CardTitle>Designing consistent focus states</CardTitle>
      <CardDescription>
        The whole card is clickable — hover anywhere to see the effect.
      </CardDescription>
    </CardHeader>
  </Card>
</template>
