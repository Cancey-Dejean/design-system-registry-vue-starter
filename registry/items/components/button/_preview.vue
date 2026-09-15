<script setup lang="ts">
import { Button, ButtonCTAGroup } from ".";
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-wrap items-center gap-2">
      <Button variant="primary">Primary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
    <ButtonCTAGroup>
      <Button variant="primary">Save</Button>
      <Button variant="outline">Cancel</Button>
    </ButtonCTAGroup>
  </div>
</template>
