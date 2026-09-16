import type { Meta, StoryObj } from "@storybook/vue3-vite"
import type { DateRange } from "reka-ui"
import type { Ref } from "vue"
import { getLocalTimeZone, today } from "@internationalized/date"
import { ref } from "vue"
import StorybookWrapperSimple from "@/components/utility/StorybookWrapperSimple.vue"
import { RangeCalendar } from ".."

const meta = {
  title: "Components/Range Calendar",
  tags: ["autodocs"],
  component: RangeCalendar,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template: "<StorybookWrapperSimple><story /></StorybookWrapperSimple>",
    }),
  ],
} satisfies Meta<typeof RangeCalendar>

export default meta
type Story = StoryObj<typeof meta>

function createWeekRange() {
  const start = today(getLocalTimeZone())
  const end = start.add({ days: 7 })
  return ref({ start, end }) as Ref<DateRange>
}

/** Single-month range picker with a preselected week. */
export const Default: Story = {
  render: () => ({
    components: { RangeCalendar },
    setup() {
      const dateRange = createWeekRange()
      return { dateRange }
    },
    template: `
      <RangeCalendar
        v-model="dateRange"
        class="rounded-md border shadow-sm"
      />
    `,
  }),
}

/** Two months side by side with outside-view days disabled. */
export const TwoMonths: Story = {
  render: () => ({
    components: { RangeCalendar },
    setup() {
      const dateRange = createWeekRange()
      return { dateRange }
    },
    template: `
      <RangeCalendar
        v-model="dateRange"
        class="rounded-md border shadow-sm"
        :number-of-months="2"
        disable-days-outside-current-view
      />
    `,
  }),
}

/** Empty range ready for start/end selection. */
export const Empty: Story = {
  render: () => ({
    components: { RangeCalendar },
    setup() {
      const dateRange = ref({
        start: undefined,
        end: undefined,
      }) as Ref<DateRange>
      return { dateRange }
    },
    template: `
      <RangeCalendar
        v-model="dateRange"
        class="rounded-md border shadow-sm"
      />
    `,
  }),
}
