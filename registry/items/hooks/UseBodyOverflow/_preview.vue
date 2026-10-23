<script setup lang="ts">
import { ref } from "vue";
import { useBodyOverflow } from "./useBodyOverflow";
import { Button } from "@registry/components/Button";
const open = ref(false);
useBodyOverflow(open);
</script>
<template>
  <Button variant="outline" @click="open = !open">{{
    open ? "Unlock scrolling" : "Lock scrolling"
  }}</Button>
</template>
