<script setup lang="ts">
import { Input } from "../input";
import { Label } from ".";
</script>

<template>
  <div class="grid max-w-sm gap-2">
    <Label for="email">Email</Label>
    <Input id="email" type="email" placeholder="you@example.com" />
  </div>
</template>
