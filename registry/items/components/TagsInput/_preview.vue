<script setup lang="ts">
import { ref } from "vue";
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from ".";

const tags = ref(["Design", "Vue", "Accessibility"]);
</script>

<template>
  <TagsInput v-model="tags" class="w-full max-w-sm">
    <TagsInputItem v-for="tag in tags" :key="tag" :value="tag">
      <TagsInputItemText />
      <TagsInputItemDelete />
    </TagsInputItem>
    <TagsInputInput placeholder="Add a tag..." />
  </TagsInput>
</template>
