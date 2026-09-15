import type { Meta, StoryObj } from "@storybook/vue3";
import { Checkbox } from "..";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: () => ({
    components: { Checkbox },
    template: `
      <div class="flex items-center gap-2">
        <Checkbox id="terms" />
        <label for="terms" class="text-sm">Accept terms and conditions</label>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { Checkbox },
    template: `
      <div class="flex items-center gap-2">
        <Checkbox id="terms-disabled" disabled />
        <label for="terms-disabled" class="text-sm opacity-50">Disabled</label>
      </div>
    `,
  }),
};
