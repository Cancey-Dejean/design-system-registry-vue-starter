import type { Meta, StoryObj } from "@storybook/vue3-vite";
import type { DateValue } from "@internationalized/date";
import type { Ref } from "vue";
import { getLocalTimeZone, today } from "@internationalized/date";
import { ref } from "vue";
import StorybookWrapperSimple from "@registry/utility/StorybookWrapperSimple.vue";
import { DatePicker } from "@registry/components/DatePicker";

const meta = {
  title: "Components/Date Picker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template: /* html */ "<StorybookWrapperSimple><story /></StorybookWrapperSimple>",
    }),
  ],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Empty date picker — opens a calendar popover. */
export const Default: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref() as Ref<DateValue | undefined>;
      return { date };
    },
    template: /* html */ `<DatePicker v-model="date" />`,
  }),
};

/** Preselected date with month-and-year calendar layout. */
export const WithValue: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref(today(getLocalTimeZone())) as Ref<DateValue | undefined>;
      return { date };
    },
    template: /* html */ `<DatePicker v-model="date" />`,
  }),
};

/** Custom placeholder when no date is selected. */
export const CustomPlaceholder: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref() as Ref<DateValue | undefined>;
      return { date };
    },
    template: /* html */ `<DatePicker v-model="date" placeholder="Select a birth date" />`,
  }),
};
