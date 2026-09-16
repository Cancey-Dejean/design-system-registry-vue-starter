import type { Meta, StoryObj } from "@storybook/vue3";
import { Separator } from "..";

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => ({
    components: { Separator },
    template: `
      <div>
        <div class="text-sm">Section one</div>
        <Separator class="my-4" />
        <div class="text-sm">Section two</div>
      </div>
    `,
  }),
};

export const Vertical: Story = {
  render: () => ({
    components: { Separator },
    template: `
      <div class="flex h-5 items-center gap-4 text-sm">
        <span>Left</span>
        <Separator orientation="vertical" />
        <span>Right</span>
      </div>
    `,
  }),
};
