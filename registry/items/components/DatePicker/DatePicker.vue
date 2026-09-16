<script setup lang="ts">
import type { DateValue } from "@internationalized/date";
import type { HTMLAttributes } from "vue";
import { DateFormatter, getLocalTimeZone, today } from "@internationalized/date";
import { CalendarIcon } from "@lucide/vue";
import { computed } from "vue";
import { cn } from "@/lib/utils";
import Button from "../Button/Button.vue";
import Calendar from "../Calendar/Calendar.vue";
import Popover from "../Popover/Popover.vue";
import PopoverContent from "../Popover/PopoverContent.vue";
import PopoverTrigger from "../Popover/PopoverTrigger.vue";

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"];
    placeholder?: string;
  }>(),
  {
    placeholder: "Pick a date",
  },
);

const date = defineModel<DateValue | undefined>("modelValue", {
  default: undefined,
});

const defaultPlaceholder = today(getLocalTimeZone());

const df = new DateFormatter("en-US", {
  dateStyle: "long",
});

const formattedDate = computed(() => {
  if (!date.value) return null;
  return df.format(date.value.toDate(getLocalTimeZone()));
});
</script>

<template>
  <Popover v-slot="{ close }">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            props.class,
          )
        "
      >
        <CalendarIcon class="mr-2 size-4" />
        {{ formattedDate ?? placeholder }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar
        v-model="date"
        :initial-focus="true"
        :default-placeholder="defaultPlaceholder"
        layout="month-and-year"
        @update:model-value="close"
      />
    </PopoverContent>
  </Popover>
</template>
