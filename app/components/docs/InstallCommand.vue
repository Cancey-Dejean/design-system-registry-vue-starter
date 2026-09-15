<script setup lang="ts">
import { getInstallCommand } from "~/lib/package-managers";
import PackageManagerCommand from "./PackageManagerCommand.vue";

const props = defineProps<{
  itemName: string;
  class?: string;
}>();

const preferredPackageManager = usePreferredPackageManager();

const command = computed(() => getInstallCommand(props.itemName, preferredPackageManager.value));
</script>

<template>
  <PackageManagerCommand
    :command="command"
    copy-label="Copy install command"
    :class="props.class"
  />
</template>
