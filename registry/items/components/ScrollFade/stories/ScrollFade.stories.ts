import type { Meta, StoryObj } from "@storybook/vue3-vite"
import StorybookWrapperSimple from "@/components/utility/StorybookWrapperSimple.vue"
import { ScrollFade } from "../"

const items = Array.from({ length: 12 }, (_, index) => `Item ${index + 1}`)
const tags = [
  "Design",
  "Engineering",
  "Marketing",
  "Product",
  "Research",
  "Sales",
  "Support",
  "Operations",
  "Finance",
  "Legal",
  "People",
  "Security",
]
const shortItems = Array.from({ length: 3 }, (_, index) => `Item ${index + 1}`)

const meta = {
  title: "Components/Scroll Fade",
  tags: ["autodocs"],
  component: ScrollFade,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template:
        "<StorybookWrapperSimple class='w-full max-w-xs'><story /></StorybookWrapperSimple>",
    }),
  ],
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
    },
    hideScrollbar: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof ScrollFade>

export default meta
type Story = StoryObj<typeof meta>

/** Vertical list with top/bottom edge fades. */
export const Default: Story = {
  render: () => ({
    components: { ScrollFade },
    setup: () => ({ items }),
    template: `
      <div class="mx-auto w-full max-w-xs overflow-hidden rounded-2xl border">
        <ScrollFade class="h-72">
          <div class="flex flex-col gap-1.5 p-1.5">
            <div
              v-for="item in items"
              :key="item"
              class="rounded-lg bg-muted px-3 py-2.5 text-sm"
            >
              {{ item }}
            </div>
          </div>
        </ScrollFade>
      </div>
    `,
  }),
}

/** No fade when content does not overflow. */
export const NoOverflow: Story = {
  render: () => ({
    components: { ScrollFade },
    setup: () => ({ shortItems }),
    template: `
      <div class="mx-auto w-full max-w-xs overflow-hidden rounded-2xl border">
        <ScrollFade>
          <div class="flex flex-col gap-1.5 p-1.5">
            <div
              v-for="item in shortItems"
              :key="item"
              class="rounded-lg bg-muted px-3 py-2.5 text-sm"
            >
              {{ item }}
            </div>
          </div>
        </ScrollFade>
      </div>
    `,
  }),
}

/** Horizontal scroller with start/end edge fades. */
export const Horizontal: Story = {
  render: () => ({
    components: { ScrollFade },
    setup: () => ({ tags }),
    template: `
      <div class="mx-auto w-full max-w-xs overflow-hidden rounded-2xl border">
        <ScrollFade orientation="horizontal">
          <div class="flex w-max gap-1.5 p-1.5">
            <div
              v-for="tag in tags"
              :key="tag"
              class="shrink-0 rounded-lg bg-muted px-3 py-2.5 text-sm"
            >
              {{ tag }}
            </div>
          </div>
        </ScrollFade>
      </div>
    `,
  }),
}
