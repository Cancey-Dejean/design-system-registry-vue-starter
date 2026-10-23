<script setup lang="ts">
import { ref } from "vue";
import { useCloseMobileMenuOnResize } from "./useCloseMobileMenuOnResize";
import { Button } from "@registry/components/Button";
const open = ref(true);
useCloseMobileMenuOnResize(() => {
  open.value = false;
});
</script>
<template>
  <div class="flex flex-col gap-2">
    <p>Resize the viewport to close the menu.</p>
    <Button variant="outline" @click="open = !open">{{
      open ? "Menu open" : "Menu closed"
    }}</Button>
  </div>
</template>
