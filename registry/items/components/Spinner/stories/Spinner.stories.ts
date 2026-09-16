import type { Meta, StoryObj } from "@storybook/vue3-vite";
import StorybookWrapperSimple from "@registry/utility/StorybookWrapperSimple.vue";
import { Spinner } from "../";

const meta = {
  title: "Components/Spinner",
  tags: ["autodocs"],
  component: Spinner,
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
    class: { control: "text" },
  },
  args: {
    class: "",
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Large: Story = {
  args: {
    class: "size-8",
  },
};

export const Muted: Story = {
  args: {
    class: "size-6 text-muted-foreground",
  },
};
