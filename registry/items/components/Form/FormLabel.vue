<script lang="ts" setup>
import type { LabelProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { Label } from "../Label";
import { useFormField } from "./";

const props = defineProps<LabelProps & { class?: HTMLAttributes["class"] }>();

const { error, formItemId } = useFormField();
</script>

<template>
  <Label
    data-slot="form-label"
    :data-error="!!error"
    :class="cn('data-[error=true]:text-destructive', props.class)"
    :for="formItemId"
  >
    <slot />
  </Label>
</template>
