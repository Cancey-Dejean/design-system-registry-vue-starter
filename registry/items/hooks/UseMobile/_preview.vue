<script setup lang="ts">
import { useIsMobile } from "./useMobile";
const mobile = useIsMobile();
</script>
<template>
  <p role="status">{{ mobile ? "Mobile viewport" : "Desktop viewport" }}</p>
</template>
