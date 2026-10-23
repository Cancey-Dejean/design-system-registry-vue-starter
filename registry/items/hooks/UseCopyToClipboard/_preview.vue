<script setup lang="ts">
import { useCopyToClipboard } from "./useCopyToClipboard";
import { Button } from "@registry/components/Button";
const { status, copy, error } = useCopyToClipboard();
</script>
<template>
  <div class="flex flex-col gap-2">
    <Button variant="outline" @click="copy('Design System UI')">{{
      status === "copied" ? "Copied" : "Copy text"
    }}</Button>
    <p v-if="error" role="alert" class="text-sm text-destructive">{{ error.message }}</p>
  </div>
</template>
