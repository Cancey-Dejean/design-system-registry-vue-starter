<script setup lang="ts">
import { CircleCheckIcon } from "@lucide/vue";
import { Alert, AlertDescription, AlertTitle } from ".";
</script>

<template>
  <Alert class="max-w-md">
    <CircleCheckIcon />
    <AlertTitle>Your changes are saved</AlertTitle>
    <AlertDescription>Everyone with access can see the update.</AlertDescription>
  </Alert>
</template>
