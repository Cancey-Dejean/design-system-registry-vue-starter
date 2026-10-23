<script setup lang="ts">
import { onUnmounted, ref, type HTMLAttributes } from "vue";
import { Check, Copy } from "@lucide/vue";
import { Button, type ButtonSize, type ButtonVariant } from "@registry/components/Button";
defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    value: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    class?: HTMLAttributes["class"];
  }>(),
  { variant: "ghost", size: "icon-sm" },
);
const copied = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;
async function copy() {
  try {
    await navigator.clipboard.writeText(props.value);
    copied.value = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch {
    /* Keep the normal copy state if clipboard permission is unavailable. */
  }
}
onUnmounted(() => clearTimeout(timer));
</script>
<template>
  <Button
    v-bind="$attrs"
    data-slot="code-block-copy-button"
    :data-copied="copied || undefined"
    :variant="variant"
    :size="size"
    :class="props.class"
    :aria-label="copied ? 'Copied' : 'Copy'"
    @click="copy"
    ><Check v-if="copied" /><Copy v-else
  /></Button>
  <span aria-live="polite" class="sr-only">{{ copied ? "Copied" : "" }}</span>
</template>
