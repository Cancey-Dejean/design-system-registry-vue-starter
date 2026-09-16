import type { Meta, StoryObj } from "@storybook/vue3-vite"
import "vue-sonner/style.css"
import { toast } from "vue-sonner"
import StorybookWrapperSimple from "@/components/utility/StorybookWrapperSimple.vue"
import { Button } from "../../Button"
import { Toaster } from ".."

const meta = {
  title: "Components/Sonner",
  tags: ["autodocs"],
  component: Toaster,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template: "<StorybookWrapperSimple><story /></StorybookWrapperSimple>",
    }),
  ],
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

/** Toast with description and undo action. */
export const Default: Story = {
  render: () => ({
    components: { Button, Toaster },
    setup: () => ({ toast }),
    template: `
      <Toaster />
      <Button
        variant="outline"
        @click="
          () =>
            toast('Event has been created', {
              description: 'Sunday, December 03, 2023 at 9:00 AM',
              action: {
                label: 'Undo',
                onClick: () => {},
              },
            })
        "
      >
        Add to calendar
      </Button>
    `,
  }),
}

/** Toast variants: default, success, info, warning, error, promise. */
export const Types: Story = {
  render: () => ({
    components: { Button, Toaster },
    setup() {
      function showPromise() {
        toast.promise(
          () =>
            new Promise<{ name: string }>((resolve) => {
              setTimeout(() => resolve({ name: "Event" }), 2000)
            }),
          {
            loading: "Loading...",
            success: (data: { name: string }) =>
              `${data.name} has been created`,
            error: "Error",
          },
        )
      }

      return { toast, showPromise }
    },
    template: `
      <Toaster />
      <div class="flex flex-wrap gap-2">
        <Button variant="outline" @click="() => toast('Event has been created')">
          Default
        </Button>
        <Button variant="outline" @click="() => toast.success('Event has been created')">
          Success
        </Button>
        <Button
          variant="outline"
          @click="() => toast.info('Be at the area 10 minutes before the event time')"
        >
          Info
        </Button>
        <Button
          variant="outline"
          @click="() => toast.warning('Event start time cannot be earlier than 8am')"
        >
          Warning
        </Button>
        <Button variant="outline" @click="() => toast.error('Event has not been created')">
          Error
        </Button>
        <Button variant="outline" @click="showPromise">
          Promise
        </Button>
      </div>
    `,
  }),
}

/** Simple one-line toast. */
export const Simple: Story = {
  render: () => ({
    components: { Button, Toaster },
    setup: () => ({ toast }),
    template: `
      <Toaster />
      <Button variant="outline" @click="() => toast('My first toast')">
        Give me a toast
      </Button>
    `,
  }),
}
