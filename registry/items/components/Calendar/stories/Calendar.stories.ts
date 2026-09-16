import type { Meta, StoryObj } from "@storybook/vue3-vite";
import type { DateValue } from "@internationalized/date";
import type { Ref } from "vue";
import { CalendarDate, fromDate, getLocalTimeZone, today } from "@internationalized/date";
import { ref } from "vue";
import StorybookWrapperSimple from "@/components/utility/StorybookWrapperSimple.vue";
import { Calendar, CALENDAR_LAYOUTS } from "../";

const meta = {
  title: "Components/Calendar",
  tags: ["autodocs"],
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template: "<StorybookWrapperSimple><story /></StorybookWrapperSimple>",
    }),
  ],
  argTypes: {
    layout: {
      control: "select",
      options: [undefined, ...CALENDAR_LAYOUTS],
    },
  },
  args: {
    layout: undefined,
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Basic calendar with heading navigation. */
export const Default: Story = {
  render: (args) => ({
    components: { Calendar },
    setup() {
      const date = ref(today(getLocalTimeZone())) as Ref<DateValue>;
      return { args, date };
    },
    template: `
      <Calendar
        v-bind="args"
        v-model="date"
        class="rounded-md border shadow-sm"
      />
    `,
  }),
};

/** Month and year dropdowns for faster jumps. */
export const MonthAndYear: Story = {
  args: {
    layout: "month-and-year",
  },
  render: (args) => ({
    components: { Calendar },
    setup() {
      const date = ref(fromDate(new Date(), getLocalTimeZone())) as Ref<DateValue>;
      return { args, date, CalendarDate };
    },
    template: `
      <Calendar
        v-bind="args"
        v-model="date"
        class="rounded-md border shadow-sm"
        :min-value="new CalendarDate(1925, 1, 1)"
        :max-value="new CalendarDate(2035, 1, 1)"
      />
    `,
  }),
};

/** Month dropdown with a static year label. */
export const MonthOnly: Story = {
  args: {
    layout: "month-only",
  },
  render: (args) => ({
    components: { Calendar },
    setup() {
      const date = ref(today(getLocalTimeZone())) as Ref<DateValue>;
      return { args, date };
    },
    template: `
      <Calendar
        v-bind="args"
        v-model="date"
        class="rounded-md border shadow-sm"
      />
    `,
  }),
};

/** Year dropdown with a static month label. */
export const YearOnly: Story = {
  args: {
    layout: "year-only",
  },
  render: (args) => ({
    components: { Calendar },
    setup() {
      const date = ref(today(getLocalTimeZone())) as Ref<DateValue>;
      return { args, date };
    },
    template: `
      <Calendar
        v-bind="args"
        v-model="date"
        class="rounded-md border shadow-sm"
      />
    `,
  }),
};
