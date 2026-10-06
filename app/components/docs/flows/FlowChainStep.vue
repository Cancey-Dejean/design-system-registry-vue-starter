<script setup lang="ts">
import { cn } from "cn";

const props = defineProps<{
  id: string;
  hot: string | null;
  label: string;
  kind: string;
  emphasized?: boolean;
  selectable?: boolean;
}>();
const emit = defineEmits<{ hot: [id: string | null]; select: [] }>();

const className = computed(() =>
  cn(
    "grid w-full grid-cols-[1.625rem_minmax(0,1fr)_auto] items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-sm",
    props.hot === props.id && "bg-muted",
    props.selectable && "outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
  ),
);
</script>

<template>
  <li>
    <component
      :is="selectable ? 'button' : 'div'"
      :type="selectable ? 'button' : undefined"
      :class="className"
      v-on="
        selectable
          ? {
              click: () => emit('select'),
              mouseenter: () => emit('hot', id),
              mouseleave: () => emit('hot', null),
              focus: () => emit('hot', id),
              blur: () => emit('hot', null),
            }
          : {}
      "
    >
      <span
        :class="
          cn(
            'grid size-5.5 place-items-center rounded-full border bg-card font-mono text-[11px]',
            emphasized && 'border-primary bg-primary text-primary-foreground',
          )
        "
      >
        <slot name="number" />
      </span>
      <span class="truncate">{{ label }}</span>
      <span class="font-mono text-[11px] text-muted-foreground">{{ kind }}</span>
    </component>
  </li>
</template>
