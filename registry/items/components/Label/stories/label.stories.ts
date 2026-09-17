import type { Meta, StoryObj } from "@storybook/vue3";
import { Input } from "@registry/components/Input";
import { Label } from "@registry/components/Label";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  render: () => ({
    components: { Label, Input },
    template: /* html */ `
      <div class="grid max-w-sm gap-2">
        <Label for="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" />
      </div>
    `,
  }),
};
