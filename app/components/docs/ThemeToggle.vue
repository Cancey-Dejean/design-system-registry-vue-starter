<script setup lang="ts">
import { Moon, Sun } from "@lucide/vue";
import { Button } from "@registry/components/Button";

withDefaults(defineProps<{ class?: string }>(), { class: undefined });

const colorMode = useColorMode();

function toggleTheme() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}
</script>

<template>
  <Button variant="ghost" size="icon-md" :class="$props.class" @click="toggleTheme">
    <!-- colorMode.value reflects localStorage, which SSR can't know — render a stable icon
         server-side and swap in the real one after mount to avoid a hydration mismatch. -->
    <ClientOnly>
      <Moon v-if="colorMode.value === 'dark'" />
      <Sun v-else />
      <template #fallback>
        <Sun />
      </template>
    </ClientOnly>
    <span class="sr-only">Toggle theme</span>
  </Button>
</template>
