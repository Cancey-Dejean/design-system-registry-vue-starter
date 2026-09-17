<script setup lang="ts">
import { Label } from "../Label";
import { Switch } from ".";
</script>

<template>
  <div class="flex items-center gap-2">
    <Switch id="airplane-mode" default-value />
    <Label for="airplane-mode">Airplane Mode</Label>
  </div>
</template>
