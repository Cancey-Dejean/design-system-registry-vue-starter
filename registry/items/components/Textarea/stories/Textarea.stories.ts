import type { Meta, StoryObj } from "@storybook/vue3-vite";
import StorybookWrapperSimple from "@registry/utility/StorybookWrapperSimple.vue";
import { Label } from "../../Label";
import { Textarea } from "../";

const meta = {
  title: "Components/Textarea",
  tags: ["autodocs"],
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  decorators: [
    () => ({
      components: { StorybookWrapperSimple },
      template:
        "<StorybookWrapperSimple class='w-full max-w-sm px-4'><story /></StorybookWrapperSimple>",
    }),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Basic message textarea. */
export const Default: Story = {
  render: () => ({
    components: { Textarea },
    template: `<Textarea class="w-full" placeholder="Type your message here." />`,
  }),
};

/** Disabled textarea that cannot be edited. */
export const Disabled: Story = {
  render: () => ({
    components: { Textarea },
    template: `<Textarea class="w-full" disabled placeholder="Type your message here." />`,
  }),
};

/** Textarea paired with a Label. */
export const WithLabel: Story = {
  render: () => ({
    components: { Textarea, Label },
    template: `
      <div class="grid w-full max-w-sm gap-1.5">
        <Label for="message">Your message</Label>
        <Textarea id="message" placeholder="Type your message here." />
      </div>
    `,
  }),
};
