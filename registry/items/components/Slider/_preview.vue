<script setup lang="ts">
import {Slider} from ".";
</script>

<template>
  <Slider :default-value="[50]" :max="100" :step="1" class="w-full max-w-xs" />
</template>
