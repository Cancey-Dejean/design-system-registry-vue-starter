<script setup lang="ts">
import type { SpinnerProps } from "./Spinner.types";
import { Loader2Icon } from "@lucide/vue";
import { cn } from "@/lib/utils";

const props = defineProps<SpinnerProps>();
</script>

<template>
  <Loader2Icon role="status" aria-label="Loading" :class="cn('size-4 animate-spin', props.class)" />
</template>
