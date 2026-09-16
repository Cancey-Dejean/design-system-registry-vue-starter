import type { Meta, StoryObj } from "@storybook/vue3";
import { Input } from "..";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  args: { type: "email", placeholder: "Email" },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: (args) => ({
    components: { Input },
    setup: () => ({ args }),
    template: /* html */ `<Input v-bind="args" class="max-w-sm" />`,
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { Input },
    template: /* html */ `<Input placeholder="Disabled" disabled class="max-w-sm" />`,
  }),
};
