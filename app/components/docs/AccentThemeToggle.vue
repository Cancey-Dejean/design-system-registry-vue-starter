<script setup lang="ts">
import { Palette } from "@lucide/vue";
import { Button } from "@registry/components/Button/index.ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@registry/components/DropdownMenu/index.ts";
import { accentThemes, isAccentTheme, useAccentTheme } from "~/composables/useAccentTheme";

const accentTheme = useAccentTheme();

function onValueUpdate(value: unknown) {
  if (typeof value === "string" && isAccentTheme(value)) {
    accentTheme.value = value;
  }
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon-md">
        <Palette />
        <span class="sr-only">Change accent color</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="min-w-40">
      <DropdownMenuLabel>Accent color</DropdownMenuLabel>
      <DropdownMenuRadioGroup :model-value="accentTheme" @update:model-value="onValueUpdate">
        <DropdownMenuRadioItem
          v-for="option in accentThemes"
          :key="option.value"
          :value="option.value"
          class="cursor-pointer gap-2"
        >
          <span
            class="size-3 shrink-0 rounded-full border border-black/10 dark:border-white/10"
            :style="{ backgroundColor: option.swatch }"
            aria-hidden="true"
          />
          {{ option.label }}
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
