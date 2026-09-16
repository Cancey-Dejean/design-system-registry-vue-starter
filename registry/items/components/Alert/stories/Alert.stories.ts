import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { CircleCheck, TriangleAlert } from "@lucide/vue";
import StorybookWrapperSimple from "@registry/utility/StorybookWrapperSimple.vue";
import { Alert, ALERT_VARIANTS, AlertDescription, AlertTitle } from "../";

const meta = {
  title: "Components/Alert",
  tags: ["autodocs"],
  component: Alert,
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
    variant: {
      description: "Use destructive for errors and failed operations",
      control: "inline-radio",
      options: ALERT_VARIANTS,
    },
    class: { control: false },
  },
  args: {
    variant: "default",
  },
  render: (args) => ({
    components: { Alert, AlertDescription, AlertTitle },
    setup: () => ({ args }),
    template: `
      <Alert v-bind="args" class="max-w-md">
        <AlertTitle>Your changes are saved</AlertTitle>
        <AlertDescription>Everyone with access can see the update.</AlertDescription>
      </Alert>
    `,
  }),
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Destructive: Story = {
  args: {
    variant: "destructive",
  },
  render: (args) => ({
    components: { Alert, AlertDescription, AlertTitle },
    setup: () => ({ args }),
    template: `
      <Alert v-bind="args" class="max-w-md">
        <AlertTitle>Payment failed</AlertTitle>
        <AlertDescription>Update your card details and try the charge again.</AlertDescription>
      </Alert>
    `,
  }),
};

/** An `svg` as the first child switches the layout to a two-column grid. */
export const WithIcon: Story = {
  render: (args) => ({
    components: { Alert, AlertDescription, AlertTitle, CircleCheck, TriangleAlert },
    setup: () => ({ args }),
    template: `
      <Alert v-bind="args" class="max-w-md">
        <TriangleAlert v-if="args.variant === 'destructive'" />
        <CircleCheck v-else />
        <AlertTitle>Subscription expired</AlertTitle>
        <AlertDescription>Renew now to keep your projects online.</AlertDescription>
      </Alert>
    `,
  }),
};

/** The description is optional when the title says enough on its own. */
export const TitleOnly: Story = {
  render: (args) => ({
    components: { Alert, AlertTitle },
    setup: () => ({ args }),
    template: `
      <Alert v-bind="args" class="max-w-md">
        <AlertTitle>Heads up — maintenance starts at midnight</AlertTitle>
      </Alert>
    `,
  }),
};
