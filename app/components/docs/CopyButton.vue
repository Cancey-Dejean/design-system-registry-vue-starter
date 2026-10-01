<script setup lang="ts">
import { Check, Copy } from "@lucide/vue";
import type { ButtonVariants } from "@registry/components/Button";
import { Button } from "@registry/components/Button";
import { useClipboard } from "~/composables/useClipboard";
import { cn } from "@registry/lib/utils";

const props = withDefaults(
  defineProps<{
    value: string | (() => string | Promise<string>);
    showLabel?: boolean;
    copyLabel?: string;
    copiedLabel?: string;
    resetDelay?: number;
    variant?: ButtonVariants["variant"];
    size?: ButtonVariants["size"];
    class?: string;
  }>(),
  {
    showLabel: false,
    copyLabel: "Copy to clipboard",
    copiedLabel: "Copied",
    resetDelay: 2000,
    variant: "ghost",
    size: undefined,
  },
);

const { copied, copy } = useClipboard(props.resetDelay);

const buttonSize = computed(() => props.size ?? (props.showLabel ? "sm" : "icon-sm"));
</script>

<template>
  <Button
    type="button"
    :variant="variant"
    :size="buttonSize"
    :aria-label="copied ? copiedLabel : copyLabel"
    :class="cn('shrink-0', copied && 'cursor-default', props.class)"
    @click="copy(value)"
  >
    <Check v-if="copied" />
    <Copy v-else />
    <span v-if="showLabel">{{ copied ? copiedLabel : copyLabel }}</span>
  </Button>
</template>
