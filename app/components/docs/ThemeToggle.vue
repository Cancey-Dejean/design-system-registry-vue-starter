<script setup lang="ts">
import { Monitor, Moon, Sun } from "@lucide/vue";
import { Button } from "#registry-ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "#registry-ui/dropdown-menu";

withDefaults(defineProps<{ class?: string }>(), { class: undefined });

const colorMode = useColorMode();

const themeOptions = [
  { value: "system", label: "System", icon: Monitor },
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
] as const;

const currentOption = computed(
  () => themeOptions.find((option) => option.value === colorMode.preference) ?? themeOptions[0],
);
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon-md" :class="$props.class">
        <!-- colorMode.preference reflects localStorage, which SSR can't know — render a stable
             icon server-side and swap in the real one after mount to avoid a hydration mismatch. -->
        <ClientOnly>
          <component :is="currentOption.icon" />
          <template #fallback>
            <Monitor />
          </template>
        </ClientOnly>
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="min-w-44">
      <DropdownMenuGroup>
        <DropdownMenuRadioGroup v-model="colorMode.preference">
          <DropdownMenuRadioItem
            v-for="option in themeOptions"
            :key="option.value"
            :value="option.value"
            class="cursor-pointer gap-2"
          >
            <component :is="option.icon" class="text-muted-foreground" />
            {{ option.label }}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
