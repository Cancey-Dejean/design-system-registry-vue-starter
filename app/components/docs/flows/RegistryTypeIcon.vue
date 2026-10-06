<script setup lang="ts">
import { getRegistryTypeIcon } from "~/lib/flows/flow-nodes";
import type { RegistryItemType } from "~/lib/registry/item-types";

defineProps<{ type: RegistryItemType }>();
</script>

<template>
  <component :is="getRegistryTypeIcon(type)" />
</template>
