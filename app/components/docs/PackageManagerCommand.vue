<script setup lang="ts">
import { ChevronDown } from "@lucide/vue";
import { Button } from "@registry/components/Button/index.ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@registry/components/Dropdown-menu/index.ts";
import { isPackageManager, packageManagers } from "~/lib/package-managers";
import { cn } from "~/lib/utils";
import CopyButton from "./CopyButton.vue";
import PackageManagerLogo from "./PackageManagerLogo.vue";

const props = defineProps<{
  command: string;
  copyLabel: string;
  class?: string;
}>();

const preferredPackageManager = usePreferredPackageManager();

const selectedOption = computed(
  () =>
    packageManagers.find((option) => option.value === preferredPackageManager.value) ??
    packageManagers[0],
);

function onValueUpdate(value: unknown) {
  if (typeof value === "string" && isPackageManager(value)) {
    preferredPackageManager.value = value;
  }
}
</script>

<template>
  <div :class="cn('min-w-0 overflow-hidden rounded-lg border bg-muted/40', props.class)">
    <div class="flex min-h-10 items-center justify-between gap-2 border-b px-2">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost" size="sm">
            <PackageManagerLogo :name="selectedOption.value" />
            {{ selectedOption.label }}
            <ChevronDown aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" class="min-w-40">
          <DropdownMenuGroup>
            <DropdownMenuRadioGroup
              :model-value="preferredPackageManager"
              @update:model-value="onValueUpdate"
            >
              <DropdownMenuRadioItem
                v-for="option in packageManagers"
                :key="option.value"
                :value="option.value"
                class="cursor-pointer gap-2"
              >
                <PackageManagerLogo :name="option.value" />
                {{ option.label }}
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <CopyButton
        :value="command"
        :copy-label="copyLabel"
        copied-label="Copied"
        :reset-delay="1200"
        variant="ghost"
        size="icon-sm"
      />
    </div>
    <pre class="overflow-x-auto p-4 text-[13px] text-foreground/80"><code>{{ command }}</code></pre>
  </div>
</template>
